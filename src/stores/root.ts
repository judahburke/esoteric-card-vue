import { LocaleKey } from "@/lib/enums";
import { defineStore } from "pinia";

export type RootPiniaState = {
  isLoading: boolean;
  locale: LocaleKey;
};

export const useRootStore = defineStore("root", {
  state: (): RootPiniaState => ({
    isLoading: false,
    locale: LocaleKey.en_US,
  }),
  getters: {
    validLocales: (): LocaleKey[] => [LocaleKey.en_US, LocaleKey.vn_VN],
  },
  actions: {
    setIsLoading(payload: boolean) {
      this.isLoading = payload;
    },
    setLocale(payload: LocaleKey) {
      this.locale = payload;
    },
  },
});
