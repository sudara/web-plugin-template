#define Publisher "imagiro"
#define Year GetDateTimeString("yyyy","","")

[Setup]
ArchitecturesInstallIn64BitMode=x64
ArchitecturesAllowed=x64
AppName={#PluginName}
OutputBaseFilename={#PluginName}
AppCopyright=Copyright (C) {#Year} {#Publisher}
AppPublisher={#Publisher}
AppVersion={#Version}
DefaultDirName="{commoncf64}\VST3\{#PluginName}.vst3"
DisableDirPage=yes
LicenseFile="..\License.txt"
UninstallFilesDir="{commonappdata}\{#PluginName}\uninstall"
Compression=zip
SolidCompression=yes
LZMAUseSeparateProcess=yes
LZMANumBlockThreads=6
; DiskSpanning=yes

[UninstallDelete]
Type: filesandordirs; Name: "{commoncf64}\VST3\{#PluginName}Data"

[Files]
Source: "..\..\build\plugins\{#PluginName}\{#PluginName}_artefacts\RelWithDebInfo\VST3\{#PluginName}.vst3\*"; DestDir: "{commoncf64}\VST3\{#PluginName}.vst3\"; Excludes: *.ilk; Flags: ignoreversion recursesubdirs;
Source: "..\..\build\plugins\{#PluginName}\{#PluginName}_artefacts\RelWithDebInfo\Standalone\{#PluginName}.exe"; DestDir: "{commonpf}\imagiro\{#PluginName}\{#PluginName}.exe"; Flags: ignoreversion recursesubdirs;
Source: "..\..\plugins\{#PluginName}\resources\user\*"; DestDir: "{userappdata}\imagiro\{#PluginName}\"; Flags: ignoreversion recursesubdirs skipifsourcedoesntexist;
Source: "..\..\plugins\{#PluginName}\resources\system\*"; DestDir: "{commonpf}\imagiro\{#PluginName}\"; Flags: ignoreversion recursesubdirs skipifsourcedoesntexist;

