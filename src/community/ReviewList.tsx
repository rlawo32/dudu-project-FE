import React, {useEffect, useRef, useState} from "react";
import axios from "axios";

import HeaderNavigation from "../navigation/HeaderNavigation";
import TopButtonNavigation from "../navigation/TopButtonNavigation";
import FooterNavigation from "../navigation/FooterNavigation";

import { Swiper, SwiperSlide } from 'swiper/react';
import {Swiper as SwiperCore} from "swiper/types";
import {Navigation, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import * as Styled from "./ReviewList.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChevronDown as arrow, faSearch as searchIcon, faStar as fullStar, faStarHalfStroke as halfStar,
    faCircleChevronLeft as leftArrowIcon, faCircleChevronRight as rightArrowIcon
} from "@fortawesome/free-solid-svg-icons";
import {faStar as emptyStar} from "@fortawesome/free-regular-svg-icons";

const ReviewList = () => {
    const swiperPrevRef = useRef<SwiperCore>();
    const swiperNextRef = useRef<SwiperCore>();

    const [pageNo, setPageNo] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>("");
    const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

    const [sortType, setSortType] = useState<string>("");
    const [sortSelect, setSortSelect] = useState<number>(0);
    const [isSortBoxShow, setIsSortBoxShow] = useState<boolean>(false);

    const [institutionNo, setInstitutionNo] = useState<number>(0);
    const [institutionSelect, setInstitutionSelect] = useState<number>(0);
    const [isInstitutionBoxShow, setIsInstitutionBoxShow] = useState<boolean>(false);

    const [institutionList, setInstitutionList] = useState<{
        institutionNo:number;
        institutionName:string;
        institutionContact:string;
    }[]>([]);
    const [reviewList, setReviewList] = useState<{
        reviewNo:number;
    }[]>([]);
    const [reviewOftenList, setReviewOftenList] = useState<{
        reviewNo:number;
    }[]>([]);

    const customReviewRatingArr = () => {
        let result:any[] = [];
        for (let i:number=0; i<5; i++) {
            result.push(
                <span key={i+1} className="rating">
                        {
                            i+1 <= 4 ?
                                <FontAwesomeIcon icon={fullStar} />
                                :
                                <FontAwesomeIcon icon={emptyStar} />
                        }
                    </span>);
        }
        return result;
    }

    const customReviewOftenSwiper = ():any[] => {
        let result:any[] = [];

        for(let i:number=0; i<4; i++) {
            result.push(<SwiperSlide key={i} className="rls-item">
                <div className="rls-item-image">
                    <div className="rls-image-label">
                        <div className="label-text">HOT</div>
                    </div>
                    <img src={"https://culture.lotteshopping.com/files/CUL_ONL/OLD/COMMON/IMAGES/LECT_IMG/81/3910/20210721150157.jpg"} alt="강좌 이미지" />
                </div>
                <div className="rls-item-info">
                    <div className="rls-info-head">
                        <div className="rls-lec-institution">
                            DuDu 문화센터
                        </div>
                        <div className="rls-rev-score">
                            {customReviewRatingArr()}
                        </div>
                    </div>
                    <div className="rls-info-body">
                        <div className="rls-rev-title">
                            마수진선생님과 함께하는 수업 최고예요!
                        </div>
                        <div className="rls-lec-title">
                            [특강]토요 리틀잼 놀이잼 오감놀이터[13~19개월]
                        </div>
                    </div>
                    <div className="rls-info-foot">
                        <div className="rls-rev-name">
                            김*재
                        </div>
                        <div className="rls-rev-date">
                            2024.02.09
                        </div>
                    </div>
                </div>
            </SwiperSlide>);
        }
        return result;
    }

    useEffect(() => {
        const faqListData = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/lecture/lectureInstitutionList"
            }).then((res):void => {
                setInstitutionList(res.data.data);
            }).catch((err):void => {
                console.log(err.message);
            })
            await axios({
                method: "GET",
                url: "/review/reviewOftenList"
            }).then((res):void => {
                setReviewOftenList(res.data.data.faqList);
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        setTimeout(() => {faqListData().then();}, 0);
    }, [institutionNo])

    useEffect(() => {
        const getListData:object = {
            pageNo: pageNo,
            sortType: sortType,
            institutionNo: institutionNo,
            searchText: searchText,
        }
        const faqList = async () => {
            await axios({
                method: "POST",
                url: '/review/reviewList',
                data: JSON.stringify(getListData),
                headers: {'Content-type': 'application/json'}
            }).then((res):void => {
                setReviewList(res.data.data.faqList);
                setTotalPage(res.data.data.totalPage);
            }).catch((err):void => {
                console.log(err.message);
            });
        }
        setTimeout(() => {faqList().then();}, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNo, sortType, institutionNo, isSearchActive])

    return (
        <Styled.ReviewListView>
            <HeaderNavigation />

            <div className="rl-sub-view">
                <div className="rl-sub">
                    <div className="rl-sub-title">
                        수강후기
                    </div>
                    <div className="rl-sub-input">
                        <input type="text" value={searchText} placeholder={"제목과 내용으로 검색하세요"}
                               onChange={(e) => setSearchText(e.target.value)}/>
                        <FontAwesomeIcon icon={searchIcon} className="icon-custom"
                                         onClick={() => setIsSearchActive(!isSearchActive)}/>
                    </div>
                </div>
            </div>
            <div className="rl-main-view">
                <div className="rl-main">
                    <div className="rl-main-head">
                        <Swiper className="rls-list"
                                modules={[Navigation, Pagination]}
                                speed={1000}
                                spaceBetween={10}
                                slidesPerView={4}
                                slidesPerGroup={1}
                                onBeforeInit={(swiper:SwiperCore):void => {
                                    swiperNextRef.current = swiper
                                    swiperPrevRef.current = swiper
                                }}
                                pagination={{ clickable: true }}
                                breakpoints={{
                                    480: {
                                        slidesPerView: 1,
                                        spaceBetween: 25
                                    },
                                    880: {
                                        slidesPerView: 3,
                                        spaceBetween: 25
                                    },
                                    1280: {
                                        slidesPerView: 4,
                                        spaceBetween: 25
                                    },
                                }}>
                            {customReviewOftenSwiper()}
                        </Swiper>
                        <FontAwesomeIcon icon={leftArrowIcon} className="swiper-button-prev"
                                         onClick={() => swiperPrevRef.current?.slidePrev()} />
                        <FontAwesomeIcon icon={rightArrowIcon} className="swiper-button-next"
                                         onClick={() => swiperNextRef.current?.slideNext()} />
                    </div>
                    <div className="rl-main-body">
                        <div className="rl-list">
                            <div className="rl-list-head">
                                <div className="rl-total">
                                    <span style={{opacity: 0.5, marginRight: "5px"}}>전체</span>
                                    <span style={{fontWeight: "bold"}}>1개</span>
                                </div>
                                <div className="rl-sort">
                                    {/*<button onClick={() => setIsSortBoxShow(!isSortBoxShow)}>*/}
                                    {/*    {*/}
                                    {/*        sortSelect === 0 ?*/}
                                    {/*            "전체"*/}
                                    {/*            :*/}
                                    {/*            institutionList[sortSelect-1].institutionName*/}
                                    {/*    }*/}
                                    {/*    <div className="select-arrow" ref={selectArrow}>*/}
                                    {/*        <FontAwesomeIcon icon={arrow} />*/}
                                    {/*    </div>*/}
                                    {/*</button>*/}
                                    {/*<div className="sort-box" ref={sortBox}>*/}
                                    {/*    <ul className="sort-list" ref={sortList}>*/}
                                    {/*        {sortItemList()}*/}
                                    {/*    </ul>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                            <div className="rl-list-body">
                                <div className="rl-list-item">
                                    <div className="rl-item-image">
                                        <img src={"https://culture.lotteshopping.com/files/CUL_ONL/OLD/COMMON/IMAGES/LECT_IMG/81/3910/20210721150157.jpg"} alt="강좌 이미지" />
                                    </div>
                                    <div className="rl-item-info">
                                        <div className="rl-item-left">
                                            <div className="rl-lec-institution">
                                                DuDu 문화센터
                                            </div>
                                            <div className="rl-rev-title">
                                                선생님이 너무너무 좋아요
                                            </div>
                                            <div className="rl-lec-title">
                                                [특강]파파룰라 오감 and 자연놀이 [6~12개월 B]
                                            </div>
                                        </div>
                                        <div className="rl-item-right">
                                            <div className="rl-rev-score">
                                                {customReviewRatingArr()}
                                            </div>
                                            <div className="rl-sub-info">
                                                <div className="rl-rev-name">
                                                    김*재
                                                </div>
                                                <div className="rl-rev-date">
                                                    2024.02.08
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <TopButtonNavigation type={""} />

            <FooterNavigation />
        </Styled.ReviewListView>
    )
}

export default ReviewList;