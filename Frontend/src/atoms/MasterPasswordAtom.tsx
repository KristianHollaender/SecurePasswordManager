import {atom} from "jotai";

const initialMasterPassword = "";
export const MasterPasswordAtom = atom<string>(initialMasterPassword);
