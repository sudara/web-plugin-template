juce_add_modules(
        imagiro_pointsynth
        danlin_fontawesome
        shared_plugin_helpers
        shared_processing_code
        audio_fft
        pitch_detector
        imagiro_gui
        web_ui
        gin
        gin_dsp
        gin_plugin
        imagiro_sampler2
)

add_subdirectory(box2d)
add_subdirectory(fastexp)
add_subdirectory(easywsclient)
include_directories(chaiscript/include)
include_directories(stretch)
include_directories(choc)
include_directories(cmajor/include)
include_directories(immer)

