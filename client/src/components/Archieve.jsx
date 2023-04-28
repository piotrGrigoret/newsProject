import React, { useEffect, useState } from 'react';
import './Archieve.css';
import Punkt from './Punkt';
import Button from './Button';
import axios from 'axios';

import url from '../constants';
export const Archieve = (props) => {
  // console.log(props.privateArchieve);

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

    console.log(updatedArticles);
    
  }

const idendificatorPrivatePublicChanger =  JSON.parse(localStorage.getItem('privatePublicChanger'));//информация для переключения хранится в локалСторадж 

///стейт для определения вывода публичного или приватного артикла
// const [privatePublic, setPrivatePublic] = useState(idendificatorPrivatePublicChanger);

const [privatePublic, setPrivatePublic] = useState(false);


    const onDeleteArchiveArticleHandler = async(propsObject) => {
        // console.log(propsObject);  
        const userData = JSON.parse(localStorage.getItem('userData'));   

        let copyPrivateArchieveArr = props.privateArchieve.filter((arr) => {
            if(arr._id !== propsObject._id){
                return arr
            }  
        });
        props.setPrivateArhieve(copyPrivateArchieveArr);
        // props.setlastDeleteArchiveObject(propsObject);
       setTimeout(() => {
          window.location.reload();
        }, 220);

        // await axios.post("http://localhost:5000/auth/deletearchieve", {propsObject, userData});
        await axios.post(url + "/auth/deletearchieve", {propsObject, userData});
        // console.log(response);
        
      }

      const onAddToArchieveArticleHandler = async(propsObject) =>{
        
            /// добавляем айди юзера в заррхивированный арликл
            const userData = JSON.parse(localStorage.getItem('userData'));   
            const userId = userData._id; 
            const copyObject = {...propsObject, userId};
            console.log(copyObject);

            const copyArchieveArr = [ copyObject, ...props.privateArchieve];
            
            props.setPrivateArhieve(copyArchieveArr);
            // const response = await axios.post("http://localhost:5000/auth/addarchieve", copyObject);
            const response = await axios.post(url + "/auth/addarchieve", copyObject);
            
    }

    const onChangePrivatePublic = () => {
        if(privatePublic == false){
          setPrivatePublic(true);
          // localStorage.setItem('privatePublicChanger', true);
          // console.log(privatePublic);
        } 
        if(privatePublic == true){
          setPrivatePublic(false);          
          // localStorage.setItem('privatePublicChanger', false);
          // console.log(privatePublic);

        } 
        
      }

  return (
      <div className="AppArchieve">
      <div className='archievetitle'>
        Archieve
        <img src="/arh.png" alt="" /> 
        <div>
        {privatePublic ? 
          <div  className='privatePublicChanger' onClick={onChangePrivatePublic}>public</div>
        : 
          <div  className='privatePublicChanger' onClick={onChangePrivatePublic}>private</div>
        }
        </div>
      </div>
          
            {/* {!privatePublic &&
              <Button 
              archieveArr = {props.archieveArr}
              setArchieveArr = {props.setArchieveArr}
              setlastDeleteArchiveObject = {props.setlastDeleteArchiveObject}
              lastDeleteArchiveObject={props.lastDeleteArchiveObject}
            />} */}
            <div className="news">
              {/* {props.archieveArr.length == 0
                ?
                  <div className='archieveisEmpty'>Archieve is empty</div>
                :
                <> */}
                {privatePublic?
                  props.publicArhieve.map((object)=> 
                        <Punkt 
                          public = {"public"}
                          onAddToArchieveArticleHandler = {onAddToArchieveArticleHandler}
                          key = {object._id}
                          propsObject = {object} 
                          krestik = "krestik"
                          propsComentSet = {props.comentSet}
                          onDeleteArchiveArticleHandler = {onDeleteArchiveArticleHandler}
                          setAtricleForComments = {props.setAtricleForComments}
                          setBackMainFromComments = {props.setBackMainFromComments}
                          adressToBackFromComments = {"archieve"}
                        />
                  )
                  :
                  props.privateArchieve.map((object)=> 
                        <Punkt 
                          key = {object._id}
                          propsObject = {object} 
                          krestik = "krestik"
                          propsComentSet = {props.comentSet}
                          onDeleteArchiveArticleHandler = {onDeleteArchiveArticleHandler}
                          setAtricleForComments = {props.setAtricleForComments}
                          setBackMainFromComments = {props.setBackMainFromComments}
                          adressToBackFromComments = {"archieve"}
                      
                        />
                
                  )
                }
                {/* </>
              } */}
              
          </div>
      </div>
  )
}
