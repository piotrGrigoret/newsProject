
import './RegistrationPage.css';
import React, { useState} from 'react';
import axios from 'axios';

const Registration = (props) => {
    const defaultUserObj = 
        {
            username: "",
            password:"",
            nickname:"",
            // foto:"/"         //НЕ ЗНАЮ КАК ХРАНИТЬ ФОТОГРАФИИ В БАЗЕ ДАННЫХ - НАДО УЗНАТЬ
            // phone:"",
        }     
    
    // console.log(defaultUserObj); 
    const [userObj, setUserObj] = useState(defaultUserObj);
    const [values1, setValues1] = useState("");
    const [values2, setValues2] = useState("");
    const [values3, setValues3] = useState("");
    const [values4, setValues4] = useState("");
    
    const [showPassword, setShowPassword] = useState("password");
    const [resistrationAutorization, setResistrationAutorization] = useState(true);

    
    const [checkSuccessRegistration, setCheckSuccessRegistration] = useState(false);
    const [errorSuccessRegistration,  setErrorSuccessRegistration] = useState(false);

    const [passwordCoincid, setPasswordCoincid] = useState(""); //ПРОВЕРОЧНЫЙ ПАРОЛЬ  
    const [checkPasswordCoincid, setCheckPasswordCoincid] = useState(true); //ПРОВЕРКА НА СЗОДСТВО ПАРОЛЯ 

    //    ФУНКЦИИ ДЛЯ РЕГИСТРАЦИИ
    const onUsernameChangheHandler = (event) => {
        const userObjCpy = {...userObj};                                // ФУНКЦИЯ ИЗМЕНЕНИЯ ЛОГИНА ИСПОЛЬЗУЕТСЯ И В РЕГИСТРАЦИИ И В ЛОГИНИЗАЦИИ
        userObjCpy.username = event.target.value;
        // console.log(userObjCpy);
        setUserObj(userObjCpy);
        setValues1(event.target.value);

    };
   const onNicknameChangheHandler = (event) =>{
    const userObjCpy = {...userObj};                                // ФУНКЦИЯ ИЗМЕНЕНИЯ ЛОГИНА ИСПОЛЬЗУЕТСЯ И В РЕГИСТРАЦИИ И В ЛОГИНИЗАЦИИ
    userObjCpy.nickname = event.target.value;
    // console.log(userObjCpy);
    setUserObj(userObjCpy);
    setValues4(event.target.value);
   }
        const onPasswordChangheHandler = (event, inputType) => {
            
            if(inputType == "confirm"){
                setPasswordCoincid(event.target.value);
                setValues3(event.target.value);
            }else{
                const userObjCpy = {...userObj};
                userObjCpy.password = event.target.value;               // ФУНКЦИЯ ИЗМЕНЕНИЯ ПАРОЛЯ ИСПОЛЬЗУЕТСЯ И В РЕГИСТРАЦИИ И В ЛОГИНИЗАЦИИ
                setUserObj(userObjCpy);
                setValues2(event.target.value);
            }
        };
        
    
    const submitObjHandler = async() => {
        if(userObj.password == passwordCoincid){
            setCheckPasswordCoincid(true);
            console.log(userObj);
            setValues1("");
            setValues2("");
            setValues3("");
            setValues4("");
            try {
                const response = await axios.post("http://localhost:5000/auth/registration", userObj);
                // console.log(response);
                if(response){
                    setCheckSuccessRegistration(true);
                    setErrorSuccessRegistration(false);

                }           
            } catch (error) {
                setErrorSuccessRegistration(true);
                setCheckSuccessRegistration(false);
                console.log(error);
                    alert("Error: " + error.response.data.message);

                    alert("Error: " + error.response.data.errors.errors[0].msg);
                }
            
            // await axios.post("http://localhost:5000/test", userObj);
            setUserObj(defaultUserObj);
        }else{
            setCheckPasswordCoincid(false);
        }
    };

// ИЗМЕНЕНИЕ ИКОНКИ ПОКАЗА ПАРОЛЯ
    const changheShowPasswordHandler = () => {
        if(showPassword == "password"){
            setShowPassword("text");
        }
        else{
            setShowPassword("password");
        }
    };


// РЕГУЛЯТОР ПЕРЕХОДА ОТ АВТОРИЗАЦИИ К ЛОГИНИЗАЦИИ
    const changheResistrationAutorizationHandler = () =>{
        setCheckSuccessRegistration(false);       // возможно стоит убрать
        setErrorSuccessRegistration(false);
        setCheckPasswordCoincid(true);

       
        if(resistrationAutorization == true){
           setResistrationAutorization(false);
        }
        else{
           setResistrationAutorization(true);
        }
    }
// ФУНКЦИИ ДЛЯ АВТОРИЗАЦИИ
    const onCheckVerification = async () => {
        try {
            const response = await axios.post("http://localhost:5000/auth/login", userObj);
            // console.log(response);
            if(response.data.user){
                localStorage.setItem('userAcess', true);
                localStorage.setItem('userData', JSON.stringify(response.data.user));
                props.setBoolVariable(true);        
                props.setUser(response.data.user);
            }
        } catch (error) {
            console.error(error);
            alert('Error: ' + error.response.data.message);

          }
        

    }
    
    return(
     
        <>
        {resistrationAutorization ?
            <div className="container">
                
                <div className="inputsContainer">
                
                    <div className='pustashka'>
                    
                    </div>
                    <input onChange={onUsernameChangheHandler} className='registrationInput'  type="text" placeholder="Login" value={values1} />
                    <input onChange={onPasswordChangheHandler} className='registrationInput' type={showPassword} placeholder="Password" value={values2} /><span className='showPasswordBlock' onClick={changheShowPasswordHandler}><img className='image' src="/eye.png" alt="" /></span>
                    <button onClick={onCheckVerification} className="submitButton">Log in</button>
                </div>
                <div className='undText'>Do you have not an account? <span onClick={changheResistrationAutorizationHandler} className='linkToRegstr'>Registration </span> </div>
            </div>

        :
            <div className="container2">
                <div className="inputsContainer">
                    <div className='pustashka'>
                        Registration
                        {checkSuccessRegistration &&
                            <div className='sucessBox'>You have successfully registered</div>
                        }
                        {errorSuccessRegistration &&
                            <div className='errorBoxRegistration'>Error in Registration.Try again</div>
                        }
                        {
                            !checkPasswordCoincid &&
                            <div className='errorBoxRegistration'>Error! Password mismatch</div>

                        }
                    </div>
                    {/* <input onChange={onNameChangheHandler} className='registrationInput'  type="text" placeholder="Name" value={values3} /> */}
                    <input onChange={onUsernameChangheHandler} className='registrationInput'  type="text" placeholder="Login" value={values1} />
                    <input onChange={onNicknameChangheHandler} className='registrationInput'  type="text" placeholder="Nickname" value={values4} />
                    <input onChange={onPasswordChangheHandler} className='registrationInput' type={showPassword} placeholder="Password" value={values2} /><span className='showPasswordBlock' onClick={changheShowPasswordHandler}><img className='image' src="/eye.png" alt="" /></span>
                    <input onChange={(event) => onPasswordChangheHandler(event, "confirm")} className='registrationInput' type={showPassword} placeholder="Confirm Password" value={values3}  /><span className='showPasswordBlock' onClick={changheShowPasswordHandler}><img className='image' src="/eye.png" alt="" /></span>

                    <button onClick={submitObjHandler} className="submitButton">Submit</button>
                </div>
                <div className='undText'>Do you already have an account? <span onClick={changheResistrationAutorizationHandler} className='linkToRegstr'>Authorization </span> </div>
            </div>
        }
        </>
    
    );
};


export default Registration;

