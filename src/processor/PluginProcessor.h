#pragma once

#include <web_ui/web_ui.h>

using namespace imagiro;
class TemplateAudioProcessor : public imagiro::WebProcessor {
public:
    TemplateAudioProcessor();
    ~TemplateAudioProcessor() override;

    void prepareToPlay(double sampleRate, int blockSize) override;
    void processBlock(juce::AudioBuffer<float>&, juce::MidiBuffer&) override;

    std::string getHTMLString() override;

private:
    ParameterLoader paramLoader;
};
