import type {
  PitchOptions,
} from "./types";
import type {
PitchBidValidation,
  PitchIntelligence,
PitchPlayValidation,
} from "./enums";
import type {
  ICardRank,
  ICardSuit,
  ICard,
  ICardFactory,
  IDeck,
  IDealer,
  ITable,
  IPlayer,
  IComparable,
} from "../card/interfaces";

interface IPitchCardFactory<
  Rank extends ICardRank<Rank>,
  Suit extends ICardSuit<Suit>,
  Card extends ICard<Rank, Suit, Card>
> extends ICardFactory<Rank, Suit, Card> {
  readonly clubs: Suit;
  readonly diamonds: Suit;
  readonly spades: Suit;
  readonly hearts: Suit;
  readonly two: Rank;
  readonly three: Rank;
  readonly four: Rank;
  readonly five: Rank;
  readonly six: Rank;
  readonly seven: Rank;
  readonly eight: Rank;
  readonly nine: Rank;
  readonly ten: Rank;
  readonly jack: Rank;
  readonly queen: Rank;
  readonly king: Rank;
  readonly ace: Rank;
}

interface IPitchTeam<
  Rank extends ICardRank<Rank>,
  Suit extends ICardSuit<Suit>,
  Card extends ICard<Rank, Suit, Card>,
  Team extends IComparable<Team>
> extends IComparable<Team> {
  readonly cards: Card[];
  readonly name: string;
}

interface IPitchBidder<
  Rank extends ICardRank<Rank>,
  Suit extends ICardSuit<Suit>,
  Card extends ICard<Rank, Suit, Card>,
  Team extends IPitchTeam<Rank, Suit, Card, Team>,
  Bidr extends IPitchBidder<Rank, Suit, Card, Team, Bidr>
> extends IPlayer<Bidr> {
  team: Team;
  intelligence: PitchIntelligence;
  readonly hand: Card[];
  resetHand(): void;
  reorderHand(): void;
  play(card: Card): Card | undefined;
  takeDeal(deal: Card[]): void;
  takeTrick(trick: Card[]): void;
}

interface IPitchTable<
  Rank extends ICardRank<Rank>,
  Suit extends ICardSuit<Suit>,
  Card extends ICard<Rank, Suit, Card>,
  Team extends IPitchTeam<Rank, Suit, Card, Team>,
  Bidr extends IPitchBidder<Rank, Suit, Card, Team, Bidr>
> extends ITable<Bidr> {
  readonly teams: Team[];
  readonly maxHandLength: number;
}

interface IPitchBid<
  Rank extends ICardRank<Rank>,
  Suit extends ICardSuit<Suit>,
  Card extends ICard<Rank, Suit, Card>,
  Team extends IPitchTeam<Rank, Suit, Card, Team>,
  Bidr extends IPitchBidder<Rank, Suit, Card, Team, Bidr>
> {
  bidder: Bidr;
  bid: number;
  skip: boolean;
}

interface IPitchPlay<
  Rank extends ICardRank<Rank>,
  Suit extends ICardSuit<Suit>,
  Card extends ICard<Rank, Suit, Card>,
  Team extends IPitchTeam<Rank, Suit, Card, Team>,
  Bidr extends IPitchBidder<Rank, Suit, Card, Team, Bidr>
> {
  bidder: Bidr;
  card: Card;
}

interface IPitchTrick<
  Rank extends ICardRank<Rank>,
  Suit extends ICardSuit<Suit>,
  Card extends ICard<Rank, Suit, Card>,
  Team extends IPitchTeam<Rank, Suit, Card, Team>,
  Bidr extends IPitchBidder<Rank, Suit, Card, Team, Bidr>
> {
  readonly lead: Bidr;
  readonly waste: IPitchPlay<Rank, Suit, Card, Team, Bidr>[];
  readonly leadSuit: Suit | undefined;
  getWinningPlay(
    trumpSuit: Suit
  ): IPitchPlay<Rank, Suit, Card, Team, Bidr> | undefined;
}

interface IPitchRound<
  Rank extends ICardRank<Rank>,
  Suit extends ICardSuit<Suit>,
  Card extends ICard<Rank, Suit, Card>,
  Team extends IPitchTeam<Rank, Suit, Card, Team>,
  Bidr extends IPitchBidder<Rank, Suit, Card, Team, Bidr>
> {
  leader: Bidr;
  trump: Suit | undefined;
  bid: IPitchBid<Rank, Suit, Card, Team, Bidr> | undefined;
  tricks: IPitchTrick<Rank, Suit, Card, Team, Bidr>[];
  nextTrick(trickLeader: Bidr): IPitchTrick<Rank, Suit, Card, Team, Bidr>;
}

interface IPitchCalculation<
  Rank extends ICardRank<Rank>,
  Suit extends ICardSuit<Suit>,
  Card extends ICard<Rank, Suit, Card>
> {
  totalGame: number;
  highestTrump: Card | undefined;
  lowestTrump: Card | undefined;
  jackiestTrump: Card | undefined;
}

interface IPitchRoundCalculation<
  Rank extends ICardRank<Rank>,
  Suit extends ICardSuit<Suit>,
  Card extends ICard<Rank, Suit, Card>,
  Team extends IPitchTeam<Rank, Suit, Card, Team>,
  Bidr extends IPitchBidder<Rank, Suit, Card, Team, Bidr>
> {
  greatestBid: { team: Team; value: number } | undefined;
  greatestGame: { teams: Team[]; value: number } | undefined;
  highestTrump: { team: Team; value: Card } | undefined;
  lowestTrump: { team: Team; value: Card } | undefined;
  jackiestTrump: { team: Team; value: Card } | undefined;
}

interface IPitchCalculator<
  Rank extends ICardRank<Rank>,
  Suit extends ICardSuit<Suit>,
  Card extends ICard<Rank, Suit, Card>,
  Team extends IPitchTeam<Rank, Suit, Card, Team>,
  Bidr extends IPitchBidder<Rank, Suit, Card, Team, Bidr>
> {
  in(score: IPitchScore<Rank, Suit, Card, Team, Bidr>): number;
  net(score: IPitchScore<Rank, Suit, Card, Team, Bidr>): number;
  game(cards: Card[]): number;
  score(
    team: Team,
    calculation: IPitchRoundCalculation<Rank, Suit, Card, Team, Bidr>,
    options: PitchOptions
  ): IPitchScore<Rank, Suit, Card, Team, Bidr>;
  calculate(cards: Card[], trump: Suit): IPitchCalculation<Rank, Suit, Card>;
  calculateRound(
    round: IPitchRound<Rank, Suit, Card, Team, Bidr>,
    table: IPitchTable<Rank, Suit, Card, Team, Bidr>
  ): IPitchRoundCalculation<Rank, Suit, Card, Team, Bidr> | undefined;
}

interface IPitchScore<
  Rank extends ICardRank<Rank>,
  Suit extends ICardSuit<Suit>,
  Card extends ICard<Rank, Suit, Card>,
  Team extends IPitchTeam<Rank, Suit, Card, Team>,
  Bidr extends IPitchBidder<Rank, Suit, Card, Team, Bidr>
> {
  calculation: IPitchRoundCalculation<Rank, Suit, Card, Team, Bidr>;
  bid: number;
  high: 1 | 0;
  low: 1 | 0;
  jack: 1 | 0;
  game: 1 | 0;
}

interface IPitchTeamScore<
  Rank extends ICardRank<Rank>,
  Suit extends ICardSuit<Suit>,
  Card extends ICard<Rank, Suit, Card>,
  Team extends IPitchTeam<Rank, Suit, Card, Team>,
  Bidr extends IPitchBidder<Rank, Suit, Card, Team, Bidr>
> {
  team: Team;
  score: IPitchScore<Rank, Suit, Card, Team, Bidr>;
}

interface IPitchScoreboard<
  Rank extends ICardRank<Rank>,
  Suit extends ICardSuit<Suit>,
  Card extends ICard<Rank, Suit, Card>,
  Team extends IPitchTeam<Rank, Suit, Card, Team>,
  Bidr extends IPitchBidder<Rank, Suit, Card, Team, Bidr>
> {
  getScoresForTeam(team: Team): IPitchScore<Rank, Suit, Card, Team, Bidr>[];
  getScoresForRound(
    index: number
  ): IPitchTeamScore<Rank, Suit, Card, Team, Bidr>[];
  getScoreForTeamAndRound(
    team: Team,
    index: number
  ): IPitchScore<Rank, Suit, Card, Team, Bidr> | undefined;
  getScoreTotal(team: Team): number;
  getWinner(options?: PitchOptions): Team | undefined;
  pushScores(
    round: IPitchRoundCalculation<Rank, Suit, Card, Team, Bidr>,
    options?: PitchOptions
  ): void;
}

interface IPitchState<
  Rank extends ICardRank<Rank>,
  Suit extends ICardSuit<Suit>,
  Card extends ICard<Rank, Suit, Card>,
  Team extends IPitchTeam<Rank, Suit, Card, Team>,
  Bidr extends IPitchBidder<Rank, Suit, Card, Team, Bidr>
> {
  readonly options: PitchOptions;
  readonly factory: IPitchCardFactory<Rank, Suit, Card>;
  readonly deck: IDeck<Rank, Suit, Card>;
  readonly table: IPitchTable<Rank, Suit, Card, Team, Bidr>;
  readonly rounds: IPitchRound<Rank, Suit, Card, Team, Bidr>[];
  readonly calculator: IPitchCalculator<Rank, Suit, Card, Team, Bidr>;
  readonly scoreboard: IPitchScoreboard<Rank, Suit, Card, Team, Bidr>;
  showCards: boolean;
  nextRound(roundLeader: Bidr): IPitchRound<Rank, Suit, Card, Team, Bidr>;
  resetCards(): void;
  resetState(): void;
}

interface IPitchDealer<
  Rank extends ICardRank<Rank>,
  Suit extends ICardSuit<Suit>,
  Card extends ICard<Rank, Suit, Card>,
  Team extends IPitchTeam<Rank, Suit, Card, Team>,
  Bidr extends IPitchBidder<Rank, Suit, Card, Team, Bidr>
> extends IDealer<Rank, Suit, Card> {
  playPitch(
    state: IPitchState<Rank, Suit, Card, Team, Bidr>,
    callbackShowCards: (
      state: IPitchState<Rank, Suit, Card, Team, Bidr>,
      bidder: Bidr
    ) => Promise<boolean>,
    callbackBid: (
      state: IPitchState<Rank, Suit, Card, Team, Bidr>,
      bidder: Bidr,
      validation?: PitchBidValidation
    ) => Promise<IPitchBid<Rank, Suit, Card, Team, Bidr>>,
    callbackSelectCard: (
      state: IPitchState<Rank, Suit, Card, Team, Bidr>,
      bidder: Bidr,
      validation?: PitchPlayValidation
    ) => Promise<Card>,
    callbackShowTrickResult: (
      state: IPitchState<Rank, Suit, Card, Team, Bidr>,
      winner: IPitchPlay<Rank, Suit, Card, Team, Bidr>
    ) => Promise<void>,
    callbackShowRoundResult: (
      state: IPitchState<Rank, Suit, Card, Team, Bidr>,
      calculation: IPitchRoundCalculation<Rank, Suit, Card, Team, Bidr>
    ) => Promise<void>,
    callbackShowPitchResult: (
      state: IPitchState<Rank, Suit, Card, Team, Bidr>,
      team: Team
    ) => Promise<void>,
    callbackRefresh: (
      state: IPitchState<Rank, Suit, Card, Team, Bidr>,
      message?: string
    ) => Promise<void>
  ): Promise<IPitchState<Rank, Suit, Card, Team, Bidr>>;
  dealHands(
    state: IPitchState<Rank, Suit, Card, Team, Bidr>,
    callbackRefresh: (
      state: IPitchState<Rank, Suit, Card, Team, Bidr>,
      message?: string
    ) => Promise<void>
  ): Promise<IPitchState<Rank, Suit, Card, Team, Bidr>>;
  takeBids(
    state: IPitchState<Rank, Suit, Card, Team, Bidr>,
    callbackShowCards: (
      state: IPitchState<Rank, Suit, Card, Team, Bidr>,
      bidder: Bidr
    ) => Promise<boolean>,
    callbackBid: (
      state: IPitchState<Rank, Suit, Card, Team, Bidr>,
      bidder: Bidr,
      validation?: PitchBidValidation
    ) => Promise<IPitchBid<Rank, Suit, Card, Team, Bidr>>,
    callbackRefresh: (
      state: IPitchState<Rank, Suit, Card, Team, Bidr>,
      message?: string
    ) => Promise<void>
  ): Promise<IPitchState<Rank, Suit, Card, Team, Bidr>>;
  takePlays(
    state: IPitchState<Rank, Suit, Card, Team, Bidr>,
    callbackShowCards: (
      state: IPitchState<Rank, Suit, Card, Team, Bidr>,
      bidder: Bidr
    ) => Promise<boolean>,
    callbackSelectCard: (
      state: IPitchState<Rank, Suit, Card, Team, Bidr>,
      bidder: Bidr,
      validation?: PitchPlayValidation
    ) => Promise<Card>,
    callbackRefresh: (
      state: IPitchState<Rank, Suit, Card, Team, Bidr>,
      message?: string
    ) => Promise<void>
  ): Promise<IPitchState<Rank, Suit, Card, Team, Bidr>>;
  pushScores(
    state: IPitchState<Rank, Suit, Card, Team, Bidr>,
    callbackShowRoundCalc: (
      state: IPitchState<Rank, Suit, Card, Team, Bidr>,
      calculation: IPitchRoundCalculation<Rank, Suit, Card, Team, Bidr>
    ) => Promise<void>,
    callbackRefresh: (
      state: IPitchState<Rank, Suit, Card, Team, Bidr>,
      message?: string
    ) => Promise<void>
  ): Promise<IPitchState<Rank, Suit, Card, Team, Bidr>>;
}

interface IPitchAI<
  Rank extends ICardRank<Rank>,
  Suit extends ICardSuit<Suit>,
  Card extends ICard<Rank, Suit, Card>,
  Team extends IPitchTeam<Rank, Suit, Card, Team>,
  Bidr extends IPitchBidder<Rank, Suit, Card, Team, Bidr>
> {
  decideBid(
    bidder: Bidr,
    state: IPitchState<Rank, Suit, Card, Team, Bidr>
  ): IPitchBid<Rank, Suit, Card, Team, Bidr>;
  decidePlay(
    bidder: Bidr,
    state: IPitchState<Rank, Suit, Card, Team, Bidr>
  ): Card;
}

interface IPitchAIFactory<
  Rank extends ICardRank<Rank>,
  Suit extends ICardSuit<Suit>,
  Card extends ICard<Rank, Suit, Card>,
  Team extends IPitchTeam<Rank, Suit, Card, Team>,
  Bidr extends IPitchBidder<Rank, Suit, Card, Team, Bidr>
> {
  selectIntelligence(
    key: PitchIntelligence
  ): IPitchAI<Rank, Suit, Card, Team, Bidr> | undefined;
}

export type {
  IPitchCardFactory,
  IPitchTeam,
  IPitchBidder,
  IPitchTable,
  IPitchBid,
  IPitchPlay,
  IPitchRound,
  IPitchTrick,
  IPitchCalculation,
  IPitchRoundCalculation,
  IPitchCalculator,
  IPitchScore,
  IPitchTeamScore,
  IPitchScoreboard,
  IPitchState,
  IPitchDealer,
  IPitchAI,
  IPitchAIFactory,
};
