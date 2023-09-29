import { DATA_KEYS } from "../common/constant";
import { deleteDataByKey, getData, saveData, saveItem } from "./store";

/**
 * Get the list of users from local storage
 * @returns 
 */
export const getUsers = () => {
    return getData(DATA_KEYS.USERS);
};

/**
 * Save the user to local storage
 * @param {*} userDetails 
 */
export const saveUser = (userDetails) => {
    return saveData(userDetails, DATA_KEYS.USERS);
};

/**
 * Get a user from local storage whose email and password matches
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
export const getUserByEmailAndPassword = (email, password) => {
    const users = getUsers();
    if (!users) {
        return null;
    }
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        delete user.password;
    }
    return user;
};

/**
 * Get the user by id
 * @param {*} id 
 * @returns 
 */
export const getUserById = (id) => {
    const users = getUsers();
    if (!users) {
        return null;
    }
    const user = users.find(user => user.id === id);
    if (user) {
        delete user.password;
    }
    return user;
};

/**
 * Save a users edited fullname and email data
 * @param {*} id 
 * @param {*} email 
 * @param {*} fullName 
 * @returns 
 */
export const editUser = (id, email, fullName) => {
    const users = getUsers();
    if (!users) {
        return false;
    }
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
        return false;
    }
    const user = users[index];
    users[index] = { ...user, email, fullName };
    saveItem(users, DATA_KEYS.USERS);
    const loggedInUser = getLoggedInUser();
    saveItem({ ...loggedInUser, email, fullName }, DATA_KEYS.LOGGED_IN_USER);
    return true;
};

/**
 * Remove user details by Id
 * @param {*} id 
 */
export const removeUser = (id) => {
    deleteDataByKey(id, DATA_KEYS.USERS, "id");
    deleteDataByKey(id, DATA_KEYS.CHATS, "userId");
    deleteDataByKey(id, DATA_KEYS.DOCUMENTS, "userId");
};

/**
 * Save the loggedIn  user in local storage
 * @param {*} userDetails 
 */
export const saveLoggedInUser = (userDetails) => {
    saveItem(userDetails, DATA_KEYS.LOGGED_IN_USER);
};

/**
 * Get the loggedIn user from local storage
 * @returns 
 */
export const getLoggedInUser = () => {
    return getData(DATA_KEYS.LOGGED_IN_USER);
};

/**
 * Remove the looged in user from local storage
 * @returns 
 */
export const removeLoggedInUser = () => {
    return localStorage.removeItem(DATA_KEYS.LOGGED_IN_USER);
};

