import React from "react";

import HeaderNavigation from "../../navigation/HeaderNavigation";
import FooterNavigation from "../../navigation/FooterNavigation";

import * as Styled from "./MemberLog.style";

const MemberLog = () => {

    return (
        <Styled.MemberLogView>
            <HeaderNavigation />

            <div className="mi-sub">
                <div className="mi-sub-view">
                    <div className="mi-sub-title">
                        로그인 기록
                    </div>
                </div>
            </div>

            <FooterNavigation />
        </Styled.MemberLogView>
    )
}

export default MemberLog;