<template>
    <div class="relative">
        <div class="bg-light flex flex-col h-full w-full">
            <div class="w-full px-2 flex justify-between border-b border-dark h-[30px]">
                <div class="flex gap-2">
                    <Button @click="startSavePreset"
                    title="create a new preset">
                        <vue-feather type="plus" class="w-4 translate-y-0.5"></vue-feather>
                    </Button>
                    <Button  @click="revealPresets"
                    title="reveal presets folder">
                        <vue-feather type="folder" class="w-4 translate-y-0.5"></vue-feather>
                    </Button>
                </div>
                <div class="flex items-center">
                    <Button class="!px-1" @click="copyPreset"
                    title="copy current settings to clipboard">
                        copy
                    </Button>
                    |
                    <Button class="!px-1" @click="pastePreset"
                    title="paste settings from clipboard">
                        paste
                    </Button>
                </div>
                <div class="flex gap-2 items-center justify-center">
                    <Button class="translate-y-0.5"
                        title="show only favorite presets"
                        @click="showFavorites = !showFavorites">
                        <vue-feather type="heart" class="w-4" 
                        :fill="showFavorites ? 'var(--red)' : 'none'" 
                        :stroke="showFavorites ? 'var(--red)' : 'var(--dark)'" 
                        />
                    </Button>
                    <Button @click="chooseRandomPreset"
                    title="pick a random preset (from shown presets)">
                        <vue-feather type="shuffle" class="w-4 translate-y-0.5"></vue-feather>
                    </Button>
                </div>
            </div>
            <div class="shadow-top grow">
                <div class="overflow-scroll px-3 py-2 h-full">
                    <div v-for="[category, presets] of presetsToShow">
                        <PresetListCategory ref="categories" :category="category" :presets="presets" @delete-preset="startDeletePreset" />
                    </div>
                    <div v-show="showPresetInput">
                        <input ref="pi" class="ps-8 btn !bg-green w-full text-left"
                            @keyup.enter.native="savePreset" @keypress="onNameKeypress($event)" @keydown="onNameKeydown"
                            @focusout="showPresetInput = false">
                    </div>
                </div>
            </div>
        </div>
        <Transition>
            <div class="absolute top-0 bottom-0 left-0 right-0 z-50 
            flex justify-center items-center backdrop-blur-md" 
            v-if="presetToDelete" 
            @click="presetToDelete = null"
            :class="{'pointer-events-none': presetToDelete == null}">
                <div class="bg-light border-dark border p-3 w-64"
                @click.stop>
                    <div>
                        delete
                        <span class="font-bold"> {{ presetToDelete.name }}? </span>
                    </div>
                    <div class="flex items-center justify-evenly mt-3 gap-2">
                        <Button class="btn grow border border-dark"
                        @click="presetToDelete = null">cancel</Button>
                        <Button class="btn grow !bg-red border border-dark"
                        @click="commitDeletePreset">delete</Button>
                    </div>
                </div>
            </div>
        </Transition>
</div>
</template>

<script setup lang="ts">
import { Preset } from '@/presets/Preset';
import { usePresetStore } from '@/store/presets';
import { computed, nextTick, ref, toRaw } from 'vue';
import PresetListCategory from './PresetListCategory.vue';
import { Buffer } from "buffer";
import Button from '../controls/button/Button.vue';

const showPresetInput = ref(false);
const pi = ref<HTMLInputElement>();
const presetStore = usePresetStore();
const presetToDelete = ref<Preset | null>(null);

const categories = ref<typeof PresetListCategory[]>([]);

const showFavorites = ref(false);

const presetsToShow = computed(() => {
    const allPresets = presetStore.presets;
    if (!showFavorites.value) return allPresets;

    const p = new Map<string, Preset[]>();

    for (let [category, catPresets] of allPresets.entries()) {
        p.set(category, catPresets.filter(preset => preset.favorite));
    }

    return p;
});

function startSavePreset() {
    showPresetInput.value = true;
    nextTick(() => pi.value?.focus());
}

function savePreset() {
    if (!pi.value) return;
    let name = pi.value.value;
    juce_createPreset(name, "user");
    showPresetInput.value = false;
    pi.value.blur();
    pi.value.value = '';
}

function onNameKeypress(e: KeyboardEvent) {
    if (!pi.value) return;

    if (e.key == 'Escape') {
        showPresetInput.value = false;
        if (pi.value) pi.value.value = '';
    }

    if (pi.value?.value.length > 25) {
        e.preventDefault();
        return false;
    }

    var regex = new RegExp("^[a-zA-Z0-9 _-]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
}

function onNameKeydown(e: KeyboardEvent) {
    if (e.key == 'a' && (e.ctrlKey || e.metaKey)) {
        pi.value?.select();
    }
}

function startDeletePreset(p: Preset) {
    presetToDelete.value = p;
}

function commitDeletePreset() {
    if (!presetToDelete.value) return;
    juce_deletePreset(presetToDelete.value.path);
    presetStore.reloadPresets();
    presetToDelete.value = null;
}

function revealPresets() {
    juce_revealPresetsFolder();
}

function chooseRandomPreset() {
    const flatPresets = <Preset[]>[];
    for (const cat of categories.value) {
        if (cat.expanded) {
            flatPresets.push(...cat.presets);
        }
    }

    const index = Math.floor(Math.random()*flatPresets.length);
    const chosenPreset = flatPresets[index];

    juce_loadPreset(chosenPreset.path);
}

async function copyPreset() {
    const preset = await juce_getCurrentSettingsAsPreset();
    const json = JSON.stringify(preset);
    const encoded = Buffer.from(json).toString("base64");
    console.log(encoded);
    juce_copyToClipboard(encoded);
}

async function pastePreset() {
    const encoded = await juce_getTextFromClipboard();
    const jsonString = Buffer.from(encoded, "base64").toString();
    const preset = JSON.parse(jsonString);
    juce_setPresetFromString(preset);
}

</script>