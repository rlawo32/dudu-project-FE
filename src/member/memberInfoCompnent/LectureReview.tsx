import React, {useEffect, useRef, useState} from "react";
import axios from "axios";

import HeaderNavigation from "../../navigation/HeaderNavigation";
import FooterNavigation from "../../navigation/FooterNavigation";

import * as Styled from "./LectureReview.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChevronDown as arrow,
    faExclamation as emptyIcon, faQuoteLeft as quoteLeft, faQuoteRight as quoteRight,
    faSearch as searchIcon
} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

const LectureReview = () => {
    const navigate = useNavigate();
    const sortBox:any = useRef<any>();
    const sortList:any = useRef<any>();
    const sortBtn:any = useRef<any>([]);
    const selectArrow:any = useRef<any>();

    const [pageNo, setPageNo] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);

    const sortItem:string[] = ['2024', '2023'];
    const [sortType, setSortType] = useState<string>("");
    const [sortSelect, setSortSelect] = useState<number>(0);
    const [isSortBoxShow, setIsSortBoxShow] = useState<boolean>(false);

    const [lectureReviewList, setLectureReviewList] = useState<{
        lectureApplicationNo:number;
        lectureApplicationOrderId:string;
        lectureApplicationAmount:number;
        lectureApplicationCancelYn:string;
        lectureApplicationCancelDesc:string;
        lectureApplicationCreatedDate:string;
        lectureApplicationMemberName:string;
        lectureNo:number;
        lectureInstitutionName:string;
        lectureTitle:string;
        lectureTeacher:string;
        lecturePeriod:string;
        lectureTime:string;
        lectureCount:number;
        lectureFee:number;
        lectureStateNo:number;
    }[]>([]);

    const sortItemList = ():any[] => {
        let result:any[] = [];
        for(let i:number=0; i<=sortItem.length; i++) {
            if(i === 0) {
                result.push(<li key={i}
                                ref={btn => (sortBtn.current[i] = btn)}
                                onClick={() => onClickSortSelectBox(i, "")}>
                    전체</li>)
            } else {
                result.push(<li key={i}
                                ref={btn => (sortBtn.current[i] = btn)}
                                onClick={() => onClickSortSelectBox(i, sortItem[i-1])}>
                    {sortItem[i-1]}</li>)
            }
        }
        return result;
    }

    const onClickSortSelectBox = (idx:number, sortSelect:string):void => {
        setIsSortBoxShow(false);
        setSortSelect(idx);
        setSortType(sortSelect);
    }

    useEffect(() => {
        const getListData:object = {
            pageNo: pageNo,
            searchCategory: 'R',
            sortType: sortType,
            searchText: ''
        }
        const lectureReviewListData = async () => {
            await axios({
                method: "POST",
                url: '/lecture/lectureApplicationList',
                data: JSON.stringify(getListData),
                headers: {'Content-type': 'application/json'}
            }).then((res):void => {
                setLectureReviewList(res.data.data.applicationList);
                setTotalPage(res.data.data.totalPage);
            }).catch((err):void => {
                console.log(err.message);
            });
        }
        setTimeout(() => {lectureReviewListData().then();}, 200);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNo, sortType])

    useEffect(() => {
        if(isSortBoxShow) {
            sortBox.current.className += " show-list";
            sortList.current.className += " show-list";
            selectArrow.current.className += " show-list";
        } else {
            sortBox.current.className = sortBox.current.className.replace(' show-list', '');
            sortList.current.className = sortList.current.className.replace(' show-list', '');
            selectArrow.current.className = selectArrow.current.className.replace(' show-list', '');
        }
    }, [isSortBoxShow])

    useEffect(() => {
        sortBtn.current[sortSelect].className = sortBtn.current[sortSelect].className.replace('sort-active', '');
        sortBtn.current[sortSelect].className += 'sort-active';

        for(let i:number=0; i<sortBtn.current.length; i++) {
            if(i !== sortSelect) {
                sortBtn.current[i].className = sortBtn.current[i].className.replace('sort-active', '');
            }
        }
    }, [sortSelect])

    return (
        <Styled.LectureReviewView>
            <HeaderNavigation />

            <div className="lr-sub">
                <div className="lr-sub-view">
                    <div className="lr-sub-title">
                        나의 수강후기
                    </div>
                </div>
            </div>

            <div className="lr-main">
                <div className="lr-main-list">
                    <div className="lr-list-view">
                        <div className="lr-list-top">
                            <div className="list-top-left">
                                <span>전체</span> {totalPage}개
                            </div>

                            <div className="list-top-right">
                                <button onClick={() => setIsSortBoxShow(!isSortBoxShow)}>
                                    {
                                        sortSelect === 0 ?
                                            "전체"
                                            :
                                            sortItem[sortSelect-1] + "년"
                                    }
                                    <div className="select-arrow" ref={selectArrow}>
                                        <FontAwesomeIcon icon={arrow} />
                                    </div>
                                </button>
                                <div className="sort-box" ref={sortBox}>
                                    <ul className="sort-list" ref={sortList}>
                                        {sortItemList()}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {
                            lectureReviewList.length > 0 ?
                                <div className="lr-list">
                                    {lectureReviewList.map((item, idx) => (
                                        <div key={idx} className="lr-list-item">
                                            <div className="item-head">
                                                <div className="head-left">
                                                    <div className="head-value item-orderId">
                                                        <div>
                                                            주문번호
                                                        </div>
                                                        {item.lectureApplicationOrderId}
                                                    </div>
                                                    <div className="head-value item-date">
                                                        <div>
                                                            {
                                                                item.lectureApplicationCancelYn === 'N' ?
                                                                    "결제일" : "취소일"
                                                            }
                                                        </div>
                                                        {item.lectureApplicationCreatedDate}
                                                    </div>
                                                </div>

                                                <div className="head-rigth">
                                                    <div className="payment-cancel-btn">
                                                        수강완료
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item-body">
                                                <div className="body-value body-top">
                                                    <div className="item-institution">
                                                        {item.lectureInstitutionName}
                                                    </div>
                                                    <div className="item-title"
                                                         onClick={() => navigate("/lectureDetail/" + item.lectureNo,
                                                             { state: {lectureNo: item.lectureNo}})}>
                                                        {item.lectureTitle}
                                                    </div>
                                                </div>
                                                <div className="body-value body-bot">
                                                    <div className="item-teacher">
                                                        {item.lectureTeacher}
                                                    </div>
                                                    <div className="item-period">
                                                        {item.lecturePeriod}
                                                        <span>
                                                            {
                                                                item.lectureTime.substring(13, 14) === '1' ? '(월)' :
                                                                    item.lectureTime.substring(13, 14) === '2' ? '(화)' :
                                                                        item.lectureTime.substring(13, 14) === '3' ? '(수)' :
                                                                            item.lectureTime.substring(13, 14) === '4' ? '(목)' :
                                                                                item.lectureTime.substring(13, 14) === '5' ? '(금)' :
                                                                                    item.lectureTime.substring(13, 14) === '6' ? '(토)' : '(일)'
                                                            }
                                                        </span>
                                                        <span>
                                                            {item.lectureTime.substring(0, 11)}
                                                        </span>
                                                        <span>/ {item.lectureCount}회</span>
                                                    </div>
                                                    <div className="item-fee">
                                                        <span>강좌료 :</span>
                                                        {item.lectureFee.toLocaleString()}원
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item-foot">
                                                <button onClick={() => navigate("/reviewWrite")}>
                                                    후기 작성하기
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                :
                                <div className="lh-list-empty">
                                    <div>
                                        <FontAwesomeIcon icon={emptyIcon} className="icon-custom" />
                                        <div className="default-text">
                                            수강내역이 없습니다.
                                        </div>
                                    </div>
                                </div>
                        }
                        {
                            totalPage > lectureReviewList.length ?
                                <div className="lh-more-btn" onClick={() => setPageNo(pageNo + 1)}>
                                    더보기 <FontAwesomeIcon icon={arrow} />
                                </div>
                                :
                                <div />
                        }
                    </div>
                </div>
            </div>

            <FooterNavigation />
        </Styled.LectureReviewView>
    )
}

export default LectureReview;