enum PitchIntelligence {
    HUMAN,
    ARTIFICIAL
}

enum PitchBidValidation {
    LESS_THAN_2,
    NOT_EXCEED_BID,
    EXCEED_4,
    EXCEED_5,
    NO_BID,
    TOO_MANY_ATTEMPTS,
}

enum PitchPlayValidation {
    NOT_FOLLOWING_SUIT,
    NOT_IN_HAND,
    INVALID_CARD,
    TOO_MANY_ATTEMPTS,
}

export {
    PitchIntelligence,
    PitchBidValidation,
    PitchPlayValidation,
}