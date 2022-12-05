import {
  defaultCutOptions,
  defaultDealOptions,
  defaultShuffleOptions,
} from "./constants";
import {
  CardRankKey,
  CardSuitKey,
  CardSuitColorKey,
  CardErrorKey,
} from "./enums";
import type {
  ICardRank,
  ICardSuit,
  ICard,
  ICardFactory,
  IDealer,
  IDeck,
  ITable,
  IPlayer,
} from "./interfaces";
import type { CutOptions, ShuffleOptions, DealOptions } from "./types";

class CardError extends Error {
  constructor(key: CardErrorKey) {
    super(key.toString());
    this.name = "CardError";
    this.errorKey = key;
  }
  public readonly errorKey: CardErrorKey;
}

class StandardCard
  implements ICard<StandardCardRank, StandardCardSuit, StandardCard>
{
  public readonly rank: StandardCardRank;
  public readonly suit: StandardCardSuit;

  constructor(rank: StandardCardRank, suit: StandardCardSuit) {
    this.suit = suit;
    this.rank = rank;
  }
  compare(other: StandardCard): number {
    const r = this.rank.compare(other.rank);
    const s = this.suit.compare(other.suit);
    return s === 0 ? r : s;
  }
}

class StandardCardRank implements ICardRank<StandardCardRank> {
  public readonly key: CardRankKey;
  public readonly value: number;

  constructor(key: CardRankKey, value: number) {
    this.key = key;
    this.value = value;
  }
  public compare(other: StandardCardRank): number {
    return this.value - other.value;
  }
}

class StandardCardSuit implements ICardSuit<StandardCardSuit> {
  public readonly key: CardSuitKey;
  public readonly colorKey: CardSuitColorKey;
  public readonly value: number;

  constructor(key: CardSuitKey, colorKey: CardSuitColorKey, value: number) {
    this.key = key;
    this.value = value;
    this.colorKey = colorKey;
  }
  public compare(other: StandardCardSuit): number {
    return this.value - other.value;
  }
}

abstract class GenericDeck<
  Rank extends ICardRank<Rank>,
  Suit extends ICardSuit<Suit>,
  Card extends ICard<Rank, Suit, Card>
> implements IDeck<Rank, Suit, Card>
{
  private _stack: Card[];
  public get length(): number {
    return this._stack.length;
  }
  public pop(): Card | undefined;
  public pop(count: number): Card[];
  public pop(count?: number): Card[] | Card | undefined {
    if (!count) {
      return this._stack.pop();
    }
    return this._stack.splice(this.length - (count > 0 ? count : 1));
  }
  public push(...card: Card[]): void {
    this._stack.push(...card);
  }
  cut(topLength?: number, options?: CutOptions): void {
    if (!options) {
      options = defaultCutOptions;
    }
    if (options.cutMinimum > this._stack.length) {
      throw new CardError(CardErrorKey.TABLE_400_CUT);
    }
    if (!topLength) {
      const min = Math.min(
        options.cutMinimum,
        this._stack.length - options.cutMinimum
      );
      const max = Math.max(
        options.cutMinimum,
        this._stack.length - options.cutMinimum
      );
      topLength = Math.floor(Math.random() * (max - min) + min);
    }
    if (
      topLength < options.cutMinimum ||
      topLength > this._stack.length - options.cutMinimum
    ) {
      throw new CardError(CardErrorKey.TABLE_400_CUT);
    }

    const top = this._stack.slice(0, topLength);
    const bot = this._stack.slice(topLength);
    this._stack = bot.concat(top);
  }
  shuffle(dealtCards?: Card[], options?: ShuffleOptions): void {
    if (!dealtCards) {
      dealtCards = [];
    }
    if (!options) {
      options = defaultShuffleOptions;
    }
    let allCards = this._stack.concat(dealtCards);
    for (let iteration = 0; iteration < options.shuffleCount; iteration++) {
      const left = allCards.slice(0, allCards.length / 2);
      const right = allCards.slice(allCards.length / 2);
      allCards = [];
      while (left.length > 0 || right.length > 0) {
        const card =
          left.length > 0 && Math.random() < 0.5 ? left.pop() : right.pop();
        if (card) {
          allCards.push(card);
        }
      }
    }
    this._stack = allCards;
  }

  constructor(factory: ICardFactory<Rank, Suit, Card>) {
    this._stack = [];
    factory.cards.forEach((card) => this._stack.push(card));
  }
}
class StandardDeck extends GenericDeck<
  StandardCardRank,
  StandardCardSuit,
  StandardCard
> {}

abstract class GenericDealer<
  Rank extends ICardRank<Rank>,
  Suit extends ICardSuit<Suit>,
  Card extends ICard<Rank, Suit, Card>
> implements IDealer<Rank, Suit, Card>
{
  deal(deck: IDeck<Rank, Suit, Card>, options?: DealOptions): Card[] {
    if (!options) {
      options = defaultDealOptions;
    }
    const cards: Card[] = [];
    for (let i = 0; i < options.cardCount; i++) {
      const card = deck.pop();
      if (card) cards.push(card);
    }
    console.debug("[card] GenericDealer.deal", cards);
    return cards;
  }
}
class StandardDealer extends GenericDealer<
  StandardCardRank,
  StandardCardSuit,
  StandardCard
> {}

class StandardPlayer implements IPlayer<StandardPlayer> {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  compare(other: StandardPlayer): number {
    return this.name === other.name ? 0 : this.name > other.name ? 1 : -1;
  }
}

abstract class GenericTable<Player extends IPlayer<Player>>
  implements ITable<Player>
{
  public get length(): number {
    return this._seats.length;
  }
  public get dealer(): Player {
    return this._seats[this._currentDealer];
  }
  public get leader(): Player {
    return this._seats[this._currentLeader];
  }
  public get last(): Player {
    return this._seats[this.fix(this._currentLeader - 1)];
  }

  public peekNextDealer(): Player {
    return this._seats[this.fix(this._currentDealer + 1)];
  }
  public peekNextLeader(): Player {
    return this._seats[this.fix(this._currentLeader + 1)];
  }
  public setNext(): Player {
    console.debug(
      "[card] GenericTable.setNext (pre)",
      this._currentDealer,
      this._currentLeader
    );
    const player = this.peekNextLeader();
    this._currentDealer = this.fix(this._currentDealer + 1);
    console.debug(
      "[card] GenericTable.setNext (post)",
      this._currentDealer,
      this._currentLeader
    );
    return player;
  }
  public setNextDealer(player: Player): void {
    console.debug(
      "[card] GenericTable.setNextDealer (pre)",
      this._currentDealer,
      this._currentLeader
    );
    const i = this._seats.findIndex((p) => p.compare(player) === 0);
    if (i < 0) {
      throw new CardError(CardErrorKey.TABLE_404_NEXT);
    }
    this._currentDealer = i;
    console.debug(
      "[card] GenericTable.setNextDealer (post)",
      this._currentDealer,
      this._currentLeader
    );
  }
  public setNextLeader(player: Player): void {
    console.debug(
      "[card] GenericTable.setNextLeader (pre)",
      this._currentDealer,
      this._currentLeader
    );
    const i = this._seats.findIndex((p) => p.compare(player) === 0);
    if (i < 0) {
      throw new CardError(CardErrorKey.TABLE_404_NEXT);
    }
    this._currentDealer = this._options.isDealerFirst ? i : this.fix(i - 1);
    console.debug(
      "[card] GenericTable.setNextLeader (post)",
      this._currentDealer,
      this._currentLeader
    );
  }
  public *iterator(): IterableIterator<Player> {
    for (let i = this._currentLeader; i < this._seats.length; i++) {
      yield this._seats[i];
    }
    for (let i = 0; i < this._currentLeader; i++) {
      yield this._seats[i];
    }
  }

  constructor(players: Player[], options?: DealOptions) {
    this._options = options ?? defaultDealOptions;
    this._seats = [...players];
    this._currentDealer = 0;
  }
  private _options: DealOptions;
  private _seats: Player[];
  private _currentDealer: number;
  private get _currentLeader() {
    return this._options.isDealerFirst
      ? this._currentDealer
      : this.fix(this._currentDealer + 1);
  }
  private fix(index: number) {
    const len = this.length;
    return ((index % len) + len) % len;
  }
}

class StandardTable extends GenericTable<StandardPlayer> {}

export {
  CardError,
  StandardCard,
  StandardCardRank,
  StandardCardSuit,
  StandardDeck,
  StandardDealer,
  StandardTable,
  GenericDeck,
  GenericDealer,
  GenericTable,
};
