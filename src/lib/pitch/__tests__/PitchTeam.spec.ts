import { describe, it, expect } from "vitest"
import { PitchCardFactory, PitchTeam } from "../classes";

describe("PitchTeam", () => {
    const factory = new PitchCardFactory();

    it("clear cards removes cards from team", () => {
        const team = new PitchTeam("Roxxon");

        for (let i = 10; i < factory.cards.length && i < 14; i++) {
            team.cards.push(factory.cards[i]);
        }

        expect(team.cards.length).toBe(4);

        team.clearCards();

        expect(team.cards.length).toBe(0);
    });
});