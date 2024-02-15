import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getCookie} from "../Cookie";
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
    faSearch as searchIcon, faStar as fullStar, faPenToSquare as reviewWriteIcon,
    faCircleChevronLeft as leftArrowIcon, faCircleChevronRight as rightArrowIcon,
    faExclamation as emptyIcon, faArrowRightArrowLeft as sortIcon,
    faQuoteLeft as quoteLeft, faQuoteRight as quoteRight, faChevronDown as arrow
} from "@fortawesome/free-solid-svg-icons";
import {faStar as emptyStar} from "@fortawesome/free-regular-svg-icons";

const ReviewList = () => {
    const navigate = useNavigate();
    const swiperPrevRef = useRef<SwiperCore>();
    const swiperNextRef = useRef<SwiperCore>();

    const institutionSortBox:any = useRef<any>();
    const institutionSortList:any = useRef<any>();
    const institutionSortBtn:any = useRef<any>([]);
    const sortTypeBox:any = useRef<any>();
    const sortTypeList:any = useRef<any>();
    const sortTypeBtn:any = useRef<any>([]);
    const selectArrow:any = useRef<any>();

    const [pageNo, setPageNo] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>("");
    const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

    const [sortType, setSortType] = useState<string>("");
    const [sortSelect, setSortSelect] = useState<number>(0);
    const [isSortBoxShow, setIsSortBoxShow] = useState<boolean>(false);
    const sortArr:any[] = [
        {key:'1', value:'최신순'},
        {key:'2', value:'오래된순'},
        {key:'3', value:'평점높은순'},
        {key:'4', value:'평점낮은순'},
    ];

    const [institutionNo, setInstitutionNo] = useState<number>(0);
    const [institutionSelect, setInstitutionSelect] = useState<number>(0);
    const [isInstitutionBoxShow, setIsInstitutionBoxShow] = useState<boolean>(false);

    const [institutionList, setInstitutionList] = useState<{
        institutionNo:number; institutionName:string; institutionContact:string;
    }[]>([]);
    const [reviewList, setReviewList] = useState<{
        reviewNo:number; reviewTitle:string; reviewContent:string; reviewAuthor:string;
        reviewScore:number; institutionNo:number; institutionName:string; reviewCreatedDate:string;
        lectureNo:number; lectureTitle:string; lectureDivision:string; lectureThumbnail:string;
    }[]>([]);
    const [reviewOftenList, setReviewOftenList] = useState<{
        reviewNo:number; reviewTitle:string; reviewContent:string; reviewAuthor:string;
        reviewScore:number; institutionNo:number; institutionName:string; reviewCreatedDate:string;
        lectureNo:number; lectureTitle:string; lectureDivision:string; lectureThumbnail:string;
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
                <span key={i+1} className="score">
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

    const customNameMasking = (data:string):string => {
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
    }

    const customReviewOftenSwiper = ():any[] => {
        let result:any[] = [];

        for(let i:number=0; i<reviewOftenList.length; i++) {
            result.push(<SwiperSlide key={i} className="rls-item"
                                     onClick={() => {onClickReviewViewsUp(reviewOftenList[i].reviewNo);
                                         navigate("/reviewDetail/" + reviewOftenList[i].reviewNo,
                                             { state: {reviewNo: reviewOftenList[i].reviewNo}})}}>
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
                            {customReviewRatingArr(reviewOftenList[i].reviewScore)}
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
                            {customNameMasking(reviewOftenList[i].reviewAuthor)}
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

    const institutionSortItemList = ():any[] => {
        let result:any[] = [];

        for(let i:number=0; i<=institutionList.length; i++) {
            if(i === 0) {
                result.push(<li key={i} ref={btn => (institutionSortBtn.current[i] = btn)}
                                onClick={() => onClickInstitutionSortSelectBox(i, 0)}>
                    전체지점</li>)
            } else {
                result.push(<li key={i} ref={btn => (institutionSortBtn.current[i] = btn)}
                                onClick={() => onClickInstitutionSortSelectBox(i, institutionList[i-1].institutionNo)}>
                    {institutionList[i-1].institutionName}</li>)
            }
        }
        return result;
    }

    const onClickInstitutionSortSelectBox = (idx:number, type:number):void => {
        setIsInstitutionBoxShow(false);
        setInstitutionSelect(idx);
        setInstitutionNo(type);
    }

    const sortTypeItemList = ():any[] => {
        let result:any[] = [];

        for(let i:number=0; i<sortArr.length; i++) {
            result.push(<li key={sortArr[i].key}
                            ref={btn => (sortTypeBtn.current[i] = btn)}
                            onClick={() => onClickSortTypeSelectBox(i, sortArr[i].key)}>
                {sortArr[i].value}</li>)
        }
        return result;
    }

    const onClickSortTypeSelectBox = (idx:number, type:string):void => {
        setIsSortBoxShow(false);
        setSortSelect(idx);
        setSortType(type);
    }

    // pagination 에 따른 swiper 버튼 활성화 로직 (width 감지)
    // window.onresize = ():void => {
    //     const swiperDetect1:Element|null = document.getElementsByClassName("swiper-pagination").item(0);
    //     if(swiperDetect1 !== null) {
    //         const swiperDetect2:boolean = swiperDetect1.className.includes("swiper-pagination-lock");
    //         if(swiperDetect2) {
    //             console.log("true")
    //         } else {
    //             console.log("false")
    //         }
    //     }
    // }
    const onClickReviewViewsUp = (reviewNo:number):void => {
        axios({
            method: "PUT",
            url: "/review/reviewViewsUp",
            params: {reviewNo: reviewNo}
        }).then((res):void => {

        }).catch((err):void => {
            console.log(err.message);
        })
    }

    const onClickMyReviewMove = ():void => {
        if(window.localStorage.getItem("role") && getCookie("refreshToken")) {
            navigate("/lectureReview");
        } else {
            alert("로그인이 필요한 기능입니다.");
            if(window.confirm('바로 로그인 하시겠습니까?') === true) {
                navigate("/signIn");
            }
        }
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
                setReviewOftenList(res.data.data.reviewList);
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        setTimeout(() => {faqListData().then();}, 0);
    }, [])

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

    useEffect(() => {
        if(isSortBoxShow) {
            setIsInstitutionBoxShow(false);
            sortTypeBox.current.className += " show-list";
            sortTypeList.current.className += " show-list";
        } else {
            sortTypeBox.current.className = sortTypeBox.current.className.replace(' show-list', '');
            sortTypeList.current.className = sortTypeList.current.className.replace(' show-list', '');
        }
    }, [isSortBoxShow])

    useEffect(() => {
        sortTypeBtn.current[sortSelect].className = sortTypeBtn.current[sortSelect].className.replace('sort-active', '');
        sortTypeBtn.current[sortSelect].className += 'sort-active';

        for(let i:number=0; i<sortTypeBtn.current.length; i++) {
            if(i !== sortSelect) {
                sortTypeBtn.current[i].className = sortTypeBtn.current[i].className.replace('sort-active', '');
            }
        }
    }, [sortSelect])

    useEffect(() => {
        if(isInstitutionBoxShow) {
            setIsSortBoxShow(false);
            institutionSortBox.current.className += " show-list";
            institutionSortList.current.className += " show-list";
            selectArrow.current.className += " show-list";
        } else {
            institutionSortBox.current.className = institutionSortBox.current.className.replace(' show-list', '');
            institutionSortList.current.className = institutionSortList.current.className.replace(' show-list', '');
            selectArrow.current.className = selectArrow.current.className.replace(' show-list', '');
        }
    }, [isInstitutionBoxShow])

    useEffect(() => {
        institutionSortBtn.current[institutionSelect].className = institutionSortBtn.current[institutionSelect].className.replace('sort-active', '');
        institutionSortBtn.current[institutionSelect].className += 'sort-active';

        for(let i:number=0; i<institutionSortBtn.current.length; i++) {
            if(i !== institutionSelect) {
                institutionSortBtn.current[i].className = institutionSortBtn.current[i].className.replace('sort-active', '');
            }
        }
    }, [institutionSelect])

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
                                {/*<FontAwesomeIcon icon={leftArrowIcon} className="swiper-button-prev"*/}
                                {/*                 onClick={() => swiperPrevRef.current?.slidePrev()} />*/}
                                {/*<FontAwesomeIcon icon={rightArrowIcon} className="swiper-button-next"*/}
                                {/*                 onClick={() => swiperNextRef.current?.slideNext()} />*/}
                            </div>
                            :
                            <div />
                    }
                    <div className="rl-main-body">
                        <div className="rl-list">
                            <div className="rl-list-head">
                                <div className="rl-total">
                                    <span>전체</span> {totalPage}개
                                </div>
                                <div className="rl-sort">
                                    <div className="sort-sortType">
                                        <button onClick={() => setIsSortBoxShow(!isSortBoxShow)}>
                                            <FontAwesomeIcon icon={sortIcon} className="icon-custom" />
                                            {sortArr[sortSelect].value}
                                        </button>
                                        <div className="sort-box" ref={sortTypeBox}>
                                            <ul className="sort-list" ref={sortTypeList}>
                                                {sortTypeItemList()}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="sort-institution">
                                        <button onClick={() => setIsInstitutionBoxShow(!isInstitutionBoxShow)}>
                                            {
                                                institutionSelect === 0 ?
                                                    "전체지점"
                                                    :
                                                    institutionList[institutionSelect-1].institutionName
                                            }
                                            <div className="select-arrow" ref={selectArrow}>
                                                <FontAwesomeIcon icon={arrow} />
                                            </div>
                                        </button>
                                        <div className="sort-box" ref={institutionSortBox}>
                                            <ul className="sort-list" ref={institutionSortList}>
                                                {institutionSortItemList()}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                totalPage > 0 ?
                                    <div className="rl-list-body">
                                        {reviewList.map((item, idx) => (
                                            <div key={idx} className="rl-list-item"
                                                 onClick={() => {onClickReviewViewsUp(item.reviewNo);
                                                     navigate("/reviewDetail/" + item.reviewNo,
                                                     { state: {reviewNo: item.reviewNo}})}}>
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
                                                            [{item.lectureDivision}]
                                                            {item.lectureTitle}
                                                        </div>
                                                    </div>
                                                    <div className="rl-item-right">
                                                        <div className="rl-rev-score">
                                                            {customReviewRatingArr(item.reviewScore)}
                                                        </div>
                                                        <div className="rl-sub-info">
                                                            <div className="rl-rev-name">
                                                                {customNameMasking(item.reviewAuthor)}
                                                            </div>
                                                            <div className="rl-rev-date">
                                                                {item.reviewCreatedDate.substring(0, 10)}
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
                                                        수강후기가 없습니다.
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

            <div className="my-review-btn" onClick={() => onClickMyReviewMove()}>
                <FontAwesomeIcon icon={reviewWriteIcon} className="icon-custom" />
            </div>
            <TopButtonNavigation type={""} />

            <FooterNavigation />
        </Styled.ReviewListView>
    )
}

export default ReviewList;