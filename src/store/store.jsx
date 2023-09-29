
/**
 * Save an item in local storage. It will take care of JSON stringify of objects and array
 * @param {*} item 
 * @param {*} dataKey 
 */
export const saveItem = (item, dataKey) => {
    localStorage.setItem(dataKey, JSON.stringify(item));
};

/**
 * Remove an item from local storage
 * @param {*} dataKey 
 */
export const removeItem = (dataKey) => {
    localStorage.removeItem(dataKey);
};

/**
 * Get data from local storage
 * @param {*} dataKey 
 * @returns 
 */
export const getData = (dataKey) => {
    return JSON.parse(localStorage.getItem(dataKey));
};

/**
 * Save the data to local storage. It will automatically assign the id.
 * @param {*} dataItem 
 * @param {*} dataKey 
 */
export const saveData = (dataItem, dataKey) => {
    const dataList = getData(dataKey);
    if (!dataList) {
        saveItem([{ ...dataItem, id: 1 }], dataKey);
    } else {
        const maxId = Math.max(...dataList.map((item) => item.id));
        saveItem([...dataList, { ...dataItem, id: maxId + 1 }], dataKey);
    }
};

/**
 * Delete the data by key
 * @param {*} id 
 * @param {*} dataKey 
 * @param {*} key 
 * @returns 
 */
export const deleteDataByKey = (id, dataKey, key) => {
    const dataList = getData(dataKey);
    if (dataList) {
        saveItem(dataList.filter((item) => item[key] !== id), dataKey);
        return true;
    }
    return false;
};

/**
 * This is the temporary store for storing temp values.
 * This is used for editing and deleting documents
 */
export const tempStore = {

}



