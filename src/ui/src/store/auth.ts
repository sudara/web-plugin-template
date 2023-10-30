import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            authorized: true,
            demoStarted: false,
            demoFinished: false,
            demoEndTime: new Date()
        }
    },
    actions: {
        async loadAuthInfo() {
            let demoTimeLeft;

            [   this.authorized, 
                this.demoStarted, 
                this.demoFinished,
                demoTimeLeft
            ] = await Promise.all([
                juce_getIsAuthorized(), 
                juce_getDemoStarted(), 
                juce_getDemoFinished(),
                juce_getDemoTimeLeftSeconds()
            ]);

            this.demoEndTime = new Date(new Date().getTime() + 1000 * demoTimeLeft);

            console.log("auth", this.authorized);
        },
        async tryAuthorize(serial: string, updateStore : boolean = true) : Promise<boolean> {
            const authorized = await juce_tryAuthorize(serial);
            if (authorized && updateStore) this.loadAuthInfo();
            return authorized;
        }
    },
    getters: {
        isDemoActive(state) : boolean {
            return state.demoStarted && state.demoFinished;
        }
    }
});
