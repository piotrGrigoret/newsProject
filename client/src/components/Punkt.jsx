import React, {useState} from "react";
import './Punkt.css';
import { Link } from "react-router-dom";
const Punkt = (props) => {
    
    const openComment = () =>{
        props.setAtricleForComments(props.propsObject);
        props.setBackMainFromComments(props.adressToBackFromComments);
    }
    // console.log(props.propsObject.galka)
    return(
                                   
           <div  className="punkt" >
                <div  className="autor">{props.propsObject.author}</div>
                <div  className="date">
                    {/* 23.01.23/ */}
                    {new Date(props.propsObject.publishedAt).getHours()}:
                    {new Date(props.propsObject.publishedAt).getMinutes()}
                </div>
                
               <div  className="content" > <Link to = {props.propsObject.url } className = "link"  title="go to source✅"> {props.propsObject.content} </Link> </div>
                <div  className="title" > <Link to = {props.propsObject.url } className = "link" title="go to source✅" >{props.propsObject.title} </Link></div>
                <div className="fotoNews"> <img src={props.propsObject.urlToImage} alt="" /></div>
                <div className="settingsContainer">
                    {props.krestik ? 
                        <div  className="krestik"><img onClick={() => props.onDeleteArchiveArticleHandler(props.propsObject) } title = "delete from archive" src="./trash.png" alt="" /></div>
                            :
                        !props.propsObject.galka ?
                        <div  className="pliusik"><img onClick={() => props.addArchieve(props.propsObject) } title = "add to archive" src="./add.png" alt="" /></div>
                        :
                        <div  className="galka"><img title = "added" src="./galka2.png" alt="" /></div>                         
                    }
                    <div  className="comment"><Link to={"/comments"}> <img title="comments" onClick={openComment} src="./comment3.png" alt="" /> </Link></div>

                </div>
            </div>
     
         
)
}

export default Punkt