import './App.css';
import axios, { all } from "axios";
import React, {useState, useEffect} from "react";
import Tablita from './components/Tablita';
import News from './components/News';
import ModalComent from './components/ModalComent';
function App() {
  const [articles, setArticles] =  useState([]);
  const [defaultArticles, setDefaultArticles] = useState([]);
  const [lastDelete, setLastDelete] = useState([]);
  const [objSubmit, setObjSubmit] = useState({       
      author: "",
      content:"",
      title:"",
      publishedAt: new Date(),
      id: Math.floor(Math.random() * 100000000000000),
      comments: [
        {
          username : "rotusZaglotus69",
          messageText: "its a fake - you just got scammed",
          foto : "/clearAvatar.png",
          // date: new Date().toString()
          date: "24:05"

      },
      ]
  });
  const [buttonSetting, setButtonSetting] = useState(false);
  const [modalComentSetting, setModalComnetSetting] = useState(false);
  const [indexComment, setIndexComment] = useState("");  

  
  useEffect(()=>{
    const getData = async () => {
        const dannaie = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f34b416e987b44b9849f7505c8a4782d`);
        setArticles(dannaie.data.articles.map((article, index) =>{
          if(index === 0){
            return {...article, id: index, comments: [
                {
                    username : "pliusevaiSlonik98",
                    messageText: "interesting",
                    foto : "/clearAvatar.png",
                    // date: new Date().toString()
                    date: "24:05"

                },
                {
                    username: "litleGunBaby",
                    messageText: "enter on my page  and will see something interesting ",
                    foto : "/clearAvatar.png",
                    // date: new Date().toString()
                    date: "24:12"
                }
            ]}
          }
            return {...article, id: index, comments: []};
          
        }));
        setDefaultArticles(dannaie.data.articles.map((article, index) =>{
          if(index === 0){
            return {...article, id: index, comments: [
                {
                    username : "pliusevaiSlonik98",
                    messageText: "interesting",
                    foto : "/clearAvatar.png",
                    // date: new Date().toString()
                    date: "24:05"

                },
                {
                    username: "litleGunBaby",
                    messageText: "enter on my page  and will see something interesting ",
                    foto : "/clearAvatar.png",
                    // date: new Date().toString()
                    date: "24:12"
                }
            ]}
          }
            return {...article, id: index, comments: []};
          
        }));

      }
    getData();
   },[])
  //  console.log(articles);
   return (
    <div className="App">
      {modalComentSetting && 
      <ModalComent
        comentSet = {setModalComnetSetting}
        curentArray = {articles}
        curentArraySet = {setArticles}
        commentIndex = {indexComment}
      />}
      <Tablita
        curentArray = {articles}
        curentArraySet = {setArticles}
        allArray = {defaultArticles}
        allArraySet = {setDefaultArticles}
        lastDeleteProp = {lastDelete}
        lastDeletePropSet = {setLastDelete}
        submitObject = {objSubmit}
        submitObjectSet = {setObjSubmit}
        buttonObj = {buttonSetting}
        buttonSet = {setButtonSetting}
      />  

      <News
        curentArray = {articles}
        curentArraySet = {setArticles}
        allArray = {defaultArticles}
        allArraySet = {setDefaultArticles}
        lastDeleteProp = {lastDelete}
        lastDeletePropSet = {setLastDelete}
        buttonSet = {setButtonSetting}
        comentSet = {setModalComnetSetting}
        indexCommentSet = {setIndexComment}
      />
    </div>
  );
}

export default App;
