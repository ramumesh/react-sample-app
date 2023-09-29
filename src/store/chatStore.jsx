import { DATA_KEYS } from "../common/constant";
import { getData, saveData } from "./store";
import { getLoggedInUser, getUserById } from "./userStore";

/**
 * Get all chats 
 * @returns 
 */
export const getChats = () => {
    const chats = getData(DATA_KEYS.CHATS);
    if (!chats) {
        return [];
    }
    return chats.map(chat => ({ ...chat, userName: getUserById(chat.userId).fullName }));
};

/**
 * Save Chat
 * @param {*} chat 
 */
export const saveChat = (chat) => {
    const currentUser = getLoggedInUser();
    const chatData = { chat: chat, userId: currentUser.id, dateTime: new Date() };
    saveData(chatData, DATA_KEYS.CHATS);
};
