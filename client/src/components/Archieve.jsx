import React from 'react';
import './Archieve.css';
import Punkt from './Punkt';
import Button from './Button';
export const Archieve = (props) => {

  // console.log(props.archieveArr);

    const onDeleteArchiveArticleHandler = (propsObject) => {
        let copyArchieveArr = props.archieveArr.filter((arr) => {
            if(arr.id !== propsObject.id){
                return arr
            }   
        });
        console.log(copyArchieveArr);
        props.setArchieveArr(copyArchieveArr);
        props.setlastDeleteArchiveObject(propsObject);

      }
  return (
      <div className="AppArchieve">
      <div className='archievetitle'>Archieve</div>
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
                      key = {object.id}
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