enum CardSuitColorKey {
  NA = "NA",
  RED = "RED",
  BLACK = "BLACK",
}

enum CardRankKey {
  NA = "NA",
  ACE = "ACE",
  ONE = "ONE",
  DEUCE = "DEUCE",
  TWO = "TWO",
  THREE = "THREE",
  FOUR = "FOUR",
  FIVE = "FIVE",
  SIX = "SIX",
  SEVEN = "SEVEN",
  EIGHT = "EIGHT",
  NINE = "NINE",
  TEN = "TEN",
  JACK = "JACK",
  QUEEN = "QUEEN",
  KING = "KING",
  JOKER = "JOKER",
  OLD_MAID = "OLD_MAID",
}

enum CardSuitKey {
  NA = "NA",
  SPADES = "SPADES",
  HEARTS = "HEARTS",
  CLUBS = "CLUBS",
  DIAMONDS = "DIAMONDS",
}

enum CardErrorKey {
  DECK_500_EMPTY = "DECK_500_EMPTY",
  CARD_404 = "CARD_404",
  TABLE_400_CUT = "TABLE_400_CUT",
  TABLE_404_NEXT = "TABLE_404_NEXT",
  TABLE_404_NEXT_DEALT = "TABLE_404_NEXT_DEALT",
}

export { CardSuitColorKey, CardRankKey, CardSuitKey, CardErrorKey };
