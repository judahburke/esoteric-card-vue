import type { CardRankKey, CardSuitKey, CardSuitColorKey } from "./enums";

import type { CutOptions, DealOptions, ShuffleOptions } from "./types";

interface IStateVersioned<TState> {
  recordState(): TState;
  loadState(state: TState): void;
}

interface IComparable<T extends IComparable<T>> {
  compare(other: T): number;
}

interface ICardRank<T extends IComparable<T>> extends IComparable<T> {
  readonly key: CardRankKey;
  readonly value: number;
}

interface ICardSuit<T extends IComparable<T>> extends IComparable<T> {
  readonly key: CardSuitKey;
  readonly colorKey: CardSuitColorKey;
  readonly value: number;
}

interface ICard<
  R extends ICardRank<R>,
  S extends ICardSuit<S>,
  T extends IComparable<T>
> extends IComparable<T> {
  readonly suit: S;
  readonly rank: R;
}

interface ICardFactory<
  R extends ICardRank<R>,
  S extends ICardSuit<S>,
  C extends ICard<R, S, C>
> {
  readonly cards: C[];
  readonly suits: S[];
  readonly ranks: R[];
}

interface IDeck<
  R extends ICardRank<R>,
  S extends ICardSuit<S>,
  C extends ICard<R, S, C>
> {
  readonly length: number;
  pop(count: number): C[];
  pop(): C | undefined;
  push(...card: C[]): void;
  cut(topLength?: number, options?: CutOptions): void;
  shuffle(dealtCards?: C[], options?: ShuffleOptions): void;
  init(factory: ICardFactory<R, S, C>): void;
}

interface IDealer<
  R extends ICardRank<R>,
  S extends ICardSuit<S>,
  C extends ICard<R, S, C>
> {
  deal(deck: IDeck<R, S, C>, options?: DealOptions): C[];
}

interface IPlayer<T extends IComparable<T>> extends IComparable<T> {
  name: string;
}

interface ITable<P extends IPlayer<P>> {
  readonly length: number;
  readonly dealer: P;
  readonly leader: P;
  readonly last: P;
  peekNextDealer(): P;
  peekNextLeader(): P;
  setNext(): P;
  setNextDealer(player: P): void;
  setNextLeader(player: P): void;
  /** @summary iterate starting at leader **/
  iterator(): IterableIterator<P>;
}

interface ITableSeat<P extends IPlayer<P>> {
  isNextDealt: boolean;
  isNext: boolean;
  player: P;
}

export type {
  IStateVersioned,
  IComparable,
  ICard,
  ICardFactory,
  ICardRank,
  ICardSuit,
  IDealer,
  IDeck,
  IPlayer,
  ITable,
  ITableSeat,
};
