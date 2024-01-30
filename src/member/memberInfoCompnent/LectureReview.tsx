import React from "react";

import HeaderNavigation from "../../navigation/HeaderNavigation";
import FooterNavigation from "../../navigation/FooterNavigation";

import * as Styled from "./LectureReview.style";

const LectureReview = () => {

    return (
        <Styled.LectureReviewView>
            <HeaderNavigation />

            <div className="mi-sub">
                <div className="mi-sub-view">
                    <div className="mi-sub-title">
                        나의 수강후기
                    </div>
                </div>
            </div>

            <FooterNavigation />
        </Styled.LectureReviewView>
    )
}

export default LectureReview;