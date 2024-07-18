
function setTokenToStorage(token) {
    localStorage.setItem("token", JSON.stringify(token))
}

function getToken() {
    return JSON.parse(localStorage.getItem("token"))
}

function setDataToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function getDataFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

export {setTokenToStorage, getToken, setDataToStorage, getDataFromStorage}