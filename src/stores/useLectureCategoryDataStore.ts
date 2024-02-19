import { create } from "zustand";

interface lectureCategoryDataStore {
    institutionNo:number;
    setInstitutionNo: (num:number) => void;
}

const useLectureCategoryDataStore = create<lectureCategoryDataStore>((set) => ({
    institutionNo: 1,
    setInstitutionNo: (num: number) =>
        set((state: {institutionNo: number}) => ({
            institutionNo: (state.institutionNo = num),
        })),
}));

export default useLectureCategoryDataStore;
export type { lectureCategoryDataStore };