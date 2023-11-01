#pragma once

#include "version.h"

#include <imagiro_webview/imagiro_webview.h>
#include <juce_audio_processors/juce_audio_processors.h>
#include <imagiro_processor/imagiro_processor.h>

using namespace imagiro;
class TemplateAudioProcessor : public WebProcessor {
public:
    TemplateAudioProcessor();
    ~TemplateAudioProcessor() override;

    void prepareToPlay(double sampleRate, int blockSize) override;
    void process(juce::AudioBuffer<float>&, juce::MidiBuffer&) override;

    bool isResizable() override { return true; }
    juce::Point<int> getResizeMin() override { return {200, 200}; }
    juce::Point<int> getResizeMax() override { return {1000, 1000}; }
    juce::Point<int> getDefaultWindowSize() override { return {500, 400}; }

    std::string getHTMLString() override;

private:
    ParameterLoader paramLoader;
    juce::SmoothedValue<float> bypassGain;

    Parameter* gainParam;
};
