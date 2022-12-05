import type { PitchOptions } from "./types";

const defaultPitchOptions: PitchOptions = {
  verbose: false,
  winningScore: 11,
  bidderCount: 2,
  teamCount: 0,
  isBidFiveEnabled: false,
  isBidNoneEnabled: false,
  isAllowTrumpWhenCanFollowSuitEnabled: true,
  isScoreTiedGamePointsEnabled: true,
  shuffle: {
    shuffleCount: 5,
  },
  deal: {
    isDealerFirst: false,
    cardCount: 3,
  },
  cut: {
    cutMinimum: 1,
  },
};

export { defaultPitchOptions };
