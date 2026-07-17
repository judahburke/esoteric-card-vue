import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import PitchTrick from "../pitch/PitchTrick.vue";
import { beforeEach } from "node:test";
import { createPinia, setActivePinia } from "pinia";

describe("PitchTrick", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("renders properly", () => {
    const wrapper = mount(PitchTrick, {
      global: {
        plugins: [createPinia()],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
