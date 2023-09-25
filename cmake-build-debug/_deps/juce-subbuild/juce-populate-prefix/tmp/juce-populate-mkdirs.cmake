# Distributed under the OSI-approved BSD 3-Clause License.  See accompanying
# file Copyright.txt or https://cmake.org/licensing for details.

cmake_minimum_required(VERSION 3.5)

file(MAKE_DIRECTORY
  "/Users/imagiro/Documents/audiodev/juce/templates/web-ui/cmake/cache/juce/f26b96ca62f3283d9503b994ae6b5a37ea611385"
  "/Users/imagiro/Documents/audiodev/juce/templates/web-ui/cmake-build-debug/_deps/juce-build"
  "/Users/imagiro/Documents/audiodev/juce/templates/web-ui/cmake-build-debug/_deps/juce-subbuild/juce-populate-prefix"
  "/Users/imagiro/Documents/audiodev/juce/templates/web-ui/cmake-build-debug/_deps/juce-subbuild/juce-populate-prefix/tmp"
  "/Users/imagiro/Documents/audiodev/juce/templates/web-ui/cmake-build-debug/_deps/juce-subbuild/juce-populate-prefix/src/juce-populate-stamp"
  "/Users/imagiro/Documents/audiodev/juce/templates/web-ui/cmake-build-debug/_deps/juce-subbuild/juce-populate-prefix/src"
  "/Users/imagiro/Documents/audiodev/juce/templates/web-ui/cmake-build-debug/_deps/juce-subbuild/juce-populate-prefix/src/juce-populate-stamp"
)

set(configSubDirs )
foreach(subDir IN LISTS configSubDirs)
    file(MAKE_DIRECTORY "/Users/imagiro/Documents/audiodev/juce/templates/web-ui/cmake-build-debug/_deps/juce-subbuild/juce-populate-prefix/src/juce-populate-stamp/${subDir}")
endforeach()
if(cfgdir)
  file(MAKE_DIRECTORY "/Users/imagiro/Documents/audiodev/juce/templates/web-ui/cmake-build-debug/_deps/juce-subbuild/juce-populate-prefix/src/juce-populate-stamp${cfgdir}") # cfgdir has leading slash
endif()
