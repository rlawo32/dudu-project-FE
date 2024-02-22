import React, {useEffect, useRef, useState} from "react";
import axios from "axios";

import HeaderNavigation from "../navigation/HeaderNavigation";
import FooterNavigation from "../navigation/FooterNavigation";
import TopButtonNavigation from "../navigation/TopButtonNavigation";
import BranchInfoMap from "./BranchInfoMap";

import { Swiper, SwiperSlide } from 'swiper/react';
import {Swiper as SwiperCore} from "swiper/types";
import {Navigation, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import * as Styled from "./BranchInfo.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faLocationDot as positionIcon, faPhone as contactIcon,
    faDoorClosed as roomIcon, faCircleChevronLeft as leftArrowIcon, faCircleChevronRight as rightArrowIcon
} from "@fortawesome/free-solid-svg-icons";

const BranchInfoList = () => {
    const institutionBtn:any = useRef<any>([]);
    const swiperRef  = useRef<any>();
    const swiperPrevRef = useRef<SwiperCore>();
    const swiperNextRef = useRef<SwiperCore>();

    const [institutionList, setInstitutionList] = useState<{
        institutionNo:number;
        institutionName:string;
        institutionPosition:string;
        institutionContact:string;
    }[]>([{
        institutionNo: 0,
        institutionName: '',
        institutionPosition: '',
        institutionContact: ''
    }]);
    const [institutionImageList, setInstitutionImageList] = useState<{
        institutionImageNo:number;
        institutionImageCustom:string;
        institutionImageUrl:string;
    }[]>([]);
    const [lectureRoomList, setLectureRoomList] = useState<{
        lectureRoomNo:string;
        lectureInstitutionNo:string;
        lectureRoomName:string;
        lectureRoomContact:string;
    }[]>([]);

    const [institutionNo, setInstitutionNo] = useState<number>(1);
    const [selectInstitution, setSelectInstitution] = useState<number>(0);

    const customInstitutionCategorySelectBox = ():any => {
        const result:any[] = [];
        for(let i:number=0; i<institutionList.length; i++) {
            result.push(<div key={i} className="bi-category-item"
                             ref={btn => (institutionBtn.current[i] = btn)}
                             onClick={() => {setInstitutionNo(institutionList[i].institutionNo);
                                 setSelectInstitution(i);}}>
                {institutionList[i].institutionName}
            </div>)
        }
        return result;
    }

    const customInstitutionImageSwiper = ():any[] => {
        let result:any[] = [];

        for(let i:number=0; i<institutionImageList.length; i++) {
            result.push(<SwiperSlide key={i} className="bis-item">
                <img src={institutionImageList[i].institutionImageUrl} alt="지점 이미지" />
            </SwiperSlide>);
        }
        return result;
    }

    useEffect(() => {
        const institutionList = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/lecture/auth/lectureInstitutionList"
            }).then((res):void => {
                setInstitutionList(res.data.data);
            }).catch((err):void => {
                console.log(err.message);
            })
        }
        setTimeout(() => {institutionList().then();}, 0);
    }, [])

    useEffect(() => {
        const institutionList = async ():Promise<void> => {
            await axios({
                method: "GET",
                url: "/lecture/auth/lectureInstitutionImageList",
                params: {institutionNo: institutionNo}
            }).then((res):void => {
                setInstitutionImageList(res.data.data);
            }).catch((err):void => {
                console.log(err.message);
            })
            await axios({
                method: "GET",
                url: "/lecture/auth/lectureRoomList",
                params: {institutionNo: institutionNo}
            }).then((res):void => {
                setLectureRoomList(res.data.data);
            }).catch((err):void => {
                console.log(err.message);
            })

            swiperRef.current.swiper.slideTo(0, 1000, false);
        }
        setTimeout(() => {institutionList().then();}, 0);
    }, [institutionNo])

    useEffect(() => {
        institutionBtn.current[selectInstitution].className = institutionBtn.current[selectInstitution].className.replace(' active', '');
        institutionBtn.current[selectInstitution].className += ' active';

        for(let i:number=0; i<institutionBtn.current.length; i++) {
            if(i !== selectInstitution) {
                institutionBtn.current[i].className = institutionBtn.current[i].className.replace(' active', '');
            }
        }
    }, [selectInstitution])

    return (
        <Styled.BranchInfoListView>
            <HeaderNavigation />

            <div className="bi-sub-view">
                <div className="bi-sub">
                    <div className="bi-sub-title">
                        지점안내
                    </div>
                </div>
            </div>
            <div className="bi-view-main">
                <div className="bi-main-category">
                    {customInstitutionCategorySelectBox()}
                </div>
                <div className="bi-main-image">
                    <div className="bis-list-view">
                        <Swiper className="bis-list" ref={swiperRef}
                                modules={[Navigation, Pagination]}
                                speed={1000}
                                spaceBetween={25}
                                slidesPerView={1}
                                slidesPerGroup={1}
                                onBeforeInit={(swiper:SwiperCore):void => {
                                    swiperNextRef.current = swiper
                                    swiperPrevRef.current = swiper
                                }}
                                pagination={{ clickable: true }}
                                breakpoints={{

                                }}>
                            {customInstitutionImageSwiper()}
                        </Swiper>
                        <FontAwesomeIcon icon={leftArrowIcon} className="swiper-button-prev"
                                         onClick={() => swiperPrevRef.current?.slidePrev()} />
                        <FontAwesomeIcon icon={rightArrowIcon} className="swiper-button-next"
                                         onClick={() => swiperNextRef.current?.slideNext()} />
                    </div>
                </div>
                <div className="bi-main-info">
                    <div className="info-item info-position">
                        <FontAwesomeIcon icon={positionIcon} className="icon-custom" />
                        <div>
                            {institutionList[selectInstitution].institutionPosition}
                        </div>
                    </div>
                    <div className="info-item info-contact">
                        <FontAwesomeIcon icon={contactIcon} className="icon-custom" />
                        <div>
                            {institutionList[selectInstitution].institutionContact}
                        </div>
                    </div>
                    <div className="info-item info-room">
                        <FontAwesomeIcon icon={roomIcon} className="icon-custom" />
                        <div>
                            강의실 {lectureRoomList.length}실
                        </div>
                    </div>
                </div>
                {
                    institutionList.length > 0 ?
                        <div className="bi-main-map">
                            <div className="bi-map-title">
                                {institutionList[selectInstitution].institutionName} 오시는 길
                            </div>
                            <BranchInfoMap mapPosition={institutionList[selectInstitution].institutionPosition}
                                           mapName={institutionList[selectInstitution].institutionName}/>
                        </div> : <div />
                }
            </div>

            <TopButtonNavigation type={""} />

            <FooterNavigation />
        </Styled.BranchInfoListView>
    )
}

export default BranchInfoList;