import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import HeaderNavigation from "../../navigation/HeaderNavigation";
import FooterNavigation from "../../navigation/FooterNavigation";
import LectureCancelModal from "./LectureCancelModal";
import useLectureSearchDataStore from "../../stores/useLectureSearchDataStore";

import * as Styled from "./LectureHistory.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChevronDown as arrow,
    faExclamation as emptyIcon, faQuoteLeft as quoteLeft, faQuoteRight as quoteRight,
    faSearch as searchIcon
} from "@fortawesome/free-solid-svg-icons";

const LectureHistory = () => {
    const navigate = useNavigate();
    const sortBox:any = useRef<any>();
    const sortList:any = useRef<any>();
    const sortBtn:any = useRef<any>([]);
    const selectArrow:any = useRef<any>();
    const categoryBtn:any = useRef<any>([]);

    const {searchButton, setSearchButton, setSearchText} = useLectureSearchDataStore();

    const [pageNo, setPageNo] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [lectureApplicationList, setLectureApplicationList] = useState<{
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
    }[]>([]);

    const sortItem:string[] = ['2024', '2023'];
    const [sortType, setSortType] = useState<string>("");
    const [sortSelect, setSortSelect] = useState<number>(0);
    const [isSortBoxShow, setIsSortBoxShow] = useState<boolean>(false);

    const [searchCategory, setSearchCategory] = useState<string>("N");
    const [categorySelect, setCategorySelect] = useState<number>(0);
    const [isSearchText, setIsSearchText] = useState<boolean>(false);
    const [dataSearchText, setDataSearchText] = useState<string>("");

    const [isCancelModalShow, setIsCancelModalShow] = useState<boolean>(false);
    const [lectureCancelData, setLectureCancelData] = useState<{
        lectureApplicationNo:number;
        lectureApplicationOrderId:string;
    }>({
        lectureApplicationNo: 0,
        lectureApplicationOrderId: ''
    });

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
            searchCategory: searchCategory,
            sortType: sortType,
            searchText: dataSearchText
        }
        const lectureApplicationListData = async () => {
            await axios({
                method: "POST",
                url: '/lecture/lectureApplicationList',
                data: JSON.stringify(getListData),
                headers: {'Content-type': 'application/json'}
            }).then((res):void => {
                setLectureApplicationList(res.data.data.applicationList);
                setTotalPage(res.data.data.totalPage);
            }).catch((err):void => {
                console.log(err.message);
            });
        }
        setTimeout(() => {lectureApplicationListData().then();}, 200);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNo, sortType, isSearchText, searchCategory])

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
                        <div className="lh-category" onClick={() => (setSearchCategory("N"), setCategorySelect(0))}
                             ref={btn => (categoryBtn.current[0] = btn)}>
                            수강내역 조회
                        </div>
                        <div className="lh-category" onClick={() => (setSearchCategory("Y"), setCategorySelect(1))}
                             ref={btn => (categoryBtn.current[1] = btn)}>
                            취소내역 조회
                        </div>
                    </div>
                    <div className="lh-list-search">
                        <input type="text" onChange={(e) => setDataSearchText(e.target.value)}
                               placeholder="주문번호/강좌명으로 검색하세요" />
                        <FontAwesomeIcon icon={searchIcon} className="icon-custom"
                                         onClick={() => setIsSearchText(!isSearchText)}/>
                    </div>
                    <div className="lh-list-view">
                        <div className="lh-list-top">
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
                        <div className="lh-modal-section">
                            {isCancelModalShow ? <LectureCancelModal setIsModal={setIsCancelModalShow} lectureCancelData={lectureCancelData}/> : <div/>}
                        </div>
                        {
                            lectureApplicationList.length > 0 ?
                                <div className="lh-list">
                                    {lectureApplicationList.map((item, idx) => (
                                        <div key={idx} className="lh-list-item">
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
                                                    {
                                                        item.lectureApplicationCancelYn === 'N' ?
                                                            <button className="payment-cancel-btn"
                                                                    onClick={() => {
                                                                        window.scrollTo({ top: 50, behavior: "smooth" });
                                                                        setIsCancelModalShow(true);
                                                                        setLectureCancelData({
                                                                            lectureApplicationNo: item.lectureApplicationNo,
                                                                            lectureApplicationOrderId: item.lectureApplicationOrderId
                                                                        })}}>
                                                                취소
                                                            </button>
                                                            :
                                                            <div />
                                                    }
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
                                                    <div className="item-mote-btn">
                                                        <button onClick={() => {setSearchButton(!searchButton);
                                                            setSearchText(item.lectureTeacher);
                                                            navigate("/lectureList");}}>
                                                            이 강사의 강좌 더보기
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item-foot">
                                                <div className="item-memberName">
                                                    {item.lectureApplicationMemberName}(본인)
                                                </div>
                                                <div className="foot-value">
                                                    <div className="item-paymentState">
                                                        <span>접수상태</span>
                                                        {item.lectureApplicationCancelYn === 'N' ? "결제완료" : "취소완료"}
                                                    </div>
                                                    <div className="item-paymentFee">
                                                        <span>주문금액</span>
                                                        {item.lectureApplicationAmount.toLocaleString()}원
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                :
                                <div className="lh-list-empty">
                                    <div>
                                        <FontAwesomeIcon icon={emptyIcon} className="icon-custom" />
                                        {
                                            dataSearchText.length > 0 ?
                                                <div className="empty-text">
                                                    <FontAwesomeIcon icon={quoteLeft} className="icon-custom" />
                                                    <span className="search-text">
                                                        {dataSearchText}
                                                    </span>
                                                    <FontAwesomeIcon icon={quoteRight} className="icon-custom" />
                                                    <span className="default-text">
                                                        에 대한
                                                    </span>
                                                    <div className="default-text">
                                                        검색결과가 없어요.
                                                    </div>
                                                </div>
                                                :
                                                <div className="default-text">
                                                    {
                                                        searchCategory === 'N' ? "수강내역이 없습니다." :
                                                            "취소내역이 없습니다."
                                                    }
                                                </div>
                                        }
                                    </div>
                                </div>
                        }
                        {
                            totalPage > lectureApplicationList.length ?
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
        </Styled.LectureHistoryView>
    )
}

export default LectureHistory;