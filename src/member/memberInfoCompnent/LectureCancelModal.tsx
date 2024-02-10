import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import styled from "styled-components";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown as arrow} from "@fortawesome/free-solid-svg-icons";

interface Props {
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
    lectureCancelData: {
        lectureApplicationNo:number;
        lectureApplicationOrderId:string;
    }
}

const LectureCancelModalView = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -10%);
  height: 570px;
  width: 700px;
  border: 1px solid ${({theme}) => theme.textColor};
  border-radius: 15px;
  background-color: ${({theme}) => theme.bgColor};
  z-index: 5;
  
  .lh-modal-title {
    box-sizing: border-box;
    height: 18%;
    width: 100%;
    padding: 35px;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    background: rgba(216,201,201,0.5);
    text-align: center;
    font-size: 25px;
    line-height: 32px;
    letter-spacing: -.4px;
  }
  
  .lh-modal-content {
    height: 66%;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background: gray; /* 스크롤바의 색상 */
      border-radius: 15px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(200, 200, 200, .1);
    }
  }

  .lh-modal-notice {
    box-sizing: border-box;
    width: 70%;
    padding: 25px 40px;
    margin: 20px auto 10px;
    border-radius: 9px;
    background-color: ${({theme}) => theme.noticeBgColor};
    color: ${({theme}) => theme.textColor};
    
    ul {
      padding-left: 25px;
      li {
        font-size: 14px;
        letter-spacing: -.2px;
        line-height: 26px;
        word-break: keep-all;
      }
    }
  }
  
  .lh-modal-cancelReason {
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    
    .cancelReason-title {
      width: 70%;
      padding: 5px 10px;
      margin: 10px auto 4px;
        
    }

    .sort-btn {
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 70%;
      padding: 5px 10px;
      margin: 0 auto;
      border: 1px solid ${({theme}) => theme.rgbaMedium};
      border-radius: 8px;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
    }

    .sort-box {
      position: relative;
      top: 105%;
      right: 0;
      height: 0;
      width: 70%;
      padding: 0;
      margin: 5px auto 0;
      border: none;
      border-radius: 5px;
      background: ${({theme}) => theme.cardBgColor};
      text-align: center;
      z-index: 2;
      transition: all 0.3s ease-in;
    }

    ul.sort-list {
      height: 0;
      width: 0;
      padding: 0;
      border: none;
      overflow: hidden;
      background: ${({theme}) => theme.cardBgColor};
      color: ${({theme}) => theme.textColor};
      text-align: left;
      cursor: pointer;
      z-index: 3;
      user-select: none;
      list-style:none;
      transition: all 0.3s ease-in;
    }

    ul.sort-list li {
      padding: 5px;
      font-size: 18px;
      line-height: 1.4em;
      opacity: 0.7;
      transition: all 0.3s ease-in;
    }

    .select-arrow {
      display: inline-block;
      margin-left: 7px;
      transition: all .4s linear;
    }

    .sort-box.show-list {
      border: 1px solid gray;
      padding: 5px;
      height: 260px;
      width: 70%;
    }

    .sort-list.show-list {
      border: none;
      padding: 10px 15px;
      margin: 0;
      height: 235px;
      width: 70%;
    }

    ul.sort-list li.sort-active {
      opacity: 1;
      font-weight: bold;
    }

    .select-arrow.show-list {
      transform: rotate(180deg);
    }
  }
  
  .lh-button-section {
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 20px 30px;
    border-top: 2px solid ${({theme}) => theme.rgbaMedium};
    
    .btn-cancel {
      display: inline-block;
      min-height: 30px;
      min-width: 120px;
      padding: 8px 5px 9px;
      border: 2px solid ${({theme}) => theme.rgbaMedium};
      border-radius: 8px;
      background-color: ${({theme}) => theme.bgColor};
      color: ${({theme}) => theme.textColor};
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      transition: all .4s ease;
      cursor: pointer;
    }
    
    .btn-submit {
      display: inline-block;
      min-height: 30px;
      min-width: 120px;
      padding: 8px 5px 9px;
      margin-left: 10px;
      border: 1px solid ${({theme}) => theme.rgbaLight};
      border-radius: 8px;
      background-color: ${({theme}) => theme.reverseBgColor};
      color: ${({theme}) => theme.reverseTextColor};
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      transition: all .4s ease;
      cursor: pointer;
    }
  }
`;

const LectureCancelModal = (props:Props) => {
    const modalRef:any = useRef<any>();
    const sortBox:any = useRef<any>();
    const sortList:any = useRef<any>();
    const sortBtn:any = useRef<any>([]);
    const selectArrow:any = useRef<any>();

    const sortItem:string[] = ['단순변심', '강좌변경', '결제형태 변경', '강좌불만', '컴플레인', '기타'];
    const [cancelReason, setCancelReason] = useState<string>("");
    const [sortSelect, setSortSelect] = useState<number>(0);
    const [isSortBoxShow, setIsSortBoxShow] = useState<boolean>(false);

    const sortItemList = ():any[] => {
        let result:any[] = [];
        for(let i:number=0; i<=sortItem.length; i++) {
            if(i === 0) {
                result.push(<li key={i}
                                ref={btn => (sortBtn.current[i] = btn)}
                                onClick={() => onClickSortSelectBox(i, "")}>
                    선택</li>)
            } else {
                result.push(<li key={i}
                                ref={btn => (sortBtn.current[i] = btn)}
                                onClick={() => onClickSortSelectBox(i, sortItem[i-1])}>
                    {sortItem[i-1]}</li>)
            }
        }
        return result;
    }

    const onClickSortSelectBox = (idx:number, sortSelect:string):void => {
        setIsSortBoxShow(false);
        setSortSelect(idx);
        setCancelReason(sortSelect);
    }

    const lectureCancelSubmit = async():Promise<boolean> => {
        const cancelData = {
            lectureApplicationNo: props.lectureCancelData.lectureApplicationNo,
            lectureApplicationOrderId: props.lectureCancelData.lectureApplicationOrderId,
            lectureApplicationCancelDesc: cancelReason
        }
        if(window.confirm('정말 수강취소 하시겠습니까?') === true) {
            await axios({
                method: "PUT",
                url: "/lecture/lectureApplicationCancel",
                data: JSON.stringify(cancelData),
                headers: {'Content-type': 'application/json'}
            }).then((res):void => {
                if(res.data) {
                    window.alert("수강취소가 완료되었습니다.");
                    window.location.reload();
                    props.setIsModal(false);
                } else {

                }
            })
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        if(isSortBoxShow) {
            sortBox.current.className += " show-list";
            sortList.current.className += " show-list";
            selectArrow.current.className += " show-list";
        } else {
            sortBox.current.className = sortBox.current.className.replace(' show-list', '');
            sortList.current.className = sortList.current.className.replace(' show-list', '');
            selectArrow.current.className = selectArrow.current.className.replace(' show-list', '');
        }
    }, [isSortBoxShow])

    useEffect(() => {
        sortBtn.current[sortSelect].className = sortBtn.current[sortSelect].className.replace('sort-active', '');
        sortBtn.current[sortSelect].className += 'sort-active';

        for(let i:number=0; i<sortBtn.current.length; i++) {
            if(i !== sortSelect) {
                sortBtn.current[i].className = sortBtn.current[i].className.replace('sort-active', '');
            }
        }
    }, [sortSelect])

    useEffect(()=>{
        const handleClickOutside = (e:MouseEvent)=> {
            if(modalRef.current && !modalRef.current.contains(e.target)) {
                props.setIsModal(false)
            }
        }
        window.addEventListener('mousedown',handleClickOutside)

        return()=>{
            window.removeEventListener('mousedown',handleClickOutside)
        }
    })

    return (
        <LectureCancelModalView ref={modalRef}>

            <div className="lh-modal-title">
                결제취소
            </div>
            <div className="lh-modal-content">
                <div className="lh-modal-notice">
                    <div>환불 규정</div>
                    <ul>
                        <li>수강시작일 3일전 전액 환불</li>
                        <li>수강시작일 2일전 2/3 환불</li>
                        <li>수강시작일 1일전 1/2 환불</li>
                        <li>수강시작일 당일 환불 불가</li>
                    </ul>
                </div>
                <div className="lh-modal-cancelReason">
                    <div className="cancelReason-title">
                        결제 취소(환불)에 대한 사유를 선택해 주세요.
                    </div>
                    <div className="sort-btn" onClick={() => setIsSortBoxShow(!isSortBoxShow)}>
                        <div >
                            {
                                sortSelect === 0 ?
                                    "선택"
                                    :
                                    sortItem[sortSelect-1]
                            }
                        </div>
                        <div className="select-arrow" ref={selectArrow}>
                            <FontAwesomeIcon icon={arrow} />
                        </div>
                    </div>
                    <div className="sort-box" ref={sortBox}>
                        <ul className="sort-list" ref={sortList}>
                            {sortItemList()}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="lh-button-section">
                <div className="button-desc">
                    선택하신 강좌의 결제를 취소하시겠습니까?
                </div>
                <div className="button-click">
                    <button onClick={() => props.setIsModal(false)} className="btn-cancel">취소</button>
                    <button onClick={() => lectureCancelSubmit()} className="btn-submit">확인</button>
                </div>
            </div>

        </LectureCancelModalView>
    )
}

export default LectureCancelModal;