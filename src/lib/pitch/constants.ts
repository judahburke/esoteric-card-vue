import type { PitchBidErrorKey, PitchOptions, PitchPlayErrorKey } from './types';

const pitchErrorKeys = {
    PITCH_501: 'pitch.error.PITCH_501',
    OPTIONS_400: 'pitch.error.OPTIONS_400',
    BIDDER_404: 'pitch.error.BIDDER_404',
    STATE_500_NO_TRUMP: "pitch.error.STATE_500_NO_TRUMP",
    STATE_500_NO_TRICK_WINNER: "pitch.error.STATE_500_NO_TRICK_WINNER",
    STATE_404_TEAM: "pitch.error.STATE_404_TEAM",
    STATE_404_BIDDER: "pitch.error.STATE_404_PLAYER",
    CALC_500_EXTRA_JACK: "pitch.error.CALC_500_EXTRA_JACK",
    BID_400_LESS_THAN_2: 'pitch.error.BID_400_LESS_THAN_2' as PitchBidErrorKey,
    BID_400_NOT_EXCEED_BID: 'pitch.error.BID_400_NOT_EXCEED_BID' as PitchBidErrorKey,
    BID_400_EXCEED_4: 'pitch.error.BID_400_EXCEED_4' as PitchBidErrorKey,
    BID_400_EXCEED_5: 'pitch.error.BID_400_EXCEED_5' as PitchBidErrorKey,
    BID_400_NO_BID: 'pitch.error.BID_400_NO_BID' as PitchBidErrorKey,
    BID_400_TOO_MANY_ATTEMPTS: 'pitch.error.BID_400_TOO_MANY_ATTEMPTS',
    PLAY_400_NOT_FOLLOWING_SUIT: 'pitch.error.PLAY_400_NOT_FOLLOWING_SUIT' as PitchPlayErrorKey,
    PLAY_400_NOT_IN_HAND: 'pitch.error.PLAY_400_NOT_IN_HAND' as PitchPlayErrorKey,
    PLAY_400_INVALID_CARD: 'pitch.error.PLAY_400_INVALID_CARD' as PitchPlayErrorKey,
    PLAY_400_TOO_MANY_ATTEMPTS: 'pitch.error.PLAY_400_TOO_MANY_ATTEMPTS',
    TRICK_500_NO_WINNER: "pitch.error.TRICK_500_NO_WINNER",
}

const pitchTextKeys = {
    error: {
        ...pitchErrorKeys
    }
}

const defaultPitchOptions: PitchOptions = {
    verbose: false,
    winningScore: 11,
    bidderCount: 2,
    teamCount: 0,
    isBidFiveEnabled: false,
    isBidNoneEnabled: false,
    isAllowTrumpWhenCanFollowSuitEnabled: false,
    isScoreTiedGamePointsEnabled: true,
    shuffle: {
        shuffleCount: 5
    },
    deal: {
        isDealerFirst: false,
        cardCount: 3
    },
    cut: {
        cutMinimum: 1,
    }
}

export {
    pitchErrorKeys,
    pitchTextKeys,
    defaultPitchOptions,
}