import React, { useEffect, useState } from 'react';
import "./Profile.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import ModalComent from './ModalComent';
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
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);
  
    const handleFileInputChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
      previewFile(file);
      if(file){
        setFotoPlatform(false);
      }
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Do something with the selected file
    };
  
    const previewFile = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewSource(reader.result);
      };
    };

    //изменение платформы для фото
    const [fotoPlatform, setFotoPlatform] = useState(false);
    const changeFotoHandler = () => {
        if(fotoPlatform == true){
            setFotoPlatform(false);    
            
        }
        else{
            setFotoPlatform(true);
        }
    }


    console.log(props.privateArchieve);
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
                            <label for="images" class="drop-container">
                                <span class="drop-title">Drop files here</span>
                                or
                                <input id= "inputTag" type="file" placeholder='Change Foto' onChange={handleFileInputChange} />
                            </label>
                            
                        :
                            <>
                                {previewSource 
                                        ?
                                        
                                        <img src={previewSource} alt=""  />
                                        :
                                        <img src={userData.image} alt="" />
                                }
                            </>
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
                               <div className='statNumber'>{props.techArticlesPrivate.length}</div>
                               <div className='statNumber'>{props.publicArhieve.length - props.techArticlesPrivate.length}</div>
                               <div className='statNumber'>0</div>
                               <div></div>
                                <div className='statTitle'title='Articles in Archieve'> Art </div> 
                                <div className='statTitle' title='Technology articles in archieve'> Tech </div> 
                                <div className='statTitle' title='Business articles in archieve'> Bus </div> 
                                <div className='statTitle' title='All Comentaries'>Com</div> 

                            </div>

                            <div className='statistics'>
                               {/* <div className='statNumber'>{props.archieveArr.length}</div>
                               <div className='statNumber'>{props.techArticles.length}</div>
                               <div className='statNumber'>{props.archieveArr.length - props.techArticles.length}</div>
                               <div className='statNumber'>0</div> */}
                               {/* <div className='statTitle'title='Articles in Archieve'> Articles </div>
                               <div className='statTitle' title='Technology articles in archieve'> Technologies </div>
                               <div className='statTitle' title='Business articles in archieve'> Business </div>
                               <div className='statTitle' title='All Comentaries'>Comentaries</div> */}

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