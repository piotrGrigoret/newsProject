import React from "react";
import './Button.css';
import axios from "axios";

import url from '../constants';
const Button = (props) => {
    const returnObject = async() => {
        const copyLastDeleteObject = {...props.lastDeleteArchiveObject};
        console.log(copyLastDeleteObject);
        const copyArchiveArr = [copyLastDeleteObject, ...props.archieveArr];
        console.log(copyArchiveArr);
        props.setArchieveArr(copyArchiveArr);
        props.setlastDeleteArchiveObject("");
        window.location.reload();   

        // const response = await axios.post("http://localhost:5000/auth/restoreArchieve", copyLastDeleteObject);
        const response = await axios.post(url + "/auth/restoreArchieve", copyLastDeleteObject);
    }
    // console.log(props.lastDeleteArchiveObject);
    return (
        <div className="buttonContainer">
            {props.lastDeleteArchiveObject == "" 
                ?
                    <button title="restore deleted article" className="allDisabled" type="button" disabled >Restore Article</button>
                :
                    <button title="restore deleted article" onClick={returnObject} className="all" >Restore Article</button>
            }
            {}
        </div>
    )

};
export default Button;