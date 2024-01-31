import React, {useEffect, useRef} from "react";

import * as Styled from "./MemberInfoModal.style";

interface Props {
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
    memberData: {
        memberNo:number;
        memberEmail:string;
        memberId:string;
        memberName:string;
        memberGender:string;
        memberBirth:string;
        memberPhone:string;
    };
}

const MemberInfoUpdate = (props:Props) => {
    const modalRef:any = useRef<any>();

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
        <Styled.MemberInfoUpdateView ref={modalRef}>

        </Styled.MemberInfoUpdateView>
    )
}

export default MemberInfoUpdate;