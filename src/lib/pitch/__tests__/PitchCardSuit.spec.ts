import { describe, it, expect } from "vitest"
import { PitchCardFactory } from "../classes";

describe("PitchCardSuit", () => {
    const factory = new PitchCardFactory();
    const HEARTS = factory.hearts;
    const CLUBS = factory.clubs;
    const SPADES = factory.spades;
    const DIAMONDS = factory.diamonds;

    it("compare suits when sorting", () => {
        const unsorted = [HEARTS,DIAMONDS,SPADES,CLUBS];
        const sorted = unsorted.sort((a, b) => a.compare(b));

        expect(sorted[0].key).toBe(CLUBS.key);
        expect(sorted[1].key).toBe(DIAMONDS.key);
        expect(sorted[2].key).toBe(SPADES.key);
        expect(sorted[3].key).toBe(HEARTS.key);
    });
    
    it("compare weighted suits with hearts-led trick", () => {
        const lead = HEARTS;

        expect(HEARTS.compareWeight(HEARTS, lead)).toBe(0);
        expect(HEARTS.compareWeight(CLUBS, lead)).toBeGreaterThan(0);
        expect(CLUBS.compareWeight(DIAMONDS, lead)).toBe(0);
        expect(DIAMONDS.compareWeight(SPADES, lead)).toBe(0);
        expect(SPADES.compareWeight(HEARTS, lead)).toBeLessThan(0);
    });
    
    it("compare weighted suits with hearts-led trick and spades-trump round", () => {
        const lead = HEARTS;
        const trump = SPADES;

        expect(HEARTS.compareWeight(HEARTS, lead, trump)).toBe(0);
        expect(HEARTS.compareWeight(CLUBS, lead, trump)).toBeGreaterThan(0);
        expect(CLUBS.compareWeight(DIAMONDS, lead, trump)).toBe(0);
        expect(DIAMONDS.compareWeight(SPADES, lead, trump)).toBeLessThan(0);
        expect(SPADES.compareWeight(HEARTS, lead, trump)).toBeGreaterThan(0);
    });
});