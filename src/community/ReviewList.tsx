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
    faSearch as searchIcon,
    faStar as fullStar,
    faCircleChevronLeft as leftArrowIcon,
    faCircleChevronRight as rightArrowIcon,
    faExclamation as emptyIcon,
    faQuoteLeft as quoteLeft, faQuoteRight as quoteRight, faChevronDown as arrow
} from "@fortawesome/free-solid-svg-icons";
import {faStar as emptyStar} from "@fortawesome/free-regular-svg-icons";
import {useNavigate} from "react-router-dom";

const ReviewList = () => {
    const navigate = useNavigate();
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
        reviewTitle:string;
        reviewContent:string;
        reviewAuthor:string;
        reviewScore:number;
        institutionNo:number;
        institutionName:string;
        reviewCreatedDate:string;
        lectureNo:number;
        lectureTitle:string;
        lectureThumbnail:string;
    }[]>([]);
    const [reviewOftenList, setReviewOftenList] = useState<{
        reviewNo:number;
        reviewTitle:string;
        reviewContent:string;
        reviewAuthor:string;
        reviewScore:number;
        institutionNo:number;
        institutionName:string;
        reviewCreatedDate:string;
        lectureNo:number;
        lectureTitle:string;
        lectureThumbnail:string;
    }[]>([]);

    const activeEnter = (e:any):void => {
        if(e.key === "Enter") {
            setIsSearchActive(!isSearchActive);
        }
    }

    const customReviewRatingArr = (score:number) => {
        let result:any[] = [];
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
        return result;
    }

    const customReviewOftenSwiper = ():any[] => {
        let result:any[] = [];

        for(let i:number=0; i<reviewOftenList.length; i++) {
            result.push(<SwiperSlide key={i} className="rls-item">
                <div className="rls-item-image">
                    <div className="rls-image-label">
                        <div className="label-text">HOT</div>
                    </div>
                    <img src={reviewOftenList[i].lectureThumbnail} alt="강좌 이미지" />
                </div>
                <div className="rls-item-info">
                    <div className="rls-info-head">
                        <div className="rls-lec-institution">
                            {reviewOftenList[i].institutionName}
                        </div>
                        <div className="rls-rev-score">
                            {customReviewRatingArr(1)}
                        </div>
                    </div>
                    <div className="rls-info-body">
                        <div className="rls-rev-title">
                            {reviewOftenList[i].reviewTitle}
                        </div>
                        <div className="rls-lec-title">
                            {reviewOftenList[i].lectureTitle}
                        </div>
                    </div>
                    <div className="rls-info-foot">
                        <div className="rls-rev-name">
                            {reviewOftenList[i].reviewAuthor}
                        </div>
                        <div className="rls-rev-date">
                            {reviewOftenList[i].reviewCreatedDate.substring(0, 10)}
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
                setReviewList(res.data.data.reviewList);
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
                               onKeyDown={(e) => activeEnter(e)}
                               onChange={(e) => setSearchText(e.target.value)}/>
                        <FontAwesomeIcon icon={searchIcon} className="icon-custom"
                                         onClick={() => setIsSearchActive(!isSearchActive)}/>
                    </div>
                </div>
            </div>
            <div className="rl-main-view">
                <div className="rl-main">
                    {
                        reviewOftenList.length > 0 ?
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
                            :
                            <div />
                    }
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
                            {
                                totalPage > 0 ?
                                    <div className="rl-list-body">
                                        {reviewList.map((item, idx) => (
                                            <div key={idx} className="rl-list-item"
                                                 onClick={() => navigate("/reviewDetail/" + item.reviewNo,
                                                     { state: {reviewNo: item.reviewNo}})}>
                                                <div className="rl-item-image">
                                                    <img src={item.lectureThumbnail} alt="강좌 이미지" />
                                                </div>
                                                <div className="rl-item-info">
                                                    <div className="rl-item-left">
                                                        <div className="rl-lec-institution">
                                                            {item.institutionName}
                                                        </div>
                                                        <div className="rl-rev-title">
                                                            {item.reviewTitle}
                                                        </div>
                                                        <div className="rl-lec-title">
                                                            {item.lectureTitle}
                                                        </div>
                                                    </div>
                                                    <div className="rl-item-right">
                                                        <div className="rl-rev-score">
                                                            {customReviewRatingArr(item.reviewScore)}
                                                        </div>
                                                        <div className="rl-sub-info">
                                                            <div className="rl-rev-name">
                                                                {item.reviewAuthor}
                                                            </div>
                                                            <div className="rl-rev-date">
                                                                {item.reviewCreatedDate.substring(0, 10 )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    :
                                    <div className="rl-list-empty">
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
                                                        게시글이 없습니다.
                                                    </div>
                                            }
                                        </div>
                                    </div>
                            }
                            {
                                totalPage > reviewList.length ?
                                    <div className="rl-more-btn" onClick={() => setPageNo(pageNo + 1)}>
                                        더보기 <FontAwesomeIcon icon={arrow} />
                                    </div>
                                    :
                                    <div />
                            }
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