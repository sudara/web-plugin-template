# Distributed under the OSI-approved BSD 3-Clause License.  See accompanying
# file Copyright.txt or https://cmake.org/licensing for details.

cmake_minimum_required(VERSION 3.5)

if(EXISTS "/Users/imagiro/Documents/audiodev/juce/templates/web-ui/cmake-build-debug/_deps/juce-subbuild/juce-populate-prefix/src/juce-populate-stamp/juce-populate-gitclone-lastrun.txt" AND EXISTS "/Users/imagiro/Documents/audiodev/juce/templates/web-ui/cmake-build-debug/_deps/juce-subbuild/juce-populate-prefix/src/juce-populate-stamp/juce-populate-gitinfo.txt" AND
  "/Users/imagiro/Documents/audiodev/juce/templates/web-ui/cmake-build-debug/_deps/juce-subbuild/juce-populate-prefix/src/juce-populate-stamp/juce-populate-gitclone-lastrun.txt" IS_NEWER_THAN "/Users/imagiro/Documents/audiodev/juce/templates/web-ui/cmake-build-debug/_deps/juce-subbuild/juce-populate-prefix/src/juce-populate-stamp/juce-populate-gitinfo.txt")
  message(STATUS
    "Avoiding repeated git clone, stamp file is up to date: "
    "'/Users/imagiro/Documents/audiodev/juce/templates/web-ui/cmake-build-debug/_deps/juce-subbuild/juce-populate-prefix/src/juce-populate-stamp/juce-populate-gitclone-lastrun.txt'"
  )
  return()
endif()

execute_process(
  COMMAND ${CMAKE_COMMAND} -E rm -rf "/Users/imagiro/Documents/audiodev/juce/templates/web-ui/cmake/cache/juce/f26b96ca62f3283d9503b994ae6b5a37ea611385"
  RESULT_VARIABLE error_code
)
if(error_code)
  message(FATAL_ERROR "Failed to remove directory: '/Users/imagiro/Documents/audiodev/juce/templates/web-ui/cmake/cache/juce/f26b96ca62f3283d9503b994ae6b5a37ea611385'")
endif()

# try the clone 3 times in case there is an odd git clone issue
set(error_code 1)
set(number_of_tries 0)
while(error_code AND number_of_tries LESS 3)
  execute_process(
    COMMAND "/opt/homebrew/bin/git" 
            clone --no-checkout --depth 1 --no-single-branch --config "advice.detachedHead=false" "https://github.com/juce-framework/JUCE.git" "f26b96ca62f3283d9503b994ae6b5a37ea611385"
    WORKING_DIRECTORY "/Users/imagiro/Documents/audiodev/juce/templates/web-ui/cmake/cache/juce"
    RESULT_VARIABLE error_code
  )
  math(EXPR number_of_tries "${number_of_tries} + 1")
endwhile()
if(number_of_tries GREATER 1)
  message(STATUS "Had to git clone more than once: ${number_of_tries} times.")
endif()
if(error_code)
  message(FATAL_ERROR "Failed to clone repository: 'https://github.com/juce-framework/JUCE.git'")
endif()

execute_process(
  COMMAND "/opt/homebrew/bin/git" 
          checkout "7.0.5" --
  WORKING_DIRECTORY "/Users/imagiro/Documents/audiodev/juce/templates/web-ui/cmake/cache/juce/f26b96ca62f3283d9503b994ae6b5a37ea611385"
  RESULT_VARIABLE error_code
)
if(error_code)
  message(FATAL_ERROR "Failed to checkout tag: '7.0.5'")
endif()

set(init_submodules TRUE)
if(init_submodules)
  execute_process(
    COMMAND "/opt/homebrew/bin/git" 
            submodule update --recursive --init 
    WORKING_DIRECTORY "/Users/imagiro/Documents/audiodev/juce/templates/web-ui/cmake/cache/juce/f26b96ca62f3283d9503b994ae6b5a37ea611385"
    RESULT_VARIABLE error_code
  )
endif()
if(error_code)
  message(FATAL_ERROR "Failed to update submodules in: '/Users/imagiro/Documents/audiodev/juce/templates/web-ui/cmake/cache/juce/f26b96ca62f3283d9503b994ae6b5a37ea611385'")
endif()

# Complete success, update the script-last-run stamp file:
#
execute_process(
  COMMAND ${CMAKE_COMMAND} -E copy "/Users/imagiro/Documents/audiodev/juce/templates/web-ui/cmake-build-debug/_deps/juce-subbuild/juce-populate-prefix/src/juce-populate-stamp/juce-populate-gitinfo.txt" "/Users/imagiro/Documents/audiodev/juce/templates/web-ui/cmake-build-debug/_deps/juce-subbuild/juce-populate-prefix/src/juce-populate-stamp/juce-populate-gitclone-lastrun.txt"
  RESULT_VARIABLE error_code
)
if(error_code)
  message(FATAL_ERROR "Failed to copy script-last-run stamp file: '/Users/imagiro/Documents/audiodev/juce/templates/web-ui/cmake-build-debug/_deps/juce-subbuild/juce-populate-prefix/src/juce-populate-stamp/juce-populate-gitclone-lastrun.txt'")
endif()
