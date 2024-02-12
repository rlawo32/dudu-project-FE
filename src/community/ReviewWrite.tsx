import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import LectureQuillEditor from "../lecture/lectureWriteComponent/LectureQuillEditor";

import * as Styled from "./ReviewWrite.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar as fullStar} from "@fortawesome/free-solid-svg-icons";
import {faStar as emptyStar} from "@fortawesome/free-regular-svg-icons";

interface Props {
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
    lectureNo:number;
}

const ReviewWrite = (props:Props) => {
    const navigate = useNavigate();

    const [reviewTitle, setReviewTitle] = useState<string>("");
    const [reviewContent, setReviewContent] = useState<string>("");
    const [reviewScore, setReviewScore] = useState<number>(0);
    const [reviewImageArr, setReviewImageArr] = useState<{
        imgType:string;
        imgName:string;
        imgUrl:string;
        imgSize:number;
    }[]>([]);

    const customRatingStarActionHandler = ():any[] => {
        let result:any[] = [];
        for (let i:number=0; i<5; i++) {
            result.push(
                <div key={i+1} onClick={() => setReviewScore(i+1)} className="score-item">
                        {
                            i+1 <= reviewScore ?
                                <FontAwesomeIcon icon={fullStar} />
                                :
                                <FontAwesomeIcon icon={emptyStar} />
                        }
                    </div>);
        }
        return result;
    }

    const reviewWriteHandler = ():boolean => {
        const reviewData:object = {
            lectureNo: props.lectureNo,
            reviewTitle: reviewTitle,
            reviewContent: reviewContent,
            reviewScore: reviewScore,
            reviewImage: reviewImageArr
        }
        if(reviewTitle.length < 1) {
            alert('제목을 작성해주세요.');
            return false;
        } else if(reviewContent.length < 1) {
            alert('내용을 작성해주세요.');
            return false;
        } else if(reviewScore < 1) {
            alert('별점을 최소 1점이상을 주세요.');
            return false;
        } else {
            if(window.confirm("작성하시겠습니까?") == true) {
                // axios({
                //     method: "POST",
                //     url: "/review/reviewWrite",
                //     data: JSON.stringify(reviewData),
                //     headers: {'Content-type': 'application/json'}
                // }).then((res):void => {
                //     alert("작성이 완료되었습니다.");
                //     navigate("/");
                // }).catch((err):void => {
                //     console.log(err.message);
                // })
                console.log(reviewData)
                return true;
            } else {
                return false;
            }
        }
    }

    return (
        <Styled.ReviewWriteView>
            <div className="rw-view">
                <div className="rw-view-top">
                    <div className="rw-title">
                        <div className="item-title">제목 작성</div>
                        <input type="text" value={reviewTitle}
                               onChange={(e) => setReviewTitle(e.target.value)}/>
                    </div>
                    <div className="rw-score">
                        <div className="item-title">별점</div>
                        <div className="score-view">
                            {customRatingStarActionHandler()}
                        </div>
                    </div>
                </div>
                <div className="rw-content">
                    <div className="item-title">내용 작성</div>
                    <LectureQuillEditor useType={"R"} content={reviewContent} setContent={setReviewContent}
                                        Image={reviewImageArr} setImage={setReviewImageArr}/>
                </div>
                <div className="rw-button">
                    <button onClick={() => reviewWriteHandler()}>작성하기</button>
                </div>
            </div>
        </Styled.ReviewWriteView>
    )
}

export default ReviewWrite;