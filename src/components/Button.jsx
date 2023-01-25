import React from "react";
import './Button.css';

const Button = (props) => {
    // if(props.buttonObjTwo) {
    //     console.log("shut up ");
    // }
    return (
        <div className="buttonContainer">
            {!props.buttonObjTwo && <button onClick={props.returnLast}  disabled className="previous1">Restore Previous</button>}
            {props.buttonObjTwo && <button onClick={props.returnLast}  className="previous">Restore Previous</button>}
            <button onClick={props.returnAll} className="all">Restore All</button>
        </div>
    )

};
export default Button;