import { defineStore } from "pinia";
import {
  PitchBidder,
  PitchCalculator,
  PitchCard,
  PitchCardFactory,
  PitchCardRank,
  PitchCardSuit,
  PitchDeck,
  PitchScoreboard,
  PitchState,
  PitchTable,
  PitchTeam,
} from "@/lib/pitch/classes";
import { defaultPitchOptions } from "@/lib/pitch/constants";
import type {
  IPitchRound,
  IPitchState,
  IPitchTrick,
} from "@/lib/pitch/interfaces";
import { tKeys } from "@/lib/constants";
import { PitchIntelligence } from "@/lib/pitch/enums";

const teamMap = (tCount: number, tArray: TeamConfig[]) =>
  tArray.filter((_, i) => i < tCount).map((t) => new PitchTeam(t.name));
const bidrMap = (bCount: number, bArray: BidderConfig[], teams: PitchTeam[]) =>
  bArray
    .filter((_, i) => i < bCount)
    .map((b, i, a) => {
      const team =
        teams.length < 1 || a.length % teams.length !== 0
          ? new PitchTeam(b.name)
          : teams[i % teams.length];
      return new PitchBidder(b.name, team, b.intelligence);
    });
const defaultFactory = new PitchCardFactory();
const defaultCalculator = new PitchCalculator(defaultFactory);
const defaultBidders = [
  {
    name: "I-Robot",
    intelligence: PitchIntelligence.ARTIFICIAL,
  },
  {
    name: "Myself",
    intelligence: PitchIntelligence.HUMAN,
  },
  {
    name: "R2-D2",
    intelligence: PitchIntelligence.ARTIFICIAL,
  },
  {
    name: "WALL-E",
    intelligence: PitchIntelligence.ARTIFICIAL,
  },
  {
    name: "Terminator",
    intelligence: PitchIntelligence.ARTIFICIAL,
  },
  {
    name: "Marvin",
    intelligence: PitchIntelligence.ARTIFICIAL,
  },
  {
    name: "HAL",
    intelligence: PitchIntelligence.ARTIFICIAL,
  },
  {
    name: "Bender",
    intelligence: PitchIntelligence.ARTIFICIAL,
  },
];
const defaultTeams = [
  {
    name: "Robots",
  },
  {
    name: "Humans",
  },
  {
    name: "Lobsters",
  },
  {
    name: "Whistlers",
  },
];
type BidderConfig = {
  name: string;
  intelligence: PitchIntelligence;
};
type TeamConfig = {
  name: string;
};
export interface PiniaPitchState
  extends IPitchState<
    PitchCardRank,
    PitchCardSuit,
    PitchCard,
    PitchTeam,
    PitchBidder
  > {
  bidderConfigs: BidderConfig[];
  teamConfigs: TeamConfig[];
  currentRound:
    | IPitchRound<
        PitchCardRank,
        PitchCardSuit,
        PitchCard,
        PitchTeam,
        PitchBidder
      >
    | undefined;
  currentTrick:
    | IPitchTrick<
        PitchCardRank,
        PitchCardSuit,
        PitchCard,
        PitchTeam,
        PitchBidder
      >
    | undefined;
}

export const usePitchStore = defineStore("pitch", {
  state: (): PiniaPitchState => ({
    factory: defaultFactory,
    calculator: defaultCalculator,
    options: { ...defaultPitchOptions },
    deck: new PitchDeck(defaultFactory),
    table: new PitchTable([]),
    rounds: [],
    scoreboard: new PitchScoreboard([], defaultCalculator),
    showCards: false,
    teamConfigs: [...defaultTeams],
    bidderConfigs: [...defaultBidders],
    currentRound: undefined,
    currentTrick: undefined,
  }),
  getters: {
    validIntelligences: (): PitchIntelligence[] => [
      PitchIntelligence.HUMAN,
      PitchIntelligence.ARTIFICIAL,
    ],
    validWinningScores: (): number[] => [11, 21],
    validShuffleCounts: (): number[] => [1, 2, 3, 4, 5, 6, 7, 8, 9],
    validCutCounts: (): number[] => {
      const l = [];
      for (let n = 1; n < 52; n++) {
        l.push(n);
      }
      return l;
    },
    validBidderCounts: (): number[] => [2, 3, 4, 5, 6, 7, 8],
    validTeamCounts: (state): number[] => {
      const a: number[] = [0];
      if ([2, 4, 6, 8].includes(state.options.bidderCount)) {
        a.push(2);
      }
      if ([3, 6].includes(state.options.bidderCount)) {
        a.push(3);
      }
      if ([4, 8].includes(state.options.bidderCount)) {
        a.push(4);
      }
      return a;
    },
    currentBidders: (state): PitchBidder[] => {
      return bidrMap(
        state.options.bidderCount,
        state.bidderConfigs,
        teamMap(state.options.teamCount, state.teamConfigs)
      );
    },
    currentState: (
      state
    ): IPitchState<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    > => {
      return new PitchState(
        state.table,
        state.options,
        defaultFactory,
        defaultCalculator,
        state.deck,
        state.scoreboard,
        state.rounds,
        state.showCards
      );
    },
    currentScore: (state) => (team: PitchTeam) =>
      state.scoreboard.getScoreTotal(team),
  },
  actions: {
    initCards() {},
    initializeState() {
      this.deck = new PitchDeck(defaultFactory);
      this.table = new PitchTable(this.currentBidders);
      this.rounds = [];
      this.scoreboard = new PitchScoreboard(
        this.table.teams,
        defaultCalculator
      );
      this.showCards = false;
      this.currentRound = undefined;
      this.currentTrick = undefined;
    },
    setOptionVerbosity(payload: boolean) {
      this.options.verbose = payload;
    },
    setOptionWinningScore(payload: number) {
      if (!this.validWinningScores.includes(payload)) {
        throw new Error(tKeys.pitch.errors.OPTIONS_400);
      }
      this.options.winningScore = payload;
    },
    setOptionBidderCount(payload: number) {
      if (!this.validBidderCounts.includes(payload)) {
        throw new Error(tKeys.pitch.errors.OPTIONS_400);
      }
      this.options.bidderCount = payload;
      if (!this.validTeamCounts.includes(this.options.teamCount)) {
        this.options.teamCount = 0;
      }
      this.initializeState();
    },
    setOptionTeamCount(payload: number) {
      if (!this.validTeamCounts.includes(payload)) {
        throw new Error(tKeys.pitch.errors.OPTIONS_400);
      }
      this.options.teamCount = payload;
      this.initializeState();
    },
    setTeamConfigName(payload: string, index: number) {
      if (index >= this.teamConfigs.length) {
        throw new Error(tKeys.pitch.errors.STATE_404_TEAM);
      }
      this.teamConfigs[index].name = payload;
      this.initializeState();
    },
    setTeamConfigs(teamInputs: TeamConfig[]) {
      this.teamConfigs = teamInputs;
      this.initializeState();
    },
    setBidderConfigName(payload: string, index: number) {
      if (index >= this.bidderConfigs.length) {
        throw new Error(tKeys.pitch.errors.STATE_404_BIDDER);
      }
      this.bidderConfigs[index].name = payload;
      this.initializeState();
    },
    setBidderConfigIntelligence(payload: PitchIntelligence, index: number) {
      if (index >= this.bidderConfigs.length) {
        throw new Error(tKeys.pitch.errors.STATE_404_BIDDER);
      }
      this.bidderConfigs[index].intelligence = payload;
      this.initializeState();
    },
    setBidderConfigs(payload: BidderConfig[]) {
      this.bidderConfigs = payload;
      this.initializeState();
    },
    setOptionBidFive(payload: boolean) {
      this.options.isBidFiveEnabled = payload;
    },
    setOptionBidNone(payload: boolean) {
      this.options.isBidNoneEnabled = payload;
    },
    setOptionAllowTrumpWhenCanFollowSuit(payload: boolean) {
      this.options.isAllowTrumpWhenCanFollowSuitEnabled = payload;
    },
    setOptionScoreTiedGamePionts(payload: boolean) {
      this.options.isScoreTiedGamePointsEnabled = payload;
    },
    setOptionShuffleCount(payload: number) {
      if (!this.validShuffleCounts.includes(payload)) {
        throw new Error(tKeys.pitch.errors.OPTIONS_400);
      }
      this.options.shuffle.shuffleCount = payload;
    },
    setOptionCutMin(payload: number) {
      if (!this.validCutCounts.includes(payload)) {
        throw new Error(tKeys.pitch.errors.OPTIONS_400);
      }
      this.options.cut.cutMinimum = payload;
    },
    setPitchState(
      pitch: IPitchState<
        PitchCardRank,
        PitchCardSuit,
        PitchCard,
        PitchTeam,
        PitchBidder
      >
    ) {
      this.table = pitch.table;
      this.options = pitch.options;
      this.deck = pitch.deck;
      this.scoreboard = pitch.scoreboard;
      this.rounds = pitch.rounds;
      this.showCards = pitch.showCards;
      this.currentRound = this.rounds[this.rounds.length - 1];
      this.currentTrick =
        this.currentRound.tricks[this.currentRound.tricks.length - 1];
    },
  },
});
