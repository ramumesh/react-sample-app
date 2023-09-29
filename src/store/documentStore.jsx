import { DATA_KEYS } from "../common/constant";
import { deleteDataByKey, getData, saveData, saveItem } from "./store";
import { getLoggedInUser } from "./userStore";

/**
 * Get all documents from the store
 * @returns 
 */
export const getDocuments = () => {
    const documents = getData(DATA_KEYS.DOCUMENTS);
    if (!documents) {
        return [];
    }
    return documents;
};

/**
 * Save the document to the store
 * @param {*} document 
 */
export const saveDocument = (document) => {
    const currentUser = getLoggedInUser();
    saveData({ ...document, userId: currentUser.id }, DATA_KEYS.DOCUMENTS);
};

/**
 * Remove a document by its id
 * @param {*} id 
 */
export const removeDocumentById = (id) => {
    deleteDataByKey(id, DATA_KEYS.DOCUMENTS, "id");
};


/**
 * Save the edited document details back to the store
 * @param {*} id 
 * @param {*} fileDescription 
 * @returns 
 */
export const saveEditedDocument = (id, fileDescription) => {
    const documents = getDocuments();
    if (!documents) {
        return false;
    }
    const index = documents.findIndex(document => document.id === id);
    if (index === -1) {
        return false;
    }
    const document = documents[index];
    documents[index] = { ...document, fileDescription };
    saveItem(documents, DATA_KEYS.DOCUMENTS);
    return true;
};