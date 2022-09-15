import type { CutOptions, DealOptions, ShuffleOptions } from '../card/types';

type PitchOptions = {
    /* display verbose instructions to user */
    verbose: boolean,
    /* winning score for the game (11 or 21 is typical) */
    winningScore: number,
    /* count of bidders/players */
    bidderCount: number,
    /* count of teams */
    teamCount: number,
    /* allow players to bid 5. if they (or their team) have bid 5 and take all tricks that round, they score 5, regardless of collection */
    isBidFiveEnabled: boolean,
    /* if true, if all players skip their bid, the game is redealt */
    isBidNoneEnabled: boolean,
    /* if a player has the lead suit of the trick, they may still play trump */
    isAllowTrumpWhenCanFollowSuitEnabled: boolean,
    /* if true, in the case of a tied game score, each tied winner gets the score. otherwise there is no game score. */
    isScoreTiedGamePointsEnabled: boolean,
    shuffle: ShuffleOptions,
    deal: DealOptions,
    cut: CutOptions,
}

type PitchBidErrorKey = 'BID_400_LESS_THAN_2' | 'BID_400_NOT_EXCEED_BID' | 'BID_400_EXCEED_4' | 'BID_400_EXCEED_5' | 'BID_400_NO_BID';

type PitchPlayErrorKey = 'PLAY_400_NOT_FOLLOWING_SUIT' | 'PLAY_400_NOT_IN_HAND' | 'PLAY_400_INVALID_CARD';

export type {
    PitchOptions,
    PitchBidErrorKey,
    PitchPlayErrorKey,
}