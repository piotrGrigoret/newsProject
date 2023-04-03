import React, { useEffect, useState } from "react";
import "./News.css";
import Punkt from "./Punkt";
import NewsItem from "./NewsItem";

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
    const onAddToArchieveArticleHandler = (propsObject) =>{
        // console.log(props.archieveArr);
        // console.log(propsObject);
        const copyObject = {...propsObject};
        const copyArchieveArr = [...props.archieveArr, copyObject];
        
        props.setArchieveArr(copyArchieveArr);
        // proverkaDobavleniaVArhiv(propsObject);
        

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