import type { CutOptions, DealOptions, ShuffleOptions } from "./types";

const defaultCutOptions: CutOptions = {
  cutMinimum: 1,
};

const defaultDealOptions: DealOptions = {
  cardCount: 1,
  isDealerFirst: false,
};

const defaultShuffleOptions: ShuffleOptions = {
  shuffleCount: 1,
};

export { defaultCutOptions, defaultDealOptions, defaultShuffleOptions };
