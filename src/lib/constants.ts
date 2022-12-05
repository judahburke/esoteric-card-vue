import type { DefineLocaleMessage } from "vue-i18n";
import {
  CardRankKey,
  CardSuitColorKey,
  CardSuitKey,
  CardErrorKey,
} from "./card/enums";
import {
  PitchIntelligence,
  PitchBidValidation,
  PitchPlayValidation,
  PitchErrorKey,
} from "./pitch/enums";
import type { LocaleMap } from "./types";

export const tKeys = {
  de_DE: "de_DE",
  es_MX: "es_MX",
  en_US: "en_US",
  vn_VN: "vn_VN",
  home: {
    title: "home.title",
  },
  about: {
    title: "about.title",
    title_tools: "about.title_tools",
    link: {
      vuejs: "about.link.vuejs",
      pinia: "about.link.pinia",
      vueRouter: "about.link.vueRouter",
      i18n: "about.link.i18n",
      vite: "about.link.vite",
      vueTest: "about.link.vueTest",
      cypress: "about.link.cypress",
      vueDevTools: "about.link.vueDevTools",
      ts: "about.link.ts",
      bulma: "about.link.bulma",
      source: "about.link.source",
    },
    message_tools: "about.message_tools",
    message_dev_tools: "about.message_dev_tools",
  },
  card: {
    ACE: "card.ACE",
    ONE: "card.ONE",
    DEUCE: "card.DEUCE",
    TWO: "card.TWO",
    THREE: "card.THREE",
    FOUR: "card.FOUR",
    FIVE: "card.FIVE",
    SIX: "card.SIX",
    SEVEN: "card.SEVEN",
    EIGHT: "card.EIGHT",
    NINE: "card.NINE",
    TEN: "card.TEN",
    JACK: "card.JACK",
    QUEEN: "card.QUEEN",
    KING: "card.KING",
    JOKER: "card.JOKER",
    OLD_MAID: "card.OLD_MAID",
    RED: "card.RED",
    BLACK: "card.BLACK",
    SPADES: "card.SPADES",
    SPADES_EMPTY: "card.SPADES_EMPTY",
    HEARTS: "card.HEARTS",
    HEARTS_EMPTY: "card.HEARTS_EMPTY",
    CLUBS: "card.CLUBS",
    CLUBS_EMPTY: "card.CLUBS_EMPTY",
    DIAMONDS: "card.DIAMONDS",
    DIAMONDS_EMPTY: "card.DIAMONDS_EMPTY",
    errors: {
      DECK_500_EMPTY: "card.errors.DECK_500_EMPTY",
      CARD_404: "card.errors.CARD_404",
      TABLE_400_CUT: "card.errors.TABLE_400_CUT",
      TABLE_404_NEXT: "card.errors.TABLE_404_NEXT",
      TABLE_404_NEXT_DEALT: "card.errors.TABLE_404_NEXT_DEALT",
    },
  },
  pitch: {
    title: "pitch.title",
    title_configuration: "pitch.title_configuration",
    title_invalid_bid_for: "pitch.title_invalid_bid_for",
    title_invalid_play_for: "pitch.title_invalid_play_for",
    subtitle_configuration_bidders: "pitch.subtitle_configuration_bidders",
    subtitle_configuration_teams: "pitch.subtitle_configuration_teams",
    subtitle_configuration_options: "pitch.subtitle_configuration_options",
    message_summary: "pitch.message_summary",
    errors: {
      PITCH_501: "pitch.errors.PITCH_501",
      OPTIONS_400: "pitch.errors.OPTIONS_400",
      BIDDER_404: "pitch.errors.BIDDER_404",
      STATE_500_NO_TRUMP: "pitch.errors.STATE_500_NO_TRUMP",
      STATE_500_NO_TRICK_WINNER: "pitch.errors.STATE_500_NO_TRICK_WINNER",
      STATE_404_TEAM: "pitch.errors.STATE_404_TEAM",
      STATE_404_BIDDER: "pitch.errors.STATE_404_BIDDER",
      CALC_500_EXTRA_JACK: "pitch.errors.CALC_500_EXTRA_JACK",
      BID_400_LESS_THAN_2: "pitch.errors.BID_400_LESS_THAN_2",
      BID_400_NOT_EXCEED_BID: "pitch.errors.BID_400_NOT_EXCEED_BID",
      BID_400_EXCEED_4: "pitch.errors.BID_400_EXCEED_4",
      BID_400_EXCEED_5: "pitch.errors.BID_400_EXCEED_5",
      BID_400_NO_BID: "pitch.errors.BID_400_NO_BID",
      BID_400_TOO_MANY_ATTEMPTS: "pitch.errors.BID_400_TOO_MANY_ATTEMPTS",
      PLAY_400_NOT_FOLLOWING_SUIT: "pitch.errors.PLAY_400_NOT_FOLLOWING_SUIT",
      PLAY_400_NOT_IN_HAND: "pitch.errors.PLAY_400_NOT_IN_HAND",
      PLAY_400_INVALID_CARD: "pitch.errors.PLAY_400_INVALID_CARD",
      PLAY_400_TOO_MANY_ATTEMPTS: "pitch.errors.PLAY_400_TOO_MANY_ATTEMPTS",
      TRICK_500_NO_WINNER: "pitch.errors.TRICK_500_NO_WINNER",
    },
  },
  corners: {
    title: "corners.title",
    message_summary: "corners.message_summary",
    message_description: "corners.message_description",
    message_waitdescription: "corners.message_waitdescription",
    errors: {
      OPTIONS_400: "corners.errors.OPTIONS_400",
    },
  },
  spit: {
    title: "spit.title",
    message_summary: "spit.message_summary",
    message_description: "spit.message_description",
    message_waitdescription: "spit.message_waitdescription",
    errors: {
      OPTIONS_400: "spit.errors.OPTIONS_400",
    },
  },
  title: "title",
  title_game_over: "title_game_over",
  title_round_over: "title_round_over",
  title_trick_over: "title_trick_over",
  title_turn_for: "title_turn_for",
  title_error: "title_error",
  label_copyright: "label_copyright",
  label_locale: "label_locale",
  label_human: "label_human",
  label_artificial: "label_artificial",
  label_option_verbose: "label_option_verbose",
  label_option_winning_score: "label_option_winning_score",
  label_option_player_count: "label_option_player_count",
  label_option_team_count: "label_option_team_count",
  label_option_bid_5: "label_option_bid_5",
  label_option_bid_all_skip: "label_option_bid_all_skip",
  label_option_play_trump_despite_lead: "label_option_play_trump_despite_lead",
  label_option_score_tied_game: "label_option_score_tied_game",
  label_option_shuffle_count: "label_option_shuffle_count",
  label_option_cut_count_min: "label_option_cut_count_min",
  label_exit_configuration: "label_exit_configuration",
  label_bid_submit: "label_bid_submit",
  label_bid_skip: "label_bid_skip",
  label_play: "label_play",
  label_please_wait: "label_please_wait",
  label_configure: "label_configure",
  label_exit: "label_exit",
  label_team: "label_team",
  label_value: "label_value",
  label_bid: "label_bid",
  label_high: "label_high",
  label_low: "label_low",
  label_jack: "label_jack",
  label_game: "label_game",
  label_total: "label_total",
  label_trump: "label_trump",
  label_round: "label_round",
  label_netscore: "label_netscore",
  label_continue: "label_continue",
  label_enabled: "label_enabled",
  label_disabled: "label_disabled",
  label_yes: "label_yes",
  label_no: "label_no",
  message_play_again: "message_play_again",
  message_greeting: "message_greeting",
  message_subgreeting: "message_subgreeting",
  message_turn_for: "message_turn_for",
  message_bid_for: "message_bid_for",
  message_play_for: "message_play_for",
  message_trick_winner_for: "message_trick_winner_for",
  message_winner_for: "message_winner_for",
  message_error_of: "message_error_of",
  message_please_wait: "message_please_wait",
  field_none: "field_none",
  field_card_text: "field_card_text",
  field_card_char: "field_card_char",
  errors: {
    NA_500: "errors.NA_500",
    ENUM_501: "errors.ENUM_501",
  },
  mapPitchIntelligence: function (key: PitchIntelligence): string {
    switch (key) {
      case PitchIntelligence.HUMAN:
        return tKeys.label_human;
      case PitchIntelligence.ARTIFICIAL:
        return tKeys.label_human;
      default:
        throw new Error(tKeys.errors.ENUM_501);
    }
  },
  mapPitchError: function (key: PitchErrorKey): string {
    switch (key) {
      case PitchErrorKey.PITCH_501:
        return tKeys.pitch.errors.PITCH_501;
      case PitchErrorKey.OPTIONS_400:
        return tKeys.pitch.errors.OPTIONS_400;
      case PitchErrorKey.BIDDER_404:
        return tKeys.pitch.errors.BIDDER_404;
      case PitchErrorKey.STATE_500_NO_TRUMP:
        return tKeys.pitch.errors.STATE_500_NO_TRUMP;
      case PitchErrorKey.STATE_500_NO_TRICK_WINNER:
        return tKeys.pitch.errors.STATE_500_NO_TRICK_WINNER;
      case PitchErrorKey.STATE_404_TEAM:
        return tKeys.pitch.errors.STATE_404_TEAM;
      case PitchErrorKey.STATE_404_BIDDER:
        return tKeys.pitch.errors.STATE_404_BIDDER;
      case PitchErrorKey.CALC_500_EXTRA_JACK:
        return tKeys.pitch.errors.CALC_500_EXTRA_JACK;
      case PitchErrorKey.BID_400_LESS_THAN_2:
        return tKeys.pitch.errors.BID_400_LESS_THAN_2;
      case PitchErrorKey.BID_400_NOT_EXCEED_BID:
        return tKeys.pitch.errors.BID_400_NOT_EXCEED_BID;
      case PitchErrorKey.BID_400_EXCEED_4:
        return tKeys.pitch.errors.BID_400_EXCEED_4;
      case PitchErrorKey.BID_400_EXCEED_5:
        return tKeys.pitch.errors.BID_400_EXCEED_5;
      case PitchErrorKey.BID_400_NO_BID:
        return tKeys.pitch.errors.BID_400_NO_BID;
      case PitchErrorKey.BID_400_TOO_MANY_ATTEMPTS:
        return tKeys.pitch.errors.BID_400_TOO_MANY_ATTEMPTS;
      case PitchErrorKey.PLAY_400_NOT_FOLLOWING_SUIT:
        return tKeys.pitch.errors.PLAY_400_NOT_FOLLOWING_SUIT;
      case PitchErrorKey.PLAY_400_NOT_IN_HAND:
        return tKeys.pitch.errors.PLAY_400_NOT_IN_HAND;
      case PitchErrorKey.PLAY_400_INVALID_CARD:
        return tKeys.pitch.errors.PLAY_400_INVALID_CARD;
      case PitchErrorKey.PLAY_400_TOO_MANY_ATTEMPTS:
        return tKeys.pitch.errors.PLAY_400_TOO_MANY_ATTEMPTS;
      case PitchErrorKey.TRICK_500_NO_WINNER:
        return tKeys.pitch.errors.TRICK_500_NO_WINNER;
      default:
        throw new Error(tKeys.errors.ENUM_501);
    }
  },
  mapCardError: function (key: CardErrorKey): string {
    switch (key) {
      case CardErrorKey.DECK_500_EMPTY:
        return tKeys.card.errors.DECK_500_EMPTY;
      case CardErrorKey.CARD_404:
        return tKeys.card.errors.CARD_404;
      case CardErrorKey.TABLE_400_CUT:
        return tKeys.card.errors.TABLE_400_CUT;
      case CardErrorKey.TABLE_404_NEXT:
        return tKeys.card.errors.TABLE_404_NEXT;
      case CardErrorKey.TABLE_404_NEXT_DEALT:
        return tKeys.card.errors.TABLE_404_NEXT_DEALT;
      default:
        throw new Error(tKeys.errors.ENUM_501);
    }
  },
  mapPitchPlayVal: function (key: PitchPlayValidation): string {
    switch (key) {
      case PitchPlayValidation.INVALID_CARD:
        return tKeys.pitch.errors.PLAY_400_INVALID_CARD;
      case PitchPlayValidation.NOT_FOLLOWING_SUIT:
        return tKeys.pitch.errors.PLAY_400_NOT_FOLLOWING_SUIT;
      case PitchPlayValidation.NOT_IN_HAND:
        return tKeys.pitch.errors.PLAY_400_NOT_IN_HAND;
      case PitchPlayValidation.TOO_MANY_ATTEMPTS:
        return tKeys.pitch.errors.PLAY_400_TOO_MANY_ATTEMPTS;
      default:
        throw new Error(tKeys.errors.ENUM_501);
    }
  },
  mapPitchBidVal: function (key: PitchBidValidation): string {
    switch (key) {
      case PitchBidValidation.EXCEED_4:
        return tKeys.pitch.errors.BID_400_EXCEED_4;
      case PitchBidValidation.EXCEED_5:
        return tKeys.pitch.errors.BID_400_EXCEED_5;
      case PitchBidValidation.NOT_EXCEED_BID:
        return tKeys.pitch.errors.BID_400_NOT_EXCEED_BID;
      case PitchBidValidation.LESS_THAN_2:
        return tKeys.pitch.errors.BID_400_LESS_THAN_2;
      case PitchBidValidation.NO_BID:
        return tKeys.pitch.errors.BID_400_NO_BID;
      case PitchBidValidation.TOO_MANY_ATTEMPTS:
        return tKeys.pitch.errors.PLAY_400_TOO_MANY_ATTEMPTS;
      default:
        throw new Error(tKeys.errors.ENUM_501);
    }
  },
  mapCardRank: function (key: CardRankKey): string {
    switch (key) {
      case CardRankKey.ACE:
        return tKeys.card.ACE;
      case CardRankKey.KING:
        return tKeys.card.KING;
      case CardRankKey.QUEEN:
        return tKeys.card.QUEEN;
      case CardRankKey.JACK:
        return tKeys.card.JACK;
      case CardRankKey.TEN:
        return tKeys.card.TEN;
      case CardRankKey.NINE:
        return tKeys.card.NINE;
      case CardRankKey.EIGHT:
        return tKeys.card.EIGHT;
      case CardRankKey.SEVEN:
        return tKeys.card.SEVEN;
      case CardRankKey.SIX:
        return tKeys.card.SIX;
      case CardRankKey.FIVE:
        return tKeys.card.FIVE;
      case CardRankKey.FOUR:
        return tKeys.card.FOUR;
      case CardRankKey.THREE:
        return tKeys.card.THREE;
      case CardRankKey.TWO:
        return tKeys.card.TWO;
      case CardRankKey.DEUCE:
        return tKeys.card.DEUCE;
      case CardRankKey.ONE:
        return tKeys.card.ONE;
      case CardRankKey.JOKER:
        return tKeys.card.JOKER;
      case CardRankKey.OLD_MAID:
        return tKeys.card.OLD_MAID;
      default:
        throw new Error(tKeys.errors.ENUM_501);
    }
  },
  mapCardSuit: function (key: CardSuitKey): string {
    switch (key) {
      case CardSuitKey.CLUBS:
        return tKeys.card.CLUBS;
      case CardSuitKey.DIAMONDS:
        return tKeys.card.DIAMONDS;
      case CardSuitKey.HEARTS:
        return tKeys.card.HEARTS;
      case CardSuitKey.SPADES:
        return tKeys.card.SPADES;
      default:
        throw new Error(tKeys.errors.ENUM_501);
    }
  },
  mapCardSuitColor: function (key: CardSuitColorKey): string {
    switch (key) {
      case CardSuitColorKey.BLACK:
        return tKeys.card.BLACK;
      case CardSuitColorKey.RED:
        return tKeys.card.RED;
      default:
        throw new Error(tKeys.errors.ENUM_501);
    }
  },
} as DefineLocaleMessage & LocaleMap;
