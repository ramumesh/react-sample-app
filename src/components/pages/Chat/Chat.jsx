import { useEffect, useState } from "react";
import { getChats, saveChat } from "../../../store/chatStore";
import { getLoggedInUser } from "../../../store/userStore";
import ChatItem from "../../core/ChatItem/ChatItem";
import AppButton from "../../core/AppButton/AppButton";
import { ACTIONS } from "../../../common/constant";

const Chat = () => {
    const [chats, setChats] = useState([]);
    const [userName, setUsername] = useState("");
    const [chatText, setChatText] = useState("");


    useEffect(() => {
        refreshChat();
        setUsername(getLoggedInUser()?.fullName);
    }, []);

    const onChatTextChange = (e) => {
        setChatText(e.target.value);
    };

    const sendChat = () => {
        if (!chatText) {
            alert("Cannot send an empty message.");
            return;
        }
        saveChat(chatText);
        setChats(getChats());
        setChatText("");
    };

    const refreshChat = () => {
        setChats(getChats());
    };

    return <div className="h-100">
        <div className="mt-3 d-flex flex-column h-100 align-items-center">
            <div className="chat-border w-100 text-center p-1">
                Group Chat
            </div>
            <div className="chat-border w-100 text-start p-2 h-50">
                {
                    chats.map(item => <ChatItem key={item.id} data={item} />)
                }
            </div>
            <div className="border-black w-100 p-2 d-flex gap-4 justify-content-center align-items-center ">
                <div className="username fw-bold">{userName}</div>
                <input value={chatText} onChange={(e) => onChatTextChange(e)} className="flex-fill" type="text" name="chat-text" />
                <AppButton title={ACTIONS.SEND} onClick={sendChat} />
                <AppButton title={ACTIONS.REFRESH} onClick={refreshChat} />

            </div>
        </div>
    </div>;
};

export default Chat;