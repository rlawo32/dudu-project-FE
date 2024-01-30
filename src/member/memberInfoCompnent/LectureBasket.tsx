import React from "react";

import HeaderNavigation from "../../navigation/HeaderNavigation";
import FooterNavigation from "../../navigation/FooterNavigation";

import * as Styled from "./LectureBasket.style";

const LectureBasket = () => {

    return (
        <Styled.LectureBasketView>
            <HeaderNavigation />

            <div className="mi-sub">
                <div className="mi-sub-view">
                    <div className="mi-sub-title">
                        장바구니
                    </div>
                </div>
            </div>

            <FooterNavigation />
        </Styled.LectureBasketView>
    )
}

export default LectureBasket;