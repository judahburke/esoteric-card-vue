import type { LocaleKey } from "./types";
import { cardTextKeys } from "./card/constants";
import { pitchTextKeys, pitchErrorKeys } from "./pitch/constants";
import { solitaireTextKeys, solitaireErrorKeys } from "./solitaire/constants";
import { spitTextKeys, spitErrorKeys } from "./spit/constants";

const localeKeys = {
    en_US: 'en_US' as LocaleKey,
    es_MX: 'es_MX' as LocaleKey,
    vn_VN: 'vn_VN' as LocaleKey,
    de_DE: 'de_DE' as LocaleKey,
}

const textKeys = {
    ...localeKeys,
    card: {
        ...cardTextKeys,
    },
    pitch: { 
        title: 'pitch.title',
        title_configuration: 'pitch.title_configuration',
        subtitle_configuration_bidders: 'pitch.subtitle_configuration_bidders',
        subtitle_configuration_teams: 'pitch.subtitle_configuration_teams',
        subtitle_configuration_options: 'pitch.subtitle_configuration_options',
        message_summary: 'pitch.message_summary',
        ...pitchTextKeys
    },
    solitaire: { 
        title: 'solitaire.title',
        message_summary: 'solitaire.message_summary',
        message_description: 'solitaire.message_description',
        message_waitdescription: 'solitaire.message_waitdescription',
        ...solitaireTextKeys
    },
    spit: {
        title: 'spit.title',
        message_summary: 'spit.message_summary',
        message_description: 'spit.message_description',
        message_waitdescription: 'spit.message_waitdescription',
        ...spitTextKeys 
    },
    title_game_over: 'title_game_over',
    title_round_over: 'title_round_over',
    title_trick_over: 'title_trick_over',
    /** @params 0: bidder name */
    title_turn_for: 'title_turn_for',
    title_error: 'title_error',
    label_locale: 'label_locale',
    label_option_verbose: 'label_option_verbose',
    label_option_winning_score: 'label_option_winning_score',
    label_option_player_count: 'label_option_player_count',
    label_option_team_count: 'label_option_team_count',
    label_option_bid_5: 'label_option_bid_5',
    label_option_bid_all_skip: 'label_option_bid_all_skip',
    label_option_play_trump_despite_lead: 'label_option_play_trump_despite_lead',
    label_option_score_tied_game: 'label_option_score_tied_game',
    label_option_shuffle_count: 'label_option_shuffle_count',
    label_option_cut_count_min: 'label_option_cut_count_min',
    label_exit_configuration: 'label_exit_configuration',
    label_bid_submit: 'label_bid_submit',
    label_bid_skip: 'label_bid_skip',
    label_play: 'label_play',
    label_configure: 'label_configure',
    label_exit: 'label_exit',
    label_team: 'label_team',
    label_value: 'label_value',
    label_bid: 'label_bid',
    label_high: 'label_high',
    label_low: 'label_low',
    label_jack: 'label_jack',
    label_game: 'label_game',
    label_total: 'label_total',
    label_trump: 'label_trump',
    label_round: 'label_round',
    label_netscore: 'label_netscore',
    label_continue: 'label_continue',
    label_enabled: 'label_enabled',
    label_disabled: 'label_disabled',
    message_greeting: 'message_greeting',
    message_subgreeting: 'message_subgreeting',
    /** @params 0: bidder name */
    message_turn_for: 'message_turn_for',
    /** @params 0: bidder name */
    message_bid_for: 'message_bid_for',
    /** @params 0: bidder name */
    message_play_for: 'message_play_for',
    /** @params 0: bidder name */
    message_trick_winner_for: 'message_trick_winner_for',
    /** @params 0: team name */
    message_winner_for: 'message_winner_for',
    /** @params 0: error key */
    message_error_of: 'message_error_of',
    field_none: 'field_none',
    /** @params 0: rank, 1: suit */
    field_card_text: 'field_card_text',
    /** @params 0: rank, 1: suit */
    field_card_char: 'field_card_char'
}

const errorKeys = {
    ...pitchErrorKeys,
    ...solitaireErrorKeys,
    ...spitErrorKeys
}

export {
    localeKeys,
    textKeys,
    errorKeys
}