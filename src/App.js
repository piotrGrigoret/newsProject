import TechNewsPage from './pages/TechNewsPage';
import BusinessNewsPage from './pages/BusinessNewsPage';
import axios, { all } from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import './App.css';

function App() {

   return (
    <>
    <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout/>}>
                <Route path = "businessNews" element={<BusinessNewsPage/>} />
                <Route path = "techNews" element={<TechNewsPage/>} />
              </Route>
            </Routes>
          </BrowserRouter>
    </>
  );
}

export default App;
