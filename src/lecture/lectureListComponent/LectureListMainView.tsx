import React from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import useLectureSearchDataStore from "../../stores/useLectureSearchDataStore";
import * as Styled from "./LectureListMainView.style";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamation as emptyIcon, faQuoteLeft as quoteLeft,
    faQuoteRight as quoteRight, faBagShopping as basketIcon} from "@fortawesome/free-solid-svg-icons";
import {faClock as clockIcon} from "@fortawesome/free-regular-svg-icons";
import {getCookie} from "../../Cookie";

interface Props {
    ltCount:number;
    lectureList:{
        lectureNo:number;
        lectureTitle:string;
        lectureDivision:string;
        lectureTeacher:string;
        lectureTime:string;
        lectureFee:number;
        lectureInstitution:string;
        lectureStateNo:number;
        lectureCount:number;
        lectureThumbnail:string;
        lectureBasketState:string;}[];
    setLectureList: React.Dispatch<React.SetStateAction<any>>;
}

const LectureListMainView = (props : Props) => {
    const navigate = useNavigate();
    const {searchText} = useLectureSearchDataStore();

    const insertLectureBasketHandler = (itemData:any):void => {
        if(window.localStorage.getItem("role") && getCookie("refreshToken")) {
            const basketData:object = {
                lectureNo: itemData.lectureNo
            }
            if(itemData.lectureBasketState === 'Y') {
                alert("이미 장바구니에 있는 강좌입니다.");
            } else {
                axios({
                    method: "POST",
                    url: "/lecture/insertLectureBasket",
                    data: JSON.stringify(basketData),
                    headers: {'Content-type': 'application/json'}
                }).then((res):void => {
                    if(res.data.result) {
                        alert("장바구니에 추가되었습니다.");
                        if(window.confirm('바로 장바구니를 확인하시겠습니까?') === true) {
                            navigate("/lectureBasket");
                        }
                        const listCopy: {
                            lectureNo:number;
                            lectureTitle:string;
                            lectureDivision:string;
                            lectureTeacher:string;
                            lectureTime:string;
                            lectureFee:number;
                            lectureInstitution:string;
                            lectureStateNo:number;
                            lectureCount:number;
                            lectureThumbnail:string;
                            lectureBasketState:string;
                        }[] = JSON.parse(JSON.stringify(props.lectureList));
                        const idx:number = listCopy.findIndex(
                            (el) => el.lectureNo === itemData.lectureNo);
                        listCopy[idx].lectureBasketState = "Y";
                        props.setLectureList(listCopy);
                    }
                }).catch((err):void => {
                    console.log(err.message);
                })
            }
        } else {
            alert("로그인이 필요한 기능입니다.");
            if(window.confirm('바로 로그인 하시겠습니까?') === true) {
                navigate("/signIn");
            }
        }
    }

    return (
        <Styled.LectureListMain $lectureList={props.lectureList}>
            {
                props.ltCount > 0 ?
                    props.lectureList.map((lectures) => {
                            return (
                                <div key={lectures.lectureNo} className="lt-list-item">
                                    <div onClick={() => navigate("/lectureDetail/" + lectures.lectureNo,
                                        { state: {lectureNo: lectures.lectureNo}})}>
                                        <div className="lt-list-image">
                                            <img src={lectures.lectureThumbnail} alt="강의 이미지" />
                                        </div>
                                        <div className="lt-list-info">
                                            <div className="lt-list-state">
                                        <span className="span-ltState" style={
                                            lectures.lectureStateNo === 1 ? {backgroundColor: "slategray", color: 'white'} :
                                                lectures.lectureStateNo === 2 ? {backgroundColor: "greenyellow", color: 'black'} :
                                                    lectures.lectureStateNo === 3 ? {backgroundColor: "slategray", color: 'black'} :
                                                        lectures.lectureStateNo === 4 ? {backgroundColor: "black", color: 'white'} :
                                                            lectures.lectureStateNo === 5 || 6 ? {backgroundColor: "red", color: 'black'} : {}}>
                                            {
                                                lectures.lectureStateNo === 1 ? '접수예정' :
                                                    lectures.lectureStateNo === 2 ? '접수중' :
                                                        lectures.lectureStateNo === 3 ? '대기접수' :
                                                            lectures.lectureStateNo === 4 ? '접수마감' :
                                                                lectures.lectureStateNo === 5 ? '접수불가' : '강의종료'
                                            }
                                        </span>
                                                <span className="span-ltInstitution">{lectures.lectureInstitution}</span>
                                            </div>
                                            <div className="lt-list-title">
                                                <p>
                                                    {lectures.lectureTitle}
                                                </p>
                                            </div>
                                            <div className="lt-list-division">
                                                <span className="span-line">{lectures.lectureDivision}&nbsp;&nbsp;</span>
                                                <span>&nbsp;{lectures.lectureTeacher}</span>
                                            </div>
                                            <div className="lt-list-time">
                                                <FontAwesomeIcon icon={clockIcon} className="icon-custom" />
                                                <span>
                                                    {
                                                        lectures.lectureTime.substring(13, 14) === '1' ? '월' :
                                                            lectures.lectureTime.substring(13, 14) === '2' ? '화' :
                                                                lectures.lectureTime.substring(13, 14) === '3' ? '수' :
                                                                    lectures.lectureTime.substring(13, 14) === '4' ? '목' :
                                                                        lectures.lectureTime.substring(13, 14) === '5' ? '금' :
                                                                            lectures.lectureTime.substring(13, 14) === '6' ? '토' : '일'
                                                    }
                                                </span>
                                                <span>
                                                    {lectures.lectureTime.substring(0, 11)},
                                                </span>
                                                <span>총 {lectures.lectureCount}회</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lt-list-fee">
                                        {lectures.lectureFee.toLocaleString()}원
                                        <FontAwesomeIcon icon={basketIcon} className="icon-custom"
                                                         style={lectures.lectureBasketState === 'Y' ? {color: 'lime'} : {}}
                                                         onClick={() => insertLectureBasketHandler(lectures)}/>
                                    </div>
                                </div>
                            )
                        })
                    :
                    <div className="lt-list-empty">
                        <div>
                            <FontAwesomeIcon icon={emptyIcon} className="icon-custom" />
                            {
                                searchText.length > 0 ?
                                    <div className="empty-text">
                                        <FontAwesomeIcon icon={quoteLeft} className="icon-custom" />
                                        <span className="search-text">
                                            {searchText}
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
                                        진행중인 강좌가 없습니다.
                                    </div>
                            }
                        </div>
                    </div>
            }

        </Styled.LectureListMain>
    )
}

export default LectureListMainView;