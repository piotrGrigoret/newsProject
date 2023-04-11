import React, { useEffect } from 'react';
import './Archieve.css';
import Punkt from './Punkt';
import Button from './Button';
import axios from 'axios';

export const Archieve = (props) => {

  // console.log(props.archieveArr);
 
    const onDeleteArchiveArticleHandler = async(propsObject) => {
      // console.log(propsObject);  
      let copyArchieveArr = props.archieveArr.filter((arr) => {
            if(arr._id !== propsObject._id){
                return arr
            }   
        });
        // console.log(copyArchieveArr);
        props.setArchieveArr(copyArchieveArr);
        props.setlastDeleteArchiveObject(propsObject);
        const response = await axios.post("http://localhost:5000/auth/deletearchieve", propsObject);
        console.log(response);
      }
  return (
      <div className="AppArchieve">
      <div className='archievetitle'>Archieve <img src="/arh.png" alt="" /></div>
            <Button 
              archieveArr = {props.archieveArr}
              setArchieveArr = {props.setArchieveArr}
              setlastDeleteArchiveObject = {props.setlastDeleteArchiveObject}
              lastDeleteArchiveObject={props.lastDeleteArchiveObject}
            />
            <div className="news">
              {props.archieveArr.length == 0 ?
                <div className='archieveisEmpty'>Archieve is empty</div>
                :
              props.archieveArr.map((object)=> 
                    <Punkt 
                      key = {object._id}
                      propsObject = {object} 
                      krestik = "krestik"
                      propsComentSet = {props.comentSet}
                      onDeleteArchiveArticleHandler = {onDeleteArchiveArticleHandler}
                      setAtricleForComments = {props.setAtricleForComments}
                      setBackMainFromComments = {props.setBackMainFromComments}
                      adressToBackFromComments = {"archieve"}
                      // propsindexCommentSet =  {props.indexCommentSet} 
                    // propsButtonAddRegulator = {props.buttonAddRegulator}
                    // setArchieveArr = {props.setArchieveArr}
                />
                
                )
              }
          </div>
      </div>
  )
}
