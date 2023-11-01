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

    gainParam = getParameter("gain");
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

    if (!auth.isAuthorized()) return;

    for (auto s=0; s<buffer.getNumSamples(); s++) {
        auto gainDB = gainParam->getSmoothedUserValue(s);
        auto gain = juce::Decibels::decibelsToGain(gainDB);
        buffer.applyGain(s, 1, gain);
    }
}

std::string TemplateAudioProcessor::getHTMLString() {
    return BinaryData::index_html;
}

juce::AudioProcessor* JUCE_CALLTYPE createPluginFilter()
{
    return new TemplateAudioProcessor();
}
