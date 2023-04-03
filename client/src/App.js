import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import TechNewsPage from './pages/TechNewsPage';
import BusinessNewsPage from './pages/BusinessNewsPage';
import CentralPage from './pages/CentralPage';
import { Comments } from "./pages/Comments";
import './App.css';
import { Archieve } from './components/Archieve';
import { useState } from 'react';
function App() {
  
  //// СТЕЙТЫ ДЛЯ АРХИВА
  const [archieveArr, setArchieveArr] = useState([]);
  const [lastDeleteArchiveObject, setlastDeleteArchiveObject] = useState("");

  //// СТЕЙТЫ ДЛЯ КОММЕНТАРИЕВ
  const [atricleForComments, setAtricleForComments] = useState({});
  const [backMainFromComment, setBackMainFromComments] = useState("");
  // console.log(archieveArr);
  return (
    <>
    <BrowserRouter>
            <Routes>

              <Route>

                {
                  
                <Route path="/" element={<Layout/>}>
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
                }
              </Route>
            </Routes>
          </BrowserRouter>

    </>

  );
}

export default App;
