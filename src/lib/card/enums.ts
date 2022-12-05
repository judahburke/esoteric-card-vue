enum CardSuitColorKey {
  NA,
  RED,
  BLACK,
}

enum CardRankKey {
  NA,
  ACE,
  ONE,
  DEUCE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN,
  JACK,
  QUEEN,
  KING,
  JOKER,
  OLD_MAID,
}

enum CardSuitKey {
  NA,
  SPADES,
  HEARTS,
  CLUBS,
  DIAMONDS,
}

enum CardErrorKey {
  DECK_500_EMPTY,
  CARD_404,
  TABLE_400_CUT,
  TABLE_404_NEXT,
  TABLE_404_NEXT_DEALT,
}

export { CardSuitColorKey, CardRankKey, CardSuitKey, CardErrorKey };
