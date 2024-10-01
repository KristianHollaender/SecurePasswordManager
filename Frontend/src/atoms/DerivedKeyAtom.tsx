import {atom} from "jotai";

const initialDerivedKey = null;
export const DerivedAtom = atom<Uint8Array | null>(initialDerivedKey);
