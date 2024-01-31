import React, {useEffect, useState} from "react";
import axios from "axios";

import HeaderNavigation from "../../navigation/HeaderNavigation";
import FooterNavigation from "../../navigation/FooterNavigation";

import * as Styled from "./MemberLog.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch as searchIcon} from "@fortawesome/free-solid-svg-icons";

const MemberLog = () => {

    const [pageNo, setPageNo] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [sortType, setSortType] = useState<string>("");
    const [memberLogList, setMemberLogList] = useState<{
        memberLogNo:number;
        memberLogType:string;
        memberLogIpAddress:string;
        memberLogSuccessYn:string;
        memberLogReason:string;
        memberLogDate:string;
    }[]>([]);

    const [isSearchText, setIsSearchText] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");

    useEffect(() => {
        const memberLogListData = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/member/findAllMemberLog",
                params: {pageNo: pageNo, sortType: sortType}
            }).then((res):void => {
                console.log(res.data.data)
                setMemberLogList(res.data.data.loginLogList);
                setTotalPage(res.data.data.totalPage);
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        setTimeout(() => {memberLogListData().then();}, 0);
    }, [pageNo, sortType])

    return (
        <Styled.MemberLogView>
            <HeaderNavigation />

            <div className="ml-sub">
                <div className="ml-sub-view">
                    <div className="ml-sub-title">
                        로그인 기록
                    </div>
                </div>
            </div>

            <div className="ml-main">
                <div className="ml-main-notice">
                    <ul>
                        <li>데스크에서 접수한 강좌의 경우 방문 시에만 취소 가능합니다. (결제한 카드 및 영수증 지참 필수)</li>
                        <li>재료 준비가 필요한 일부 강좌(요리, 공예, 플라워 등)는 강좌 시작일의 3일 전까지 취소 가능합니다.</li>
                        <li>환불 및 수강 취소시 강의시작일로부터 3일전은 환불액에서 1/3 환급, 2일전은 1/2 환급, 전날부터는 환불이 불가합니다.</li>
                    </ul>
                </div>
                <div className="ml-main-list">
                    <div className="ml-list-search">
                        <input type="text" onChange={(e) => setSearchText(e.target.value)}
                               placeholder="날짜를 검색하세요" />
                        <FontAwesomeIcon icon={searchIcon} className="icon-custom"
                                         onClick={() => setIsSearchText(!isSearchText)}/>
                    </div>
                    <div className="ml-list-view">
                        <div className="ml-list-top">
                            <div className="list-top-left">
                                전체 1개
                            </div>
                            <div className="list-top-right">
                                전체연도
                            </div>
                        </div>
                        <div className="ml-list">

                        </div>
                    </div>
                </div>
            </div>

            <FooterNavigation />
        </Styled.MemberLogView>
    )
}

export default MemberLog;