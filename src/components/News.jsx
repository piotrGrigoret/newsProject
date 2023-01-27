import React from "react";
import "./News.css";
import Punkt from "./Punkt";
import NewsItem from "./NewsItem";

const News = (props) => {
          
    const onDeleteHandler = (propsObject) => {
        let arrCopy = props.curentArray.filter((arr) => {
            if(arr.title !== propsObject.title){
                return arr
            }   
        })
        props.lastDeletePropSet(props.curentArray);
        props.curentArraySet(arrCopy);
        props.buttonSet(true);
    }
    return(
        <div className="news">
            <NewsItem/>            
            {props.curentArray.map((object)=> 
                <Punkt 
                propsObject = {object} 
                delete = {onDeleteHandler}
                propsComentSet = {props.comentSet}
                propsindexCommentSet =  {props.indexCommentSet} 
                
            />
            )}
        </div>
    )
}
export default News