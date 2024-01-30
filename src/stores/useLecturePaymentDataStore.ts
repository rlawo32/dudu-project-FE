import {create} from "zustand";

interface lecturePaymentStoreData {
    isSuccess: boolean;
    setIsSuccess: (success: boolean) => void;
}

const useLecturePaymentStoreData = create<lecturePaymentStoreData>((set) => ({

    isSuccess: false,
    setIsSuccess: (success: boolean) =>
        set((state: {isSuccess: boolean}) => ({
            isSuccess: (state.isSuccess = success),
        })),
}));
export default useLecturePaymentStoreData;