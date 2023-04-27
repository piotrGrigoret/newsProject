import React,{useState} from "react";
import "./ModalComent.css";
import axios from "axios";

import url from '../constants'; 

const ModalComent = (props) =>{
    const noHandler = () => {
        props.setDeleteModalAttentionCard(false)
    }
    const yesHandler = async() =>{
        // console.log(props.userDataObj);
        localStorage.setItem('userAcess', false);
        props.setBoolVariable(false);
        
        //  await axios.post("http://localhost:5000/auth/deleteUser", props.userDataObj );
         await axios.post(url + "/auth/deleteUser", props.userDataObj );
    }
    return(
        <div  className="modalComentBackground" >
            <div  className="modalComentCard">
                <div className="messageInfo">All account information will be deleted. Are you sure?</div>
                <div className="yes" onClick={yesHandler}>Yes</div>
                <div className="no" onClick={noHandler}>No</div>
            </div>
            
         </div>
    )
}

export default ModalComent;