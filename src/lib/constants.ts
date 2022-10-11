import type { DefineLocaleMessage, Locale } from "vue-i18n";
import { CardRankKey, CardSuitColorKey, CardSuitKey } from "./card/enums";
import { PitchIntelligence, PitchBidValidation, PitchPlayValidation } from "./pitch/enums";
import type { LocaleKey } from "./types";

export const localeKeys = {
  en_US: "en_US" as LocaleKey,
  es_MX: "es_MX" as LocaleKey,
  vn_VN: "vn_VN" as LocaleKey,
  de_DE: "de_DE" as LocaleKey,
};

interface LocaleMessageMap {
  mapIntelligence(intelligence: PitchIntelligence): string;
  mapCardRank(key: CardRankKey): string;
  mapCardSuit(key: CardSuitKey, empty?: boolean): string;
  mapCardColor(key: CardSuitColorKey): string;
  mapPitchBidValidation(key: PitchBidValidation): string;
  mapPitchPlayValidation(key: PitchPlayValidation): string;
}

export const messageKeys = {
  de_DE: "de_DE",
  es_MX: "es_MX",
  en_US: "en_US",
  vn_VN: "vn_VN",
  home: {
    title: "home.title"
  },
  about: {
    title: "about.title"
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
    }
  },
  pitch: {
    title: "pitch.title",
    title_configuration: "pitch.title_configuration",
    subtitle_configuration_bidders: "pitch.subtitle_configuration_bidders",
    subtitle_configuration_teams: "pitch.subtitle_configuration_teams",
    subtitle_configuration_options: "pitch.subtitle_configuration_options",
    message_summary: "pitch.message_summary",
    errors: {
      PITCH_501: 'pitch.errors.PITCH_501',
      OPTIONS_400: 'pitch.errors.OPTIONS_400',
      BIDDER_404: 'pitch.errors.BIDDER_404',
      STATE_500_NO_TRUMP: "pitch.errors.STATE_500_NO_TRUMP",
      STATE_500_NO_TRICK_WINNER: "pitch.errors.STATE_500_NO_TRICK_WINNER",
      STATE_404_TEAM: "pitch.errors.STATE_404_TEAM",
      STATE_404_BIDDER: "pitch.errors.STATE_404_BIDDER",
      CALC_500_EXTRA_JACK: "pitch.errors.CALC_500_EXTRA_JACK",
      BID_400_LESS_THAN_2: 'pitch.errors.BID_400_LESS_THAN_2',
      BID_400_NOT_EXCEED_BID: 'pitch.errors.BID_400_NOT_EXCEED_BID',
      BID_400_EXCEED_4: 'pitch.errors.BID_400_EXCEED_4',
      BID_400_EXCEED_5: 'pitch.errors.BID_400_EXCEED_5',
      BID_400_NO_BID: 'pitch.errors.BID_400_NO_BID',
      BID_400_TOO_MANY_ATTEMPTS: 'pitch.errors.BID_400_TOO_MANY_ATTEMPTS',
      PLAY_400_NOT_FOLLOWING_SUIT: 'pitch.errors.PLAY_400_NOT_FOLLOWING_SUIT',
      PLAY_400_NOT_IN_HAND: 'pitch.errors.PLAY_400_NOT_IN_HAND',
      PLAY_400_INVALID_CARD: 'pitch.errors.PLAY_400_INVALID_CARD',
      PLAY_400_TOO_MANY_ATTEMPTS: 'pitch.errors.PLAY_400_TOO_MANY_ATTEMPTS',
      TRICK_500_NO_WINNER: "pitch.errors.TRICK_500_NO_WINNER",
    }
  },
  solitaire: {
    title: "solitaire.title",
    message_summary: "solitaire.message_summary",
    message_description: "solitaire.message_description",
    message_waitdescription: "solitaire.message_waitdescription",
    errors: {
      OPTIONS_400: "solitaire.errors.OPTIONS_400"
    }
  },
  spit: {
    title: "spit.title",
    message_summary: "spit.message_summary",
    message_description: "spit.message_description",
    message_waitdescription: "spit.message_waitdescription",
    errors: {
      OPTIONS_400: "spit.errors.OPTIONS_400"
    }
  },
  title: "title",
  title_game_over: "title_game_over",
  title_round_over: "title_round_over",
  title_trick_over: "title_trick_over",
  title_turn_for: "title_turn_for",
  title_error: "title_error",
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
  message_greeting: "message_greeting",
  message_subgreeting: "message_subgreeting",
  message_turn_for: "message_turn_for",
  message_bid_for: "message_bid_for",
  message_play_for: "message_play_for",
  message_trick_winner_for: "message_trick_winner_for",
  message_winner_for: "message_winner_for",
  message_error_of: "message_error_of",
  field_none: "field_none",
  field_card_text: "field_card_text",
  field_card_char: "field_card_char",
  errors: {
    ENUM_501: "errors.ENUM_501",
  },
  mapIntelligence: function(intelligence: PitchIntelligence): string {
    switch (intelligence) {
      case PitchIntelligence.ARTIFICIAL:
        return this.label_artificial;
      case PitchIntelligence.HUMAN:
        return this.label_human;
      default:
        throw new Error(this.pitch.errors.OPTIONS_400)
    }
  },
  mapCardRank: function(key: CardRankKey): string {
    switch (key) {
      case CardRankKey.ACE:
        return this.card.ACE;
      case CardRankKey.KING:
        return this.card.KING;
      case CardRankKey.QUEEN:
        return this.card.QUEEN;
      case CardRankKey.JACK:
        return this.card.JACK;
      case CardRankKey.TEN:
        return this.card.TEN;
      case CardRankKey.NINE:
        return this.card.NINE;
      case CardRankKey.EIGHT:
        return this.card.EIGHT;
      case CardRankKey.SEVEN:
        return this.card.SEVEN;
      case CardRankKey.SIX:
        return this.card.SIX;
      case CardRankKey.FIVE:
        return this.card.FIVE;
      case CardRankKey.FOUR:
        return this.card.FOUR;
      case CardRankKey.THREE:
        return this.card.THREE;
      case CardRankKey.TWO:
        return this.card.TWO;
      case CardRankKey.DEUCE:
        return this.card.DEUCE;
      case CardRankKey.ONE:
        return this.card.ONE;
      case CardRankKey.JOKER:
        return this.card.JOKER;
      case CardRankKey.OLD_MAID:
        return this.card.OLD_MAID;
      default:
        throw new Error(this.errors.ENUM_501);
    }
  },
  mapCardSuit: function(key: CardSuitKey, empty?: boolean): string {
    switch (key) {
      case CardSuitKey.CLUBS:
        return empty ? this.card.CLUBS_EMPTY : this.card.CLUBS;
      case CardSuitKey.DIAMONDS:
        return empty ? this.card.DIAMONDS_EMPTY : this.card.DIAMONDS;
      case CardSuitKey.HEARTS:
        return empty ? this.card.HEARTS_EMPTY : this.card.HEARTS;
      case CardSuitKey.SPADES:
        return empty ? this.card.SPADES_EMPTY : this.card.SPADES;
      default:
        throw new Error(this.errors.ENUM_501);
    }
  },
  mapCardColor: function(key: CardSuitColorKey): string {
    switch (key) {
      case CardSuitColorKey.BLACK:
        return this.card.BLACK;
      case CardSuitColorKey.RED:
        return this.card.RED;
      default:
        throw new Error(this.errors.ENUM_501);
    }
  },
  mapPitchBidValidation: function(key: PitchBidValidation): string {
    switch (key) {
      case PitchBidValidation.EXCEED_4:
        return this.pitch.errors.BID_400_EXCEED_4;
      case PitchBidValidation.EXCEED_5:
        return this.pitch.errors.BID_400_EXCEED_5;
      case PitchBidValidation.NOT_EXCEED_BID:
        return this.pitch.errors.BID_400_NOT_EXCEED_BID;
      case PitchBidValidation.LESS_THAN_2:
        return this.pitch.errors.BID_400_LESS_THAN_2;
      case PitchBidValidation.NO_BID:
        return this.pitch.errors.BID_400_NO_BID;
      case PitchBidValidation.TOO_MANY_ATTEMPTS:
        return this.pitch.errors.PLAY_400_TOO_MANY_ATTEMPTS;
      default:
        throw new Error(this.errors.ENUM_501);
    }
  },
  mapPitchPlayValidation: function(key: PitchPlayValidation): string {
    switch (key) {
      case PitchPlayValidation.INVALID_CARD:
        return this.pitch.errors.PLAY_400_INVALID_CARD;
      case PitchPlayValidation.NOT_FOLLOWING_SUIT:
        return this.pitch.errors.PLAY_400_NOT_FOLLOWING_SUIT;
      case PitchPlayValidation.NOT_IN_HAND:
        return this.pitch.errors.PLAY_400_NOT_IN_HAND;
      case PitchPlayValidation.TOO_MANY_ATTEMPTS:
        return this.pitch.errors.PLAY_400_TOO_MANY_ATTEMPTS;
      default:
        throw new Error(this.errors.ENUM_501);
    }
  }
} as DefineLocaleMessage & LocaleMessageMap;