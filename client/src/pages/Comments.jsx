import React, { useEffect } from 'react';
import { useState } from 'react';
import './Comments.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import url from '../constants';

export const Comments = (props) => {
// для добавления галки в меню сбоку
    useEffect(()=>{
        proverkaDobavleniaVArhiv();
        
        },[props.publicArchieve, props.privateArchieve])
      
      const proverkaDobavleniaVArhiv = () => {
          const updatedArticles = props.publicArhieve.map((arrayObj)=>{    
            if(props.privateArchieve.find(article => article.title === arrayObj.title)){
            
                return {...arrayObj, galka: true}; 
            } 
            return arrayObj;
        });
        props.setPublicArchieve(updatedArticles);
    
        // console.log(updatedArticles);
        
      }
    

    
    const currentСomment = JSON.parse(localStorage.getItem('currentComment'));
    const userData = JSON.parse(localStorage.getItem('userData'));
    // const [discutionPublicArchiveArticle, setDiscutionPublicArchiveArticle] = useState(props.publicArhieve);
    const [discutionPublicArchiveArticle, setDiscutionPublicArchiveArticle] = useState(props.publicArhieve.sort((a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate)));
    useEffect(() => {
        getArticleComments();
        setDiscutionPublicArchiveArticle(props.publicArhieve);
      }, [props.publicArhieve]);
    
  
    // функция для вызова кометариев из БД
    const getArticleComments = async() => {
        try {
           
            // const response = await axios.post("http://localhost:5000/auth/getComments", currentСomment);
            const response = await axios.post(url + "/auth/getComments", currentСomment);
            // console.log(response);
            // setArticleMessages(response.data.comments);
            setArticleMessages(response.data.comments.sort((a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate)));
            
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
            // if(copyMessage.text.includes('\n')){
            //     const text = copyMessage.text;
            //     setMessage({
            //         ...message,
            //         text: text.replaceAll('\n', '')
            //     });
            // }
            setChangheSendButton(true);
        }else{
            setChangheSendButton(false);

        }
    };

    // console.log(props.atricleForComments);
    const sendMessageHandler = async() => {
        if(changheSendButton){
            
                // console.log(message);
                setChangheSendButton(false);

                if(currentСomment._id){
                    
                    let curentMessageCOpy = {};        
                    let copyDisctionPublic = discutionPublicArchiveArticle.filter((discution)=>{
                        if(discution.title !== currentСomment.title){
                            return discution
                        }else{
                            curentMessageCOpy = discution;
                        }
            
                    });
                    if(currentСomment.public === false){
                        curentMessageCOpy = {...currentСomment, public: true};
                    }                    
                    copyDisctionPublic = [curentMessageCOpy, ...copyDisctionPublic];
                    setDiscutionPublicArchiveArticle(copyDisctionPublic);
            
                }

                const copyMessage = {...message};
                const articleMessagesCopy = [...articleMessages, message]; 
                
                setArticleMessages(articleMessagesCopy);
                setForArea("");
                setMessage(   
                    {
                        nickname : userData.nickname,
                        userId:userData._id,
                        image: userData.image,
                        articleId: currentСomment._id,
                        text: "",
                        date : new Date(),
            })


                const userId = userData._id; 
                const privat = false;
                const copyObject = {...currentСomment, userId, privat};
                
                
                // const response = await axios.post("http://localhost:5000/auth/comments", {
                const response = await axios.post(url + "/auth/comments", {
                    copyMessage: copyMessage,
                    currentСomment: copyObject
                });
                console.log(response);
                localStorage.setItem('currentComment', JSON.stringify(response.data.article));
                if(response.data.article){
                    setDiscutionPublicArchiveArticle([response.data.article, ...discutionPublicArchiveArticle]);
                    window.location.reload();
                }          
            
        }
    };
    function handleKeyPress(event) {
        // if(message.text && message.text.length === 0 || message.text.includes('\n')){
        //     setForArea("");
        //     setMessage({
        //         ...message,
        //         text: ""
        //         })
                
        //     return;
        // };
        // console.log(message);

        if (event.key === "Enter" && !event.shiftKey) { // добавляем проверку на shiftKey
            event.preventDefault(); // предотвращаем перенос на новую строку
            sendMessageHandler();
          }
      }

    const openComment = (archieve) =>{     //функция передающая информацию об объекте в новое окно коментариев
        localStorage.setItem('currentComment', JSON.stringify(archieve));
        // props.setAtricleForComments(archieve);
        getArticleComments();
        window.location.reload();
    }

    
    //   const sendMessage = () =>{
    //     console.log("rg");
    //   }
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
                            {archieve.galka && <div className='privateVerificationForCommentsChhoseMenu'><img title = "added" src="./galka2.png" alt="" /></div>}
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
                        <li className="other" key = {message.date}>
                        <img className='imageUserMessage' src={message.image} alt="" />
                        {/* <img className='imageUserMessage' src={"/ispanka.jpg"} alt="" /> */}
                        <div className="msg">
                            <div className="user">{message.nickname}</div>
                            <p>{message.text}</p>
                            {/* <time className='msgDate'>{moment(message.date).format(" h:mm")}</time>                 */}
                        </div>
                        </li>
                    )}
                </ol>
            
            </div>
            
                <div className="typezone">
                    <form><textarea  type="text" onKeyPress={handleKeyPress}  onChange={addMessageInfoHandler}  value={forArea} placeholder="Type comment..."></textarea></form>
                </div>                     
                <div className={changheSendButton ? "sendMessageComments" : "sendMessageCommentsDisable"} onClick={sendMessageHandler}><img  src="./send2.png" alt="" /></div>

    </div>
  )
}
