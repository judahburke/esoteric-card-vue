import { localeKeys } from "@/lib/constants";
import type { LocaleKey } from "@/lib/types";
import { defineStore } from "pinia";

export type RootPiniaState = {
    isLoading: boolean,
    locale: LocaleKey
}

export const useRootStore = defineStore('root', {
    state: (): RootPiniaState => ({
        isLoading: false,
        locale: localeKeys.en_US,
    }),
    actions: {
        setIsLoading(payload: boolean) {
            this.isLoading = payload;
        },
        setLocale(payload: LocaleKey) {
            this.locale = payload;
        },
    }
})