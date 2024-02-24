import React, {useEffect, useRef, useState} from "react";
import axios from "axios";

import HeaderNavigation from "../navigation/HeaderNavigation";
import FooterNavigation from "../navigation/FooterNavigation";
import TopButtonNavigation from "../navigation/TopButtonNavigation";

import { Swiper, SwiperSlide } from 'swiper/react';
import {Swiper as SwiperCore} from "swiper/types";
import {Navigation, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import * as Styled from "./Faq.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChevronDown as arrow,
    faQ as qIcon,
    faSearch as searchIcon,
    faCircleChevronLeft as leftArrowIcon,
    faCircleChevronRight as rightArrowIcon,
    faExclamation as emptyIcon,
    faQuoteLeft as quoteLeft,
    faQuoteRight as quoteRight
} from "@fortawesome/free-solid-svg-icons"

const FaqList = () => {
    const categoryBtn:any = useRef<any>([]);
    const faqItemBox:any = useRef<any>([]);
    const swiperPrevRef = useRef<SwiperCore>();
    const swiperNextRef = useRef<SwiperCore>();

    const [pageNo, setPageNo] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [categorySelect, setCategorySelect] = useState<number>(0);
    const [faqBoxIndex, setFaqBoxIndex] = useState<number>(0);
    const [faqBoxShow, setFaqBoxShow] = useState<boolean>(false);
    const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

    const [faqCategory, setFaqCategory] = useState<string>("");
    const [searchText, setSearchText] = useState<string>("");

    const [faqCategoryList, setFaqCategoryList] = useState<{
        faqCategoryNo:number;
        faqCategoryFlag:string;
        faqCategoryName:string;
        faqCategoryDesc:string;
    }[]>([]);
    const [faqList, setFaqList] = useState<{
        faqNo:number;
        faqCategory:string;
        faqTitle:string;
        faqContent:string;
    }[]>([]);
    const [faqOftenList, setFaqOftenList] = useState<{
        faqNo:number;
        faqCategory:string;
        faqTitle:string;
        faqContent:string;
    }[]>([]);

    const activeEnter = (e:any):void => {
        if(e.key === "Enter") {
            setIsSearchActive(!isSearchActive);
        }
    }

    const customFaqOftenSwiper = ():any[] => {
        let result:any[] = [];

        for(let i:number=0; i<faqOftenList.length; i++) {
            result.push(<SwiperSlide key={i} className="fos-item">
                <div className="item-title">
                    <FontAwesomeIcon icon={qIcon} className="icon-custom" />
                    <div>
                        {faqOftenList[i].faqTitle}
                    </div>
                </div>
                <div className="item-content">
                    {faqOftenList[i].faqContent}
                </div>
            </SwiperSlide>);
        }
        return result;
    }

    const customFaqCategorySelectBox = ():any => {
        const result:any[] = [];

        for(let i:number=0; i<=faqCategoryList.length; i++) {
            if(i === 0) {
                result.push(<div key={i} className="category-item"
                                 ref={btn => (categoryBtn.current[i] = btn)}
                                 onClick={() => {setFaqCategory("");
                                     setCategorySelect(i);}}>
                    전체
                </div>)
            } else {
                result.push(<div key={i} className="category-item"
                                 ref={btn => (categoryBtn.current[i] = btn)}
                                 onClick={() => {setFaqCategory(faqCategoryList[i-1].faqCategoryFlag);
                                     setCategorySelect(i);}}>
                    {faqCategoryList[i-1].faqCategoryName}
                </div>)
            }
        }
        return result;
    }

    const onClickFaqListItem = (idx:number, faqNo:number):void => {
        setFaqBoxIndex(idx+1);
        setFaqBoxShow(!faqBoxShow);
        axios({
            method: "PUT",
            url: "/faq/faqViewsUp",
            params: {faqNo: faqNo}
        }).then((res):void => {

        }).catch((err):void => {
            console.log(err.message);
        })
    }

    useEffect(() => {
        const faqListData = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/faq/faqCategoryList"
            }).then((res):void => {
                setFaqCategoryList(res.data.data);
            }).catch((err):void => {
                console.log(err.message);
            })
            await axios({
                method: "GET",
                url: "/faq/faqOftenList"
            }).then((res):void => {
                setFaqOftenList(res.data.data.faqList);
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        setTimeout(() => {faqListData().then();}, 0);
    }, [])

    useEffect(() => {
        const getListData:object = {
            pageNo: pageNo,
            faqCategory: faqCategory,
            searchText: searchText,
        }
        const faqList = async () => {
            await axios({
                method: "POST",
                url: '/faq/faqList',
                data: JSON.stringify(getListData),
                headers: {'Content-type': 'application/json'}
            }).then((res):void => {
                setFaqList(res.data.data.faqList);
                setTotalPage(res.data.data.totalPage);
            }).catch((err):void => {
                console.log(err.message);
            });
        }
        setTimeout(() => {faqList().then();}, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNo, faqCategory, isSearchActive])

    useEffect(() => {
        setFaqBoxIndex(0);
        categoryBtn.current[categorySelect].className = categoryBtn.current[categorySelect].className.replace(' active', '');
        categoryBtn.current[categorySelect].className += ' active';

        for(let i:number=0; i<categoryBtn.current.length; i++) {
            if(i !== categorySelect) {
                categoryBtn.current[i].className = categoryBtn.current[i].className.replace(' active', '');
            }
        }
        for(let i:number=0; i<faqList.length; i++) {
            faqItemBox.current[i].className = faqItemBox.current[i].className.replace(' show-box', '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categorySelect])

    useEffect(() => {
        setFaqBoxShow(false);
    }, [faqBoxIndex])

    useEffect(() => {
        if(faqBoxIndex > 0) {
            if(faqBoxShow) {
                faqItemBox.current[faqBoxIndex-1].className = faqItemBox.current[faqBoxIndex-1].className.replace(' show-box', '');
            } else {
                faqItemBox.current[faqBoxIndex-1].className = faqItemBox.current[faqBoxIndex-1].className.replace(' show-box', '');
                faqItemBox.current[faqBoxIndex-1].className += ' show-box';
            }
            for(let i:number=0; i<faqList.length; i++) {
                if(i !== faqBoxIndex-1) {
                    faqItemBox.current[i].className = faqItemBox.current[i].className.replace(' show-box', '');
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [faqBoxShow])

    return (
        <Styled.FaqListView>
            <HeaderNavigation />

            <div className="faq-list-sub">
                <div className="faq-list-sub-view">
                    <div className="faq-sub-title">
                        자주하는 문의
                    </div>
                    <div className="faq-sub-input">
                        <input type="text" value={searchText} placeholder={"검색어를 입력해주세요"}
                               onKeyDown={(e) => activeEnter(e)}
                               onChange={(e) => setSearchText(e.target.value)}/>
                        <FontAwesomeIcon icon={searchIcon} className="icon-custom"
                                         onClick={() => setIsSearchActive(!isSearchActive)}/>
                    </div>
                </div>
            </div>
            <div className="faq-list-main">
                <div className="faq-list-head">
                    <div className="section-title">
                        자주 묻는 질문
                    </div>
                    <div className="fos-list-view">
                        <Swiper className="fos-list"
                                modules={[Navigation, Pagination]}
                                speed={1000}
                                spaceBetween={25}
                                slidesPerView={3}
                                slidesPerGroup={1}
                                onBeforeInit={(swiper:SwiperCore):void => {
                                    swiperNextRef.current = swiper
                                    swiperPrevRef.current = swiper
                                }}
                                pagination={{ clickable: true }}
                                breakpoints={{
                                    100: {
                                        slidesPerView: 1,
                                        spaceBetween: 25
                                    },
                                    880: {
                                        slidesPerView: 2,
                                        spaceBetween: 25
                                    },
                                    1280: {
                                        slidesPerView: 3,
                                        spaceBetween: 25
                                    },
                                }}>
                            {customFaqOftenSwiper()}
                        </Swiper>
                        <FontAwesomeIcon icon={leftArrowIcon} className="swiper-button-prev"
                                         onClick={() => swiperPrevRef.current?.slidePrev()} />
                        <FontAwesomeIcon icon={rightArrowIcon} className="swiper-button-next"
                                         onClick={() => swiperNextRef.current?.slideNext()} />
                    </div>
                </div>
                <div className="faq-list-body">
                    <div className="faq-list-category">
                        {customFaqCategorySelectBox()}
                    </div>
                    {
                        totalPage > 0 ?
                            <div className="faq-list-view">
                                {faqList.map((item, idx) => (
                                    <div key={idx} className="faq-list-item">
                                        <div className="faq-item-title"
                                             onClick={() => onClickFaqListItem(idx, item.faqNo)}>
                                            <FontAwesomeIcon icon={qIcon} className="icon-custom" />
                                            {item.faqTitle}
                                        </div>
                                        <div className="faq-item-content"
                                             ref={items => (faqItemBox.current[idx] = items)}>
                                            {item.faqContent}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            :
                            <div className="faq-list-empty">
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
                                                문의 정보가 없습니다.
                                            </div>
                                    }
                                </div>
                            </div>
                    }
                    {
                        totalPage > faqList.length ?
                            <div className="faq-more-btn" onClick={() => setPageNo(pageNo + 1)}>
                                더보기 <FontAwesomeIcon icon={arrow} className="icon-custom" />
                            </div>
                            :
                            <div />
                    }
                </div>
                <div className="faq-list-foot">

                </div>
            </div>

            <TopButtonNavigation type={""} />

            <FooterNavigation />
        </Styled.FaqListView>
    )
}

export default React.memo(FaqList);