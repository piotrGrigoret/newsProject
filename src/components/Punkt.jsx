import React, {useState} from "react";
import './Punkt.css';

const Punkt = (props) => {
    const openModalComment = () =>{
        props.propsComentSet(true);
      
        const copyObj = {...props.propsObject};
        props.propsindexCommentSet(props.propsObject.id);
    }
    return(
                                   
           <div  className="punkt">
                <div  className="autor">{props.propsObject.author}</div>
                <div  className="date">
                    {/* 23.01.23/ */}
                    {new Date(props.propsObject.publishedAt).getHours()}:
                    {new Date(props.propsObject.publishedAt).getMinutes()}
                </div>
                <div  className="content">{props.propsObject.content}</div>
                <div  className="comment"><img onClick={openModalComment} src="./comment.png" alt="" /></div>
                <div  className="title">{props.propsObject.title}</div>
                <div  className="krestik"><img onClick={() => props.delete(props.propsObject) } src="./trash.png" alt="" /></div>

            </div>
     
         
)
}

export default Punkt