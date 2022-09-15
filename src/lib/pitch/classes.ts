import { GenericDealer, GenericDeck, GenericTable } from '../card/classes';
import { cardSuitColorKeys, cardSuitKeys, cardRankKeys, cardErrorKeys } from '../card/constants';
import type { ICardRank, ICardSuit, ICard, IDeck } from '../card/interfaces';
import type { CardRankKey, CardSuitColorKey, CardSuitKey, IntelligenceKey } from '../card/types';
import { textKeys } from '../constants';
import { defaultPitchOptions, pitchErrorKeys } from './constants';
import type { IPitchAI, IPitchAIFactory, IPitchBid, IPitchBidder, IPitchCalculation, IPitchCalculator, IPitchCardFactory, IPitchDealer, IPitchPlay, IPitchRound, IPitchRoundCalculation, IPitchScoreboard, IPitchState, IPitchTable, IPitchTeam, IPitchTrick, IPitchScore, IPitchTeamScore } from './interfaces';
import type { PitchBidErrorKey, PitchOptions, PitchPlayErrorKey } from './types';


class PitchCard implements ICard<PitchCardRank,PitchCardSuit,PitchCard> {
    public readonly rank: PitchCardRank;
    public readonly suit: PitchCardSuit;
    public compare(other: PitchCard): number {
        if (this.suit.compare(other.suit) === 0) {
            return this.rank.compare(other.rank);
        } else {
            return this.suit.compare(other.suit);
        }
    }
    public compareWeight(other: PitchCard, lead: PitchCardSuit, trump?: PitchCardSuit): number {
        if (this.suit.compareWeight(other.suit, lead, trump) === 0) {
            return this.rank.compare(other.rank);
        } else {
            return this.suit.compareWeight(other.suit, lead, trump);
        }
    }
    public static groupBy<K extends keyof {[key: string]: PitchCard[]}>(cards:PitchCard[], keyFinder:(card:PitchCard) => K) {
        return cards.reduce((cardsByKey, card) => {
            const key = keyFinder(card);
            if (!cardsByKey[key]) { cardsByKey[key] = []; }
            cardsByKey[key].push(card);
            return cardsByKey;
        }, {} as {[key: string]: PitchCard[]});
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
    public readonly colorKey: CardSuitColorKey;
    public readonly value: number;
    public compare(other: PitchCardSuit): number {
        return this.value - other.value;
    }
    public compareWeight(other: PitchCardSuit, lead: PitchCardSuit, trump?: PitchCardSuit): number {
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

    constructor(key: CardSuitKey, colorKey: CardSuitColorKey, value: number) {
        this.key = key;
        this.value = value;
        this.colorKey = colorKey;
    }
}

class PitchCardFactory implements IPitchCardFactory<PitchCardRank, PitchCardSuit, PitchCard> {
    public get clubs(): PitchCardSuit { return new PitchCardSuit(cardSuitKeys.CLUBS, cardSuitColorKeys.BLACK, 1); }
    public get diamonds(): PitchCardSuit { return new PitchCardSuit(cardSuitKeys.DIAMONDS, cardSuitColorKeys.RED, 2); }
    public get spades(): PitchCardSuit { return new PitchCardSuit(cardSuitKeys.SPADES, cardSuitColorKeys.BLACK, 3); }
    public get hearts(): PitchCardSuit { return new PitchCardSuit(cardSuitKeys.HEARTS, cardSuitColorKeys.RED, 4); }
    public get two(): PitchCardRank { return new PitchCardRank(cardRankKeys.TWO, 0, 2); }
    public get three(): PitchCardRank { return new PitchCardRank(cardRankKeys.THREE, 0, 3); }
    public get four(): PitchCardRank { return new PitchCardRank(cardRankKeys.FOUR, 0, 4); }
    public get five(): PitchCardRank { return new PitchCardRank(cardRankKeys.FIVE, 0, 5); }
    public get six(): PitchCardRank { return new PitchCardRank(cardRankKeys.SIX, 0, 6); }
    public get seven(): PitchCardRank { return new PitchCardRank(cardRankKeys.SEVEN, 0, 7); }
    public get eight(): PitchCardRank { return new PitchCardRank(cardRankKeys.EIGHT, 0, 8); }
    public get nine(): PitchCardRank { return new PitchCardRank(cardRankKeys.NINE, 0, 9); }
    public get ten(): PitchCardRank { return new PitchCardRank(cardRankKeys.TEN, 10, 10); }
    public get jack(): PitchCardRank { return new PitchCardRank(cardRankKeys.JACK, 1, 11); }
    public get queen(): PitchCardRank { return new PitchCardRank(cardRankKeys.QUEEN, 2, 12); }
    public get king(): PitchCardRank { return new PitchCardRank(cardRankKeys.KING, 3, 13); }
    public get ace(): PitchCardRank { return new PitchCardRank(cardRankKeys.ACE, 4, 14); }
    public get ranks(): PitchCardRank[] { return [this.two, this.three, this.four, this.five, this.six, this.seven, this.eight, this.nine, this.ten, this.jack, this.queen, this.king, this.ace]; }
    public get suits(): PitchCardSuit[] { return [this.clubs, this.diamonds, this.spades, this.hearts]; }
    public get cards(): PitchCard[] { 
        let c: PitchCard[] = [];
        this.suits.forEach(s => this.ranks.forEach(r => c.push(new PitchCard(r,s))));
        return c; 
    }
}

class PitchDeck extends GenericDeck<PitchCardRank,PitchCardSuit,PitchCard> {

}

class PitchTeam implements IPitchTeam<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam> {
    public id: string
    public cards: PitchCard[]
    public name: string
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

class PitchBidder implements IPitchBidder<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder> {
    constructor(name: string, team?: PitchTeam, intelligence?: IntelligenceKey) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.team = team ?? new PitchTeam(name);
        this.intelligence = intelligence ?? textKeys.card.HUMAN;
        this.hand = [];
    }

    public id: string
    public name: string
    public team: PitchTeam
    public intelligence: IntelligenceKey
    public readonly hand: PitchCard[];
    public resetHand(): PitchCard[] {
        return this.hand.splice(0, this.hand.length)
    }
    reorderHand(): void {
        this.hand.sort((a,b) => -a.compare(b))
    }
    play(card: PitchCard): PitchCard | undefined {
        let index = this.hand.findIndex(c => c.compare(card) === 0);
        if (index < 0) {
            throw new Error(cardErrorKeys.CARD_404);
        } else {
            return this.hand.splice(index,1)[0];
        }
    }
    takeDeal(deal: PitchCard[]): void {
        deal.forEach(card => this.hand.push(card));
    }
    takeTrick(trick: PitchCard[]): void {
        trick.forEach(card => this.team.cards.push(card))
    }
    compare(other: PitchBidder) {
        if (this.id === other.id) {
            return 0;
        } else {
            return this.name > other.name ? 1 : -1;
        }
    }
}

class PitchTable extends GenericTable<PitchBidder> implements IPitchTable<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>{
    public get teams(): PitchTeam[] {
        let teams: PitchTeam[] = [];
        for (let bidder of this.iterator()) {
            if (!teams.some(t => t.compare(bidder.team) === 0)) {
                teams.push(bidder.team);
            }
        }
        return teams;
    }
    public get maxHandLength(): number {
        let max = 0;
        for (let bidder of this.iterator()) {
            max = Math.max(bidder.hand.length, max);
        }
        return max;
    }
}

class PitchTrick implements IPitchTrick<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder> {
    public readonly lead: PitchBidder;
    public readonly waste: IPitchPlay<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>[] = [];
    public get leadSuit(): PitchCardSuit | undefined {
        if (this.waste.length < 1) {
            return undefined;
        } else {
            return this.waste[0].card.suit;
        }
    }
    public getWinningPlay(trumpSuit: PitchCardSuit): IPitchPlay<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder> | undefined {
        const leadSuit = this.leadSuit;
        if (leadSuit) {
            let sortedWaste = [...this.waste].sort((a,b) => -a.card.compareWeight(b.card, leadSuit, trumpSuit));
            console.debug('[pitch] PitchTrick.getWinner', sortedWaste);
            return sortedWaste[0];
        } else {
            return undefined;
        }
    }
    public static groupPlaysBy<K extends keyof {[key: string]: IPitchPlay<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>[]}>(
        plays:IPitchPlay<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>[], 
        keyFinder:(play:IPitchPlay<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>) => K) {
        return plays.reduce((playsByKey, play) => {
            const key = keyFinder(play);
            if (!playsByKey[key]) { playsByKey[key] = []; }
            playsByKey[key].push(play);
            return playsByKey;
        }, {} as {[key: string]: IPitchPlay<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>[]});
    }

    public constructor(trickLeader: PitchBidder) {
        this.lead = trickLeader;
    }
}

class PitchRound implements IPitchRound<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder> {
    public leader: PitchBidder;
    public trump: PitchCardSuit | undefined;
    public bid: IPitchBid<PitchCardRank,PitchCardSuit, PitchCard, PitchTeam, PitchBidder> | undefined;
    public tricks: IPitchTrick<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>[];
    public nextTrick(trickLeader: PitchBidder): IPitchTrick<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder> {
        const trick = new PitchTrick(trickLeader);
        this.tricks.push(trick);
        return trick;
    }
    public constructor(roundLeader: PitchBidder) {
        this.leader = roundLeader;
        this.tricks = [];
    }   
}

class PitchCalculator implements IPitchCalculator<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder> {
    public in(score: IPitchScore<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>): number {
        return score.high + score.low + score.jack + score.game;
    }
    public net(score: IPitchScore<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>): number {
        let sum = this.in(score);
        return sum < score.bid ? - score.bid : sum;
    }    
    public game(cards: PitchCard[]): number {
        let sum = 0;
        cards.forEach(c => sum += c.rank.game);
        return sum;
    }
    public score(team: PitchTeam, 
        calculation: IPitchRoundCalculation<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>,
        options: PitchOptions) : IPitchScore<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder> {
        return {
            calculation: calculation,
            bid: (calculation.greatestBid
                && (calculation.greatestBid.team.compare(team) === 0))
                ? calculation.greatestBid.value : 0,
            high: (calculation.highestTrump
                && (calculation.highestTrump.team.compare(team) === 0))
                ? 1 : 0,
            low: (calculation.lowestTrump
                && (calculation.lowestTrump.team.compare(team) === 0))
                ? 1 : 0,
            jack: (calculation.jackiestTrump
                && (calculation.jackiestTrump.team.compare(team) === 0))
                ? 1 : 0,
            game: (calculation.greatestGame
                && (calculation.greatestGame.teams.length < 2 || options.isScoreTiedGamePointsEnabled)
                && (calculation.greatestGame.teams.some(winningTeam => winningTeam.compare(team) === 0)))
                ? 1 : 0,
        }
    }
    public calculate(cards: PitchCard[], trump: PitchCardSuit)
        : IPitchCalculation<PitchCardRank, PitchCardSuit, PitchCard> {
        let calc: IPitchCalculation<PitchCardRank,PitchCardSuit,PitchCard> = {
            totalGame: 0,
            lowestTrump: undefined,
            highestTrump: undefined,
            jackiestTrump: undefined
        };
        const jack = this._factory.jack;

        cards.forEach(card => {
            calc.totalGame += card.rank.game;
            if (card.suit.compare(trump) === 0) {
                if (!calc.jackiestTrump && card.rank.compare(jack) === 0) {
                    calc.jackiestTrump = card;
                }
                if (!calc.lowestTrump || card.rank.compare(calc.lowestTrump!.rank) < 0) {
                    calc.lowestTrump = card;
                }
                if (!calc.highestTrump || card.rank.compare(calc.highestTrump!.rank) > 0) {
                    calc.highestTrump = card;
                }
            }
        })

        return calc;
    };
    public calculateRound(round: IPitchRound<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>,
        table: IPitchTable<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>) 
        : IPitchRoundCalculation<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder> | undefined {
        // no winner if the game hasn't started or if all tricks haven't started
        if (!round.trump || !round.bid || round.tricks.length < 6) {
            console.debug('[pitch] PitchCalculator.calculateRound (no trump, no bid or not 6 tricks)', round.trump, round.bid, round.tricks.length)
            return undefined;
        }
        // no winner if not all players have played in all tricks
        if (round.tricks.filter((_,i) => i < 6).some(t => t.waste.length < table.length)) {
            console.debug('[pitch] PitchCalculator.calculateRound (some trick has less cards than players)', round.tricks.map(t => t.waste.length), table.length)
            return undefined;
        }

        // response
        let roundCalc: IPitchRoundCalculation<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder> = { 
            greatestBid: { team: round.bid.bidder.team, value: round.bid.bid },
            greatestGame: undefined,
            highestTrump: undefined, 
            lowestTrump: undefined, 
            jackiestTrump: undefined 
        }
        // get teams
        let teams = table.teams;
        // get calculations by team.id
        let calculationsById = teams.reduce((calcsByKey, team) => {
            calcsByKey[team.id] = this.calculate(team.cards, round.trump!);
            return calcsByKey;
        }, {} as { [key:string]: IPitchCalculation<PitchCardRank, PitchCardSuit, PitchCard>});
        console.debug('[pitch] PitchCalculator.calculateRound calculationsById', calculationsById);
        // set best scores
        teams.forEach(team => {
            let calc = calculationsById[team.id];
            // record game
            if (!roundCalc.greatestGame || roundCalc.greatestGame.value < calc.totalGame) {
                roundCalc.greatestGame = { teams: [team], value: calc.totalGame };
            } else if (roundCalc.greatestGame.value === calc.totalGame) {
                roundCalc.greatestGame.teams.push(team);
            }
            // record high
            if (calc.highestTrump && (!roundCalc.highestTrump || roundCalc.highestTrump.value.compare(calc.highestTrump) < 0)) {
                roundCalc.highestTrump = { team: team, value: calc.highestTrump };
            }
            // record low
            if (calc.lowestTrump && (!roundCalc.lowestTrump || roundCalc.lowestTrump.value.compare(calc.lowestTrump) > 0)) {
                roundCalc.lowestTrump = { team: team, value: calc.lowestTrump! };
            }
            // record jack
            if (calc.jackiestTrump) {
                if (roundCalc.jackiestTrump) {
                    throw new Error(pitchErrorKeys.CALC_500_EXTRA_JACK);
                }
                roundCalc.jackiestTrump = { team: team, value: calc.jackiestTrump}
            }
        })
        console.debug('[pitch] PitchCalculator.calculateRound found roundCalc', roundCalc);
        
        return roundCalc;
    }

    constructor(factory: PitchCardFactory) {
        this._factory = factory;
    }
    private _factory: PitchCardFactory;
}

type PitchScoreboardItem = {
    team: PitchTeam,
    scores: IPitchScore<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>[],
}
class PitchScoreboard implements IPitchScoreboard<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder> {
    getScoresForTeam(team: PitchTeam): IPitchScore<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>[] {
        return this._scores.find(trs => trs.team.compare(team) === 0)?.scores ?? [];
    }
    getScoresForRound(index: number): IPitchTeamScore<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>[] {
        if (this._scores.some(s => s.scores.length <= index)) {
            return [];
        }
        return this._scores.map(s => {
            return {
                team: s.team,
                score: s.scores[index]
            };
        });
    }
    getScoreForTeamAndRound(team: PitchTeam, index: number): IPitchScore<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder> | undefined {
        let scores = this.getScoresForTeam(team);
        return index < scores.length ? scores[index] : undefined;
    }
    getScoreTotal(team: PitchTeam): number {
        let sum = 0;
        this.getScoresForTeam(team).forEach(score => sum += this._calculator.net(score));
        return sum;
    }
    getWinner(options?: PitchOptions | undefined): PitchTeam | undefined {
        if (!options) { options = defaultPitchOptions; }
        let winners = this._scores.filter(trs => this.getScoreTotal(trs.team) >= options!.winningScore).sort(trs => trs.scores[trs.scores.length - 1].bid);
        if (winners.length > 0) {
            return winners[winners.length - 1].team;
        } else {
            return undefined;
        }
    }
    pushScores(calculation: IPitchRoundCalculation<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>, 
        options?: PitchOptions | undefined): void {
        if (!options) { options = defaultPitchOptions; }

        if (calculation) {
            this._scores.forEach(i => {
                i.scores.push(this._calculator.score(i.team, calculation, options!))
            })
        }
    }
    
    constructor(teams: PitchTeam[], calculator: IPitchCalculator<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>) {
        this._scores = teams.map(team => {
            return {
                team: team,
                scores: [],
            }
        });
        this._calculator = calculator;
    }
    private _scores: PitchScoreboardItem[];
    private _calculator: IPitchCalculator<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>
}

class PitchState implements IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder> {
    private _deck: IDeck<PitchCardRank, PitchCardSuit, PitchCard>;
    private _rounds: IPitchRound<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>[];
    private _scoreboard: IPitchScoreboard<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>;

    public readonly options: PitchOptions;
    public readonly factory: IPitchCardFactory<PitchCardRank, PitchCardSuit, PitchCard>;
    public get deck():IDeck<PitchCardRank, PitchCardSuit, PitchCard> { return this._deck; };
    public readonly table: IPitchTable<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>;
    public get rounds(): IPitchRound<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>[] { return this._rounds; };
    public readonly calculator: IPitchCalculator<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>;
    public get scoreboard(): IPitchScoreboard<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder> { return this._scoreboard; };
    public showCards: boolean;
    public nextRound(roundLeader: PitchBidder): IPitchRound<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder> {
        const round = new PitchRound(roundLeader);
        this.rounds.push(round);
        return round;
    }
    public resetCards(): void {
        let cards: PitchCard[] = [];
        // remove any cards from hands
        for (let bidr of this.table.iterator()) { cards.push(...bidr.hand.splice(0))};
        for (let team of this.table.teams) { cards.push(...team.cards.splice(0))}
        if ((cards.length + this._deck.length) !== 52) {
            console.warn('[pitch] someone stole a card... ', this.deck.length, ' cards in deck, ', cards.length, ' cards from players and teams...', cards)
        }
        // get a new deck (no cheating!)
        this._deck = new PitchDeck(this.factory);
    }
    public resetState(): void {
        this.resetCards();
        this._rounds = [];
        this._scoreboard = new PitchScoreboard(this.table.teams, this.calculator);
        this.showCards = false;
    }

    constructor(table: IPitchTable<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>,
        options?: PitchOptions,
        factory?: IPitchCardFactory<PitchCardRank, PitchCardSuit, PitchCard>, 
        calculator?: IPitchCalculator<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>,
        deck?: IDeck<PitchCardRank, PitchCardSuit, PitchCard>,
        scoreboard?: IPitchScoreboard<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>,
        rounds?: IPitchRound<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>[],
        showCards?: boolean) {
        this.table = table;
        this.options = options ?? defaultPitchOptions;
        this.factory = factory ?? new PitchCardFactory();
        this.calculator = calculator ?? new PitchCalculator(this.factory);
        this._deck = deck ?? new PitchDeck(this.factory);
        this._scoreboard = scoreboard ?? new PitchScoreboard(this.table.teams, this.calculator);
        this._rounds = rounds ?? [];
        this.showCards = showCards ?? false;
    }
}

class PitchDealer extends GenericDealer<PitchCardRank, PitchCardSuit, PitchCard>
    implements IPitchDealer<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder> {
    public async playPitch(state: IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>,
        callbackShowCards: (state: IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>, bidder: PitchBidder) => Promise<boolean>, 
        callbackBid: (state: IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>, bidder: PitchBidder, error?: PitchBidErrorKey) => Promise<IPitchBid<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>>, 
        callbackSelectCard: (state: IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>, bidder: PitchBidder, error?: PitchPlayErrorKey) => Promise<PitchCard>, 
        callbackShowTrickResult: (state: IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>, winner: IPitchPlay<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>) => Promise<void>,
        callbackShowRoundResult: (state: IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>, calculation: IPitchRoundCalculation<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>) => Promise<void>,
        callbackShowPitchResult: (state: IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>, winner: PitchTeam) => Promise<void>,
        callbackRefresh: (state: IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>, message?: string) => Promise<void>)
        : Promise<IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>> {
        let winningTeam: PitchTeam | undefined;
        
        for (let round = state.nextRound(state.table.leader)
            ; !winningTeam
            ; round = state.nextRound(state.table.leader)) {
            
            state = await this.dealHands(state, callbackRefresh);

            let nextDealer = state.table.peekNextDealer();

            state = await this.takeBids(state, callbackShowCards, callbackBid, callbackRefresh);

            console.debug('[pitch] PitchDealer.playPitch (round.bid)', round.bid)

            if (!round.bid) { continue; }

            state.table.setNextLeader(round.bid.bidder);

            for (let trick = round.nextTrick(state.table.leader)
                ; state.table.maxHandLength > 0
                ; trick = round.nextTrick(state.table.leader)) {
                
                state = await this.takePlays(state, callbackShowCards, callbackSelectCard, callbackRefresh);

                console.debug('[pitch] PitchDealer.playPitch (round.trump)', round.trump)

                if (round.trump) {
                    let winningPlay = trick.getWinningPlay(round.trump);

                    console.debug('[pitch] PitchDealer.playPitch (trick.getWinningPlay)', winningPlay)

                    if (winningPlay) {
                        await callbackShowTrickResult(state, winningPlay);
    
                        state.table.setNextLeader(winningPlay.bidder);
                    } else {
                        throw new Error(pitchErrorKeys.STATE_500_NO_TRICK_WINNER);
                    }
                } else {
                    throw new Error(pitchErrorKeys.STATE_500_NO_TRUMP)
                }
            }

            state = await this.pushScores(state, callbackShowRoundResult, callbackRefresh);

            state.table.setNextDealer(nextDealer);

            winningTeam = state.scoreboard.getWinner(state.options);

            console.debug('[pitch] PitchDealer.playPitch (state.scoreboard.getWinner)', winningTeam)
        }

        await callbackShowPitchResult(state, winningTeam!);
        
        return state;
    }
    public async dealHands(state: IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>, 
        callbackRefresh: (state: IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>, message?: string) => Promise<void>)
        : Promise<IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>> {
        state.resetCards();
        state.deck.shuffle(undefined, state.options.shuffle);

        for (let _ of [1,2]) {
            for (let bidder of state.table.iterator()) {
                let a = state.deck.pop();
                let b = state.deck.pop();
                let c = state.deck.pop();
                if (a && b && c) {
                    bidder.takeDeal([a,b,c])
                    bidder.reorderHand();
                    await callbackRefresh(state);
                } else {
                    throw new Error(cardErrorKeys.DECK_500_EMPTY);
                }
            }
        }

        return state;
    }
    public async takeBids(state: IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>, 
        callbackShowCards: (state: IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>, bidder: PitchBidder) => Promise<boolean>, 
        callbackBid: (state: IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>, bidder: PitchBidder, error?: PitchBidErrorKey) => Promise<IPitchBid<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>>, 
        callbackRefresh: (state: IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>, message?: string) => Promise<void>)
        : Promise<IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>> {
        const round = state.rounds[state.rounds.length - 1];

        for (let bidder of state.table.iterator()) {

            state.showCards = await callbackShowCards(state, bidder);

            await callbackRefresh(state);
            
            let bid = await callbackBid(state, bidder);

            let attempt = 0;

            for (let reason = this.validateBid(state, bid)
                ;reason
                ;reason = this.validateBid(state, bid)) {
                await callbackRefresh(state);

                if (attempt++ > 10) { throw new Error(pitchErrorKeys.PLAY_400_TOO_MANY_ATTEMPTS)}

                console.debug('[pitch] PitchDealer.takeBids (attempt, reason, bid)', attempt++, reason, bid)

                bid = await callbackBid(state, bidder, reason);
            }

            console.debug('[pitch] PitchDealer.takeBids (bid)', bid)

            if (!bid.skip) {
                round.bid = bid;
            }

            console.debug('[pitch] PitchDealer.takeBids (round.bid)', round.bid)

            state.showCards = false;

            await callbackRefresh(state);
        }

        if (round.bid) {
            state.table.setNextLeader(round.bid?.bidder);
        }

        return state;
    }
    public async takePlays(state: IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>, 
        callbackShowCards: (state: IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>, bidder: PitchBidder) => Promise<boolean>, 
        callbackSelectCard: (state: IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>, bidder: PitchBidder, error?: PitchPlayErrorKey) => Promise<PitchCard>, 
        callbackRefresh: (state: IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>, message?: string) => Promise<void>)
        : Promise<IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>> {
        const round = state.rounds[state.rounds.length - 1];
        const trick = round.tricks[round.tricks.length - 1];

        for (let bidder of state.table.iterator()) {

            state.showCards = await callbackShowCards(state, bidder);

            await callbackRefresh(state, 'showing cards to bidder...'); 
            
            let selectedCard = await callbackSelectCard(state, bidder);

            let attempt = 0;

            for (let reason = this.validatePlay(state, { bidder, card: selectedCard})
                ;reason
                ;reason = this.validatePlay(state, {bidder, card: selectedCard})) {
                await callbackRefresh(state, 'validation result... ' + reason);

                if (attempt++ > 10) { throw new Error(pitchErrorKeys.PLAY_400_TOO_MANY_ATTEMPTS); }

                console.debug('[pitch] PitchDealer.takePlays (attempt, reason, selectedCard)', attempt, reason, selectedCard)

                selectedCard = await callbackSelectCard(state, bidder, reason);
            }

            console.debug('[pitch] PitchDealer.takePlays (selectedCard)', selectedCard)

            let playedCard = bidder.play(selectedCard);

            console.debug('[pitch] PitchDealer.takePlays (playedCard)', playedCard)

            await callbackRefresh(state, 'card taken from bidder hand...');

            if (!playedCard) { throw new Error(cardErrorKeys.CARD_404); }

            round.trump = round.trump ?? playedCard.suit;

            console.debug('[pitch] PitchDealer.takePlays (round.trump)', round.trump)

            trick.waste.push({bidder, card: playedCard});

            state.showCards = false;

            await callbackRefresh(state, 'card placed in waste...');
        }

        if (!round.trump) { throw new Error(pitchErrorKeys.STATE_500_NO_TRUMP); }

        var trickWinner = trick.getWinningPlay(round.trump);

        if (!trickWinner) { throw new Error(pitchErrorKeys.TRICK_500_NO_WINNER); }

        trickWinner.bidder.team.cards.push(...trick.waste.map(w => w.card));

        state.table.setNextLeader(trickWinner.bidder);

        await callbackRefresh(state, 'trick completed with winner as next leader...');

        return state;
    }
    public async pushScores(state: IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>, 
        callbackShowRoundCalc: (state: IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>, calculation: IPitchRoundCalculation<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>) => Promise<void>,
        callbackRefresh: (state: IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>, message?: string) => Promise<void>)
        : Promise<IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>> {
        const round = state.rounds[state.rounds.length - 1];

        console.debug('[pitch] PitchDealer.pushScores (calculating)', round, state.table)

        let calculation = state.calculator.calculateRound(round, state.table);

        console.debug('[pitch] PitchDealer.pushScores (calculation)', calculation)

        if (calculation) {
            state.scoreboard.pushScores(calculation, state.options);

            await callbackRefresh(state);

            await callbackShowRoundCalc(state, calculation);
        }

        await callbackRefresh(state);

        return state;
    }

    private validateBid(state: IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>, 
        bid:IPitchBid<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>): PitchBidErrorKey | undefined {
        const round = state.rounds[state.rounds.length - 1];
        // bidder skips their turn
        if (bid.skip)
        {
            // if all turns may be skipped, no error
            if (state.options.isBidNoneEnabled) {
                return undefined;
            }
            // otherwise, if this is the last bidder, the bidder must bid
            else if (Array.from(state.table.iterator())[state.table.length - 1].compare(bid.bidder) === 0
                        && !round.bid) {
                return pitchErrorKeys.BID_400_NO_BID;
            }
        }
        // bidder is never allowed to bid more than five
        else if (state.options.isBidFiveEnabled && bid.bid > 5) {
            return pitchErrorKeys.BID_400_EXCEED_5;
        }
        // unless bust is enabled, player may not bid more than four
        else if (bid.bid > 4) {
            return pitchErrorKeys.BID_400_EXCEED_4;
        }
        // bidder may never bid less than two
        else if (bid.bid < 2) {
            return pitchErrorKeys.BID_400_LESS_THAN_2;
        }
        // if a bid exists, bidder must exceed bid
        else if (round.bid && bid.bid <= round.bid.bid) {
            return pitchErrorKeys.BID_400_NOT_EXCEED_BID;
        }
        // no error found
        return undefined;
    }
    private validatePlay(state: IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>, 
        play:IPitchPlay<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>): PitchPlayErrorKey | undefined {
        const round = state.rounds[state.rounds.length - 1];
        const trick = round.tricks[round.tricks.length - 1];
        // bidder must have card
        if (!play.bidder.hand.some(c => c.compare(play.card) === 0)) {
            return pitchErrorKeys.PLAY_400_NOT_IN_HAND;
        }
        // if trump is allowed to bypass following lead suit, then there are no more rules to follow
        if (state.options.isAllowTrumpWhenCanFollowSuitEnabled && round.trump && play.card.suit.compare(round.trump) === 0) {
            return undefined;
        }
        // if lead suit is played, bidder must follow suit if they have it
        if (trick.leadSuit && play.card.suit.compare(trick.leadSuit) !== 0
                && play.bidder.hand.some(c => c.suit.compare(trick.leadSuit!) === 0)) {
            return pitchErrorKeys.PLAY_400_NOT_FOLLOWING_SUIT;
        }
        // player must play the leading suit of the trick
        return undefined;
    }
    private async retry<T>(max: number, promise: Promise<T>, handle?: (reason:any) => void): Promise<T> {
        return await promise.catch(async reason => {
            if (max <= 0) { throw reason; }
            else if (handle) { handle(reason); }
            return await this.retry(max - 1, promise);
        })
    }
}

class PitchAIBaby implements IPitchAI<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder> {
    public decideBid(bidder: PitchBidder, state: IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>): IPitchBid<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder> {
        const round = state.rounds[state.rounds.length - 1];
        const currentBid = round.bid?.bid ?? 1;

        console.debug('[pitch] PitchAIBaby.decideBid', currentBid, bidder);

        var worth = this.decideWorthBySuit(bidder.hand, state.factory);

        console.debug('[pitch] PitchAIBaby.decideBid', worth);

        // no bid or bid less than a potential suit's worth
        if (worth.some(w => w.worth > currentBid)) {
            console.log('[pitch] PitchAIBaby.decideBid, AI is bidding', currentBid + 1);
            return { bid: currentBid + 1, bidder: bidder, skip: false };
        } else if (state.table.last.compare(bidder) === 0 && currentBid < 2 && !state.options.isBidNoneEnabled) {
            console.log('[pitch] PitchAIBaby.decideBid, AI is forced to bid...');
            return { bid: 2, bidder: bidder, skip: false};
        } else {
            console.log('[pitch] PitchAIBaby.decideBid, AI is skipping...');
            return { bid: 0, bidder: bidder, skip: true };
        }
    }
    public decidePlay(bidder: PitchBidder, state: IPitchState<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder>): PitchCard {
        const round = state.rounds[state.rounds.length - 1];
        const trick = round.tricks[round.tricks.length - 1];
        const hand = [...bidder.hand];

        console.debug('[pitch] PitchAIBaby.decidePlay (bidder, hand)', bidder, hand);

        const trump = round.trump
            // bidder is deciding trump
            ?? this.decideWorthBySuit(hand, state.factory).sort(w => -w.worth)[0].suit;

        console.debug('[pitch] PitchAIBaby.decidePlay (given trump, desired trump, lead suit)', round.trump, trump, trick.leadSuit);

        const leadSuit = trick.leadSuit
            ?? (round.trump 
                    // bidder is leading
                    ? trump
                    // bidder is leading, and deciding trump 
                    : trump);

        const sortedHand = hand.sort((a,b) => -a.compareWeight(b,leadSuit, state.options.isAllowTrumpWhenCanFollowSuitEnabled ? trump : undefined));

        console.debug('[pitch] PitchAIBaby.decidePlay (lead, sorted)', leadSuit, sortedHand);

        return sortedHand[0];
    }
    
    private decideWorthBySuit(hand: PitchCard[], factory: IPitchCardFactory<PitchCardRank,PitchCardSuit,PitchCard>): {suit:PitchCardSuit, worth:number}[] {
        const ten = factory.ten;
        const jack = factory.jack;
        const queen = factory.queen;
        const king = factory.king;
        const ace = factory.ace;
        let handSuits = hand.map(x => x.suit);
        let handByRank = PitchCard.groupBy(hand, c => c.rank.key);
        let handBySuit = PitchCard.groupBy(hand, c => c.suit.key);
        let handByRankSuit = PitchCard.groupBy(hand, c => c.rank.key + c.suit.key);
        return handSuits.map(suit => {
            var s = handBySuit[suit.key]?.length ?? 0;
            var t = handByRank[ten.key]?.length ?? 0;
            var j = handByRankSuit[jack.key+suit.key]?.length ?? 0;
            var q = handByRankSuit[queen.key+suit.key]?.length ?? 0;
            var k = handByRankSuit[king.key+suit.key]?.length ?? 0;
            var a = handByRankSuit[ace.key+suit.key]?.length ?? 0;

            // (six cards of the suit with an ace, king and queen)
            if ((a>0 && k>0 && q>0) && s>5) {
                return { suit, worth: 5};
            };
            // (four+ cards of the suit with a jack and a king and or ace)
            if (j>0 && (k>0 || a>0) && s>3) {
                return { suit, worth: 4 };
            }
            // (an ace, king and or queen with (4+ cards of the suit 
            // or a jack and 3+ cards of the suit))
            if ((a>0 || k>0 || q>0) && ((j>0 && s>2) || s>3)) {
                return { suit, worth: 3 };
            }
            // (an ace and or king with 2+ cards of the suit)
            // or (an ace, king and or queen with 3+ cards of the suit)
            if (((a>0 || k>0) && s>1) || ((a>0 || k>0 || q>0) && s>2)) {
                return { suit, worth: 2 };
            }
            // anything else
            return { suit, worth: 1 };
        })
        
    }
}

class PitchAIFactory implements IPitchAIFactory<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder> {
    selectIntelligence(key: IntelligenceKey)
        : IPitchAI<PitchCardRank, PitchCardSuit, PitchCard, PitchTeam, PitchBidder> | undefined {
        switch (key) {
            case textKeys.card.ARTIFICIAL:
                return new PitchAIBaby();
            default:
                return undefined;
        }
    }
}

export {
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
}