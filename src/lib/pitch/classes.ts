import {
  GenericDealer,
  GenericDeck,
  GenericTable,
  CardError,
} from "../card/classes";
import type { ICardRank, ICardSuit, ICard, IDeck } from "../card/interfaces";
import {
  CardRankKey,
  CardSuitKey,
  CardSuitColorKey,
  CardErrorKey,
} from "../card/enums";
import { defaultPitchOptions } from "./constants";
import type {
  IPitchAI,
  IPitchAIFactory,
  IPitchBid,
  IPitchBidder,
  IPitchCalculation,
  IPitchCalculator,
  IPitchCardFactory,
  IPitchDealer,
  IPitchPlay,
  IPitchRound,
  IPitchRoundCalculation,
  IPitchScoreboard,
  IPitchState,
  IPitchTable,
  IPitchTeam,
  IPitchTrick,
  IPitchScore,
  IPitchTeamScore,
} from "./interfaces";
import {
  PitchBidValidation,
  PitchPlayValidation,
  PitchIntelligence,
  PitchErrorKey,
} from "./enums";
import type { PitchOptions } from "./types";

class PitchError extends Error {
  constructor(key: PitchErrorKey) {
    super(key.toString());
    this.name = "PitchError";
    this.errorKey = key;
  }
  public readonly errorKey: PitchErrorKey;
}

class PitchCard implements ICard<PitchCardRank, PitchCardSuit, PitchCard> {
  public readonly rank: PitchCardRank;
  public readonly suit: PitchCardSuit;
  public compare(other: PitchCard): number {
    if (this.suit.compare(other.suit) === 0) {
      return this.rank.compare(other.rank);
    } else {
      return this.suit.compare(other.suit);
    }
  }
  public compareWeight(
    other: PitchCard,
    lead: PitchCardSuit,
    trump?: PitchCardSuit
  ): number {
    if (this.suit.compareWeight(other.suit, lead, trump) === 0) {
      return this.rank.compare(other.rank);
    } else {
      return this.suit.compareWeight(other.suit, lead, trump);
    }
  }
  public static groupBy<K extends keyof { [key: string]: PitchCard[] }>(
    cards: PitchCard[],
    keyFinder: (card: PitchCard) => K
  ) {
    return cards.reduce((cardsByKey, card) => {
      const key = keyFinder(card);
      if (!cardsByKey[key]) {
        cardsByKey[key] = [];
      }
      cardsByKey[key].push(card);
      return cardsByKey;
    }, {} as { [key: string]: PitchCard[] });
  }

  constructor(rank: PitchCardRank, suit: PitchCardSuit) {
    this.suit = suit;
    this.rank = rank;
  }
}

class PitchCardRank implements ICardRank<PitchCardRank> {
  public readonly key: CardRankKey;
  public readonly game: number;
  public readonly value: number;
  public compare(other: PitchCardRank): number {
    return this.value - other.value;
  }
  constructor(key: CardRankKey, game: number, value: number) {
    this.key = key;
    this.game = game;
    this.value = value;
  }
}

class PitchCardSuit implements ICardSuit<PitchCardSuit> {
  public readonly key: CardSuitKey;
  public get colorKey(): CardSuitColorKey {
    switch (this.key) {
      case CardSuitKey.CLUBS:
      case CardSuitKey.SPADES:
        return CardSuitColorKey.BLACK;
      case CardSuitKey.HEARTS:
      case CardSuitKey.DIAMONDS:
        return CardSuitColorKey.RED;
      default:
        return CardSuitColorKey.NA;
    }
  }
  public readonly value: number;
  public compare(other: PitchCardSuit): number {
    return this.value - other.value;
  }
  public compareWeight(
    other: PitchCardSuit,
    lead: PitchCardSuit,
    trump?: PitchCardSuit
  ): number {
    // same suit
    if (this.compare(other) === 0) {
      return 0;
      // this is trump suit
    } else if (trump && this.compare(trump) === 0) {
      return 1;
      // other is trump suit
    } else if (trump && other.compare(trump) === 0) {
      return -1;
      // this is lead suit
    } else if (this.compare(lead) === 0) {
      return 1;
      // other is lead suit
    } else if (other.compare(lead) === 0) {
      return -1;
      // not sure what you're comparing...
    } else {
      return 0;
    }
  }

  constructor(key: CardSuitKey, value: number) {
    this.key = key;
    this.value = value;
  }
}

class PitchCardFactory
  implements IPitchCardFactory<PitchCardRank, PitchCardSuit, PitchCard>
{
  public get clubs(): PitchCardSuit {
    return new PitchCardSuit(CardSuitKey.CLUBS, 1);
  }
  public get diamonds(): PitchCardSuit {
    return new PitchCardSuit(CardSuitKey.DIAMONDS, 2);
  }
  public get spades(): PitchCardSuit {
    return new PitchCardSuit(CardSuitKey.SPADES, 3);
  }
  public get hearts(): PitchCardSuit {
    return new PitchCardSuit(CardSuitKey.HEARTS, 4);
  }
  public get two(): PitchCardRank {
    return new PitchCardRank(CardRankKey.TWO, 0, 2);
  }
  public get three(): PitchCardRank {
    return new PitchCardRank(CardRankKey.THREE, 0, 3);
  }
  public get four(): PitchCardRank {
    return new PitchCardRank(CardRankKey.FOUR, 0, 4);
  }
  public get five(): PitchCardRank {
    return new PitchCardRank(CardRankKey.FIVE, 0, 5);
  }
  public get six(): PitchCardRank {
    return new PitchCardRank(CardRankKey.SIX, 0, 6);
  }
  public get seven(): PitchCardRank {
    return new PitchCardRank(CardRankKey.SEVEN, 0, 7);
  }
  public get eight(): PitchCardRank {
    return new PitchCardRank(CardRankKey.EIGHT, 0, 8);
  }
  public get nine(): PitchCardRank {
    return new PitchCardRank(CardRankKey.NINE, 0, 9);
  }
  public get ten(): PitchCardRank {
    return new PitchCardRank(CardRankKey.TEN, 10, 10);
  }
  public get jack(): PitchCardRank {
    return new PitchCardRank(CardRankKey.JACK, 1, 11);
  }
  public get queen(): PitchCardRank {
    return new PitchCardRank(CardRankKey.QUEEN, 2, 12);
  }
  public get king(): PitchCardRank {
    return new PitchCardRank(CardRankKey.KING, 3, 13);
  }
  public get ace(): PitchCardRank {
    return new PitchCardRank(CardRankKey.ACE, 4, 14);
  }
  public get ranks(): PitchCardRank[] {
    return [
      this.two,
      this.three,
      this.four,
      this.five,
      this.six,
      this.seven,
      this.eight,
      this.nine,
      this.ten,
      this.jack,
      this.queen,
      this.king,
      this.ace,
    ];
  }
  public get suits(): PitchCardSuit[] {
    return [this.clubs, this.diamonds, this.spades, this.hearts];
  }
  public get cards(): PitchCard[] {
    const c: PitchCard[] = [];
    this.suits.forEach((s) =>
      this.ranks.forEach((r) => c.push(new PitchCard(r, s)))
    );
    return c;
  }
}

class PitchDeck extends GenericDeck<PitchCardRank, PitchCardSuit, PitchCard> {}

class PitchTeam
  implements IPitchTeam<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam>
{
  public id: string;
  public cards: PitchCard[];
  public name: string;
  clearCards(): PitchCard[] {
    return this.cards.splice(0, this.cards.length);
  }
  compare(other: PitchTeam) {
    if (this.id === other.id) {
      return 0;
    } else {
      return this.name > other.name ? 1 : -1;
    }
  }

  constructor(name: string) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.cards = [];
  }
}

class PitchBidder
  implements
    IPitchBidder<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >
{
  constructor(
    name: string,
    team?: PitchTeam,
    intelligence?: PitchIntelligence
  ) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.team = team ?? new PitchTeam(name);
    this.intelligence = intelligence ?? PitchIntelligence.HUMAN;
    this.hand = [];
  }

  public id: string;
  public name: string;
  public team: PitchTeam;
  public intelligence: PitchIntelligence;
  public readonly hand: PitchCard[];
  public clearHand(): PitchCard[] {
    return this.hand.splice(0, this.hand.length);
  }
  reorderHand(): void {
    this.hand.sort((a, b) => -a.compare(b));
  }
  play(card: PitchCard): PitchCard | undefined {
    const index = this.hand.findIndex((c) => c.compare(card) === 0);
    if (index < 0) {
      throw new CardError(CardErrorKey.CARD_404);
    } else {
      return this.hand.splice(index, 1)[0];
    }
  }
  takeDeal(deal: PitchCard[]): void {
    deal.forEach((card) => this.hand.push(card));
  }
  takeTrick(trick: PitchCard[]): void {
    trick.forEach((card) => this.team.cards.push(card));
  }
  compare(other: PitchBidder) {
    if (this.id === other.id) {
      return 0;
    } else {
      return this.name > other.name ? 1 : -1;
    }
  }
}

class PitchTable
  extends GenericTable<PitchBidder>
  implements
    IPitchTable<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >
{
  public get teams(): PitchTeam[] {
    const teams: PitchTeam[] = [];
    for (const bidder of this.iterator()) {
      if (!teams.some((t) => t.compare(bidder.team) === 0)) {
        teams.push(bidder.team);
      }
    }
    return teams;
  }
  public get maxHandLength(): number {
    let max = 0;
    for (const bidder of this.iterator()) {
      max = Math.max(bidder.hand.length, max);
    }
    return max;
  }
}

class PitchTrick
  implements
    IPitchTrick<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >
{
  public readonly lead: PitchBidder;
  public readonly waste: IPitchPlay<
    PitchCardRank,
    PitchCardSuit,
    PitchCard,
    PitchTeam,
    PitchBidder
  >[] = [];
  public get leadSuit(): PitchCardSuit | undefined {
    if (this.waste.length < 1) {
      return undefined;
    } else {
      return this.waste[0].card.suit;
    }
  }
  public getWinningPlay(
    trumpSuit: PitchCardSuit
  ):
    | IPitchPlay<
        PitchCardRank,
        PitchCardSuit,
        PitchCard,
        PitchTeam,
        PitchBidder
      >
    | undefined {
    const leadSuit = this.leadSuit;
    if (leadSuit) {
      const sortedWaste = [...this.waste].sort(
        (a, b) => -a.card.compareWeight(b.card, leadSuit, trumpSuit)
      );
      console.debug("[pitch] PitchTrick.getWinner", sortedWaste);
      return sortedWaste[0];
    } else {
      return undefined;
    }
  }
  public static groupPlaysBy<
    K extends keyof {
      [key: string]: IPitchPlay<
        PitchCardRank,
        PitchCardSuit,
        PitchCard,
        PitchTeam,
        PitchBidder
      >[];
    }
  >(
    plays: IPitchPlay<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >[],
    keyFinder: (
      play: IPitchPlay<
        PitchCardRank,
        PitchCardSuit,
        PitchCard,
        PitchTeam,
        PitchBidder
      >
    ) => K
  ) {
    return plays.reduce((playsByKey, play) => {
      const key = keyFinder(play);
      if (!playsByKey[key]) {
        playsByKey[key] = [];
      }
      playsByKey[key].push(play);
      return playsByKey;
    }, {} as { [key: string]: IPitchPlay<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>[] });
  }

  public constructor(trickLeader: PitchBidder) {
    this.lead = trickLeader;
  }
}

class PitchRound
  implements
    IPitchRound<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >
{
  public leader: PitchBidder;
  public trump: PitchCardSuit | undefined;
  public bid:
    | IPitchBid<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>
    | undefined;
  public tricks: IPitchTrick<
    PitchCardRank,
    PitchCardSuit,
    PitchCard,
    PitchTeam,
    PitchBidder
  >[];
  public nextTrick(
    trickLeader: PitchBidder
  ): IPitchTrick<
    PitchCardRank,
    PitchCardSuit,
    PitchCard,
    PitchTeam,
    PitchBidder
  > {
    const trick = new PitchTrick(trickLeader);
    this.tricks.push(trick);
    return trick;
  }
  public constructor(roundLeader: PitchBidder) {
    this.leader = roundLeader;
    this.tricks = [];
  }
}

class PitchCalculator
  implements
    IPitchCalculator<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >
{
  public in(
    score: IPitchScore<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >
  ): number {
    return score.high + score.low + score.jack + score.game;
  }
  public net(
    score: IPitchScore<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >
  ): number {
    const sum = this.in(score);
    return sum < score.bid ? -score.bid : sum;
  }
  public game(cards: PitchCard[]): number {
    let sum = 0;
    cards.forEach((c) => (sum += c.rank.game));
    return sum;
  }
  public score(
    team: PitchTeam,
    calculation: IPitchRoundCalculation<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >,
    options: PitchOptions
  ): IPitchScore<
    PitchCardRank,
    PitchCardSuit,
    PitchCard,
    PitchTeam,
    PitchBidder
  > {
    return {
      calculation: calculation,
      bid:
        calculation.greatestBid &&
        calculation.greatestBid.team.compare(team) === 0
          ? calculation.greatestBid.value
          : 0,
      high:
        calculation.highestTrump &&
        calculation.highestTrump.team.compare(team) === 0
          ? 1
          : 0,
      low:
        calculation.lowestTrump &&
        calculation.lowestTrump.team.compare(team) === 0
          ? 1
          : 0,
      jack:
        calculation.jackiestTrump &&
        calculation.jackiestTrump.team.compare(team) === 0
          ? 1
          : 0,
      game:
        calculation.greatestGame &&
        (calculation.greatestGame.teams.length < 2 ||
          options.isScoreTiedGamePointsEnabled) &&
        calculation.greatestGame.teams.some(
          (winningTeam) => winningTeam.compare(team) === 0
        )
          ? 1
          : 0,
    };
  }
  public calculate(
    cards: PitchCard[],
    trump: PitchCardSuit
  ): IPitchCalculation<PitchCardRank, PitchCardSuit, PitchCard> {
    const calc: IPitchCalculation<PitchCardRank, PitchCardSuit, PitchCard> = {
      totalGame: 0,
      lowestTrump: undefined,
      highestTrump: undefined,
      jackiestTrump: undefined,
    };
    const jack = this._factory.jack;

    cards.forEach((card) => {
      calc.totalGame += card.rank.game;
      if (card.suit.compare(trump) === 0) {
        if (!calc.jackiestTrump && card.rank.compare(jack) === 0) {
          calc.jackiestTrump = card;
        }
        if (
          !calc.lowestTrump ||
          card.rank.compare(calc.lowestTrump!.rank) < 0
        ) {
          calc.lowestTrump = card;
        }
        if (
          !calc.highestTrump ||
          card.rank.compare(calc.highestTrump!.rank) > 0
        ) {
          calc.highestTrump = card;
        }
      }
    });

    return calc;
  }
  public calculateRound(
    round: IPitchRound<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >,
    table: IPitchTable<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >
  ):
    | IPitchRoundCalculation<
        PitchCardRank,
        PitchCardSuit,
        PitchCard,
        PitchTeam,
        PitchBidder
      >
    | undefined {
    // no winner if the game hasn't started or if all tricks haven't started
    if (!round.trump || !round.bid || round.tricks.length < 6) {
      console.debug(
        "[pitch] PitchCalculator.calculateRound (no trump, no bid or not 6 tricks)",
        round.trump,
        round.bid,
        round.tricks.length
      );
      return undefined;
    }
    // no winner if not all players have played in all tricks
    if (
      round.tricks
        .filter((_, i) => i < 6)
        .some((t) => t.waste.length < table.length)
    ) {
      console.debug(
        "[pitch] PitchCalculator.calculateRound (some trick has less cards than players)",
        round.tricks.map((t) => t.waste.length),
        table.length
      );
      return undefined;
    }

    // response
    const roundCalc: IPitchRoundCalculation<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    > = {
      greatestBid: { team: round.bid.bidder.team, value: round.bid.bid },
      greatestGame: undefined,
      highestTrump: undefined,
      lowestTrump: undefined,
      jackiestTrump: undefined,
    };
    // get teams
    const teams = table.teams;
    // get calculations by team.id
    const calculationsById = teams.reduce((calcsByKey, team) => {
      calcsByKey[team.id] = this.calculate(team.cards, round.trump!);
      return calcsByKey;
    }, {} as { [key: string]: IPitchCalculation<PitchCardRank, PitchCardSuit, PitchCard> });
    console.debug(
      "[pitch] PitchCalculator.calculateRound calculationsById",
      calculationsById
    );
    // set best scores
    teams.forEach((team) => {
      const calc = calculationsById[team.id];
      // record game
      if (
        !roundCalc.greatestGame ||
        roundCalc.greatestGame.value < calc.totalGame
      ) {
        roundCalc.greatestGame = { teams: [team], value: calc.totalGame };
      } else if (roundCalc.greatestGame.value === calc.totalGame) {
        roundCalc.greatestGame.teams.push(team);
      }
      // record high
      if (
        calc.highestTrump &&
        (!roundCalc.highestTrump ||
          roundCalc.highestTrump.value.compare(calc.highestTrump) < 0)
      ) {
        roundCalc.highestTrump = { team: team, value: calc.highestTrump };
      }
      // record low
      if (
        calc.lowestTrump &&
        (!roundCalc.lowestTrump ||
          roundCalc.lowestTrump.value.compare(calc.lowestTrump) > 0)
      ) {
        roundCalc.lowestTrump = { team: team, value: calc.lowestTrump! };
      }
      // record jack
      if (calc.jackiestTrump) {
        if (roundCalc.jackiestTrump) {
          throw new PitchError(PitchErrorKey.CALC_500_EXTRA_JACK);
        }
        roundCalc.jackiestTrump = { team: team, value: calc.jackiestTrump };
      }
    });
    console.debug(
      "[pitch] PitchCalculator.calculateRound found roundCalc",
      roundCalc
    );

    return roundCalc;
  }

  constructor(factory: PitchCardFactory) {
    this._factory = factory;
  }
  private _factory: PitchCardFactory;
}

type PitchScoreboardItem = {
  team: PitchTeam;
  scores: IPitchScore<
    PitchCardRank,
    PitchCardSuit,
    PitchCard,
    PitchTeam,
    PitchBidder
  >[];
};
class PitchScoreboard
  implements
    IPitchScoreboard<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >
{
  getScoresForTeam(
    team: PitchTeam
  ): IPitchScore<
    PitchCardRank,
    PitchCardSuit,
    PitchCard,
    PitchTeam,
    PitchBidder
  >[] {
    return (
      this._scores.find((trs) => trs.team.compare(team) === 0)?.scores ?? []
    );
  }
  getScoresForRound(
    index: number
  ): IPitchTeamScore<
    PitchCardRank,
    PitchCardSuit,
    PitchCard,
    PitchTeam,
    PitchBidder
  >[] {
    if (this._scores.some((s) => s.scores.length <= index)) {
      return [];
    }
    return this._scores.map((s) => {
      return {
        team: s.team,
        score: s.scores[index],
      };
    });
  }
  getScoreForTeamAndRound(
    team: PitchTeam,
    index: number
  ):
    | IPitchScore<
        PitchCardRank,
        PitchCardSuit,
        PitchCard,
        PitchTeam,
        PitchBidder
      >
    | undefined {
    const scores = this.getScoresForTeam(team);
    return index < scores.length ? scores[index] : undefined;
  }
  getScoreTotal(team: PitchTeam): number {
    let sum = 0;
    this.getScoresForTeam(team).forEach(
      (score) => (sum += this._calculator.net(score))
    );
    return sum;
  }
  getWinner(options?: PitchOptions | undefined): PitchTeam | undefined {
    if (!options) {
      options = defaultPitchOptions;
    }
    const winners = this._scores
      .filter((trs) => this.getScoreTotal(trs.team) >= options!.winningScore)
      .sort((trsa, trsb) => trsb.scores[trsb.scores.length].bid - trsa.scores[trsa.scores.length - 1].bid);
    if (winners.length > 0) {
      return winners[winners.length - 1].team;
    } else {
      return undefined;
    }
  }
  pushScores(
    calculation: IPitchRoundCalculation<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >,
    options?: PitchOptions | undefined
  ): void {
    if (!options) {
      options = defaultPitchOptions;
    }

    if (calculation) {
      this._scores.forEach((i) => {
        i.scores.push(this._calculator.score(i.team, calculation, options!));
      });
    }
  }
  clear(): void {
    this._scores.forEach((i) => {
      i.scores.splice(0, i.scores.length);
    });
  }

  constructor(
    teams: PitchTeam[],
    calculator: IPitchCalculator<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >
  ) {
    this._scores = teams.map((team) => {
      return {
        team: team,
        scores: [],
      };
    });
    this._calculator = calculator;
  }
  private _scores: PitchScoreboardItem[];
  private _calculator: IPitchCalculator<
    PitchCardRank,
    PitchCardSuit,
    PitchCard,
    PitchTeam,
    PitchBidder
  >;
}

class PitchState
  implements
    IPitchState<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >
{
  private _deck: IDeck<PitchCardRank, PitchCardSuit, PitchCard>;
  private _rounds: IPitchRound<
    PitchCardRank,
    PitchCardSuit,
    PitchCard,
    PitchTeam,
    PitchBidder
  >[];

  public readonly options: PitchOptions;
  public readonly factory: IPitchCardFactory<
    PitchCardRank,
    PitchCardSuit,
    PitchCard
  >;
  public get deck(): IDeck<PitchCardRank, PitchCardSuit, PitchCard> {
    return this._deck;
  }
  public readonly table: IPitchTable<
    PitchCardRank,
    PitchCardSuit,
    PitchCard,
    PitchTeam,
    PitchBidder
  >;
  public get rounds(): IPitchRound<
    PitchCardRank,
    PitchCardSuit,
    PitchCard,
    PitchTeam,
    PitchBidder
  >[] {
    return this._rounds;
  }
  public readonly calculator: IPitchCalculator<
    PitchCardRank,
    PitchCardSuit,
    PitchCard,
    PitchTeam,
    PitchBidder
  >;
  public readonly scoreboard: IPitchScoreboard<
    PitchCardRank,
    PitchCardSuit,
    PitchCard,
    PitchTeam,
    PitchBidder
  >;
  public showCards: boolean;

  constructor(
    table: IPitchTable<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >,
    options?: PitchOptions,
    factory?: IPitchCardFactory<PitchCardRank, PitchCardSuit, PitchCard>,
    calculator?: IPitchCalculator<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >,
    deck?: IDeck<PitchCardRank, PitchCardSuit, PitchCard>,
    scoreboard?: IPitchScoreboard<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >,
    rounds?: IPitchRound<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >[],
    showCards?: boolean
  ) {
    this.table = table;
    this.options = options ?? defaultPitchOptions;
    this.factory = factory ?? new PitchCardFactory();
    this.calculator = calculator ?? new PitchCalculator(this.factory);
    this.scoreboard =
      scoreboard ?? new PitchScoreboard(this.table.teams, this.calculator);
    this._deck = deck ?? new PitchDeck(this.factory);
    this._rounds = rounds ?? [];
    this.showCards = showCards ?? false;
  }
}

class PitchDealer
  extends GenericDealer<PitchCardRank, PitchCardSuit, PitchCard>
  implements
    IPitchDealer<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >
{
  public async playPitch(
    state: IPitchState<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >,
    callbackShowCards: (
      state: IPitchState<
        PitchCardRank,
        PitchCardSuit,
        PitchCard,
        PitchTeam,
        PitchBidder
      >,
      bidder: PitchBidder
    ) => Promise<boolean>,
    callbackBid: (
      state: IPitchState<
        PitchCardRank,
        PitchCardSuit,
        PitchCard,
        PitchTeam,
        PitchBidder
      >,
      bidder: PitchBidder,
      validation?: PitchBidValidation
    ) => Promise<
      IPitchBid<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>
    >,
    callbackSelectCard: (
      state: IPitchState<
        PitchCardRank,
        PitchCardSuit,
        PitchCard,
        PitchTeam,
        PitchBidder
      >,
      bidder: PitchBidder,
      validation?: PitchPlayValidation
    ) => Promise<PitchCard>,
    callbackShowTrickResult: (
      state: IPitchState<
        PitchCardRank,
        PitchCardSuit,
        PitchCard,
        PitchTeam,
        PitchBidder
      >,
      winner: IPitchPlay<
        PitchCardRank,
        PitchCardSuit,
        PitchCard,
        PitchTeam,
        PitchBidder
      >
    ) => Promise<void>,
    callbackShowRoundResult: (
      state: IPitchState<
        PitchCardRank,
        PitchCardSuit,
        PitchCard,
        PitchTeam,
        PitchBidder
      >,
      calculation: IPitchRoundCalculation<
        PitchCardRank,
        PitchCardSuit,
        PitchCard,
        PitchTeam,
        PitchBidder
      >
    ) => Promise<void>,
    callbackShowPitchResult: (
      state: IPitchState<
        PitchCardRank,
        PitchCardSuit,
        PitchCard,
        PitchTeam,
        PitchBidder
      >,
      winner: PitchTeam
    ) => Promise<void>,
    callbackRefresh: (
      state: IPitchState<
        PitchCardRank,
        PitchCardSuit,
        PitchCard,
        PitchTeam,
        PitchBidder
      >,
      message?: string
    ) => Promise<void>
  ): Promise<
    IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>
  > {
    let winningTeam: PitchTeam | undefined;
    this.clearState(state);

    for (
      let round = this.nextRound(state);
      !winningTeam;
      round = this.nextRound(state)
    ) {
      state = await this.dealHands(state, callbackRefresh);

      const nextDealer = state.table.peekNextDealer();

      state = await this.takeBids(
        state,
        callbackShowCards,
        callbackBid,
        callbackRefresh
      );

      console.debug("[pitch] PitchDealer.playPitch (round.bid)", round.bid);

      if (!round.bid) {
        continue;
      }

      state.table.setNextLeader(round.bid.bidder);

      for (
        let trick = round.nextTrick(state.table.leader);
        state.table.maxHandLength > 0;
        trick = round.nextTrick(state.table.leader)
      ) {
        state = await this.takePlays(
          state,
          callbackShowCards,
          callbackSelectCard,
          callbackRefresh
        );

        console.debug(
          "[pitch] PitchDealer.playPitch (round.trump)",
          round.trump
        );

        if (round.trump) {
          const winningPlay = trick.getWinningPlay(round.trump);

          console.debug(
            "[pitch] PitchDealer.playPitch (trick.getWinningPlay)",
            winningPlay
          );

          if (winningPlay) {
            await callbackShowTrickResult(state, winningPlay);

            state.table.setNextLeader(winningPlay.bidder);
          } else {
            throw new PitchError(PitchErrorKey.STATE_500_NO_TRICK_WINNER);
          }
        } else {
          throw new PitchError(PitchErrorKey.STATE_500_NO_TRUMP);
        }
      }

      state = await this.pushScores(
        state,
        callbackShowRoundResult,
        callbackRefresh
      );

      state.table.setNextDealer(nextDealer);

      winningTeam = state.scoreboard.getWinner(state.options);

      console.debug(
        "[pitch] PitchDealer.playPitch (state.scoreboard.getWinner)",
        winningTeam
      );
    }

    await callbackShowPitchResult(state, winningTeam!);

    return state;
  }
  public async dealHands(
    state: IPitchState<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >,
    callbackRefresh: (
      state: IPitchState<
        PitchCardRank,
        PitchCardSuit,
        PitchCard,
        PitchTeam,
        PitchBidder
      >,
      message?: string
    ) => Promise<void>
  ): Promise<
    IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>
  > {
    this.clearCards(state);
    state.deck.shuffle(undefined, state.options.shuffle);

    for (const _ of [1, 2]) {
      for (const bidder of state.table.iterator()) {
        const a = state.deck.pop();
        const b = state.deck.pop();
        const c = state.deck.pop();
        if (a && b && c) {
          bidder.takeDeal([a, b, c]);
          bidder.reorderHand();
          await callbackRefresh(state);
        } else {
          throw new CardError(CardErrorKey.DECK_500_EMPTY);
        }
      }
    }

    return state;
  }
  public async takeBids(
    state: IPitchState<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >,
    callbackShowCards: (
      state: IPitchState<
        PitchCardRank,
        PitchCardSuit,
        PitchCard,
        PitchTeam,
        PitchBidder
      >,
      bidder: PitchBidder
    ) => Promise<boolean>,
    callbackBid: (
      state: IPitchState<
        PitchCardRank,
        PitchCardSuit,
        PitchCard,
        PitchTeam,
        PitchBidder
      >,
      bidder: PitchBidder,
      validation?: PitchBidValidation
    ) => Promise<
      IPitchBid<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>
    >,
    callbackRefresh: (
      state: IPitchState<
        PitchCardRank,
        PitchCardSuit,
        PitchCard,
        PitchTeam,
        PitchBidder
      >,
      message?: string
    ) => Promise<void>
  ): Promise<
    IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>
  > {
    const round = state.rounds[state.rounds.length - 1];

    for (const bidder of state.table.iterator()) {
      state.showCards = await callbackShowCards(state, bidder);

      await callbackRefresh(state);

      let bid = await callbackBid(state, bidder);

      let attempt = 0;

      for (
        let reason = this.validateBid(state, bid);
        reason != PitchBidValidation.VALID;
        reason = this.validateBid(state, bid)
      ) {
        await callbackRefresh(state);

        if (attempt++ > 10) {
          throw new PitchError(PitchErrorKey.PLAY_400_TOO_MANY_ATTEMPTS);
        }

        console.debug(
          "[pitch] PitchDealer.takeBids (attempt, reason, bid)",
          attempt++,
          reason,
          bid
        );

        bid = await callbackBid(state, bidder, reason);
      }

      console.debug("[pitch] PitchDealer.takeBids (bid)", bid);

      if (!bid.skip) {
        round.bid = bid;
      }

      console.debug("[pitch] PitchDealer.takeBids (round.bid)", round.bid);

      state.showCards = false;

      await callbackRefresh(state);
    }

    if (round.bid) {
      state.table.setNextLeader(round.bid?.bidder);
    }

    return state;
  }
  public async takePlays(
    state: IPitchState<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >,
    callbackShowCards: (
      state: IPitchState<
        PitchCardRank,
        PitchCardSuit,
        PitchCard,
        PitchTeam,
        PitchBidder
      >,
      bidder: PitchBidder
    ) => Promise<boolean>,
    callbackSelectCard: (
      state: IPitchState<
        PitchCardRank,
        PitchCardSuit,
        PitchCard,
        PitchTeam,
        PitchBidder
      >,
      bidder: PitchBidder,
      validation?: PitchPlayValidation
    ) => Promise<PitchCard>,
    callbackRefresh: (
      state: IPitchState<
        PitchCardRank,
        PitchCardSuit,
        PitchCard,
        PitchTeam,
        PitchBidder
      >,
      message?: string
    ) => Promise<void>
  ): Promise<
    IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>
  > {
    const round = state.rounds[state.rounds.length - 1];
    const trick = round.tricks[round.tricks.length - 1];

    for (const bidder of state.table.iterator()) {
      state.showCards = await callbackShowCards(state, bidder);

      await callbackRefresh(state, "showing cards to bidder...");

      let selectedCard = await callbackSelectCard(state, bidder);

      let attempt = 0;

      for (
        let reason = this.validatePlay(state, { bidder, card: selectedCard });
        reason != PitchPlayValidation.VALID;
        reason = this.validatePlay(state, { bidder, card: selectedCard })
      ) {
        await callbackRefresh(state, "validation result... " + reason);

        if (attempt++ > 10) {
          throw new PitchError(PitchErrorKey.PLAY_400_TOO_MANY_ATTEMPTS);
        }

        console.debug(
          "[pitch] PitchDealer.takePlays (attempt, reason, selectedCard)",
          attempt,
          reason,
          selectedCard
        );

        selectedCard = await callbackSelectCard(state, bidder, reason);
      }

      console.debug(
        "[pitch] PitchDealer.takePlays (selectedCard)",
        selectedCard
      );

      const playedCard = bidder.play(selectedCard);

      console.debug("[pitch] PitchDealer.takePlays (playedCard)", playedCard);

      await callbackRefresh(state, "card taken from bidder hand...");

      if (!playedCard) {
        throw new CardError(CardErrorKey.CARD_404);
      }

      round.trump = round.trump ?? playedCard.suit;

      console.debug("[pitch] PitchDealer.takePlays (round.trump)", round.trump);

      trick.waste.push({ bidder, card: playedCard });

      state.showCards = false;

      await callbackRefresh(state, "card placed in waste...");
    }

    if (!round.trump) {
      throw new PitchError(PitchErrorKey.STATE_500_NO_TRUMP);
    }

    const trickWinner = trick.getWinningPlay(round.trump);

    if (!trickWinner) {
      throw new PitchError(PitchErrorKey.TRICK_500_NO_WINNER);
    }

    trickWinner.bidder.team.cards.push(...trick.waste.map((w) => w.card));

    state.table.setNextLeader(trickWinner.bidder);

    await callbackRefresh(
      state,
      "trick completed with winner as next leader..."
    );

    return state;
  }
  public async pushScores(
    state: IPitchState<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >,
    callbackShowRoundCalc: (
      state: IPitchState<
        PitchCardRank,
        PitchCardSuit,
        PitchCard,
        PitchTeam,
        PitchBidder
      >,
      calculation: IPitchRoundCalculation<
        PitchCardRank,
        PitchCardSuit,
        PitchCard,
        PitchTeam,
        PitchBidder
      >
    ) => Promise<void>,
    callbackRefresh: (
      state: IPitchState<
        PitchCardRank,
        PitchCardSuit,
        PitchCard,
        PitchTeam,
        PitchBidder
      >,
      message?: string
    ) => Promise<void>
  ): Promise<
    IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>
  > {
    const round = state.rounds[state.rounds.length - 1];

    console.debug(
      "[pitch] PitchDealer.pushScores (calculating)",
      round,
      state.table
    );

    const calculation = state.calculator.calculateRound(round, state.table);

    console.debug("[pitch] PitchDealer.pushScores (calculation)", calculation);

    if (calculation) {
      state.scoreboard.pushScores(calculation, state.options);

      await callbackRefresh(state);

      await callbackShowRoundCalc(state, calculation);
    }

    await callbackRefresh(state);

    return state;
  }

  private nextRound(
    state: IPitchState<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >
  ): IPitchRound<
    PitchCardRank,
    PitchCardSuit,
    PitchCard,
    PitchTeam,
    PitchBidder
  > {
    const round = new PitchRound(state.table.leader);
    state.rounds.push(round);
    return round;
  }
  private clearCards(
    state: IPitchState<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >
  ): void {
    const cards: PitchCard[] = [];
    // remove any cards from hands
    for (const bidr of state.table.iterator()) {
      cards.push(...bidr.clearHand());
      if (bidr.team.cards.length > 0) {
        cards.push(...bidr.team.clearCards());
      }
    }
    if (cards.length + state.deck.length !== 52) {
      console.warn(
        "[pitch] someone stole a card... " +
          `${state.deck.length} cards in deck, ` +
          `${cards.length} cards from players and teams...`,
        cards
      );
    }
    // get a new deck (no cheating!)
    state.deck.init(state.factory);
  }
  private clearState(
    state: IPitchState<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >
  ): void {
    this.clearCards(state);
    state.scoreboard.clear();
    state.rounds.splice(0);
    state.showCards = false;
  }
  private validateBid(
    state: IPitchState<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >,
    bid: IPitchBid<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >
  ): PitchBidValidation {
    const round = state.rounds[state.rounds.length - 1];
    // bidder skips their turn
    if (bid.skip) {
      // if all turns may be skipped, no error
      if (state.options.isBidNoneEnabled) {
        return PitchBidValidation.VALID;
      }
      // otherwise, if this is the last bidder, the bidder must bid
      else if (
        Array.from(state.table.iterator())[state.table.length - 1].compare(
          bid.bidder
        ) === 0 &&
        !round.bid
      ) {
        return PitchBidValidation.NO_BID;
      }
    }
    // bidder is never allowed to bid more than five
    else if (state.options.isBidFiveEnabled && bid.bid > 5) {
      return PitchBidValidation.EXCEED_5;
    }
    // unless bust is enabled, player may not bid more than four
    else if (bid.bid > 4) {
      return PitchBidValidation.EXCEED_4;
    }
    // bidder may never bid less than two
    else if (bid.bid < 2) {
      return PitchBidValidation.LESS_THAN_2;
    }
    // if a bid exists, bidder must exceed bid
    else if (round.bid && bid.bid <= round.bid.bid) {
      return PitchBidValidation.NOT_EXCEED_BID;
    }
    // no error found
    return PitchBidValidation.VALID;
  }
  private validatePlay(
    state: IPitchState<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >,
    play: IPitchPlay<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >
  ): PitchPlayValidation {
    const round = state.rounds[state.rounds.length - 1];
    const trick = round.tricks[round.tricks.length - 1];
    // bidder must have card
    if (!play.bidder.hand.some((c) => c.compare(play.card) === 0)) {
      return PitchPlayValidation.NOT_IN_HAND;
    }
    // if trump is allowed to bypass following lead suit, then there are no more rules to follow
    if (
      state.options.isAllowTrumpWhenCanFollowSuitEnabled &&
      round.trump &&
      play.card.suit.compare(round.trump) === 0
    ) {
      return PitchPlayValidation.VALID;
    }
    // if lead suit is played, bidder must follow suit if they have it
    if (
      trick.leadSuit &&
      play.card.suit.compare(trick.leadSuit) !== 0 &&
      play.bidder.hand.some((c) => c.suit.compare(trick.leadSuit!) === 0)
    ) {
      return PitchPlayValidation.NOT_FOLLOWING_SUIT;
    }
    // player must play the leading suit of the trick
    return PitchPlayValidation.VALID;
  }
  private async retry<T>(
    max: number,
    promise: Promise<T>,
    handle?: (reason: any) => void
  ): Promise<T> {
    return await promise.catch(async (reason) => {
      if (max <= 0) {
        throw reason;
      } else if (handle) {
        handle(reason);
      }
      return await this.retry(max - 1, promise);
    });
  }
}

class PitchAIBaby
  implements
    IPitchAI<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>
{
  public decideBid(
    bidder: PitchBidder,
    state: IPitchState<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >
  ): IPitchBid<
    PitchCardRank,
    PitchCardSuit,
    PitchCard,
    PitchTeam,
    PitchBidder
  > {
    const round = state.rounds[state.rounds.length - 1];
    const currentBid = round.bid?.bid ?? 1;

    console.debug("[pitch] PitchAIBaby.decideBid", currentBid, bidder);

    const worth = this.decideWorthBySuit(bidder.hand, state.factory);

    console.debug("[pitch] PitchAIBaby.decideBid", worth);

    // no bid or bid less than a potential suit's worth
    if (worth.some((w) => w.worth > currentBid)) {
      console.log(
        "[pitch] PitchAIBaby.decideBid, AI is bidding",
        currentBid + 1
      );
      return { bid: currentBid + 1, bidder: bidder, skip: false };
    } else if (
      state.table.last.compare(bidder) === 0 &&
      currentBid < 2 &&
      !state.options.isBidNoneEnabled
    ) {
      console.log("[pitch] PitchAIBaby.decideBid, AI is forced to bid...");
      return { bid: 2, bidder: bidder, skip: false };
    } else {
      console.log("[pitch] PitchAIBaby.decideBid, AI is skipping...");
      return { bid: 0, bidder: bidder, skip: true };
    }
  }
  public decidePlay(
    bidder: PitchBidder,
    state: IPitchState<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >
  ): PitchCard {
    const round = state.rounds[state.rounds.length - 1];
    const trick = round.tricks[round.tricks.length - 1];
    const hand = [...bidder.hand];

    console.debug(
      "[pitch] PitchAIBaby.decidePlay (bidder, hand)",
      bidder,
      hand
    );

    const trump =
      round.trump ??
      // bidder is deciding trump
      this.decideWorthBySuit(hand, state.factory).sort((a,b) => b.worth - a.worth)[0].suit;

    console.debug(
      "[pitch] PitchAIBaby.decidePlay (given trump, desired trump, lead suit)",
      round.trump,
      trump,
      trick.leadSuit
    );

    const leadSuit =
      trick.leadSuit ??
      (round.trump
        ? // bidder is leading
          trump
        : // bidder is leading, and deciding trump
          trump);

    const sortedHand = hand.sort(
      (a, b) =>
        -a.compareWeight(
          b,
          leadSuit,
          state.options.isAllowTrumpWhenCanFollowSuitEnabled ? trump : undefined
        )
    );

    console.debug(
      "[pitch] PitchAIBaby.decidePlay (lead, sorted)",
      leadSuit,
      sortedHand
    );

    return sortedHand[0];
  }

  private decideWorthBySuit(
    hand: PitchCard[],
    factory: IPitchCardFactory<PitchCardRank, PitchCardSuit, PitchCard>
  ): { suit: PitchCardSuit; worth: number }[] {
    //const ten = factory.ten;
    const jack = factory.jack;
    const queen = factory.queen;
    const king = factory.king;
    const ace = factory.ace;
    const handSuits = [...new Set(hand.map((x) => x.suit))];
    //const handByRank = PitchCard.groupBy(hand, (c) => c.rank.key);
    const handBySuit = PitchCard.groupBy(hand, (c) => c.suit.key);
    const handByRankSuit = PitchCard.groupBy(
      hand,
      (c) => c.rank.key.toString() + c.suit.key.toString()
    );
    return handSuits.map((suit) => {
      const s = handBySuit[suit.key]?.length ?? 0;
      const j =
        handByRankSuit[jack.key.toString() + suit.key.toString()]?.length ?? 0;
      const q =
        handByRankSuit[queen.key.toString() + suit.key.toString()]?.length ?? 0;
      const k =
        handByRankSuit[king.key.toString() + suit.key.toString()]?.length ?? 0;
      const a =
        handByRankSuit[ace.key.toString() + suit.key.toString()]?.length ?? 0;

      // (six cards of the suit with an ace, king and queen)
      if (a > 0 && k > 0 && q > 0 && s > 5) {
        return { suit, worth: 5 };
      }
      // (four+ cards of the suit with a jack and a king and or ace)
      if (j > 0 && (k > 0 || a > 0) && s > 3) {
        return { suit, worth: 4 };
      }
      // (an ace, king and or queen with (4+ cards of the suit
      // or a jack and 3+ cards of the suit))
      if ((a > 0 || k > 0 || q > 0) && ((j > 0 && s > 2) || s > 3)) {
        return { suit, worth: 3 };
      }
      // (an ace and or king with 2+ cards of the suit)
      // or (an ace, king and or queen with 3+ cards of the suit)
      if (((a > 0 || k > 0) && s > 1) || ((a > 0 || k > 0 || q > 0) && s > 2)) {
        return { suit, worth: 2 };
      }
      // anything else
      return { suit, worth: 1 };
    });
  }
}

class PitchAIFactory
  implements
    IPitchAIFactory<
      PitchCardRank,
      PitchCardSuit,
      PitchCard,
      PitchTeam,
      PitchBidder
    >
{
  selectIntelligence(
    key: PitchIntelligence
  ):
    | IPitchAI<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>
    | undefined {
    switch (key) {
      case PitchIntelligence.ARTIFICIAL:
        return new PitchAIBaby();
      default:
        return undefined;
    }
  }
}

export {
  PitchError,
  PitchCardRank,
  PitchCardSuit,
  PitchCard,
  PitchCardFactory,
  PitchDeck,
  PitchTeam,
  PitchBidder,
  PitchTable,
  PitchCalculator,
  PitchScoreboard,
  PitchRound,
  PitchTrick,
  PitchState,
  PitchDealer,
  PitchAIFactory,
};
