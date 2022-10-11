// /* eslint-disable */
// declare module '*.vue' {
//     import type { DefineComponent } from 'vue'
//     const component: DefineComponent<{}, {}, any>
//     export default component
//   }

/* https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition */
import {
    DefineLocaleMessage,
    // DefineDateTimeFormat,
    // DefineNumberFormat
} from 'vue-i18n'

declare module 'vue-i18n' {
    export interface DefineLocaleMessage {
        de_DE: string
        es_MX: string
        en_US: string
        vn_VN: string
        home: {
            title: string
        }
        about: {
            title: string
        }
        card: {
            ACE: string
            KING: string
            QUEEN: string
            JACK: string
            TEN: string
            NINE: string
            EIGHT: string
            SEVEN: string
            SIX: string
            FIVE: string
            FOUR: string
            THREE: string
            TWO: string
            DEUCE: string
            ONE: string
            JOKER: string
            OLD_MAID: string
            RED: string
            BLACK: string
            SPADES: string
            SPADES_EMPTY: string
            HEARTS: string
            HEARTS_EMPTY: string
            CLUBS: string
            CLUBS_EMPTY: string
            DIAMONDS: string
            DIAMONDS_EMPTY: string
            errors: {
                DECK_500_EMPTY: string
                CARD_404: string
                TABLE_400_CUT: string
                TABLE_404_NEXT: string
                TABLE_404_NEXT_DEALT: string
            }
        }
        pitch: {
            title: string
            title_configuration: string
            subtitle_configuration_bidders: string
            subtitle_configuration_teams: string
            subtitle_configuration_options: string
            message_summary: string
            errors: {
                BID_400_LESS_THAN_2: string
                BID_400_NOT_EXCEED_BID: string
                BID_400_EXCEED_4: string
                BID_400_EXCEED_5: string
                BID_400_NO_BID: string
                BID_400_TOO_MANY_ATTEMPTS: string
                PLAY_400_NOT_FOLLOWING_SUIT: string
                PLAY_400_NOT_IN_HAND: string
                PLAY_400_INVALID_CARD: string
                PLAY_400_TOO_MANY_ATTEMPTS: string
                PITCH_501: string
                OPTIONS_400: string
                BIDDER_404: string
                STATE_500_NO_TRUMP: string
                STATE_500_NO_TRICK_WINNER: string
                STATE_404_TEAM: string
                STATE_404_BIDDER: string
                CALC_500_EXTRA_JACK: string
                TRICK_500_NO_WINNER: string
            }
        }
        solitaire: {
            title: string
            message_summary: string
            message_description: string
            message_waitdescription: string
            errors: {
                OPTIONS_400: string
            }
        }
        spit: {
            title: string
            message_summary: string
            message_description: string
            message_waitdescription: string
            errors: {
                OPTIONS_400: string
            }
        }
        title_game_over: string
        title_round_over: string
        title_trick_over: string
        /** @params 0: bidder name */
        title_turn_for: string
        title_error: string
        label_locale: string
        label_artificial: string
        label_human: string
        label_option_verbose: string
        label_option_winning_score: string
        label_option_player_count: string
        label_option_team_count: string
        label_option_bid_5: string
        label_option_bid_all_skip: string
        label_option_play_trump_despite_lead: string
        label_option_score_tied_game: string
        label_option_shuffle_count: string
        label_option_cut_count_min: string
        label_exit_configuration: string
        label_bid_submit: string
        label_bid_skip: string
        label_play: string
        label_configure: string
        label_exit: string
        label_team: string
        label_value: string
        label_bid: string
        label_high: string
        label_low: string
        label_jack: string
        label_game: string
        label_total: string
        label_trump: string
        label_round: string
        label_netscore: string
        label_continue: string
        label_enabled: string
        label_disabled: string
        message_greeting: string
        message_subgreeting: string
        /** @params 0: bidder name */
        message_turn_for: string
        /** @params 0: bidder name */
        message_bid_for: string
        /** @params 0: bidder name */
        message_play_for: string
        /** @params 0: bidder name */
        message_trick_winner_for: string
        /** @params 0: team name */
        message_winner_for: string
        /** @params 0: error key */
        message_error_of: string
        field_none: string
        /** @params 0: rank, 1: suit */
        field_card_text: string
        /** @params 0: rank, 1: suit */
        field_card_char: string
        errors: {
            /** @params 0: enum */
            ENUM_501: string,
        }
    }
}