import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import TechNewsPage from './pages/TechNewsPage';
import BusinessNewsPage from './pages/BusinessNewsPage';
import CentralPage from './pages/CentralPage';
import { Comments } from "./pages/Comments";
import './App.css';
import { Archieve } from './components/Archieve';
import React, { useState } from 'react';
import RegistrationPage from "./pages/RegistrationPage";
function App() {
  
  //// СТЕЙТЫ ДЛЯ АРХИВА
  const [archieveArr, setArchieveArr] = useState([]);
  const [lastDeleteArchiveObject, setlastDeleteArchiveObject] = useState("");

  //// СТЕЙТЫ ДЛЯ КОММЕНТАРИЕВ
  const [atricleForComments, setAtricleForComments] = useState([]);
  const [backMainFromComment, setBackMainFromComments] = useState("");
  // console.log(archieveArr);
 
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
                <Route path="/" 
                element={
                <Layout 
                    setBoolVariable = {setBoolVariable}
                    user = {user}
                />}>
                    <Route path = "/" element = {<CentralPage setArchieveArr = {setArchieveArr} />} />
                    <Route path = "businessNews" element = {
                      <BusinessNewsPage 
                        setArchieveArr = {setArchieveArr} 
                        archieveArr = {archieveArr}
                        setAtricleForComments = {setAtricleForComments}
                        setBackMainFromComments = {setBackMainFromComments}
                      />} />
                    <Route path = "techNews" element = {
                      <TechNewsPage 
                        setArchieveArr = {setArchieveArr} 
                        archieveArr = {archieveArr}
                        setAtricleForComments = {setAtricleForComments}
                        setBackMainFromComments = {setBackMainFromComments}
                      />} />
                    <Route path= "archieve" element = {
                      <Archieve 
                        setArchieveArr = {setArchieveArr} 
                        archieveArr = {archieveArr}
                        lastDeleteArchiveObject={lastDeleteArchiveObject}
                        setlastDeleteArchiveObject = {setlastDeleteArchiveObject}
                        setAtricleForComments = {setAtricleForComments}
                        setBackMainFromComments = {setBackMainFromComments}
                        />
                      }/>
                    <Route path="comments" element = {
                      <Comments 
                        atricleForComments = {atricleForComments}
                        backMainFromComment = {backMainFromComment}
                      />}/>
                  </Route>
              {/* } */}
            </Routes>
          </BrowserRouter>
        }
    </>

  );
}

export default App;
