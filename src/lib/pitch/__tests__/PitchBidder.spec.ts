import { describe, it, expect } from "vitest"
import { PitchBidder, PitchCardFactory } from "../classes";
import { CardRankKey, CardSuitKey } from "@/lib/card/enums";
import { CardError } from "@/lib/card/classes";

describe("PitchBidder", () => {
    const factory = new PitchCardFactory();
    const cards = factory.cards;

    it("take deal and sort hand", () => {
        const bidder = new PitchBidder("Dario Agger");
        const tenDiamonds = cards.find(c => c.rank.key == CardRankKey.TEN && c.suit.key == CardSuitKey.DIAMONDS)!;
        const queenDiamonds = cards.find(c => c.rank.key == CardRankKey.QUEEN && c.suit.key == CardSuitKey.DIAMONDS)!;
        const aceSpades = cards.find(c => c.rank.key == CardRankKey.ACE && c.suit.key == CardSuitKey.SPADES)!;

        expect(bidder.hand.length).toBe(0);
        
        bidder.takeDeal([tenDiamonds, queenDiamonds, aceSpades]);

        expect(bidder.hand.length).toBe(3);

        expect(bidder.hand[0].rank.key).toBe(CardRankKey.TEN);
        expect(bidder.hand[0].suit.key).toBe(CardSuitKey.DIAMONDS);
        expect(bidder.hand[1].rank.key).toBe(CardRankKey.QUEEN);
        expect(bidder.hand[1].suit.key).toBe(CardSuitKey.DIAMONDS);
        expect(bidder.hand[2].rank.key).toBe(CardRankKey.ACE);
        expect(bidder.hand[2].suit.key).toBe(CardSuitKey.SPADES);

        bidder.reorderHand();

        expect(bidder.hand[0].rank.key, "hand is sorted hearts, spades, diamonds, clubs by default").toBe(CardRankKey.ACE);
        expect(bidder.hand[0].suit.key, "hand is sorted hearts, spades, diamonds, clubs by default").toBe(CardSuitKey.SPADES);
        expect(bidder.hand[1].rank.key, "hand is sorted from high cards to low cards by default").toBe(CardRankKey.QUEEN);
        expect(bidder.hand[1].suit.key, "hand is sorted hearts, spades, diamonds, clubs by default").toBe(CardSuitKey.DIAMONDS);
        expect(bidder.hand[2].rank.key, "hand is sorted from high cards to low cards by default").toBe(CardRankKey.TEN);
        expect(bidder.hand[2].suit.key, "hand is sorted hearts, spades, diamonds, clubs by default").toBe(CardSuitKey.DIAMONDS);
    });

    it("take trick for team", () => {
        const bidder = new PitchBidder("Dario Agger");
        const tenDiamonds = cards.find(c => c.rank.key == CardRankKey.TEN && c.suit.key == CardSuitKey.DIAMONDS)!;
        const queenDiamonds = cards.find(c => c.rank.key == CardRankKey.QUEEN && c.suit.key == CardSuitKey.DIAMONDS)!;
        
        expect(bidder.team.cards.length).toBe(0);

        bidder.takeTrick([tenDiamonds, queenDiamonds]);

        expect(bidder.team.cards.length).toBe(2);
    });

    it("play card from hand", () => {
        const bidder = new PitchBidder("Dario Agger");
        const tenDiamonds = cards.find(c => c.rank.key == CardRankKey.TEN && c.suit.key == CardSuitKey.DIAMONDS)!;
        const queenDiamonds = cards.find(c => c.rank.key == CardRankKey.QUEEN && c.suit.key == CardSuitKey.DIAMONDS)!;
        const aceSpades = cards.find(c => c.rank.key == CardRankKey.ACE && c.suit.key == CardSuitKey.SPADES)!;

        expect(bidder.hand.length).toBe(0);
        
        bidder.takeDeal([tenDiamonds, queenDiamonds, aceSpades]);

        expect(bidder.hand.length).toBe(3);

        const card = bidder.play(aceSpades);

        expect(bidder.hand.length).toBe(2);
        expect(card?.rank.key).toBe(CardRankKey.ACE);
        expect(card?.suit.key).toBe(CardSuitKey.SPADES);
    });

    it("throw error when playing card not in hand", () => {
        const bidder = new PitchBidder("Dario Agger");
        const aceSpades = cards.find(c => c.rank.key == CardRankKey.ACE && c.suit.key == CardSuitKey.SPADES)!;

        expect(() => bidder.play(aceSpades)).toThrow(CardError);
    });
});