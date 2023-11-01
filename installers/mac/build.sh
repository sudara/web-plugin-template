#!/bin/sh

REBUILD=true
NOTARIZE=true

BUILD_TYPE=$1
if [ -z "$BUILD_TYPE" ]; then
  BUILD_TYPE=RelWithDebInfo
fi
echo "$TARGET"
echo "$BUILD_TYPE"
shift
PROJECT_ROOT=$1
shift

if [ "$1" = "-nb" ]
  then
    echo "Not rebuilding"
    shift
    REBUILD=false
fi

if [ "$1" = "-nn" ]
  then
    echo "Not notarizing"
    shift
    NOTARIZE=false
fi

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

if [ -z "$2" ]
  then
    PROJECT_ROOT="${SCRIPT_DIR}/../.."
fi

cd $PROJECT_ROOT

# Build the target
if [ $REBUILD = true ]
  then
    echo "Rebuilding..."
    mkdir -p build
    cmake -B ./build -G Ninja -DCMAKE_BUILD_TYPE="$BUILD_TYPE" -DCMAKE_C_COMPILER_LAUNCHER=ccache -DCMAKE_CXX_COMPILER_LAUNCHER=ccache -DCMAKE_OSX_ARCHITECTURES="arm64;x86_64"
    cmake --build ./build --config "${BUILD_TYPE}" --parallel 4
fi

# read in PLUGIN_NAME from env
source .env

rm -rf "bin/"
mkdir -p "bin/"
rm -rf "build/${PLUGIN_NAME}_artefacts/${BUILD_TYPE}/JuceLibraryCode"
cp -r "build/${PLUGIN_NAME}_artefacts/${BUILD_TYPE}/" "bin"
