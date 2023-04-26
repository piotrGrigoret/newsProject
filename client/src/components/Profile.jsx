import React, { useEffect, useState } from 'react';
import "./Profile.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import ModalComent from './ModalComent';

import {Cloudinary} from "@cloudinary/url-gen";

import { CloudinaryContext, Image, Transformation } from "cloudinary-react";

const cloudName = "dckzfe6y5";
const apiKey = "235978599428842";
const apiSecret = "ATMOg0dxvy2DPcKN8t8cNm4iBA4";

  


const Profile = (props) => {
    const userData = JSON.parse(localStorage.getItem('userData'));//данные о юзере из локалСторадж   
    const [userDataObj, setUserDataObj] = useState(userData);

    
    
    // console.log(techArticles.length);
    const logOutHandler = () => {                           // функция для выхода из профиля
        props.setBoolVariable(false);
        localStorage.setItem('userAcess', false);
        localStorage.setItem('userData', JSON.stringify({}));
  
    }
    const chooseMenuOptionHandler = (menuOptionProps) => {
        setMenuOption(menuOptionProps);
    }
    
    const [menuOption, setMenuOption] = useState("0");                        //стейт для выбора в меню : "Информация" "Статистика" "Удаление"
    const [changeInfoAboutUser, setChangeInfoAboutUser] = useState(false);  // стейт для смены панели изменения личной информации о юзере с активной в неактивную и наоборот
     
    const onChangeUsernameHandler = (event) => {
        const userDataObjCopy = {...userDataObj};
        userDataObjCopy.username = event.target.value;
        setUserDataObj(userDataObjCopy);
        // console.log(userDataObj);
        
    }
    
    const  onChangeNicknameHandler = (event) => {
        const userDataObjCopy = {...userDataObj};
        userDataObjCopy.nickname = event.target.value;
        setUserDataObj(userDataObjCopy);
        // console.log(userDataObj);

    }                                                           /// Не обновляется сразу стейт

    const changeInfoAboutUserHandler = async(propsArgument) => {    /// функция подтверждения изменения юзера с отправкой данных на сервер
        if(propsArgument == "1"){
                        
            setChangeInfoAboutUser(true);
        }
        else{
            // console.log(userDataObj);
           
            setChangeInfoAboutUser(false);
            try {
                const response = await axios.post("http://localhost:5000/auth/changeUser", userDataObj);
                window.location.reload();   
                window.location.reload();   
                console.log(response);

            } catch (error) {
                console.log(error);
                alert('Error: ' + error.response.data.message);
            }
        }
    }
    
    const [dateOfRegistered, setDateOfRegistered] = useState(new Date(userData.date))// стейт для изменения даты понятной для юзера

    const [deleteModalAttentionCard, setDeleteModalAttentionCard] = useState(false);//стейт для вызова и отключения модального окна потдвержения удаления аккаунта
    const deleteAccountHandler = () => {
        setDeleteModalAttentionCard(true);
    }



    // фотографии

    //изменение платформы для фото
    const [fotoPlatform, setFotoPlatform] = useState(false);
    const changeFotoHandler = async() => {
        
        if(fotoPlatform == true){
            setFotoPlatform(false);    
            
        }
        else{
            setFotoPlatform(true);
        }
    }
// отправка фото в клоудинари и сохранение в БД
    const cloudName = "dckzfe6y5";
    const [image, setImage] = React.useState("");

    const handleUpload = (event) => {
        setFotoPlatform(false);    
    
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("cloud_name", cloudName);
        formData.append("upload_preset", "xrwr1gwb");
        // console.log(formData);
        fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            setImage(data.secure_url);
            sendImageToDB(data.secure_url);

          })
          .catch((error) => console.error(error));
    };
    useEffect(()=>{
        if(image){
            sendImageToDB(image);  
        }
    }, [image])
    const sendImageToDB = async(image) => {
        console.log(image);
        setTimeout(() => {
            window.location.reload();
          }, 150);
        await axios.post("http://localhost:5000/auth/changefoto", {image, userData});
       
    }


    return (
        <div className='optionsBox'>
            {deleteModalAttentionCard &&
                <ModalComent
                    setDeleteModalAttentionCard = {setDeleteModalAttentionCard}
                    userDataObj = {userDataObj}
                    setBoolVariable = {props.setBoolVariable}

                />
            }
            <div className="sidenav">
                    <Link to="/" style={{ textDecoration: 'none' }}><div  className='backSettings'>🠔</div></Link>
                    <div> Profile</div>
                    <Link to="/options/password" style={{ textDecoration: 'none' }}><div> Password</div></Link>
                    <div onClick={logOutHandler}>  Log Out </div>       
            </div>

            <div className='contentBox'>
                <div className='profileTitle'><img src="/resume.png" alt="" /></div>  
                
                <div className='profileBox'>
                    <div className='imageBox'>
                       

                        {fotoPlatform 
                            ?
                                
                            <div>
                                 {/* <input type="file" onChange={handleUpload} /> */}
                                 <label  className="drop-container">
                                    <span className="drop-title">Drop files here</span>
                                    or
                                    <input id= "inputTag" type="file" placeholder='Change Foto' onChange={handleUpload} />
                                </label>
                                 {/* {image && (
                                     <CloudinaryContext cloudName={cloudName}>
                                         <Image publicId={image}>
                                             <Transformation width="300" crop="scale" />
                                         </Image>
                                     </CloudinaryContext>
                                 )} */}
                             </div>         
                            :
                                <div className='imagecont'>
                                    {image 
                                            ?
                                            
                                            <img src={image} alt=""  />
                                            :
                                            <img src={userData.image} alt="" />
                                    }
                                </div>
                        }

                        {!fotoPlatform && <div className='changheFoto' onClick={changeFotoHandler}>Change Foto</div>}
                    </div>
                    <div className='infoAboutBox'>
                    {menuOption == "0" &&
                        <div>
                            <div className='chooseInfo' onClick={() => chooseMenuOptionHandler("1")}> <div>&gt;Profile Data </div> </div>                    
                            <div className='chooseInfo' onClick={() => chooseMenuOptionHandler("2")}> <div>&gt;Profile Statistics</div> </div>                    
                            <div className='chooseInfo' onClick={() => chooseMenuOptionHandler("3")}> <div>&gt;Delete Profile </div> </div>                    
                        </div> 
                        } 
                        {menuOption == "1" &&
                            <>
                                {!changeInfoAboutUser ?
                                        <>
                                            <div className='exitInMenuOptionImage' onClick={() => chooseMenuOptionHandler("0")}><img src="/exitLeft.png" alt="" /></div>
                                            <div className='inputDataProfileBox'><input  disabled type="text" placeholder={userDataObj.username} /></div>
                                            <div className='inputDataProfileBox'><input disabled type="text" placeholder={userDataObj.nickname}/></div>
                                            <div className='changeIformation' onClick={() => changeInfoAboutUserHandler("1")}>Changhe Profile Information</div>
                                        </>
                                    :
                                        <>
                                            <div className='inputDataProfileBox'><input type="text" onChange = {onChangeUsernameHandler} placeholder={userDataObj.username} /></div>
                                            <div className='inputDataProfileBox'><input type="text" onChange = {onChangeNicknameHandler} placeholder={userDataObj.nickname}/></div>
                                            <div className='saveInformation' onClick={() => changeInfoAboutUserHandler("2")}>Submit</div>
                                        
                                        </>
                                } 
                            </>
                        } 
                        {menuOption == "2" &&

                            <div className='profileStatisticsBox'>
                                <div className='exitInMenuOptionImage' onClick={() => chooseMenuOptionHandler("0")}><img src="/exitLeft.png" alt="" /></div>

                                <div className='statistics'>
                                    <div className='typeOfArchieve' title='Privat Articles'>Priv:</div>
                                    <div className='statNumber'>{props.privateArchieve.length}</div>
                                    <div className='statNumber'>{props.techArticlesPrivate.length}</div>
                                    <div className='statNumber'>{props.privateArchieve.length - props.techArticlesPrivate.length}</div>
                                    <div className='statNumber'>0</div>
                                    <div className='typeOfArchieve' title='Public Articles'>Pub:</div>
                                    <div className='statNumber'>{props.publicArhieve.length}</div>
                                <div className='statNumber'>{props.techArticlesPublic.length}</div>
                                <div className='statNumber'>{props.publicArhieve.length - props.techArticlesPublic.length}</div>
                                <div className='statNumber'>{props.allUserComents.length}</div>
                                <div></div>
                                    <div className='statTitle'title='Articles in Archieve'> Art </div> 
                                    <div className='statTitle' title='Technology articles in archieve'> Tech </div> 
                                    <div className='statTitle' title='Business articles in archieve'> Bus </div> 
                                    <div className='statTitle' title='All user Comentaries'>Com</div> 

                                </div>

                                <div className='statistics'>
                                
                            </div>
                            </div>
                        }
                        {menuOption == "3" &&

                            <div className='profileStatisticsBox'>
                                <div className='exitInMenuOptionImage' onClick={() => chooseMenuOptionHandler("0")}><img src="/exitLeft.png" alt="" /></div>
                                <div className='deleteProfileCard'>
                                    <div className='infoDelete'>Registered :</div>
                                    <div className='infoDateDelete'>{dateOfRegistered.toDateString()}</div>
                                    <div className='infoDelete'>Login :</div>
                                    <div className='infoDateDelete'>{userData.username}</div>
                                    <div className='infoDelete'>_id :</div>
                                    <div className='infoDateDelete'>{userData._id}</div>
                                    <div className='delete' onClick={deleteAccountHandler}>Delete Account</div>
                                    
                                </div>
                            </div>
                        }
                    </div>
                </div>
                
            </div>
    </div>
  )
}

export default Profile