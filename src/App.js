import TechNewsPage from './pages/TechNewsPage';
import BusinessNewsPage from './pages/BusinessNewsPage';
import axios, { all } from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import CentralPage from './pages/CentralPage';
import './App.css';

function App() {

   return (
    <>
    <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout/>}>
                <Route path = "/" element={<CentralPage/>} />
                <Route path = "businessNews" element={<BusinessNewsPage/>} />
                <Route path = "techNews" element={<TechNewsPage/>} />
              </Route>
            </Routes>
          </BrowserRouter>

    </>

  );
}

export default App;
