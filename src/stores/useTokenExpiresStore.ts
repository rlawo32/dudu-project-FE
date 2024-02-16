import { create } from "zustand";

interface tokenExpiresStore {
    tokenExpiresTime: number;
    setTokenExpiresTime: (decrease: number) => void;
}

const useTokenExpiresStore = create<tokenExpiresStore>((set) => ({
    // 초기
    tokenExpiresTime: 0,
    setTokenExpiresTime: (decrease: number) =>
        set((state: {tokenExpiresTime: number}) => ({
            tokenExpiresTime: (state.tokenExpiresTime = decrease),
        })),
}));

export default useTokenExpiresStore;
export type { tokenExpiresStore };