#include "PluginProcessor.h"
#include "BinaryData.h"

TemplateAudioProcessor::TemplateAudioProcessor()
        : WebProcessor(getDefaultProperties()),
#if JUCE_DEBUG
          paramLoader(*this, juce::File(
                  juce::String(SRCPATH) + "/Parameters.yaml"))
#else
        paramLoader(*this, BinaryData::Parameters_yaml)
#endif
{
    juce::ignoreUnused(paramLoader);
}

TemplateAudioProcessor::~TemplateAudioProcessor() {
}

void TemplateAudioProcessor::prepareToPlay(double sampleRate, int blockSize) {
    ProcessorBase::prepareToPlay(sampleRate, blockSize);
}

void TemplateAudioProcessor::processBlock(juce::AudioBuffer<float>& buffer,
                                         juce::MidiBuffer& midiMessages)

{
    imagiro::Processor::processBlock(buffer, midiMessages);
    juce::ignoreUnused(midiMessages);

    // processing
}

std::string TemplateAudioProcessor::getHTMLString() {
    return BinaryData::index_html;
}

juce::AudioProcessor* JUCE_CALLTYPE createPluginFilter()
{
    return new TemplateAudioProcessor();
}
