import {url} from "../base.js"
import {getToken} from "./localStorageManager.js"
import {fetchData} from "./fetchData.js";

async function getUserInfo() {
    return await fetchData(url + "/auth/me", "GET", {Authorization: `Bearer ${getToken()}`})
}

export {getUserInfo}