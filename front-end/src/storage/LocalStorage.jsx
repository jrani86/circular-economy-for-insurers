class LocalStorage {

    setValueToLocalStorage(key,data){
        localStorage.setItem(key, data);
    }

    getValueFromLocalStorage(key){
        return localStorage.getItem(key);
    }
    removeItemFromLocalStorage(key){
        localStorage.removeItem(key)
    }
}

export default LocalStorage;