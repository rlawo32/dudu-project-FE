import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import HeaderNavigation from "../../navigation/HeaderNavigation";
import FooterNavigation from "../../navigation/FooterNavigation";

import * as Styled from "./LectureBasket.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan as deleteIcon, faSquareCheck as checkIcon,
    faChevronDown as arrow, faExclamation as emptyIcon
} from "@fortawesome/free-solid-svg-icons";
import {faSquareCheck as unCheckIcon} from "@fortawesome/free-regular-svg-icons";

const LectureBasket = () => {
    const navigate = useNavigate();

    const [pageNo, setPageNo] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [institutionNo, setInstitutionNo] = useState<number>(0);
    const [lectureBasketList, setLectureBasketList] = useState<{
        lectureBasketNo:number;
        lectureBasketDate:string;
        lectureNo:number;
        lectureTitle:string;
        lectureStateNo:number;
        lectureInstitutionNo:number;
        lectureInstitutionName:string;
        lectureTeacher:string;
        lecturePeriod:string;
        lectureTime:string;
        lectureCount:number;
        lectureFee:number;
    }[]>([]);

    const [checkItems, setCheckItems] = useState<{
        lectureBasketNo:number;
        lectureFee:number;
    }[]>([]);
    const [checkFees, setCheckFees] = useState<number>(0);

    // 체크박스 단일 선택
    const handleSingleCheck = (checked:boolean, lectureBasketNo:number, lectureFee:number):void => {
        if (checked) {
            // 단일 선택 시 체크된 아이템을 배열에 추가
            setCheckItems(prev => [...prev,
                {lectureBasketNo:lectureBasketNo, lectureFee:lectureFee}]);
            setCheckFees(checkFees + lectureFee);
        } else {
            // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
            setCheckItems(checkItems.filter((el) =>
                el.lectureBasketNo !== lectureBasketNo));
            setCheckFees(checkFees - lectureFee);
        }
    };

    // 체크박스 전체 선택
    const handleAllCheck = (checked:boolean):void => {
        if(checked) {
            // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
            const idArray:{
                lectureBasketNo:number;
                lectureFee:number;
            }[] = [];
            lectureBasketList.forEach((el) => idArray.push({
                lectureBasketNo:el.lectureBasketNo,
                lectureFee:el.lectureFee
            }));
            setCheckItems(idArray);
            let total:number = 0;
            for(let i:number=0; i<idArray.length; i++) {
                total += idArray[i].lectureFee;
            }
            setCheckFees(total);
        }
        else {
            // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
            setCheckItems([]);
            setCheckFees(0);
        }
    }

    const deleteLectureBasketHandler = (lectureBasketNo:number):boolean => {
        if(window.confirm('장바구니에서 삭제 하시겠습니까?') === true) {
            const deleteData:object = {
                deleteLectureBasketNo: lectureBasketNo,
                lectureBasketDeleteList: checkItems
            }
            axios({
                method: "DELETE",
                url: "/lecture/deleteLectureBasket",
                data: JSON.stringify(deleteData),
                headers: {'Content-type': 'application/json'}
            }).then((res):void => {
                alert('삭제되었습니다.');
                window.location.reload();
            }).catch((err):void => {
                console.log(err.message);
            })
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        const lectureBasketListData = async () => {
            await axios({
                method: "POST",
                url: '/lecture/lectureBasketList',
                params: {pageNo: pageNo}
            }).then((res):void => {
                setLectureBasketList(res.data.data.lectureBasketList);
                setTotalPage(res.data.data.totalPage);
            }).catch((err):void => {
                console.log(err.message);
            });
        }
        setTimeout(() => {lectureBasketListData().then();}, 200);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNo])

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
                <div className="lb-list-view">
                    <div className="lb-list-top">
                        <div className="list-top-left">
                            <span>전체</span> {totalPage}개
                        </div>
                        <div className="list-top-right">

                        </div>
                    </div>
                    <div className="lb-list-tool">
                        <div className="check-all">
                            <Styled.CheckBoxLabel htmlFor={"chkbxAll"}>
                                <Styled.CheckBoxInput type="checkbox" id={"chkbxAll"}
                                                      onChange={(e) =>
                                                          handleAllCheck(e.target.checked)}
                                                      checked={checkItems.length === lectureBasketList.length ? true : false}/>
                                <Styled.CheckBoxText>
                                    {checkItems.length === lectureBasketList.length ?
                                        <FontAwesomeIcon icon={checkIcon} className="icon-custom"/> :
                                        <FontAwesomeIcon icon={unCheckIcon} className="icon-custom"/>}
                                </Styled.CheckBoxText>
                                <div>
                                    전체선택
                                </div>
                            </Styled.CheckBoxLabel>
                        </div>
                        <div className="check-delete" onClick={() => deleteLectureBasketHandler(0)}>
                            <FontAwesomeIcon icon={deleteIcon} className="icon-custom"/>
                            <div>
                                선택삭제
                            </div>
                        </div>
                    </div>
                    {
                        lectureBasketList.length > 0 ?
                            <div className="lb-list">
                                {lectureBasketList.map((item, idx) => (
                                    <div key={idx} className="lb-list-item">
                                        <div className="item-checkbox">
                                            <Styled.CheckBoxLabel htmlFor={"chkbx" + idx} >
                                                <Styled.CheckBoxInput type="checkbox" id={"chkbx" + idx}
                                                                      onChange={(e) =>
                                                                          handleSingleCheck(e.target.checked, item.lectureBasketNo, item.lectureFee)}
                                                                      checked={checkItems.some(data =>
                                                                          data.lectureBasketNo === item.lectureBasketNo) ? true : false}/>
                                                <Styled.CheckBoxText>
                                                    {checkItems.some(data => data.lectureBasketNo === item.lectureBasketNo) ?
                                                        <FontAwesomeIcon icon={checkIcon} className="icon-custom"/> :
                                                        <FontAwesomeIcon icon={unCheckIcon} className="icon-custom"/>}
                                                </Styled.CheckBoxText>
                                            </Styled.CheckBoxLabel>
                                        </div>
                                        <div className="item-left">
                                            <div className="left-top">
                                                <div className="item-state" style={
                                                    item.lectureStateNo === 1 ? {backgroundColor: "slategray", color: 'white'} :
                                                        item.lectureStateNo === 2 ? {backgroundColor: "greenyellow", color: 'black'} :
                                                            item.lectureStateNo === 3 ? {backgroundColor: "slategray", color: 'black'} :
                                                                item.lectureStateNo === 4 ? {backgroundColor: "black", color: 'white'} :
                                                                    item.lectureStateNo === 5 || 6 ? {backgroundColor: "red", color: 'black'} : {}}>
                                                    {
                                                        item.lectureStateNo === 1 ? '접수예정' :
                                                            item.lectureStateNo === 2 ? '접수중' :
                                                                item.lectureStateNo === 3 ? '대기접수' :
                                                                    item.lectureStateNo === 4 ? '접수마감' :
                                                                        item.lectureStateNo === 5 ? '접수불가' : '강의종료'
                                                    }
                                                </div>
                                                <div className="item-institution">
                                                    {item.lectureInstitutionName}
                                                </div>
                                            </div>
                                            <div className="left-bot">
                                                <div className="item-title"
                                                     onClick={() => navigate("/lectureDetail/" + item.lectureNo,
                                                    { state: {lectureNo: item.lectureNo}})}>
                                                    {item.lectureTitle}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item-right">
                                            <div className="item-info">
                                                <div className="info-title">강사명</div>
                                                <div className="item-teacher">
                                                    {item.lectureTeacher}
                                                </div>
                                            </div>
                                            <div className="item-info">
                                                <div className="info-title">강좌기간</div>
                                                <div className="item-period">
                                                    {item.lecturePeriod}
                                                </div>
                                            </div>
                                            <div className="item-info">
                                                <div className="info-title">강좌시간/횟수</div>
                                                <div className="item-time">
                                                    <span>
                                                        {item.lectureTime.substring(0, 11)}
                                                    </span>
                                                    <span>
                                                        {
                                                            item.lectureTime.substring(13, 14) === '1' ? ' (월)' :
                                                                item.lectureTime.substring(13, 14) === '2' ? ' (화)' :
                                                                    item.lectureTime.substring(13, 14) === '3' ? ' (수)' :
                                                                        item.lectureTime.substring(13, 14) === '4' ? ' (목)' :
                                                                            item.lectureTime.substring(13, 14) === '5' ? ' (금)' :
                                                                                item.lectureTime.substring(13, 14) === '6' ? ' (토)' : ' (일)'
                                                        }
                                                    </span>
                                                    <span> / 총 {item.lectureCount}회</span>
                                                </div>
                                            </div>
                                            <div className="item-info">
                                                <div className="info-title">강좌료</div>
                                                <div className="item-fee">
                                                    {item.lectureFee.toLocaleString()}원
                                                </div>
                                            </div>
                                            <div className="item-info">
                                                <div className="info-title item-total">총금액</div>
                                                <div className="item-total">
                                                    {item.lectureFee.toLocaleString()}원
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item-delete">
                                            <FontAwesomeIcon icon={deleteIcon} className="icon-custom"
                                                             onClick={() => deleteLectureBasketHandler(item.lectureBasketNo)}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            :
                            <div className="lb-list-empty">
                                <FontAwesomeIcon icon={emptyIcon} className="icon-custom" />
                                <div className="default-text">
                                    장바구니에 상품이 없습니다.
                                </div>
                            </div>
                    }
                    {
                        totalPage > lectureBasketList.length ?
                            <div className="lb-more-btn" onClick={() => setPageNo(pageNo + 1)}>
                                더보기 <FontAwesomeIcon icon={arrow} />
                            </div>
                            :
                            <div />
                    }
                </div>
            </div>
            <div className="lb-button">
                <div className="button-fee">
                    <div className="fee-count">{checkItems.length}건</div>
                    <div className="fee-text">결제 예정 금액</div>
                    <div className="fee-payment">
                        <div className="fee-amount">
                            {checkFees.toLocaleString()}
                        </div>
                        <div className="fee-unit">원</div>
                    </div>
                </div>
                <div>
                    <button className="btn-payment"
                            onClick={() => {window.scrollTo({ top: 50, behavior: "smooth" });}}>결제하기</button>
                </div>
            </div>

            <FooterNavigation />
        </Styled.LectureBasketView>
    )
}

export default LectureBasket;