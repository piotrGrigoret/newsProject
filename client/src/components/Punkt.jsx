import React, {useState} from "react";
import './Punkt.css';
import { Link } from "react-router-dom";
import moment from 'moment';
import axios from 'axios';

import url from '../constants';
const Punkt = (props) => {
    
    const openComment = async() =>{
        localStorage.setItem('currentComment', JSON.stringify(props.propsObject));

        const reqObject = props.propsObject
        
        // const response = await axios.post("http://localhost:5000/auth/checkArticleOnOpenComments", reqObject);
        const response = await axios.post(url + "/auth/checkArticleOnOpenComments", reqObject);
        console.log(response.data.copyObject);
        if(response.data.copyObject){
            localStorage.setItem('currentComment', JSON.stringify(response.data.copyObject));
            window.location.reload();
        }

        
        

    }
    // console.log(props.propsObject.galka)
    return(
                                   
           <div  className="punkt" >
                <div  className="autor">{props.propsObject.author}</div>
                <div  className="date">
                    
                    {moment(props.propsObject.publishedAt).format("MMMM Do, h:mm")}
                    

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
                            <div  className = "pliusik"><img onClick={() => props.onAddToArchieveArticleHandler(props.propsObject) } title = "add to private archive" src="./add.png" alt="" /></div>
                        :
                            <div  className = "galka"><img title = "added" src="./galka2.png" alt="" /></div>                         
                    }
                    <div  className="comment"><Link to={"/comments"} > <img title="comments" onClick={openComment} src="./comment3.png" alt="" /> </Link></div>

                </div>
            </div>
     
         
)
}

export default Punkt