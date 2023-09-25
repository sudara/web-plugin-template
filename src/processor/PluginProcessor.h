#pragma once

#include "version.h"

#include <imagiro-webview/imagiro-webview.h>
#include <juce_audio_processors/juce_audio_processors.h>
#include "imagiro-processor/src/parameter/ParameterLoader.h"

using namespace imagiro;
class TemplateAudioProcessor : public WebProcessor {
public:
    TemplateAudioProcessor();
    ~TemplateAudioProcessor() override;

    void prepareToPlay(double sampleRate, int blockSize) override;
    void processBlock(juce::AudioBuffer<float>&, juce::MidiBuffer&) override;

    std::string getHTMLString() override;

private:
    ParameterLoader paramLoader;
};
