import React, {useState} from "react";

import HeaderNavigation from "../../navigation/HeaderNavigation";
import FooterNavigation from "../../navigation/FooterNavigation";

import * as Styled from "./LectureBasket.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch as searchIcon} from "@fortawesome/free-solid-svg-icons";

const LectureBasket = () => {

    const [isSearchText, setIsSearchText] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");

    return (
        <Styled.LectureBasketView>
            <HeaderNavigation />

            <div className="lb-sub">
                <div className="lb-sub-view">
                    <div className="lb-sub-title">
                        장바구니
                    </div>
                </div>
            </div>

            <div className="lb-main">
                <div className="lb-main-notice">
                    <ul>
                        <li>데스크에서 접수한 강좌의 경우 방문 시에만 취소 가능합니다. (결제한 카드 및 영수증 지참 필수)</li>
                        <li>재료 준비가 필요한 일부 강좌(요리, 공예, 플라워 등)는 강좌 시작일의 3일 전까지 취소 가능합니다.</li>
                        <li>환불 및 수강 취소시 강의시작일로부터 3일전은 환불액에서 1/3 환급, 2일전은 1/2 환급, 전날부터는 환불이 불가합니다.</li>
                    </ul>
                </div>
                <div className="lb-main-list">
                    <div className="lb-list-search">
                        <input type="text" onChange={(e) => setSearchText(e.target.value)}
                               placeholder="주문번호/강좌명으로 검색하세요" />
                        <FontAwesomeIcon icon={searchIcon} className="icon-custom"
                                         onClick={() => setIsSearchText(!isSearchText)}/>
                    </div>
                    <div className="lb-list-view">
                        <div className="lb-list-top">
                            <div className="list-top-left">
                                전체 1개
                            </div>
                            <div className="list-top-right">
                                전체연도
                            </div>
                        </div>
                        <div className="lb-list">

                        </div>
                    </div>
                </div>
            </div>

            <FooterNavigation />
        </Styled.LectureBasketView>
    )
}

export default LectureBasket;