import React from "react";
import "./Input.css";

const Input = (props) => {

    return(
        <div className="container">
            <div className="itemNews">Input News</div>
            <div className="inputsContainer">

                
                
                <input onChange={props.changheAuthor}  type="text" placeholder="Author" value={props.value1}/>
                <input onChange={props.changheTitle} type="text" placeholder="Title" value={props.value2} />
                <textarea onChange={props.changheNews} type="text" placeholder="News" value={props.value3}/>
                <button onClick={props.SubmitObject} className="submitButton">Submit</button>
            </div>
        </div>
    )


}

export default Input