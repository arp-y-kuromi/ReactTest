import { atom } from "jotai";

export const formDataAtom = atom({
  name: "",
  userName: "",
  mail: "",
  password: "",
  checkPassword: "",
});

export const formErrorAtom = atom({
  name: "",
  userName: "",
  mail: "",
  password: "",
  checkPassword: "",
});

export const frg = atom(false);
