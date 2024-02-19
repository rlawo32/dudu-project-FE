import {useSearchParams, Await} from "react-router-dom";
import React, {useEffect, useState, Suspense} from "react";
import {setCookie} from "../Cookie";
import axios from "axios";

import HeaderNavigation from "../navigation/HeaderNavigation";
import FooterNavigation from "../navigation/FooterNavigation";
import TopButtonNavigation from "../navigation/TopButtonNavigation";
import MainRecommendEvent from "./homeComponent/MainRecommendEvent";
import MainCategoryEvent from "./homeComponent/MainCategoryEvent";
import MainRecentEvent from "./homeComponent/MainRecentEvent";
import MainInformEvent from "./homeComponent/MainInformEvent";

import * as Styled from "./MainHome.style";
import Loader from "../styles/loader";
import Error from "../styles/error";

const MainHome = ():any => {

    // 간편로그인 성공 시 생성되는 토큰들을 헤더와 쿠키에 넣어주는 작업
    const [searchParams, setSearchParams] = useSearchParams();
    const [easyLoginState, setEasyLoginState] = useState(false);

    useEffect(() => {
        if(searchParams.get("bearer") === "Bearer") {
            axios.defaults.headers.common['Authorization'] = `${searchParams.get("bearer")} ${searchParams.get("accessToken")}`;
            const expires:string = `${searchParams.get("expires")}`;
            const expiresDate:Date = new Date(`${searchParams.get("expiresDate")}`);

            setCookie('refreshToken', `${searchParams.get("refreshToken")}`, {
                path: '/',
                // // httpOnly: true,
                // expires
            });

            const storageAddRole = async ():Promise<void> => {
                axios({
                    method: "GET",
                    url: "/member/getRole"
                }).then((res) => {
                    window.localStorage.setItem("role", res.data);
                    setSearchParams("");
                    setEasyLoginState(!easyLoginState);
                    window.location.reload();
                }).catch((err) => {
                    console.log(err.message);
                })
            }
            setTimeout(() => {storageAddRole().then();}, 100);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // useEffect(() => {
    //     if(easyLoginState) {
    //         setSearchParams("");
    //         setEasyLoginState(!easyLoginState);
    //         window.location.reload();
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [easyLoginState])
    // 간편로그인 성공 시 생성되는 토큰들을 헤더와 쿠키에 넣어주는 작업

    return (
        <Styled.MainHomeView>
            <HeaderNavigation />

            <Suspense fallback={<Loader />}>
                <Await resolve={<MainRecommendEvent />} errorElement={<Error />}>
                    <MainRecommendEvent />
                </Await>
                <Await resolve={<MainRecommendEvent />} errorElement={<Error />}>
                    <MainCategoryEvent />
                </Await>
                <Await resolve={<MainRecommendEvent />} errorElement={<Error />}>
                    <MainRecentEvent />
                </Await>
                <Await resolve={<MainRecommendEvent />} errorElement={<Error />}>
                    <MainInformEvent />
                </Await>
            </Suspense>

            <TopButtonNavigation type={""} />

            <FooterNavigation />
        </Styled.MainHomeView>
    )
}

export default MainHome;