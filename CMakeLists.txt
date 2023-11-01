cmake_minimum_required(VERSION 3.16)
set (CMAKE_CXX_STANDARD 20)

# CHANGE ME
set(PluginName template)
set(PluginCode Itml)

project("${PluginName}")

# pull in version
include(cmake/CMakeVersion.cmake)
set(Version ${CURRENT_VERSION})

include(cmake/CPM.cmake)
set(CPM_SOURCE_CACHE "cmake/cache/")

if (WIN32)
    set(CMAKE_MSVC_RUNTIME_LIBRARY "MultiThreaded$<$<CONFIG:Debug>:Debug>")
endif()

# Minimum macOS target
if(APPLE)
    set (CMAKE_OSX_DEPLOYMENT_TARGET "10.13" CACHE STRING "Minimum OS X deployment version" FORCE)
    set (CMAKE_OSX_ARCHITECTURES "x86_64; arm64" CACHE STRING "Architectures" FORCE)
endif()

# Adds all the module sources so they appear correctly in the IDE
set_property(GLOBAL PROPERTY USE_FOLDERS YES)
option(JUCE_ENABLE_MODULE_SOURCE_GROUPS "Enable Module Source Groups" ON)

#set any of these to "ON" if you want to build one of the juce examples
#or extras (Projucer/AudioPluginHost, etc):
option(JUCE_BUILD_EXTRAS "Build JUCE Extras" OFF)
option(JUCE_BUILD_EXAMPLES "Build JUCE Examples" OFF)

#Fetching JUCE from git
# set(CPM_JUCE_SOURCE "/Users/imagiro/JUCE") # uncomment this line to use juce offline
CPMAddPackage("gh:juce-framework/JUCE#7.0.7")
CPMAddPackage("gh:jbeder/yaml-cpp#0.8.0")
#CPMAddPackage(
#        NAME nlohmann_json
#        GITHUB_REPOSITORY nlohmann/json
#        VERSION 3.11.2)
#CPMAddPackage("gh:sudara/melatonin_perfetto#main")
#CPMAddPackage("gh:catchorg/Catch2@3.3.2")

#adding any custom modules you might have:
add_subdirectory(modules)

add_subdirectory(cmake/timestamp)


project("${PluginName}" VERSION "${Version}")
configure_file(src/version.h.in version.h)

option(JUCE_COPY_PLUGIN_AFTER_BUILD "Copy Plugin" ON)

juce_add_plugin("${PluginName}"
        ICON_BIG src/resources/icon-large.png
        ICON_SMALL src/resources/icon-small.png
        COMPANY_NAME imagiro                        # Specify the name of the plugin's author
        IS_SYNTH FALSE                               # Is this a synth or an effect?
        NEEDS_MIDI_INPUT FALSE
        COPY_PLUGIN_AFTER_BUILD TRUE                # Should the plugin be installed to a default location after building?
        PLUGIN_MANUFACTURER_CODE Imag               # A four-character manufacturer id with at least one upper-case character
        PLUGIN_CODE "${PluginCode}"                   # A unique four-character plugin id with exactly one upper-case character
        # GarageBand 10.3 requires the first letter to be upper-case, and the remaining letters to be lower-case
        FORMATS AU VST3 Standalone                  # The formats to build. Other valid formats are: AAX Unity VST AU AUv3U
        PRODUCT_NAME "${PluginName}")                    # The name of the final executable, which can differ from the target name

target_sources("${PluginName}"
        PRIVATE
        src/processor/PluginProcessor.cpp
        )

target_compile_definitions("${PluginName}"
        PUBLIC
        JUCE_WEB_BROWSER=0  # If you remove this, add `NEEDS_WEB_BROWSER TRUE` to the `juce_add_plugin` call
        JUCE_USE_CURL=0     # If you remove this, add `NEEDS_CURL TRUE` to the `juce_add_plugin` call
        JUCE_VST3_CAN_REPLACE_VST2=0
        JUCE_DISPLAY_SPLASH_SCREEN=0
        DONT_SET_USING_JUCE_NAMESPACE=1
        )

juce_add_binary_data("${PluginName}Data" SOURCES
        src/ui/dist/index.html
        src/Parameters.yaml
        )

target_link_libraries("${PluginName}"
        PRIVATE
        "${PluginName}Data"
        juce::juce_audio_utils
        yaml-cpp
        imagiro_webview
        imagiro_processor
        timestamp
        PUBLIC
        juce::juce_recommended_config_flags
        juce::juce_recommended_lto_flags
        juce::juce_recommended_warning_flags)

target_include_directories("${PluginName}" PUBLIC
        "${PROJECT_BINARY_DIR}"
        )

# pass config to github actions
include(cmake/GithubEnv.cmake)
