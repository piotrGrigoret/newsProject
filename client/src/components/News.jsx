import React, { useEffect, useState } from "react";
import "./News.css";
import Punkt from "./Punkt";
import NewsItem from "./NewsItem";
import axios from 'axios';

const News = (props) => {
    // ГАЛКИ НЕ СОХРАНЯЮТСЯ - ВОЗМОЖНО МОЖНО БУЖЕТ РЕШИТЬ ЧЕРЕЗ БД
    const [articles, setArticles] = useState([]);  
    useEffect(()=>{
        setArticles(props.curentArray);
        proverkaDobavleniaVArhiv();
        const updatedArticles = props.curentArray.map((arrayObj)=>{    
            if(props.archieveArr.find(article => article.title === arrayObj.title)){
            
                return {...arrayObj, galka: true}; 
            }
            return arrayObj;
        });
        // console.log(updatedArticles);
        setArticles(updatedArticles);
        proverkaDobavleniaVArhiv();

      }, [props.curentArray, props.archieveArr])
    const proverkaDobavleniaVArhiv = () => {
        // console.log(props.archieveArr);
        const updatedArticles = props.curentArray.map((arrayObj)=>{    
            if(props.archieveArr.find(article => article.title === arrayObj.title)){
            
                return {...arrayObj, galka: true}; 
            }
            return arrayObj;
        });
        // console.log(updatedArticles);
        setArticles(updatedArticles);
    }
    const onAddToArchieveArticleHandler = async(propsObject) =>{
        // console.log(props.archieveArr);

        /// добавляем айди юзера в заррхивированный арликл
        const userData = JSON.parse(localStorage.getItem('userData'));   
        const userId = userData._id; 
        const privat = true;
        const copyObject = {...propsObject, userId, privat};
        console.log(copyObject);
    
        const copyArchieveArr = [...props.archieveArr, copyObject];
        
        props.setArchieveArr(copyArchieveArr);
        // proverkaDobavleniaVArhiv(propsObject);
        
        const response = await axios.post("http://localhost:5000/auth/addarchieve",copyObject);
        // console.log(response);
        

    }
    // console.log(props.archieveArr);
    
    return(
        <div className="news">
            {/* {props.curentArray.map((object)=>  */}
            {articles.map((object)=> 
              
                <Punkt 
                    key = {object.id}
                    propsObject = {object} 
                    addArchieve = {onAddToArchieveArticleHandler}
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