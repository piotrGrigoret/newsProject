import React,{useState} from "react";
import "./ModalComent.css";

const ModalComent = (props) =>{
 
    const [objectCopy, setObjectcopy] = useState(
        {
            username : "misterCrow21",
            messageText: "",
            foto : "/clearAvatar.png",
            date : ""
        }
    ) 
    
    const [forArea, setForArea] = useState("");

    const closeModalComment = () =>{
        props.comentSet(false);
    }

    const addMessageInfoHandler = (event) =>{
        const objCopy = {...objectCopy};
        objCopy.messageText = event.target.value;
        setForArea(event.target.value);
        setObjectcopy(objCopy);
    }
    const sendMessageHandler = () => {
        const copyArr = [...props.msgArea];
        const h = new Date().getHours();
        const m = new Date().getMinutes();
        const commentCopy = {...objectCopy, date: h + ":" + m};
        copyArr.push(commentCopy);
        props.msgAreaSet(copyArr);
        setForArea("");
    }
    return(
        <div onClick={closeModalComment} className="modalComentBackground">
            <div onClick={e => e.stopPropagation()} className="modalComentCard">
                <div className="messageArea">
                    {props.msgArea.map((message) => 
 
                        <div className="messageAndFotoCard">
                            <div className="avatar">
                                <img src="data:image/jpeg;base64,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" alt="" />
                            </div>                    
                            <div className="messageCard">
                                <div className="messageText">{message.messageText}</div>
                                <div className="messageName">{message.username}</div>
                                <div className="messageDate">{message.date}</div>

                            </div>
                        </div>
                    )}
                </div>
                <div onClick={closeModalComment} className="zakratieModalCommentCard">x</div>
                <div className="coomentInput"><textarea onChange={addMessageInfoHandler} value={forArea} name="" id="" cols="30" rows="10"></textarea></div>
                <div className="sendMessage"><img onClick={sendMessageHandler} src="./sendMsg.png" alt="" /></div>
            </div>
            
        </div>
    )
}

export default ModalComent;