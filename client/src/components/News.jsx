import React, { useEffect, useState } from "react";
import "./News.css";
import Punkt from "./Punkt";
import NewsItem from "./NewsItem";
import axios from 'axios';

import url from '../constants';
const News = (props) => {
    const [articles, setArticles] = useState([]);  
    useEffect(()=>{
        setArticles(props.curentArray);
        proverkaDobavleniaVArhiv();
      }, [props.curentArray, props.privateArchieve])
    
      const proverkaDobavleniaVArhiv = () => {
        // console.log(props.privateArchieve);
        
        const updatedArticles = props.curentArray.map((arrayObj)=>{    
            if(props.privateArchieve.find(article => article.title === arrayObj.title)){
            
                return {...arrayObj, galka: true}; 
            }
            return arrayObj;
        });
        setArticles(updatedArticles);
    }
    const onAddToArchieveArticleHandler = async(propsObject) =>{

            /// добавляем айди юзера в заррхивированный арликл
            const userData = JSON.parse(localStorage.getItem('userData'));   
            const userId = userData._id; 
            const copyObject = {...propsObject, userId};
            console.log(copyObject);

            const copyArchieveArr = [ copyObject, ...props.privateArchieve];
            props.setPrivateArhieve(copyArchieveArr);
            
            // const response = await axios.post("http://localhost:5000/auth/addarchieve", copyObject);
            const response = await axios.post(url + "/auth/addarchieve", copyObject);
            
    }
    
    return(
        <div className="news">
            {articles.map((object)=> 
              
                <Punkt 
                    key = {object.id}
                    propsObject = {object} 
                    onAddToArchieveArticleHandler = {onAddToArchieveArticleHandler}
                    propsComentSet = {props.comentSet}
                    propsindexCommentSet =  {props.indexCommentSet} 
                    propsButtonAddRegulator = {props.buttonAddRegulator}
                    setArchieveArr = {props.setArchieveArr}
                    setAtricleForComments = {props.setAtricleForComments}
                    setBackMainFromComments = {props.setBackMainFromComments}
                    adressToBackFromComments = {props.adressToBackFromComments}
                />
            )}
        </div>
    )
}
export default News