import Input from "./Input";
import Button from "./Button";
import React, {useState, useEffect} from "react";

import "./Tablita.css";

const Tablita = (props) => {
    const [objValue1, setObjValue1] = useState("");
    const [objValue2, setObjValue2] = useState("");
    const [objValue3, setObjValue3] = useState("");
        

    const onReturnHandler = () =>{
        props.curentArraySet(props.allArray);
        props.buttonSet(false);

    }
    const onReturnLastDeleteHandler = () => {
        props.curentArraySet(props.lastDeleteProp);
        props.buttonSet(false);
    }    

    const onChangheAuthorHandler = (event) => {
        const objCopy = {...props.submitObject};
            objCopy.author = event.target.value;
            props.submitObjectSet(objCopy);
            setObjValue1(event.target.value);
        }
    const onChangheTitleHandler = (event) => {
        const objCopy = {...props.submitObject};
        objCopy.title = event.target.value;
        props.submitObjectSet(objCopy);
        setObjValue2(event.target.value);

    }
    const onChangheNewsHandler = (event) => {
        const objCopy = {...props.submitObject};
        objCopy.content = event.target.value;
        props.submitObjectSet(objCopy);
        setObjValue3(event.target.value);

    }
    const onSubmitObjectHandler = () => {
        const arrCopy = [props.submitObject,...props.curentArray];
        // arrCopy= [props.submitObject, ...arrCopy];
        if(props.submitObject.author !== "" && props.submitObject.title !== "" ){
            props.curentArraySet(arrCopy);
            props.allArraySet(arrCopy);
            setObjValue1("");
            setObjValue2("");
            setObjValue3("");
            props.submitObjectSet({       
                author: "",
                content:"",
                title:"",
                publishedAt: new Date(),
                id: Math.floor(Math.random() * 100000000000000),
                comments: [
                {
                    username : "rotusZaglotus69",
                    messageText: "its a fake - you just got scammed",
                    foto : "/clearAvatar.png",
                    // date: new Date().toString()
                    date: "24:05"
        
                },
                ]
            });
        };
    }    
   return(
        <div className="tablita">
            
            <Input
                changheAuthor = {onChangheAuthorHandler}
                changheTitle = {onChangheTitleHandler}
                changheNews = {onChangheNewsHandler}
                SubmitObject = {onSubmitObjectHandler}
                value1 = {objValue1}
                value2 = {objValue2}
                value3 = {objValue3}
            />
            <Button
                returnAll = {onReturnHandler}
                returnLast = {onReturnLastDeleteHandler}
                buttonObjTwo = {props.buttonObj}
                // buttonSetTwo = {props.buttonSet}
            />
            
        </div>
    )
}


export default Tablita; 
