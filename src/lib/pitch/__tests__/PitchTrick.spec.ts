import { describe, it, expect } from "vitest"
import { PitchTrick, PitchBidder, PitchCardFactory } from "../classes"
import { CardRankKey, CardSuitKey } from "@/lib/card/enums";

describe("PitchTrick", () => {
    const leader = new PitchBidder("First");
    const follower = new PitchBidder("Second");
    const factory = new PitchCardFactory();
    const card = (r: CardRankKey, s: CardSuitKey) => factory.cards.find(c => c.rank.key === r && c.suit.key === s)!;
    const kingClubs = card(CardRankKey.KING, CardSuitKey.CLUBS);
    const aceClubs = card(CardRankKey.ACE, CardSuitKey.CLUBS);
    const aceDiamonds = card(CardRankKey.ACE, CardSuitKey.DIAMONDS);

    it("leader wins when cards are different suits and no trump is played", () => {
        const trick = new PitchTrick(leader);
        
        trick.waste.push({bidder: leader, card: aceDiamonds});
        trick.waste.push({bidder: follower, card: aceClubs});

        const winner = trick.getWinningPlay(factory.spades);

        expect(winner?.bidder.id).toBe(leader.id);
    });

    it("leader wins when card has higher rank and no trump is played", () => {
        const trick = new PitchTrick(leader);
        
        trick.waste.push({bidder: leader, card: aceClubs});
        trick.waste.push({bidder: follower, card: kingClubs});

        const winner = trick.getWinningPlay(factory.spades);

        expect(winner?.bidder.id).toBe(leader.id);
    });

    it("follower wins when card has higher rank and no trump is played", () => {
        const trick = new PitchTrick(leader);
        
        trick.waste.push({bidder: leader, card: kingClubs});
        trick.waste.push({bidder: follower, card: aceClubs});

        const winner = trick.getWinningPlay(factory.spades);

        expect(winner?.bidder.id).toBe(follower.id);
    });

    it("leader wins when card has higher rank of trump", () => {
        const trick = new PitchTrick(leader);
        
        trick.waste.push({bidder: leader, card: aceClubs});
        trick.waste.push({bidder: follower, card: kingClubs});

        const winner = trick.getWinningPlay(factory.clubs);

        expect(winner?.bidder.id).toBe(leader.id);
    });

    it("follower wins when card has higher rank of trump", () => {
        const trick = new PitchTrick(leader);
        
        trick.waste.push({bidder: leader, card: kingClubs});
        trick.waste.push({bidder: follower, card: aceClubs});

        const winner = trick.getWinningPlay(factory.clubs);

        expect(winner?.bidder.id).toBe(follower.id);
    });

    it("follower wins when suit is trump", () => {
        const trick = new PitchTrick(leader);
        
        trick.waste.push({bidder: leader, card: aceDiamonds});
        trick.waste.push({bidder: follower, card: aceClubs});

        const winner = trick.getWinningPlay(factory.clubs);

        expect(winner?.bidder.id).toBe(follower.id);
    });
});