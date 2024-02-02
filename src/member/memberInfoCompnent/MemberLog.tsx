import React, {useEffect, useRef, useState} from "react";
import axios from "axios";

import HeaderNavigation from "../../navigation/HeaderNavigation";
import FooterNavigation from "../../navigation/FooterNavigation";
import TopButtonNavigation from "../../navigation/TopButtonNavigation";

import * as Styled from "./MemberLog.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown as arrow} from "@fortawesome/free-solid-svg-icons";

const MemberLog = () => {
    const sortBox:any = useRef<any>();
    const sortList:any = useRef<any>();
    const sortBtn:any = useRef<any>([]);
    const selectArrow:any = useRef<any>();

    const [pageNo, setPageNo] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [memberLogList, setMemberLogList] = useState<{
        memberLogNo:number;
        memberLogType:string;
        memberLogIpAddress:string;
        memberLogSuccessYn:string;
        memberLogReason:string;
        memberLogDate:string;
    }[]>([]);

    const sortItem:{
        sortKey:string;
        sortValue:string;
    }[] = [{
        sortKey: 'N',
        sortValue: '최신순'
    }, {
        sortKey: 'O',
        sortValue: '오래된순'
    }];
    const [sortType, setSortType] = useState<string>("N");
    const [sortSelect, setSortSelect] = useState<number>(0);
    const [isSortBoxShow, setIsSortBoxShow] = useState<boolean>(false);

    const sortItemList = ():any[] => {
        let result:any[] = [];
        for(let i:number=0; i<sortItem.length; i++) {
            result.push(<li key={i}
                            ref={btn => (sortBtn.current[i] = btn)}
                            onClick={() => onClickSortSelectBox(i, sortItem[i].sortKey)}>
                {sortItem[i].sortValue}</li>)
        }
        return result;
    }

    const onClickSortSelectBox = (idx:number, sortSelect:string):void => {
        setIsSortBoxShow(false);
        setSortSelect(idx);
        setSortType(sortSelect);
    }

    useEffect(() => {
        const memberLogListData = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/member/findAllMemberLog",
                params: {pageNo: pageNo, sortType: sortType}
            }).then((res):void => {
                setMemberLogList(res.data.data.loginLogList);
                setTotalPage(res.data.data.totalPage);
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        setTimeout(() => {memberLogListData().then();}, 200);
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
                <div className="ml-main-list">
                    <div className="ml-list-view">
                        <div className="ml-list-top">
                            <div className="list-top-left">
                                <span>전체</span> {totalPage}개
                            </div>
                            <div className="list-top-right">
                                <button onClick={() => setIsSortBoxShow(!isSortBoxShow)}>
                                    {sortItem[sortSelect].sortValue}
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
                        <div className="ml-list">
                            {memberLogList.map((item, idx) => (
                                <div className="ml-list-item" key={idx}>
                                    <div className="item-info">
                                        <div className="item-successYn" style={
                                            item.memberLogSuccessYn === 'Y' ?
                                                {backgroundColor: "lightgreen"} :
                                                {backgroundColor: "orangered"}
                                        }>
                                            {item.memberLogSuccessYn === 'Y' ? "성공" : "실패"}
                                        </div>
                                        <div className="item-reason">
                                            {item.memberLogReason}
                                        </div>
                                    </div>
                                    <div className="item-date">
                                        {item.memberLogDate}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {
                            totalPage > memberLogList.length ?
                                <div className="ml-more-btn" onClick={() => setPageNo(pageNo + 1)}>
                                    더보기 <FontAwesomeIcon icon={arrow} />
                                </div>
                                :
                                <div />
                        }
                    </div>
                </div>
            </div>
            <TopButtonNavigation type={""} />

            <FooterNavigation />
        </Styled.MemberLogView>
    )
}

export default MemberLog;