import React, {useEffect, useRef, useState} from "react";

import HeaderNavigation from "../../navigation/HeaderNavigation";
import FooterNavigation from "../../navigation/FooterNavigation";

import * as Styled from "./LectureHistory.style";
import {faSearch as searchIcon} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";

const LectureHistory = () => {
    const categoryBtn:any = useRef<any>([]);

    const [pageNo, setPageNo] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [sortType, setSortType] = useState<string>("");
    const [lectureApplicationList, setLectureApplicationList] = useState<{
        lectureApplicationNo:number;
        lectureApplicationOrderId:string;
        lectureApplicationAmount:number;
        lectureApplicationCancelYn:string;
        lectureApplicationCancelDesc:string;
        lectureApplicationCreatedDate:string;
        lectureApplicationMemberName:string;
        lectureInstitutionName:string;
        lectureTitle:string;
        lectureTeacher:string;
        lecturePeriod:string;
        lectureTime:string;
        lectureCount:number;
        lectureFee:number;
    }[]>([]);

    const [isCategorySearch, setIsCategorySearch] = useState<boolean>(false);
    const [categorySelect, setCategorySelect] = useState<number>(0);
    const [isSearchText, setIsSearchText] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");

    useEffect(() => {
        const getListData:object = {
            pageNo: pageNo,
            sortType: sortType,
            searchText: searchText
        }
        const lectureApplicationListData = async () => {
            await axios({
                method: "POST",
                url: '/lecture/lectureApplicationList',
                data: JSON.stringify(getListData),
                headers: {'Content-type': 'application/json'}
            }).then((res):void => {
                console.log(res.data.data)
                setLectureApplicationList(res.data.data.applicationList);
                setTotalPage(res.data.data.totalPage);
            }).catch((err):void => {
                console.log(err.message);
            });
        }
        setTimeout(() => {lectureApplicationListData().then();}, 100);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNo, sortType, isSearchText])

    useEffect(() => {
        categoryBtn.current[categorySelect].className = categoryBtn.current[categorySelect].className.replace(' category-active', '');
        categoryBtn.current[categorySelect].className += ' category-active';

        for(let i:number=0; i<categoryBtn.current.length; i++) {
            if(i !== categorySelect) {
                categoryBtn.current[i].className = categoryBtn.current[i].className.replace(' category-active', '');
            }
        }
    }, [categorySelect])

    return (
        <Styled.LectureHistoryView>
            <HeaderNavigation />

            <div className="lh-sub">
                <div className="lh-sub-view">
                    <div className="lh-sub-title">
                        수강내역 조회
                    </div>
                </div>
            </div>

            <div className="lh-main">
                <div className="lh-main-notice">
                    <ul>
                        <li>데스크에서 접수한 강좌의 경우 방문 시에만 취소 가능합니다. (결제한 카드 및 영수증 지참 필수)</li>
                        <li>재료 준비가 필요한 일부 강좌(요리, 공예, 플라워 등)는 강좌 시작일의 3일 전까지 취소 가능합니다.</li>
                        <li>환불 및 수강 취소시 강의시작일로부터 3일전은 환불액에서 1/3 환급, 2일전은 1/2 환급, 전날부터는 환불이 불가합니다.</li>
                    </ul>
                </div>
                <div className="lh-main-list">
                    <div className="lh-list-category">
                        <div className="lh-category" onClick={() => (setIsCategorySearch(false), setCategorySelect(0))}
                             ref={btn => (categoryBtn.current[0] = btn)}>
                            수강내역 조회
                        </div>
                        <div className="lh-category" onClick={() => (setIsCategorySearch(true), setCategorySelect(1))}
                             ref={btn => (categoryBtn.current[1] = btn)}>
                            취소내역 조회
                        </div>
                    </div>
                    <div className="lh-list-search">
                        <input type="text" onChange={(e) => setSearchText(e.target.value)}
                               placeholder="주문번호/강좌명으로 검색하세요" />
                        <FontAwesomeIcon icon={searchIcon} className="icon-custom"
                                         onClick={() => setIsSearchText(!isSearchText)}/>
                    </div>
                    <div className="lh-list-view">
                        <div className="lh-list-top">
                            <div className="list-top-left">
                                전체 1개
                            </div>
                            <div className="list-top-right">
                                전체연도
                            </div>
                        </div>
                        <div className="lh-list">

                        </div>
                    </div>
                </div>
            </div>

            <FooterNavigation />
        </Styled.LectureHistoryView>
    )
}

export default LectureHistory;