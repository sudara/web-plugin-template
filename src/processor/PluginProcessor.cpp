#include "PluginProcessor.h"
#include "BinaryData.h"

TemplateAudioProcessor::TemplateAudioProcessor()
        : WebProcessor(getDefaultProperties(), PROJECT_VERSION, PROJECT_ID),
#if JUCE_DEBUG
          paramLoader(*this, juce::File(
                  juce::String(SRCPATH) + "/Parameters.yaml"))
#else
        paramLoader(*this, BinaryData::Parameters_yaml)
#endif
{
    juce::ignoreUnused(paramLoader);
    WebProcessor::init();

    bypassGain.reset(250);
}

TemplateAudioProcessor::~TemplateAudioProcessor() {
}

void TemplateAudioProcessor::prepareToPlay(double sampleRate, int blockSize) {
    WebProcessor::prepareToPlay(sampleRate, blockSize);
}

void TemplateAudioProcessor::process(juce::AudioBuffer<float>& buffer,
                                         juce::MidiBuffer& midiMessages)

{
    juce::ignoreUnused(midiMessages);

    auto gain = juce::Decibels::decibelsToGain(getParameter("gain")->getUserValue());
    buffer.applyGain(gain);

    if (!auth.isAuthorized()) return;

    // processing
}

std::string TemplateAudioProcessor::getHTMLString() {
    return BinaryData::index_html;
}

juce::AudioProcessor* JUCE_CALLTYPE createPluginFilter()
{
    return new TemplateAudioProcessor();
}
