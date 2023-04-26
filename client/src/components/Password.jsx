import React, { useState } from 'react';
import "./Password.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
const Password = (props) => {
    const userData = JSON.parse(localStorage.getItem('userData'));//данные о юзере из локалСторадж   
    const [userDataObj, setUserDataObj] = useState(userData);
    const [newPassword, setNewPassword] = useState(
        { 
            newPassword: "",
            confirm: "",
        }
       )

    const logOutHandler = () => {                           // функция для выхода из профиля
        props.setBoolVariable(false);
        localStorage.setItem('userAcess', false);
        localStorage.setItem('userData', JSON.stringify({}));
    }
    const [passwordChanger, setPasswordChanger] = useState(false); // стейт для открытия панели изменения пароля
    const openPasswordChangerHandler = () => {
        if(passwordChanger == true){
            setPasswordChanger(false);
            setSuccessChangePassword("");
        }else{
            setPasswordChanger(true);
        }
    }
    /// Блок функции для изменения пароля
    
    const onChangePasswordHandler = (event) => {
        const copyUserData = {...userDataObj};
        copyUserData.password = event.target.value;
        setUserDataObj(copyUserData);
    
    }
    const onChangeNewPasswordHandler = (event) =>{
        const copyNewPassword = {...newPassword};
        copyNewPassword.newPassword = event.target.value;
        setNewPassword(copyNewPassword);
    
    }
    const onChangeConfirmHandler = (event) =>{
        const copyNewPassword = {...newPassword};
        copyNewPassword.confirm = event.target.value;
        setNewPassword(copyNewPassword);
        console.log(newPassword);
    }
    // функция потдверждения отправки с вызовозовом на сервер
    const submitNewPaswwordHandler = async() => {
        try {
            
            // const response =  await axios.post("http://localhost:5000/auth/newPassword", {userDataObj, newPassword});
            const response =  await axios.post("https://newsserver-vrh0.onrender.com/auth/newPassword", {userDataObj, newPassword});
            console.log(response);
            if(response.data.message == "Password changed successfully"){
                setSuccessChangePassword("Password changed successfully");
                setPasswordChanger(false);
            }
        } catch (error) {
            console.log(error)
            alert('Error: ' + error.response.data.message);
        }
     
    }
    const [successChangePassword, setSuccessChangePassword] = useState(""); //стейт для появления датчика успешного изменения пароля
  
  // ИЗМЕНЕНИЕ ИКОНКИ ПОКАЗА ПАРОЛЯ
  const [showPassword, setShowPassword] = useState("password");
  
  const changheShowPasswordHandler = () => {
    if(showPassword == "password"){
        setShowPassword("text");
    }
    else{
        setShowPassword("password");
    }
};

    return (
    <div className='optionsBox'>
         <div className="sidenav">
                <Link to="/" style={{ textDecoration: 'none' }}><div  className='back'>🠔</div></Link>
                <Link to="/options/profile" style={{ textDecoration: 'none' }}><div> Profile</div></Link>
                <div> Password</div>
                <div onClick={logOutHandler}>  Log Out </div>       
        </div>
        <div className='contentBox'>
        <div className='passwordTitle'><img src="/password.png" alt="" /></div>  
        <div className='passwordBox'>
            {!passwordChanger 
            ?
                <div className='chooseInfoPassword' onClick={openPasswordChangerHandler} > <div>&gt;Change Password</div> </div>                    
            :
                <>
                    <div className='exitInMenuOptionImage' onClick={openPasswordChangerHandler}><img src="/exitLeft.png" alt="" /></div>
                    {successChangePassword == "Password changed successfully" &&  <div className='sucessBoxPassword'>{successChangePassword}</div>}<div className='showPasswordBlockPassword' onClick={changheShowPasswordHandler}><img className='image' src="/eye.png" alt="" /></div>
                    <div className='titlePasswordInput' >Password</div><div className='inputDataPasswordBox'><input type = {showPassword} onChange={onChangePasswordHandler}  /></div>
                    <div className='titlePasswordInput' >New Password</div><div className='inputDataPasswordBox'><input type = {showPassword} onChange={onChangeNewPasswordHandler}  /></div>
                    <div className='titlePasswordInput' >Confirm</div><div className='inputDataPasswordBox'><input type = {showPassword} onChange={onChangeConfirmHandler} /></div>
                    <div></div>
                    <div><div className='saveInformationPassword' onClick={submitNewPaswwordHandler}>Submit</div></div>
                </>
            }
        </div>
        {/* <div className='inputDataProfileBox'><input type="text" /></div> */}
        {/* <div className='inputDataProfileBox'><input type="text" /></div> */}

        </div>
    </div>
  )
}

export default Password