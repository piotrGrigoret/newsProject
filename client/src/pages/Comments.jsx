import React from 'react';
import { useState } from 'react';
import './Comments.css';
import { Link } from 'react-router-dom';
export const Comments = (props) => {
        
    const [articleMessages, setArticleMessages]  = useState(props.atricleForComments.comments);
    // console.log(articleMessages);

    const [objectCopy, setObjectcopy] = useState(
        {
            username : "misterCrow21",
            messageText: "",
            foto : "/clearAvatar.png",
            date : "",
            id: Math.floor(Math.random() * 100000000000000),
            classForKrestik : "ModalCommentkrestik"
        }
    );
    
    const [forArea, setForArea] = useState("");
    const [changheSendButton, setChangheSendButton] = useState(false);
    

    const addMessageInfoHandler = (event) =>{
        
        const objCopy = {...objectCopy};
        objCopy.messageText = event.target.value;
        setForArea(event.target.value);
        setObjectcopy(objCopy);
    //    console.log(objCopy.messageText);
        if(objCopy.messageText.length > 0){
            setChangheSendButton(true);
        }else{
            setChangheSendButton(false);

        }
    };

    const sendMessageHandler = () => {
 
        if(objectCopy.messageText !== ""){

            const h = new Date().getHours();
            const m = new Date().getMinutes();
            const commentCopy = {...objectCopy, date: h + ":" + m};
            const newArticle = {...articleMessages};
            const copyNewArticle = {...newArticle, comments: [...newArticle.comments, commentCopy]};

            setArticleMessages(copyNewArticle);

            setObjectcopy({
                username : "misterCrow21",
                messageText: "",
                foto : "/clearAvatar.png",
                date : "",
                id:Date.now().toString(),
                classForKrestik : "ModalCommentkrestik"

            });
            setForArea("");

            const mainArray = props.curentArray.map((curent)=>{
                if(curent.id == props.commentIndex){
                    console.log(";");
                    return curent = {...copyNewArticle};
                }
                else{
                    return curent;
                }
            });
            props.curentArraySet(mainArray);
            // console.log(props.curentArray);
            
        };
    };
   
    // const deleteMessageHandler = (comment) => {
    //     const copyObj = {...articleMessages};

    //     const corectMessagArray = copyObj.comments.filter((com) =>{ 
    //         if(com.messageText !== comment.messageText){
    //             return com;
    //         }    
    //     });
    //     const copyNewArticle = {...copyObj, comments : corectMessagArray}; 

    //     setArticleMessages({...copyObj, comments : corectMessagArray} );


    //     const mainArray = props.curentArray.map((curent)=>{
    //         if(curent.id == props.commentIndex){
    //             console.log(";");
    //             return curent = {...copyNewArticle};
    //         }
    //         else{
    //             return curent;
    //         }
    //     });
    //     // console.log(mainArray);
    //     props.curentArraySet(mainArray);
    // };
    // console.log(articleMessages);
 
    // console.log(props.atricleForComments);
 
    
    const test = (event) => {
        console.log('Key down event:', event.key);

    }
    
    return (
    <div className='commentsBox'>
            <div className='back' ><Link className='backLink' to = {"/" + props.backMainFromComment}>🠔Back</Link></div>
            
            <div  className="punktComments" >
                <div  className="autor">{props.atricleForComments.author}</div>
                <div  className="date">
                    {new Date(props.atricleForComments.publishedAt).getHours()}:
                    {new Date(props.atricleForComments.publishedAt).getMinutes()}
                </div>
            
                <div className="contentComments" >  {props.atricleForComments.content}  </div>
                <div  className="titleComments" > {props.atricleForComments.title} </div>
                <div className="fotoNews"> <img src={props.atricleForComments.urlToImage} alt="" /></div>                  
            </div>
            <div className="messageArea">
            </div>
            <div className="coomentInput"><textarea onChange={addMessageInfoHandler}  value={forArea} placeholder='Type comment...' name="" id="" cols="30" rows="10"></textarea></div>
            <div className={changheSendButton ? "sendMessageComments" : "sendMessageCommentsDisable"} onKeyDown={test}><img  src="./send2.png" alt="" /></div>


    </div>
  )
}
