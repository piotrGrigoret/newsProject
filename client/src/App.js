import Layout from './components/Layout';

import TechNewsPage from './pages/TechNewsPage';
import BusinessNewsPage from './pages/BusinessNewsPage';
import CentralPage from './pages/CentralPage';
import { Comments } from "./pages/Comments";
import { Archieve } from './components/Archieve';
import RegistrationPage from "./pages/RegistrationPage";
import Profile from './components/Profile';
import Password from './components/Password';

import React, { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import url from './constants';
function App() {
  
  // юз эффект для получения изначальных данных из БД
  useEffect(()=>{
    getArticleArray();
    getStatisticsComents();
    getUser();
  }, []);
  const getUser = async() => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      
      // const response = await axios.post("http://localhost:5000/auth/getUser", userData);
      const response = await axios.post(url + "/auth/getUser", userData);
      // console.log(response.data.responseUser[0]);
      localStorage.setItem('userData', JSON.stringify(response.data.responseUser[0]));
      
  }
  //// СТЕЙТЫ ДЛЯ АРХИВА
  const [privateArchieve, setPrivateArhieve] = useState([]);//стейт для определния изначального массива архива для дальнейших вычислении
  const [publicArhieve, setPublicArchieve] = useState([]); // стейт для определения публичного архива
  const [lastDeleteArchiveObject, setlastDeleteArchiveObject] = useState("");
  // console.log(privateArchieve);
  //// СТЕЙТЫ ДЛЯ СТАТИЧТИКИ
  const [techArticlesPublic, setTechArticlesPublic] = useState([]);//стейты для статистики количества тех... и биз... артиклов          
  const [techArticlesPrivate, setTechArticlesPrivate] = useState([]);//стейты для статистики количества тех... и биз... артиклов          
  const [allUserComents, setAllUserComents] = useState([]); //стейт для статистики всех коментариев юзера
  //// СТЕЙТЫ ДЛЯ КОММЕНТАРИЕВ
  const [atricleForComments, setAtricleForComments] = useState([]);
  const [backMainFromComment, setBackMainFromComments] = useState("");
  // console.log(atricleForComments);  
  

  const getArticleArray = async() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
          // console.log(userData);
          
        // const response = await axios.post("http://localhost:5000/auth/getArchieve", userData);
        const response = await axios.post(url + "/auth/getArchieve", userData);
        setPrivateArhieve(response.data.articlesPrivat.reverse());
        setPublicArchieve(response.data.articlesPublic.reverse());
        /// для статистики
        setTechArticlesPublic(response.data.articlesPublic.filter((arr)=>{
          if(arr.source.name == "TechCrunch"){
              return arr
          }   
               
        }));
        setTechArticlesPrivate(response.data.articlesPrivat.filter((arr)=>{
          if(arr.source.name == "TechCrunch"){
              return arr
          }        
        }));
  };  
  const getStatisticsComents = async() =>{
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    // const responseComments = await axios.post("http://localhost:5000/auth/getComments", userData);
    const responseComments = await axios.post(url + "/auth/getComments", userData);
    setAllUserComents(responseComments.data.comments)

  }
 
  
  
  // ОБЪЕКТ ЮЗЕРА ПОЛУЧАЕМЫЙ ИЗ БД
  const [user, setUser] = useState({});

  //РАБОТА С АВТОРИЗАЦИЕЙ ЧЕРЕЗ ЛОКАЛ СТОРАДЖ  
  const userAcessLocalStorage = JSON.parse(localStorage.getItem('userAcess'));
  
  
  // ПЕРЕМЕННАЯ ОТВЕЧАЮЩАЯ ЗА ДОСТУП К АККАУНТУ ИЗ РЕГИСТРАЦИИ
  const [boolVariable, setBoolVariable] = useState(userAcessLocalStorage); 
  // console.log(boolVariable);

 return (
    <>
    {!boolVariable ? 
    <RegistrationPage// ВЫНЕСТИ В ОТДЕЛЬНЫЙ ДОМЕН
      setBoolVariable = {setBoolVariable}
      setUser = {setUser}
    />
    :
    <BrowserRouter>
            <Routes>     
            {/* {!boolVariable ?               //ТАК БУДЕТ ПРАВИЛЬНЕЕ Я ДУМАЮ, В ОТДЕЛЬНОМ РОУТЕ НО ПОКА ЧТО НЕ РАБОТАЕТ -НАДО УЗНАТЬ КАК ЭТО СДЕЛАТЬ
                <Route path="/registration" 
                element={
                  <RegistrationPage                      
                      setBoolVariable = {setBoolVariable}
                      setUser = {setUser}
                  />}
                />
                : */}
                
                <Route path="options/profile" element = {
                  <Profile
                    setBoolVariable = {setBoolVariable}
                    // archieveArr = {archieveArr}
                    techArticlesPublic = {techArticlesPublic}
                    techArticlesPrivate = {techArticlesPrivate}
                    privateArchieve = {privateArchieve}
                    publicArhieve = {publicArhieve}
                    allUserComents = {allUserComents}
                    />
                }/>

                <Route path="options/password" element = {
                  <Password
                  setBoolVariable = {setBoolVariable}

                  />
                }/>
                  <Route path="comments" element = {
                      <Comments 
                        // archieveArr = {archieveArr}
                        publicArhieve = {publicArhieve}
                        setPublicArchieve = {setPublicArchieve}
                        privateArchieve = {privateArchieve}
                        atricleForComments = {atricleForComments}
                        setAtricleForComments = {setAtricleForComments}
                        backMainFromComment = {backMainFromComment}
                      />}/>
                <Route path="/" 
                  element={
                    <Layout 
                      setBoolVariable = {setBoolVariable}
                      user = {user}
                    />}>
                    <Route path = "/" element = {<CentralPage/>} />
                    <Route path = "businessNews" element = {
                      <BusinessNewsPage 
                        // setArchieveArr = {setArchieveArr} 
                        // archieveArr = {archieveArr}
                        privateArchieve = {privateArchieve} 
                        setPrivateArhieve = {setPrivateArhieve}
                        setAtricleForComments = {setAtricleForComments}
                        setBackMainFromComments = {setBackMainFromComments}
                      />} />
                    <Route path = "techNews" element = {
                      <TechNewsPage 
                        // setArchieveArr = {setArchieveArr} 
                        // archieveArr = {archieveArr}
                        setAtricleForComments = {setAtricleForComments}
                        privateArchieve = {privateArchieve}  
                        setPrivateArhieve = {setPrivateArhieve}
                        setBackMainFromComments = {setBackMainFromComments}
                      />} />
                    <Route path= "archieve" element = {
                      <Archieve 
                        // setArchieveArr = {setArchieveArr} 
                        // archieveArr = {archieveArr}
                        lastDeleteArchiveObject={lastDeleteArchiveObject}
                        setlastDeleteArchiveObject = {setlastDeleteArchiveObject}
                        setAtricleForComments = {setAtricleForComments}
                        setBackMainFromComments = {setBackMainFromComments}
                        privateArchieve = {privateArchieve} 
                        setPrivateArhieve = {setPrivateArhieve}
                        publicArhieve = {publicArhieve}
                        setPublicArchieve = {setPublicArchieve}
                        />
                      }/>
                    {/* <Route path="comments" element = {
                      <Comments 
                        atricleForComments = {atricleForComments}
                        backMainFromComment = {backMainFromComment}
                      />}/> */}
                      
                  </Route>
              {/* } */}
            </Routes>
          </BrowserRouter>
        }
    </>

  );
}

export default App;
