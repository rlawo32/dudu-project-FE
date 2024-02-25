import React, {useEffect, useRef, useState} from "react";

import useLectureSearchDataStore from "../../stores/useLectureSearchDataStore";

import * as Styled from "./LectureSearchBoxView.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown as arrow, faSearch as searchIcon, faRotateRight as resetIcon} from "@fortawesome/free-solid-svg-icons";

const LectureSearchBoxView = (props : { isShow: boolean; setIsShow: React.Dispatch<React.SetStateAction<boolean>>; }) => {
    const dvBtn:any = useRef<any>([]);
    const stBtn:any = useRef<any>([]);
    const dwBtn:any = useRef<any>([]);
    const feBtn:any = useRef<any>([]);
    const divisionBox:any = useRef<any>();
    const divisionArrow:any = useRef<any>();
    const stateBox:any = useRef<any>();
    const stateArrow:any = useRef<any>();
    const dowBox:any = useRef<any>();
    const dowArrow:any = useRef<any>();
    const feeBox:any = useRef<any>();
    const feeArrow:any = useRef<any>();

    const [isDivisionBoxShow, setIsDivisionBoxShow] = useState<boolean>(false);
    const [isStateBoxShow, setIsStateBoxShow] = useState<boolean>(false);
    const [isDowBoxShow, setIsDowBoxShow] = useState<boolean>(false);
    const [isFeeBoxShow, setIsFeeBoxShow] = useState<boolean>(false);

    const {
        searchButton, setSearchButton, searchText, setSearchText,
        ltDivisionArr, setLtDivisionArr,
        removeLtDivisionArr, removeAllLtDivisionArr,
        ltStateArr, setLtStateArr,
        removeLtStateArr, removeAllLtStateArr,
        ltDowArr, setLtDowArr,
        removeLtDowArr, removeAllLtDowArr,
        ltFeeArr, setLtFeeArr,
        removeLtFeeArr, removeAllLtFeeArr
    } = useLectureSearchDataStore();

    const activeEnter = (e:any):void => {
        if(e.key === "Enter") {
            props.setIsShow(false);
            setSearchButton(!searchButton);
        }
    }

    const onClickSearchReset = ():void => {
        setSearchText("");
        removeAllLtDivisionArr();
        removeAllLtStateArr();
        removeAllLtDowArr();
        removeAllLtFeeArr();
    }

    const searchItemDivisionList = ():any[] => {
        const divisionArr:any[] = [{value:'정기'}, {value:'단기'}, {value:'특강'}];
        let result:any[] = [];
        for(let i:number=0; i<divisionArr.length; i++) {
            result.push(<li key={i} ref={btn => (dvBtn.current[i] = btn)}
                            onClick={() => onClickDivisionBtn(i, divisionArr[i].value)}>
                {divisionArr[i].value}</li>)
        }
        return result;
    }

    const searchItemStateList = ():any[] => {
        const stateArr:any[] = [{stateNo:1, stateName:'접수예정'}, {stateNo:2, stateName:'접수중'},
            {stateNo:3, stateName:'대기접수'}, {stateNo:4, stateName:'접수마감'},
            {stateNo:5, stateName:'접수불가'}, {stateNo:6, stateName:'강의종료'}];
        let result:any[] = [];
        for(let i:number=0; i<stateArr.length; i++) {
            result.push(<li key={i} ref={btn => (stBtn.current[i] = btn)}
                            onClick={() => onClickStateBtn(i, stateArr[i].stateNo, stateArr[i].stateName)}>
                {stateArr[i].stateName}</li>)
        }
        return result;
    }

    const searchItemDowList = ():any[] => {
        const dowArr:any[] = [{lectureDowNo:1, lectureDowName:'월요일'},
            {lectureDowNo:2, lectureDowName:'화요일'}, {lectureDowNo:3, lectureDowName:'수요일'},
            {lectureDowNo:4, lectureDowName:'목요일'}, {lectureDowNo:5, lectureDowName:'금요일'},
            {lectureDowNo:6, lectureDowName:'토요일'}, {lectureDowNo:7, lectureDowName:'일요일'}];
        let result:any[] = [];
        for(let i:number=0; i<dowArr.length; i++) {
            result.push(<li key={i} ref={btn => (dwBtn.current[i] = btn)}
                            onClick={() => onClickDowBtn(i, dowArr[i].lectureDowNo, dowArr[i].lectureDowName)}>
                {dowArr[i].lectureDowName}</li>)
        }
        return result;
    }

    const searchItemFeeList = ():any[] => {
        const feeArr:any[] = [{lectureFeeNo:1, lectureFeeKey:'D', lectureFeeValue:'5000', lectureFeeName:'5천원 이하'},
            {lectureFeeNo:2, lectureFeeKey:'B', lectureFeeValue:'5000~10000', lectureFeeName:'5천원~1만원 이하'},
            {lectureFeeNo:3, lectureFeeKey:'B', lectureFeeValue:'10000~30000', lectureFeeName:'1만원~3만원 이하'},
            {lectureFeeNo:4, lectureFeeKey:'B', lectureFeeValue:'30000~50000', lectureFeeName:'3만원~5만원 이하'},
            {lectureFeeNo:5, lectureFeeKey:'B', lectureFeeValue:'50000~100000', lectureFeeName:'5만원~10만원 이하'},
            {lectureFeeNo:6, lectureFeeKey:'U', lectureFeeValue:'100000', lectureFeeName:'10만원 이상'}];
        let result:any[] = [];
        for(let i:number=0; i<feeArr.length; i++) {
            result.push(<li key={i} ref={btn => (feBtn.current[i] = btn)}
                            onClick={() => onClickFeeBtn(i, feeArr[i].lectureFeeNo, feeArr[i].lectureFeeKey,
                                feeArr[i].lectureFeeValue, feeArr[i].lectureFeeName)}>
                {feeArr[i].lectureFeeName}</li>)
        }
        return result;
    }

    const onClickDivisionBtn = (idx:number, item:string):void => {
        if(dvBtn.current[idx].className === 'btn-active') {
            dvBtn.current[idx].className = dvBtn.current[idx].className.replace('btn-active', '');
            removeLtDivisionArr(item);
        } else {
            dvBtn.current[idx].className += 'btn-active';
            setLtDivisionArr(idx, item);
        }
    }

    const onClickStateBtn = (idx:number, item:number, name:string):void => {
        if(stBtn.current[idx].className === 'btn-active') {
            stBtn.current[idx].className = stBtn.current[idx].className.replace('btn-active', '');
            removeLtStateArr(item);
        } else {
            stBtn.current[idx].className += 'btn-active';
            setLtStateArr(idx, item, name);
        }
    }

    const onClickDowBtn = (idx:number, item:number, name:string):void => {
        if(dwBtn.current[idx].className === 'btn-active') {
            dwBtn.current[idx].className = dwBtn.current[idx].className.replace('btn-active', '');
            removeLtDowArr(item);
        } else {
            dwBtn.current[idx].className += 'btn-active';
            setLtDowArr(idx, item, name);
        }
    }
    const onClickFeeBtn = (idx:number, item:number, key:string, value:string, name:string):void => {
        if(feBtn.current[idx].className === 'btn-active') {
            feBtn.current[idx].className = feBtn.current[idx].className.replace('btn-active', '');
            removeLtFeeArr(item);
        } else {
            feBtn.current[idx].className += 'btn-active';
            setLtFeeArr(idx, item, key, value, name);
        }
    }

    useEffect(() => {
        for(let i:number=0; i<dvBtn.current.length; i++) {
            dvBtn.current[i].className = dvBtn.current[i].className.replace('btn-active', '');
        }
        if(ltDivisionArr.length > 0) {
            for(let i:number=0; i<ltDivisionArr.length; i++) {
                dvBtn.current[ltDivisionArr[i].idx].className += 'btn-active';
            }
        }
    }, [ltDivisionArr])

    useEffect(() => {
        if(isDivisionBoxShow) {
            divisionBox.current.className += " show-list";
            divisionArrow.current.className += " show-list";
        } else {
            divisionBox.current.className = divisionBox.current.className.replace(' show-list', '');
            divisionArrow.current.className = divisionArrow.current.className.replace(' show-list', '');
        }
    }, [isDivisionBoxShow])

    useEffect(() => {
        for(let i:number=0; i<stBtn.current.length; i++) {
            stBtn.current[i].className = stBtn.current[i].className.replace('btn-active', '');
        }
        if(ltStateArr.length > 0) {
            for(let i:number=0; i<ltStateArr.length; i++) {
                stBtn.current[ltStateArr[i].idx].className += 'btn-active';
            }
        }
    }, [ltStateArr])

    useEffect(() => {
        if(isStateBoxShow) {
            stateBox.current.className += " show-list";
            stateArrow.current.className += " show-list";
        } else {
            stateBox.current.className = stateBox.current.className.replace(' show-list', '');
            stateArrow.current.className = stateArrow.current.className.replace(' show-list', '');
        }
    }, [isStateBoxShow])

    useEffect(() => {
        for(let i:number=0; i<dwBtn.current.length; i++) {
            dwBtn.current[i].className = dwBtn.current[i].className.replace('btn-active', '');
        }
        if(ltDowArr.length > 0) {
            for(let i:number=0; i<ltDowArr.length; i++) {
                dwBtn.current[ltDowArr[i].idx].className += 'btn-active';
            }
        }
    }, [ltDowArr])

    useEffect(() => {
        if(isDowBoxShow) {
            dowBox.current.className += " show-list";
            dowArrow.current.className += " show-list";
        } else {
            dowBox.current.className = dowBox.current.className.replace(' show-list', '');
            dowArrow.current.className = dowArrow.current.className.replace(' show-list', '');
        }
    }, [isDowBoxShow])

    useEffect(() => {
        for(let i:number=0; i<feBtn.current.length; i++) {
            feBtn.current[i].className = feBtn.current[i].className.replace('btn-active', '');
        }
        if(ltFeeArr.length > 0) {
            for(let i:number=0; i<ltFeeArr.length; i++) {
                feBtn.current[ltFeeArr[i].idx].className += 'btn-active';
            }
        }
    }, [ltFeeArr])

    useEffect(() => {
        if(isFeeBoxShow) {
            feeBox.current.className += " show-list";
            feeArrow.current.className += " show-list";
        } else {
            feeBox.current.className = feeBox.current.className.replace(' show-list', '');
            feeArrow.current.className = feeArrow.current.className.replace(' show-list', '');
        }
    }, [isFeeBoxShow])

    useEffect(() => {
        if(!props.isShow) {
            setIsDivisionBoxShow(false);
            setIsStateBoxShow(false);
            setIsDowBoxShow(false);
            setIsFeeBoxShow(false);
        }
    }, [props.isShow])

    return (
        <Styled.LectureSearchBox $showBox={props.isShow}>
            <div className="search-header">
                <div className="search-title">
                    상세검색
                </div>
                <div className="search-text">
                    <input type="text" value={searchText}
                           onChange={(e) => setSearchText(e.target.value)}
                           onKeyDown={(e) => activeEnter(e)}
                           placeholder="강좌명 or 강사명으로 검색" />
                    <FontAwesomeIcon icon={searchIcon} className="icon-custom"
                                     onClick={() => {props.setIsShow(false); setSearchButton(!searchButton);}}/>
                </div>
            </div>
            <div className="search-body">
                <div className="search-item-section search-division">
                    <div className="search-title"
                         onClick={() => setIsDivisionBoxShow(!isDivisionBoxShow)}>
                        {
                            ltDivisionArr.length > 0 ?
                                <div>강좌구분
                                    <span className="count-view">
                                        {ltDivisionArr.length}
                                    </span>
                                </div>
                                :
                                <div>강좌구분</div>
                        }
                        <div className="item-arrow" ref={divisionArrow}>
                            <FontAwesomeIcon icon={arrow} />
                        </div>
                    </div>
                    <ul className="division-item-list" ref={divisionBox}>
                        {searchItemDivisionList()}
                    </ul>
                </div>
                <div className="search-item-section search-state">
                    <div className="search-title"
                         onClick={() => setIsStateBoxShow(!isStateBoxShow)}>
                        {
                            ltStateArr.length > 0 ?
                                <div>강좌상태
                                    <span className="count-view">
                                        {ltStateArr.length}
                                    </span>
                                </div>
                                :
                                <div>강좌상태</div>
                        }
                        <div className="item-arrow" ref={stateArrow}>
                            <FontAwesomeIcon icon={arrow} />
                        </div>
                    </div>
                    <ul className="state-item-list" ref={stateBox}>
                        {searchItemStateList()}
                    </ul>
                </div>

                <div className="search-item-section search-dow">
                    <div className="search-title"
                         onClick={() => setIsDowBoxShow(!isDowBoxShow)}>
                        {
                            ltDowArr.length > 0 ?
                                <div>요일
                                    <span className="count-view">
                                        {ltDowArr.length}
                                    </span>
                                </div>
                                :
                                <div>요일</div>
                        }
                        <div className="item-arrow" ref={dowArrow}>
                            <FontAwesomeIcon icon={arrow} />
                        </div>
                    </div>
                    <ul className="dow-item-list" ref={dowBox}>
                        {searchItemDowList()}
                    </ul>
                </div>

                <div className="search-item-section search-fee">
                    <div className="search-title"
                         onClick={() => setIsFeeBoxShow(!isFeeBoxShow)}>
                        {
                            ltFeeArr.length > 0 ?
                                <div>수강료
                                    <span className="count-view">
                                        {ltFeeArr.length}
                                    </span>
                                </div>
                                :
                                <div>수강료</div>
                        }
                        <div className="item-arrow" ref={feeArrow}>
                            <FontAwesomeIcon icon={arrow} />
                        </div>
                    </div>
                    <ul className="fee-item-list" ref={feeBox}>
                        {searchItemFeeList()}
                    </ul>
                </div>
            </div>
            <div className="search-footer">
                <button onClick={() => onClickSearchReset()} className="reset-btn">
                    <FontAwesomeIcon icon={resetIcon} className="icon-custom" />
                    초기화
                </button>
                <button onClick={() => {props.setIsShow(false); setSearchButton(!searchButton);}} className="search-btn">
                    강좌 검색
                </button>
            </div>
        </Styled.LectureSearchBox>
    )
}

export default LectureSearchBoxView;