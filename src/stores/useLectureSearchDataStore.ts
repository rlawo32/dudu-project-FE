import { create } from "zustand";

interface lectureSearchDataStore {
    searchButton:boolean;
    setSearchButton: (btn:boolean) => void;
    searchText:string;
    setSearchText: (text:string) => void;
    ltDivisionArr: {idx:number; dvItem:string}[];
    setLtDivisionArr: (idx:number, dvItem:string) => void;
    removeLtDivisionArr: (rmItem:string) => void;
    removeAllLtDivisionArr: () => void;
    ltStateArr: {idx:number; stItem:number; stName:string}[];
    setLtStateArr: (idx:number, stItem:number, stName:string) => void;
    removeLtStateArr: (rmItem:number) => void;
    removeAllLtStateArr: () => void;
    ltDowArr: {idx:number; dwItem:number; dwName:string}[];
    setLtDowArr: (idx:number, dwItem:number, dwName:string) => void;
    removeLtDowArr: (rmItem:number) => void;
    removeAllLtDowArr: () => void;
    ltFeeArr: {idx:number; feItem:number; feKey:string; feValue:string; feName:string}[];
    setLtFeeArr: (idx:number, feItem:number, feKey:string, feValue:string, feName:string) => void;
    removeLtFeeArr: (rmItem:number) => void;
    removeAllLtFeeArr: () => void;
}

const useLectureSearchDataStore = create<lectureSearchDataStore>((set) => ({
    searchButton: false,
    setSearchButton: (btn: boolean) =>
        set((state: {searchButton: boolean}) => ({
            searchButton: (state.searchButton = btn),
        })),
    searchText: "",
    setSearchText: (text: string) =>
        set((state: {searchText: string}) => ({
            searchText: (state.searchText = text),
        })),
    ltDivisionArr: [],
    setLtDivisionArr: (idx: number, dvItem: string) =>
        set((state) => ({
            ltDivisionArr: [...state.ltDivisionArr, {idx, dvItem}],
        })),
    removeLtDivisionArr: (rmItem: string) =>
        set((state) => ({
            ltDivisionArr: state.ltDivisionArr.filter((dvArr) => dvArr.dvItem !== rmItem),
        })),
    removeAllLtDivisionArr: () =>
        set(() => ({
            ltDivisionArr: [],
        })),
    ltStateArr: [],
    setLtStateArr: (idx: number, stItem: number, stName: string) =>
        set((state) => ({
            ltStateArr: [...state.ltStateArr, {idx, stItem, stName}],
        })),
    removeLtStateArr: (rmItem: number) =>
        set((state) => ({
            ltStateArr: state.ltStateArr.filter((stArr) => stArr.stItem !== rmItem),
        })),
    removeAllLtStateArr: () =>
        set(() => ({
            ltStateArr: [],
        })),
    ltDowArr: [],
    setLtDowArr: (idx: number, dwItem: number, dwName: string) =>
        set((state) => ({
            ltDowArr: [...state.ltDowArr, {idx, dwItem, dwName}],
        })),
    removeLtDowArr: (rmItem: number) =>
        set((state) => ({
            ltDowArr: state.ltDowArr.filter((dwArr) => dwArr.dwItem !== rmItem),
        })),
    removeAllLtDowArr: () =>
        set(() => ({
            ltDowArr: [],
        })),
    ltFeeArr: [],
    setLtFeeArr: (idx: number, feItem: number, feKey: string, feValue: string, feName: string) =>
        set((state) => ({
            ltFeeArr: [...state.ltFeeArr, {idx, feItem, feKey, feValue, feName}],
        })),
    removeLtFeeArr: (rmItem: number) =>
        set((state) => ({
            ltFeeArr: state.ltFeeArr.filter((feArr) => feArr.feItem !== rmItem),
        })),
    removeAllLtFeeArr: () =>
        set(() => ({
            ltFeeArr: [],
        })),
}));

export default useLectureSearchDataStore;
export type { lectureSearchDataStore };