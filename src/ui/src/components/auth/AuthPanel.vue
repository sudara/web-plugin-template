<template>
    <div class="bg-dark text-light flex flex-col justify-center items-center h-full transition-opacity duration-1000"
    :class="{'opacity-0 pointer-events-none': fadeout}">
        <div class="max-w-md flex flex-col gap-3 items-center justify-center">
            <p>please enter your serial number:</p>
            <div class="relative w-full">
                <div class="absolute right-0 h-full flex items-center justify-center px-2" v-if="authSuccess">✓</div>
                <input ref="si" 
                class="w-full bg-dark border border-light focus:bg-dark
                read-only:!bg-green disabled:opacity-100" 
                type="text" v-model="serial" :readonly="authSuccess"
                @focusout="refocus">
            </div>
            <p :class="{'opacity-100': authSuccess}" class="opacity-0 text-center italic">success!</p>

            <div class="w-full h-[15px] border-b border-light text-center mb-12">
                <span class="text-lg italic h-full bg-dark px-3">or</span>
            </div>

            <button v-if="authStore.demoFinished" disabled class="btn w-full active:bg-light">
                demo finished
            </button>

            <button v-else @click="startDemo" 
            :disabled="demoStartSuccess"
            class="btn w-full disabled:bg-green disabled:opacity-75">
                <span v-if="demoStartSuccess">demo started!</span>
                <span v-else>start demo</span>
            </button>

        </div>

    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { onMounted, ref, watch } from 'vue';

const authStore = useAuthStore();
const serial = ref();
const si = ref<HTMLInputElement>();
const authSuccess = ref(false);
const demoStartSuccess = ref(false);
const fadeout = ref(false);

onMounted(() => {
    setTimeout(() => si.value?.focus(), 10);
})

function refocus() {
    if (si.value?.readOnly) return;
    setTimeout(() => si.value?.focus(), 10);
}

watch(serial, async () => {
    if (await authStore.tryAuthorize(serial.value, false)) {
        authSuccess.value = true;
        setTimeout(() => { fadeout.value = true; }, 2000)
        setTimeout(authStore.loadAuthInfo, 3000);
    }
});

function startDemo() {
    demoStartSuccess.value = true;
    setTimeout(() => { fadeout.value = true; }, 1000)
    setTimeout(async () => {
        juce_startDemo();
        authStore.loadAuthInfo();
    }, 2000);
}

</script>