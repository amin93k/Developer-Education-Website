import { $, url } from "../base.js"
import {getToken} from "./localStorageManager.js"
import {fetchData} from "./fetchData.js";


function showUserInTopNav() {
    const userBtnInNav = document.querySelector(".header__user")

    fetchData(url + "/auth/me", "GET",{Authorization: `Bearer ${getToken()}`})
        .then(userInfo => {

        if(userInfo.message !== "توکن نامعتبر است") {
            // TODO: change href to user page
            userBtnInNav.href = 'index.html'
            userBtnInNav.querySelector(".header__user--text").textContent = userInfo.username
        }
    })
}

export { showUserInTopNav }