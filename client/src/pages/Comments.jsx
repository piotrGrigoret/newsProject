import React, { useEffect } from 'react';
import { useState } from 'react';
import './Comments.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

export const Comments = (props) => {
    
    const currentСomment = JSON.parse(localStorage.getItem('currentComment'));
    const userData = JSON.parse(localStorage.getItem('userData'));

    const [discutionPublicArchiveArticle, setDiscutionPublicArchiveArticle] = useState(props.publicArhieve);
    // console.log(discutionPublicArchiveArticle);
    useEffect(() => {
        getArticleComments();
        setDiscutionPublicArchiveArticle(props.publicArhieve);
      }, [props.publicArhieve]);
    
  
    // функция для вызова кометариев из БД
    const getArticleComments = async() => {
        try {
            const response = await axios.post("http://localhost:5000/auth/getComments", currentСomment);
            // console.log(response);
            setArticleMessages(response.data.comments);
            
        } catch (error) {
            console.log(error);
        }
    }
    // стейт массива для сообщений
    const [articleMessages, setArticleMessages]  = useState([]);   

    // const [atricleForComments, setAtricleForComments] = useState([]);

    const [message, setMessage] = useState(
        {
            nickname : userData.nickname,
            userId:userData._id,
            image: userData.image,
            articleId: currentСomment._id,
            text: "",
            date : new Date(),
        }
    );
        
    const [forArea, setForArea] = useState("");
    // стейт для изменения сотсояния кнопки отправки сообщений
    const [changheSendButton, setChangheSendButton] = useState(false);  
    

    const addMessageInfoHandler = (event) =>{
                
        const copyMessage = {...message};
        copyMessage.text = event.target.value;
        setForArea(event.target.value);
        setMessage(copyMessage);
    //    console.log(message.text);
        if(copyMessage.text.length > 0){
            setChangheSendButton(true);
        }else{
            setChangheSendButton(false);

        }
    };

    // console.log(props.atricleForComments);
    const sendMessageHandler = async() => {
        setDiscutionPublicArchiveArticle([currentСomment, ...discutionPublicArchiveArticle])
        console.log(message);
        const copyMessage = {...message};
        const articleMessagesCopy = [...articleMessages, message]; 
        
        setArticleMessages(articleMessagesCopy);
        setForArea("");
        setMessage(   
            {
                nickname : userData.username,
                userId:userData._id,
                image: userData.image,
                articleId: currentСomment._id,
                text: "",
                date : new Date(),
       })

       setChangheSendButton(false);
        console.log(copyMessage);

        const userId = userData._id; 
        const privat = false;
        const copyObject = {...currentСomment, userId, privat};
        const response = await axios.post("http://localhost:5000/auth/comments", {
            copyMessage: copyMessage,
            currentСomment: copyObject
          });
          
        

    };
    // console.log(articleMessages);
    
   
    const openComment = (archieve) =>{     //функция передающая информацию об объекте в новое окно коментариев
        localStorage.setItem('currentComment', JSON.stringify(archieve));
        // props.setAtricleForComments(archieve);
        getArticleComments();
        window.location.reload();
    }

    

    return (
    <div className='commentsBox'>
            <div className='choseAnotherArticlesMenu'>
            <div className='backk' ><Link className='backLink' to = {"/" + props.backMainFromComment}>🠔</Link></div>
            
                <div className='articlesInChooseMenu'>
                    
                    {discutionPublicArchiveArticle.map((archieve) =>     
                        <Link key = {archieve._id} to={"/comments"} style={{ textDecoration: 'none', color:'black' }}><div onClick={() => openComment(archieve)} className='punktChooseMenu'>
                            <div  className="dateChooseMenu">
                                {moment(archieve.publishedAt).fromNow()}
                            </div>
                            <div  className="titleChooseMenu" > {archieve.title} </div>
                            <div className="fotoNewsChooseMenu">{archieve.urlToImage ? <img src={archieve.urlToImage} alt="" /> : <div></div>}</div>                      
                        </div>
                        </Link>
                    )}
            
                </div>
            
            </div>
            <div  className="punktComments"   >
                <div  className="dateComments">
                    {moment(currentСomment.publishedAt).fromNow()}
                </div>            
                <div  className="titleComments" > {currentСomment.title} </div>
                <div className="fotoNewsComments">{currentСomment.urlToImage ?  <img src={currentСomment.urlToImage} alt="" /> : <div></div>}</div>                  
            </div>
            
            <div className="messageArea">
          
  
                <ol className="chat">
                    {articleMessages.map((message) => 
                        <li className="other" key = {message._id}>
                        <img className='imageUserMessage' src={message.image} alt="" />
                        <div className="msg">
                            <div className="user">{message.nickname}</div>
                            <p>{message.text}</p>
                            {/* <time>20:17</time> */}
                        </div>
                        </li>
                    )}
                </ol>
            
            </div>
            
                <div className="typezone">
                    <form><textarea  type="text"  onChange={addMessageInfoHandler}  value={forArea} placeholder="Type comment..."></textarea></form>
                </div>                     
                <div className={changheSendButton ? "sendMessageComments" : "sendMessageCommentsDisable"} onClick={sendMessageHandler}><img  src="./send2.png" alt="" /></div>

    </div>
  )
}
