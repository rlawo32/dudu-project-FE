import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import dompurify from "dompurify";
import axios from "axios";

import HeaderNavigation from "../navigation/HeaderNavigation";
import FooterNavigation from "../navigation/FooterNavigation";
import TopButtonNavigation from "../navigation/TopButtonNavigation";

import * as Styled from "./ReviewDetail.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar as fullStar} from "@fortawesome/free-solid-svg-icons";
import {faStar as emptyStar} from "@fortawesome/free-regular-svg-icons";

const ReviewDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const reviewNo:number = location.state.reviewNo;

    const sanitizer = dompurify.sanitize;
    // 스크립트를 활용한 토큰 탈취 처럼 취약점을 노려서 javascript와 HTML로 악의적 코드를 웹 브라우저에 심어,
    // 사용자 접속시 그 악성코드가 실행되는 것을 크로스 사이드 스크립트, 보안을 위해 추가

    const [reviewDetail, setReviewDetail] = useState<{
        reviewNo:number; reviewTitle:string; reviewContent:string; reviewAuthor:string;
        reviewScore:number; reviewCreatedDate:string;
        lectureNo:number; lectureStateNo:number; institutionName:string; mainCategoryName:string;
        subCategoryName:string; lectureTitle:string; lectureDivision:string; lectureTeacher:string;
        lecturePeriod:string; lectureThumbnail:string;
    }>();

    const customReviewRatingArr = (score:undefined|number) => {
        let result:any[] = [];
        if(score !== undefined) {
            for (let i:number=0; i<5; i++) {
                result.push(
                    <span key={i+1} className="rating">
                        {
                            i+1 <= score ?
                                <FontAwesomeIcon icon={fullStar} />
                                :
                                <FontAwesomeIcon icon={emptyStar} />
                        }
                    </span>);
            }
        }
        return result;
    }

    const customNameMasking = (data:undefined|string):string => {
        if(data !== undefined) {
            if (data.length > 2) {
                const originName:string[] = data.split('');
                originName.forEach((name:string, i:number):void => {
                    if (i === 0 || i === originName.length - 1) return;
                    originName[i] = '*';
                });
                const joinName:string = originName.join();
                return joinName.replace(/,/g, '');
            } else {
                const pattern:RegExp = /.$/; // 정규식
                return data.replace(pattern, '*');
            }
        } else {
            return "";
        }
    }

    useEffect(() => {
        const reviewDetailData = async () => {
            await axios({
                method: "GET",
                url: '/review/reviewDetail',
                params: {reviewNo: reviewNo}
            }).then((res):void => {
                setReviewDetail(res.data.data);
            }).catch((err):void => {
                console.log(err.message);
            });
        }
        setTimeout(() => {reviewDetailData().then();}, 100);
    }, [])

    return (
        <Styled.ReviewDetailView>
            <HeaderNavigation />

            <div className="ld-main-view">
                <div className="ld-head">
                    <div className="head-top">
                        <div className="head-item ld-author">
                            {customNameMasking(reviewDetail?.reviewAuthor)}
                        </div>
                        <div className="head-item ld-date">
                            {reviewDetail?.reviewCreatedDate.substring(0, 10)}
                        </div>
                    </div>
                    <div className="head-bottom">
                        <div className="ld-title">
                            {reviewDetail?.reviewTitle}
                        </div>
                        <div className="ld-score">
                            {customReviewRatingArr(reviewDetail?.reviewScore)}
                        </div>
                    </div>
                </div>
                <div className="ld-body">
                    <div className="ld-content"
                         dangerouslySetInnerHTML={{ __html : sanitizer(`${reviewDetail?.reviewContent}`) }} />
                    <div className="ld-lt-info">
                        <div className="info-head">수강 정보</div>
                        <div className="info-body"
                             onClick={() => navigate("/lectureDetail/" + reviewDetail?.lectureNo,
                            { state: {lectureNo: reviewDetail?.lectureNo}})}>
                            <div className="ld-lt-left">
                                <img src={reviewDetail?.lectureThumbnail} alt={"강좌 이미지"}/>
                            </div>
                            <div className="ld-lt-right">
                                <div className="ld-lt-top">
                                    <div className="ld-lt-state" style={
                                        reviewDetail?.lectureStateNo === 1 ? {backgroundColor: "slategray", color: 'white'} :
                                            reviewDetail?.lectureStateNo === 2 ? {backgroundColor: "greenyellow", color: 'black'} :
                                                reviewDetail?.lectureStateNo === 3 ? {backgroundColor: "slategray", color: 'black'} :
                                                    reviewDetail?.lectureStateNo === 4 ? {backgroundColor: "black", color: 'white'} :
                                                        reviewDetail?.lectureStateNo === 5 || 6 ? {backgroundColor: "red", color: 'black'} : {}}>
                                        {
                                            reviewDetail?.lectureStateNo === 1 ? '접수예정' :
                                                reviewDetail?.lectureStateNo === 2 ? '접수중' :
                                                    reviewDetail?.lectureStateNo === 3 ? '대기접수' :
                                                        reviewDetail?.lectureStateNo === 4 ? '접수마감' :
                                                            reviewDetail?.lectureStateNo === 5 ? '접수불가' : '강의종료'
                                        }
                                    </div>
                                    <div className="ld-lt-mainCategory">
                                        {reviewDetail?.mainCategoryName}
                                    </div>
                                    <div className="ld-lt-subCategory">
                                        {reviewDetail?.subCategoryName}
                                    </div>
                                </div>
                                <div className="ld-lt-mid">
                                    <div className="ld-lt-title">
                                        {reviewDetail?.lectureTitle}
                                    </div>
                                </div>
                                <div className="ld-lt-bot">
                                    <div className="ld-lt-institution">
                                        {reviewDetail?.institutionName}
                                    </div>
                                    <div className="ld-lt-teacher">
                                        {reviewDetail?.lectureTeacher}
                                    </div>
                                    <div className="ld-lt-period">
                                        {reviewDetail?.lectureDivision}
                                        &nbsp;
                                        {reviewDetail?.lecturePeriod}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ld-foot">
                    <button onClick={() => navigate("/reviewList")}>
                        목록으로
                    </button>
                </div>
            </div>

            <TopButtonNavigation type={""} />

            <FooterNavigation />
        </Styled.ReviewDetailView>
    )
}

export default ReviewDetail;