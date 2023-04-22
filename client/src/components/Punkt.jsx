import React, {useState} from "react";
import './Punkt.css';
import { Link } from "react-router-dom";
import moment from 'moment';

const Punkt = (props) => {
    
    const openComment = () =>{
        localStorage.setItem('currentComment', JSON.stringify(props.propsObject));
        // props.setAtricleForComments(props.propsObject);
        
    }
    // console.log(props.propsObject.galka)
    return(
                                   
           <div  className="punkt" >
                <div  className="autor">{props.propsObject.author}</div>
                <div  className="date">
                    
                    {moment(props.propsObject.publishedAt).format("HH:mm")}

                </div>
                
               <div  className="content" > <Link to = {props.propsObject.url } className = "link"  title="go to source✅"> {props.propsObject.content} </Link> </div>
                <div  className="title" > <Link to = {props.propsObject.url } className = "link" title="go to source✅" >{props.propsObject.title} </Link></div>
                <div className="fotoNews">{props.propsObject.urlToImage ? <img src={props.propsObject.urlToImage} alt="" /> : <div></div>}</div>
                <div className="settingsContainer">
                    {props.krestik && !props.public 
                    ? 
                
                        <div  className="krestik"><img onClick={() => props.onDeleteArchiveArticleHandler(props.propsObject) } title = "delete from archive" src="./trash.png" alt="" /></div>
                    :
                        !props.propsObject.galka
                        ?
                            <div  className = "pliusik"><img onClick={() => props.onAddToArchieveArticleHandler(props.propsObject) } title = "add to archive" src="./add.png" alt="" /></div>
                        :
                            <div  className = "galka"><img title = "added" src="./galka2.png" alt="" /></div>                         
                    }
                    <div  className="comment"><Link to={"/comments"} > <img title="comments" onClick={openComment} src="./comment3.png" alt="" /> </Link></div>

                </div>
            </div>
     
         
)
}

export default Punkt