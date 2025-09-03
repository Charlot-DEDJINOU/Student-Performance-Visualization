import { StrandDisplayName, StrandKey } from "../types/education";

export const STRAND_DISPLAY_TO_KEY: Record<StrandDisplayName, StrandKey> = {
  "Letter Identification": "letterIdentification",
  "Letter Naming": "letterNaming",
  "Letter Formation": "letterFormation",
  "Phonemic Awareness": "phonemicAwareness",
};

export const STRAND_KEY_TO_DISPLAY: Record<StrandKey, StrandDisplayName> = {
  letterIdentification: "Letter Identification",
  letterNaming: "Letter Naming",
  letterFormation: "Letter Formation",
  phonemicAwareness: "Phonemic Awareness",
};

export function getStrandDisplayName(key: StrandKey): StrandDisplayName {
  return STRAND_KEY_TO_DISPLAY[key] ?? (key as StrandDisplayName);
}
