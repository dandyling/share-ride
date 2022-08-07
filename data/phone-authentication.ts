import { ConfirmationResult } from "firebase/auth";
import { atom } from "jotai";

export const confirmationResultAtom = atom<ConfirmationResult | undefined>(
  undefined
);

export const displayNameAtom = atom("");
