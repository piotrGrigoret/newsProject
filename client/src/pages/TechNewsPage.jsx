// import './App.css';
import axios, { all } from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import News from '../components/News';
import ModalComent from '../components/ModalComent';

import url from '../constants';

function TechNewsPage(props) {
  const [articles, setArticles] =  useState([]);
  const [modalComentSetting, setModalComnetSetting] = useState(false);
  const [indexComment, setIndexComment] = useState("");  
  const [oneArticleComments, setOneArticleCommenss] = useState(articles.find((article) =>{
    
    if(article.id == indexComment){
        return article;
    }
}));

     
  useEffect(()=>{
    const getData = async () => {
        // const dannaie = await axios.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=f34b416e987b44b9849f7505c8a4782d`);
        const dannaie = await axios.get(url + "/auth/getArticlesTechnologies");
        // console.log(dannaie.data);
        setArticles(dannaie.data.dataTech.map((article, index) =>{
          
            return {...article, id: index, deleteFromPrivate: "false"};
          
        }));
        
      }
    getData();
   },[]);




   return (
    <div className="App">
      {/* <div className="goToArchieve"><Link className="linkArchieve" to = "/archieve" lig = {"gr"}><img title = "open archive" src="./arh.png" alt="" /></Link></div> */}
      <div className='archievetitle'>Technologies <img src="/tech.png" alt="" /></div>
      
    <News
        curentArray = {articles}
        curentArraySet = {setArticles}
        comentSet = {setModalComnetSetting}
        indexCommentSet = {setIndexComment}
        setAtricleForComments = {props.setAtricleForComments}
        privateArchieve = {props.privateArchieve}
        setPrivateArhieve = {props.setPrivateArhieve}
        setBackMainFromComments = {props.setBackMainFromComments}
        adressToBackFromComments = {"techNews"}

        />  
         
      
    </div>
  );
}

export default TechNewsPage;
