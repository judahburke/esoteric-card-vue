import type {
  CardRankKey,
  CardSuitKey,
  CardSuitColorKey,
  CardErrorKey,
} from "@/lib/card/enums";
import type {
  PitchIntelligence,
  PitchBidValidation,
  PitchPlayValidation,
  PitchErrorKey,
} from "@/lib/pitch/enums";

interface LocaleMap {
  mapPitchIntelligence(key: PitchIntelligence): string;
  mapCardRank(key: CardRankKey): string;
  mapCardSuit(key: CardSuitKey): string;
  mapCardSuitColor(key: CardSuitColorKey): string;
  mapPitchBidVal(key: PitchBidValidation): string;
  mapPitchPlayVal(key: PitchPlayValidation): string;
  mapPitchError(key: PitchErrorKey): string;
  mapCardError(key: CardErrorKey): string;
}

export type { LocaleMap };
