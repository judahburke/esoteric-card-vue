import { describe, it, expect } from "vitest"
import { PitchCardFactory } from "../classes";

describe('PitchCardRank', () => {
    const FACTORY = new PitchCardFactory();
    const ACE = FACTORY.ace;
    const TWO = FACTORY.two;
    const KING = FACTORY.king;

    it("ace is greater than two and king", () => {
        expect(ACE.compare(ACE)).toBe(0);
        expect(ACE.compare(TWO)).toBeGreaterThan(0);
        expect(ACE.compare(KING)).toBeGreaterThan(0);
    });
});