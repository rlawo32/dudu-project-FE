import {useState} from "react";
import {useNavigate} from "react-router-dom";

import ClickConfettiEffect from "../../styles/ClickConfettiEffect";
import FixedConfettiEffect from "../../styles/FixedConfettiEffect";
import useJoinProgressStore from "../../stores/useJoinProgressStore";

import * as Styled from "../SignUp.style";

const JoinComplete = ():any => {
    const navigate = useNavigate();

    const {activeProgressTab} = useJoinProgressStore();

    const [xy,setXY]=useState<{x:number, y:number}>({x:0,y:0});

    return (
        <>
            <Styled.JoinCompleteView onMouseDown={(e) => setXY({x:e.clientX-500, y:e.clientY-500})}>
                <div className="jc-title">
                    <h1>가입완료 !!{ activeProgressTab === 'joinProgress4' ? <FixedConfettiEffect /> : <div />}</h1>
                </div>

                <ClickConfettiEffect coordinate={xy}/>
                {/*{ activeProgressTab === 'joinProgress4' ? <ClickConfettiEffect coordinate={xy}/> : <div />}*/}
                <div className="jc-button-section">
                    <button className="btn-home" onClick={() => navigate("/")}>메인화면으로</button>
                    <button className="btn-login" onClick={() => navigate("/signIn")}>로그인 화면으로</button>
                </div>
            </Styled.JoinCompleteView>
        </>
    )
}

export default JoinComplete;