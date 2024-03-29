import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import dompurify from "dompurify";
import axios from "axios";

import HeaderNavigation from "../navigation/HeaderNavigation";
import FooterNavigation from "../navigation/FooterNavigation";
import TopButtonNavigation from "../navigation/TopButtonNavigation";

import * as Styled from "./BoardDetail.style";

const BoardDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const boardNo:number = location.state.boardNo;

    const sanitizer = dompurify.sanitize;
    // 스크립트를 활용한 토큰 탈취 처럼 취약점을 노려서 javascript와 HTML로 악의적 코드를 웹 브라우저에 심어,
    // 사용자 접속시 그 악성코드가 실행되는 것을 크로스 사이드 스크립트, 보안을 위해 추가

    const [boardDetail, setBoardDetail] = useState<{
        boardNo:number; institutionName:string; boardCategory:string;
        boardTitle:string; boardContent:string; boardCreatedDate:string;
    }>();

    useEffect(() => {
        const boardDetailData = async () => {
            await axios({
                method: "GET",
                url: '/board/boardDetail',
                params: {boardNo: boardNo}
            }).then((res):void => {
                setBoardDetail(res.data.data);
            }).catch((err):void => {
                console.log(err.message);
            });
        }
        setTimeout(() => {boardDetailData().then();}, 100);
    }, [])

    return (
        <Styled.BoardDetailView>
            <HeaderNavigation />

            <div className="bd-main-view">
                <div className="bd-head">
                    <div className="head-top">
                        <div className="head-item bd-category">
                            {
                                boardDetail?.boardCategory === 'BI' ? "공지사항" : "이벤트"
                            }
                        </div>
                        <div className="head-item bd-institution">
                            {boardDetail?.institutionName}
                        </div>
                        <div className="head-item bd-date">
                            {boardDetail?.boardCreatedDate.substring(0, 10)}
                        </div>
                    </div>
                    <div className="head-bottom">
                        <div className="bd-title">
                            {boardDetail?.boardTitle}
                        </div>
                    </div>
                </div>
                <div className="bd-body">
                    <div className="bd-content"
                         dangerouslySetInnerHTML={{ __html : sanitizer(`${boardDetail?.boardContent}`) }} />
                </div>
                <div className="bd-foot">
                    <button onClick={() => navigate("/boardList")}>
                        목록으로
                    </button>
                </div>
            </div>

            <TopButtonNavigation type={""} />

            <FooterNavigation />
        </Styled.BoardDetailView>
    )
}

export default BoardDetail;