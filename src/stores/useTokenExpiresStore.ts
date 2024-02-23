import { create } from "zustand";

interface tokenExpiresStore {
    isTokenExpiresTimeStart: boolean;
    setIsTokenExpiresTimeStart: (time: boolean) => void;
    isTokenExpiresTimeBox: boolean;
    setIsTokenExpiresTimeBox: (box: boolean) => void;
    tokenExpiresTime: number;
    setTokenExpiresTime: (decrease: number) => void;
}

const useTokenExpiresStore = create<tokenExpiresStore>((set) => ({
    isTokenExpiresTimeStart: false,
    setIsTokenExpiresTimeStart: (time: boolean) =>
        set((state: {isTokenExpiresTimeStart: boolean}) => ({
            isTokenExpiresTimeStart: (state.isTokenExpiresTimeStart = time),
        })),
    isTokenExpiresTimeBox: false,
    setIsTokenExpiresTimeBox: (box: boolean) =>
        set((state: {isTokenExpiresTimeBox: boolean}) => ({
            isTokenExpiresTimeBox: (state.isTokenExpiresTimeBox = box),
        })),
    tokenExpiresTime: 0,
    setTokenExpiresTime: (decrease: number) =>
        set((state: {tokenExpiresTime: number}) => ({
            tokenExpiresTime: (state.tokenExpiresTime = decrease),
        })),
}));

export default useTokenExpiresStore;
export type { tokenExpiresStore };