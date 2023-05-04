import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userState = atom({
  key: "userState",
  default: {
    isLoggedIn: false,
    isManager: false,
  },
  effects_UNSTABLE: [persistAtom],
});

export const errorState = atom({
  key: "errorState",
  default: {
    isError: false,
    message: "",
  },
});

export const reimbursementState = atom({
  key: "reimbursementState",
  default: [],
});

export const typeState = atom({
  key: "typeState",
  default: [],
});
