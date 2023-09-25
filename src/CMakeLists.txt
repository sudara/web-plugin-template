set(PluginName template)
set(PluginCode iptp)

project("${PluginName}" VERSION 1.0)
configure_file(src/version.h.in src/version.h)

option(JUCE_COPY_PLUGIN_AFTER_BUILD "Copy Plugin" ON)

juce_add_plugin("${PluginName}"
        ICON_BIG icon.jpg
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
        src/PluginProcessor.cpp
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
        ui/dist/index.html
        Parameters.yaml
        )

target_link_libraries("${PluginName}"
        PRIVATE
        "${PluginName}Data"
        juce::juce_audio_utils
        yaml-cpp
        web_ui
        PUBLIC
        juce::juce_recommended_config_flags
        juce::juce_recommended_lto_flags
        juce::juce_recommended_warning_flags)

target_include_directories("${PluginName}" PUBLIC
        "${PROJECT_BINARY_DIR}"
        )
