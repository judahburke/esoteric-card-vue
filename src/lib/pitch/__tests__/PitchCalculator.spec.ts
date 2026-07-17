import { describe, it, expect } from "vitest"
import { PitchCalculator, PitchCardFactory } from "../classes"

describe("PitchCalculator", () => {
    const factory = new PitchCardFactory();
    const calculator = new PitchCalculator(factory);

    it("sums game points across a sets of face cards", () => {
        const cards = [
            factory.cards.find(c => c.rank.key == factory.nine.key)!,
            factory.cards.find(c => c.rank.key == factory.ten.key)!,
            factory.cards.find(c => c.rank.key == factory.jack.key)!,
            factory.cards.find(c => c.rank.key == factory.queen.key)!,
            factory.cards.find(c => c.rank.key == factory.king.key)!,
            factory.cards.find(c => c.rank.key == factory.ace.key)!,
        ];

        expect(calculator.game(cards)).toBe(20);
    });

    it("sums game points across a sets of number cards", () => {
        const cards = [
            factory.cards.find(c => c.rank.key == factory.two.key)!,
            factory.cards.find(c => c.rank.key == factory.three.key)!,
            factory.cards.find(c => c.rank.key == factory.four.key)!,
            factory.cards.find(c => c.rank.key == factory.five.key)!,
            factory.cards.find(c => c.rank.key == factory.six.key)!,
            factory.cards.find(c => c.rank.key == factory.seven.key)!,
        ];

        expect(calculator.game(cards)).toBe(0);
    });

    it("finds high and low across a set of cards", () => {
        const trump = factory.hearts;

        const cards = [
            factory.cards.find(c => c.rank.key == factory.two.key && c.suit.key != trump.key)!,
            factory.cards.find(c => c.rank.key == factory.three.key && c.suit.key == trump.key)!,
            factory.cards.find(c => c.rank.key == factory.seven.key && c.suit.key == trump.key)!,
            factory.cards.find(c => c.rank.key == factory.eight.key && c.suit.key != trump.key)!,
        ];

        const calculation = calculator.calculate(cards, trump);

        expect(calculation.lowestTrump?.rank.key).toBe(factory.three.key);
        expect(calculation.lowestTrump?.suit.key).toBe(factory.hearts.key);
        expect(calculation.highestTrump?.rank.key).toBe(factory.seven.key);
        expect(calculation.highestTrump?.suit.key).toBe(factory.hearts.key);
        expect(calculation.jackiestTrump).toBeUndefined();
        expect(calculation.totalGame).toBe(0);
    });

    it("finds high and low and game across a set of cards", () => {
        const trump = factory.hearts;

        const cards = [
            factory.cards.find(c => c.rank.key == factory.two.key && c.suit.key != trump.key)!,
            factory.cards.find(c => c.rank.key == factory.three.key && c.suit.key == trump.key)!,
            factory.cards.find(c => c.rank.key == factory.seven.key && c.suit.key == trump.key)!,
            factory.cards.find(c => c.rank.key == factory.eight.key && c.suit.key != trump.key)!,
            factory.cards.find(c => c.rank.key == factory.jack.key && c.suit.key != trump.key)!,
        ];

        const calculation = calculator.calculate(cards, trump);

        expect(calculation.lowestTrump?.rank.key).toBe(factory.three.key);
        expect(calculation.lowestTrump?.suit.key).toBe(factory.hearts.key);
        expect(calculation.highestTrump?.rank.key).toBe(factory.seven.key);
        expect(calculation.highestTrump?.suit.key).toBe(factory.hearts.key);
        expect(calculation.jackiestTrump).toBeUndefined();
        expect(calculation.totalGame).toBe(1);
    });

    it("finds high, low, jack and game across a set of cards", () => {
        const trump = factory.hearts;

        const cards = [
            factory.cards.find(c => c.rank.key == factory.two.key && c.suit.key != trump.key)!,
            factory.cards.find(c => c.rank.key == factory.three.key && c.suit.key == trump.key)!,
            factory.cards.find(c => c.rank.key == factory.seven.key && c.suit.key == trump.key)!,
            factory.cards.find(c => c.rank.key == factory.eight.key && c.suit.key != trump.key)!,
            factory.cards.find(c => c.rank.key == factory.jack.key && c.suit.key == trump.key)!,
        ];

        const calculation = calculator.calculate(cards, trump);

        expect(calculation.lowestTrump?.rank.key).toBe(factory.three.key);
        expect(calculation.lowestTrump?.suit.key).toBe(factory.hearts.key);
        expect(calculation.highestTrump?.rank.key).toBe(factory.jack.key);
        expect(calculation.highestTrump?.suit.key).toBe(factory.hearts.key);
        expect(calculation.jackiestTrump?.rank.key).toBe(factory.jack.key);
        expect(calculation.jackiestTrump?.suit.key).toBe(factory.hearts.key);
        expect(calculation.totalGame).toBe(1);
    });
});