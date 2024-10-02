import {atom} from "jotai";
import {User} from "../models/User.ts";

const initialUser = null;

export const UserAtom = atom<User | null>(initialUser);
