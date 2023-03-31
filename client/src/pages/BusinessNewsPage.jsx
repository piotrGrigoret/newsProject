import axios, { all } from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import News from '../components/News';
import ModalComent from '../components/ModalComent';
function BusinessNewsPage(props) {
  const [articles, setArticles] =  useState([]);
  const [modalComentSetting, setModalComnetSetting] = useState(false);
  const [indexComment, setIndexComment] = useState("");  
  const [oneArticleComments, setOneArticleCommenss] = useState(articles.find((article) =>{
    
      if(article.id == indexComment){
          return article;
      }
  }));
  // console.log(props.archieveArr);
  useEffect(()=>{
    const getData = async () => {
        const dannaie = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f34b416e987b44b9849f7505c8a4782d`);
        // console.log(dannaie.data);    
        setArticles(dannaie.data.articles.map((article, index) =>{
          
            return {...article, id: index, comments: []};
          
        }));
      

      }
    getData();
   },[]);


   return (
    <div className="App">
      <div className="goToArchieve">
        <Link  className="linkArchieve"  to = "/archieve" >
            <img title = "open archive" src="./arh.png" alt="" />
        </Link>
        </div>
      {modalComentSetting && 
      <ModalComent
        comentSet = {setModalComnetSetting}
        curentArray = {articles}
        curentArraySet = {setArticles}
        commentIndex = {indexComment}
        articleMessages = {oneArticleComments}
        setArticleMessages  = {setOneArticleCommenss}
      />}
       <News
        curentArray = {articles}
        curentArraySet = {setArticles}
        comentSet = {setModalComnetSetting}
        indexCommentSet = {setIndexComment}
        setArchieveArr = {props.setArchieveArr}
        archieveArr = {props.archieveArr}
        setAtricleForComments = {props.setAtricleForComments}
        /> 

    </div>
  );
}

export default BusinessNewsPage;
