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
