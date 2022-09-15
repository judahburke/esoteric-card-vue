type CardSuitColorKey = 'card.NA' | 'card.RED' | 'card.BLACK'

type CardRankKey = 'card.NA' | 'card.ACE' | 'card.ONE' | 'card.DEUCE' | 'card.TWO' | 'card.THREE' | 'card.FOUR' | 'card.FIVE' | 'card.SIX' | 'card.SEVEN' | 'card.EIGHT' | 'card.NINE' | 'card.TEN' | 'card.JACK' | 'card.QUEEN' | 'card.KING' | 'card.JOKER' | 'card.OLDMAID'

type CardSuitKey = 'card.NA' | 'card.SPADES' | 'card.HEARTS' | 'card.CLUBS' | 'card.DIAMONDS'

type IntelligenceKey = 'card.HUMAN' | 'card.ARTIFICIAL'

type CutOptions = {
    cutMinimum: number,
}

type DealOptions = {
    cardCount: number,
    isDealerFirst: boolean,
}

type ShuffleOptions = {
    shuffleCount: number,
}

export type {
    CardSuitColorKey,
    CardRankKey,
    CardSuitKey,
    IntelligenceKey,
    CutOptions,
    DealOptions,
    ShuffleOptions
}