import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        bgColor: string;
        reverseBgColor: string;
        textColor: string;
        reverseTextColor: string;
        borderColor: string;
        borderBottomColor: string;
        boxBgColor: string;
        cardBgColor: string;
        noticeBgColor: string;
        inputBgColor: string;
        toggleColor: string;
        topBtnColor: string;
        headerBgColor: string;
        headerTextColor: string;
        datePickerSelectColor: string;
        rgbaLight: string;
        rgbaMedium: string;
        rgbaBold: string;
    }
}