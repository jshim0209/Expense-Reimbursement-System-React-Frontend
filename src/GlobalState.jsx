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

export const allTypesState = atom({
  key: "allTypesState",
  default: [],
});

export const typeState = atom({
  key: "typeState",
  default: {},
});

export const allStatusesState = atom({
  key: "allStatusesState",
  default: [],
});

export const statusState = atom({
  key: "statusState",
  default: {},
});
