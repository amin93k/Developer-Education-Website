
function setTokenToStorage(token) {
    localStorage.setItem("token", JSON.stringify(token))
}

function getToken() {
    const tokenValue = localStorage.getItem("token")
    if(tokenValue) {
        return JSON.parse(tokenValue)
    }

    return null
}

function setDataToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function getDataFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

export {setTokenToStorage, getToken, setDataToStorage, getDataFromStorage}