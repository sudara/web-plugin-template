#!/bin/sh

TARGET=$1
VERSION=$2
MAC_APP_CERT="Developer ID Application: August Pemberton (RDZ34VZ2NU)"
MAC_INSTALL_CERT="Developer ID Installer: August Pemberton (RDZ34VZ2NU)"
MAC_SIGN_EMAIL="augustmpemberton@gmail.com"
MAC_SIGN_PW="iozm-cwef-xdaj-smha"
MAC_TEAM_ID="RDZ34VZ2NU"
TARGET_ID_BASE="com.imagiro.${TARGET}"

BUILD_TYPE=$3

if [ -z "$3" ]; then
  BUILD_TYPE=RelWithDebInfo
fi

if [ -z "$1" ]; then
    echo "No target supplied"
    exit 1
fi

if [ -z "$VERSION" ]; then
    echo "You must specify the version you are packaging!"
    echo "eg: ./make_installer.sh 1.0.6b4"
    exit 1
fi

OUTPUT_BASE_FILENAME="${TARGET}-macOS-$VERSION"

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PROJECT_ROOT="${SCRIPT_DIR}/../.."


NOTARIZE=true
if [ "$4" = "-nn" ]; then
  echo "---- not notarizing"
  NOTARIZE=false
  shift
fi

TARGET_DIR=$4

if [ -z "$TARGET_DIR" ]; then
  TARGET_DIR="$PROJECT_ROOT/bin"
  echo "no target dir specified - using ${TARGET_DIR}"
else
  TARGET_DIR=$4
  shift
fi

TMPDIR="./installer-tmp"
mkdir -p $TMPDIR

build_type()
{
    type=$1
    binary=$2
    ident=$3
    loc=$4

    workdir=$TMPDIR/$type
    mkdir -p $workdir

    if [[ -d "$binary/Contents" ]]; then
      codesign --force -s "$MAC_APP_CERT" -o runtime --deep --timestamp --digest-algorithm=sha1,sha256 "$binary"
    else
      echo "no contents - not signing binary"
      echo "$binary/Contents"
    fi

    cp -r "$binary" "$workdir"
    ls -l $workdir

    pkgbuild --sign "$MAC_INSTALL_CERT" --root $workdir --identifier $ident --version $VERSION --install-location "$loc" "$TMPDIR/${TARGET}_${type}.pkg" || exit 1
    pkgutil --check-signature "$TMPDIR/${TARGET}_${type}.pkg"

    codesign --force -s "$MAC_APP_CERT" -o runtime --deep --timestamp --digest-algorithm=sha1,sha256 "$TMPDIR/${TARGET}_${type}.pkg"

    rm -rf $workdir
}

mkdir -p "./temp/"

build_type "VST3" ${PROJECT_ROOT}/bin/${TARGET}/${BUILD_TYPE}/VST3/*.vst3 "${TARGET_ID_BASE}.VST3.pkg" "/Library/Audio/Plug-Ins/VST3"
build_type "AU" ${PROJECT_ROOT}/bin/${TARGET}/${BUILD_TYPE}/AU/*.component "${TARGET_ID_BASE}.AU.pkg" "/Library/Audio/Plug-Ins/Components"
build_type "Standalone" ${PROJECT_ROOT}/bin/${TARGET}/${BUILD_TYPE}/Standalone/*.app "${TARGET_ID_BASE}.Standalone.pkg" "/tmp/imagiro/${TARGET}"

RESOURCES_DIR="${PROJECT_ROOT}/plugins/${TARGET}/resources"

HAS_RESOURCES=false
if [ -d $RESOURCES_DIR ]; then
    HAS_RESOURCES=true
fi

if [ "$HAS_RESOURCES" = true ]; then
  echo "Using resources"
  # Build resources
  pkgbuild --sign "$MAC_INSTALL_CERT" --root "${PROJECT_ROOT}/plugins/${TARGET}/resources" \
  --identifier "${TARGET_ID_BASE}.resources.pkg" --version $VERSION \
  --scripts ${PROJECT_ROOT}/installers/mac/Resources/${TARGET}/postinstall \
  --install-location "/tmp/imagiro/${TARGET}/resources" ${TMPDIR}/${TARGET}_Resources.pkg

  codesign --force -s "$MAC_APP_CERT" -o runtime --deep --timestamp \
    --digest-algorithm=sha1,sha256 "${TMPDIR}/${TARGET}_Resources.pkg"
else
  echo "Not using resources"
fi

echo --- Sub Packages Created ---

PKG_REFS=""
for type in VST3 AU Standalone; do
  PKG_REFS="$PKG_REFS
   <pkg-ref id=\"$TARGET_ID_BASE.$type.pkg\"/>"
done

if [ "$HAS_RESOURCES" = true ]; then
  PKG_REFS="$PKG_REFS
   <pkg-ref id=\"$TARGET_ID_BASE.resources.pkg\"/>"
fi

PKG_LINE_CHOICES=""
for type in VST3 AU Standalone; do
  PKG_LINE_CHOICES="$PKG_LINE_CHOICES
   <line choice=\"$TARGET_ID_BASE.$type.pkg\"/>"
done

if [ "$HAS_RESOURCES" = true ]; then
  PKG_LINE_CHOICES="$PKG_LINE_CHOICES
   <line choice=\"$TARGET_ID_BASE.resources.pkg\"/>"
fi

PKG_CHOICES=""
for type in VST3 AU Standalone; do
  PKG_CHOICES="$PKG_CHOICES
  <choice id=\"$TARGET_ID_BASE.$type.pkg\"
    visible=\"true\" start_selected=\"true\" title=\"${TARGET} - $type\">\
    <pkg-ref id=\"$TARGET_ID_BASE.$type.pkg\"/>\
  </choice>\
  <pkg-ref id=\"$TARGET_ID_BASE.$type.pkg\" version=\"${VERSION}\" \
  onConclusion=\"none\">${TARGET}_$type.pkg</pkg-ref>"
done

if [ "$HAS_RESOURCES" = true ]; then
  PKG_CHOICES="$PKG_CHOICES
    <choice id=\"${TARGET_ID_BASE}.resources.pkg\"
      visible=\"true\" enabled=\"false\" selected=\"true\" title=\"Resources\">
        <pkg-ref id=\"${TARGET_ID_BASE}.resources.pkg\"/>
    </choice>
    <pkg-ref id=\"${TARGET_ID_BASE}.resources.pkg\" version=\"${VERSION}\" \
      onConclusion=\"none\">${TARGET}_Resources.pkg</pkg-ref>"
fi

cat > $TMPDIR/distribution.xml << XMLEND
<?xml version="1.0" encoding="utf-8"?>
<installer-gui-script minSpecVersion="1">
    <title>${TARGET} v${VERSION}</title>
    <license file="License.txt" />
    <readme file="Readme.rtf" />

    ${PKG_REFS}

    <options require-scripts="false" customize="always" hostArchitectures="x86_64,arm64" rootVolumeOnly="true"/>
    <domains enable_anywhere="false" enable_currentUserHome="false" enable_localSystem="true"/>

    <choices-outline>
      ${PKG_LINE_CHOICES}
    </choices-outline>

    ${PKG_CHOICES}

</installer-gui-script>
XMLEND

pushd ${TMPDIR}
productbuild --sign "$MAC_INSTALL_CERT" --distribution "distribution.xml" \
            --package-path "." --resources ${PROJECT_ROOT}/installers "$OUTPUT_BASE_FILENAME.pkg"

codesign --force -s "$MAC_INSTALL_CERT" -o runtime --deep --timestamp \
  --digest-algorithm=sha1,sha256 "$OUTPUT_BASE_FILENAME.pkg"
popd

echo "---- Product archive built ----"

mkdir "${TMPDIR}/${TARGET}"
mv "${TMPDIR}/${OUTPUT_BASE_FILENAME}.pkg" "${TMPDIR}/${TARGET}"

rm "${TARGET_DIR}/$OUTPUT_BASE_FILENAME.dmg"

hdiutil create "${TARGET_DIR}/${OUTPUT_BASE_FILENAME}.dmg" -ov \
              -fs JHFS+ \
              -volname "${TARGET} Installer" \
              -srcfolder "${TMPDIR}/${TARGET}/"

codesign --force -s "$MAC_APP_CERT" -o runtime --deep --timestamp \
  --digest-algorithm=sha1,sha256 "${TARGET_DIR}/$OUTPUT_BASE_FILENAME.dmg"

codesign --verify --deep --verbose "${TARGET_DIR}/$OUTPUT_BASE_FILENAME.dmg"

echo "---- DMG Built ----"

if [ $NOTARIZE = true ]; then
  echo "Notarizing..."
  xcrun notarytool submit "${TARGET_DIR}/$OUTPUT_BASE_FILENAME.dmg" --apple-id ${MAC_SIGN_EMAIL} \
                --team-id ${MAC_TEAM_ID} --password ${MAC_SIGN_PW} --wait
  xcrun stapler staple "${TARGET_DIR}/${OUTPUT_BASE_FILENAME}.dmg"
fi

echo "Outputted installer to ${TARGET_DIR}/${OUTPUT_BASE_FILENAME}.dmg"

echo "Cleaning up..."
rm -rf ${TMPDIR}
