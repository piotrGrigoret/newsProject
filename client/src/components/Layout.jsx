import { Outlet, NavLink } from "react-router-dom";
import './Layout.css';
import NewsItem from "./NewsItem";
import { Link } from "react-router-dom";
const Layout = (props) => {
    const userData = JSON.parse(localStorage.getItem('userData'));   // НЕ УВЕРЕН УЗНАТЬ ПО ПОВОДУ ЭТОГО - НЕ ЗНАЮ РАЗУМНО ЛИ  ХРАНИТЬ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ В ЛОКАЛсторадж
    
    // console.log(userData);

    return (
      <div>
        <div className="menuContainer">
                <NewsItem/>            
                <ul className="menu-main">
                    <li><NavLink to="/">Main</NavLink></li>
                    <li><NavLink to="/techNews">Technologies</NavLink></li>
                    <li><NavLink to="/businessNews">Business</NavLink></li>
                </ul>
                <div className="goToArchieve">
                  <Link  className="linkArchieve"  to = "/archieve" >
                    <img title = "open archive" src="./arh.png" alt="" />
                  </Link>
                </div>
                <div className="userBox">
                    
                    <div className="accauntInfo">
                      <img title="profile image" src={userData.image} alt="" />
                      <div className="usernameBox">
                        <div className="nickName">{userData.nickname}</div>
                        <div className="username">{userData.username}</div>
                      </div>
                      {/* <div>Exit</div> */}
                    </div> 
                  <Link to="/options/profile" style={{ textDecoration: 'none' }}>              
                    <div className="dropdown-content">
                        <p>Options</p>
                    </div>
                  </Link>
                </div>
        </div>
            
          
        <Outlet/> 


      </div>
    )
  };
  
  export default Layout;