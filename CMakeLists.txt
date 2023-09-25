cmake_minimum_required(VERSION 3.16)
project(imagiro-plugins)

set (CMAKE_CXX_STANDARD 17)

include(cmake/CPM.cmake)

# Compile commands
# useful for some IDEs like VSCode
# set(CMAKE_EXPORT_COMPILE_COMMANDS TRUE)

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
#CPMAddPackage("gh:sudara/melatonin_perfetto#main")
#CPMAddPackage("gh:catchorg/Catch2@3.3.2")

#adding any custom modules you might have:
add_subdirectory(modules)
add_subdirectory(src)

add_subdirectory(cmake/timestamp)
