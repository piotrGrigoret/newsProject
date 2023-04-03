import { Outlet, NavLink } from "react-router-dom";
import './Layout.css';
import NewsItem from "./NewsItem";
import { Link } from "react-router-dom";
const Layout = () => {
    return (
      <div>
        <div className="menuContainer">
                <NewsItem/>            
                <ul className="menu-main">
                    <li> <NavLink to="/">Main</NavLink></li>
                    {/* <li><NavLink to="/archieve">Archive</NavLink></li> */}
                    <li><NavLink to="/techNews">Technologies</NavLink></li>
                    <li><NavLink to="/businessNews">Business</NavLink></li>
                </ul>
              <div className="goToArchieve">
                <Link  className="linkArchieve"  to = "/archieve" >
                  <img title = "open archive" src="./arh.png" alt="" />
                </Link>
              </div>
        </div>
            
        
        <Outlet/> 


      </div>
    )
  };
  
  export default Layout;