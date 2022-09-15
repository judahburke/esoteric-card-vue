import type { IntelligenceKey, CardRankKey, CardSuitColorKey, CardSuitKey, CutOptions, DealOptions, ShuffleOptions } from './types'

const cardRankKeys = {
    ACE: "card.ACE" as CardRankKey,
    ONE: "card.ONE" as CardRankKey,
    DEUCE: "card.DEUCE" as CardRankKey,
    TWO: "card.TWO" as CardRankKey,
    THREE: "card.THREE" as CardRankKey,
    FOUR: "card.FOUR" as CardRankKey,
    FIVE: "card.FIVE" as CardRankKey,
    SIX: "card.SIX" as CardRankKey,
    SEVEN: "card.SEVEN" as CardRankKey,
    EIGHT: "card.EIGHT" as CardRankKey,
    NINE: "card.NINE" as CardRankKey,
    TEN: "card.TEN" as CardRankKey,
    JACK: "card.JACK" as CardRankKey,
    QUEEN: "card.QUEEN" as CardRankKey,
    KING: "card.KING" as CardRankKey,
    JOKER: "card.JOKER" as CardRankKey,
    OLDMAID: "card.OLDMAID" as CardRankKey,
};

const cardSuitColorKeys = {
    RED: "card.RED" as CardSuitColorKey,
    BLACK: "card.BLACK" as CardSuitColorKey,
};

const cardSuitKeys = {
    SPADES: "card.SPADES" as CardSuitKey,
    HEARTS: "card.HEARTS" as CardSuitKey,
    CLUBS: "card.CLUBS" as CardSuitKey,
    DIAMONDS: "card.DIAMONDS" as CardSuitKey,
};

const cardIntelligenceKeys = {
    HUMAN: "card.HUMAN" as IntelligenceKey,
    ARTIFICIAL: "card.ARTIFICIAL" as IntelligenceKey
}

const cardErrorKeys = {
    DECK_500_EMPTY: "card.DECK_500_EMPTY",
    CARD_404: "card.CARD_404",
    TABLE_400_CUT: "card.TABLE_400_CUT",
    TABLE_404_NEXT: "card.TABLE_404_NEXT",
    TABLE_404_NEXT_DEALT: "card.TABLE_404_NEXT_DEALT",
}

const cardTextKeys = {
    ...cardRankKeys,
    ...cardSuitKeys,
    ...cardSuitColorKeys,
    ...cardIntelligenceKeys,
    error: {
        ...cardErrorKeys
    }
}

const defaultCutOptions: CutOptions = {
    cutMinimum: 1,
}

const defaultDealOptions: DealOptions = {
    cardCount: 1,
    isDealerFirst: false,
}

const defaultShuffleOptions: ShuffleOptions = {
    shuffleCount: 1,
}

export {
    cardRankKeys,
    cardSuitKeys,
    cardSuitColorKeys,
    cardIntelligenceKeys,
    cardErrorKeys,
    cardTextKeys,
    defaultCutOptions,
    defaultDealOptions,
    defaultShuffleOptions,
}