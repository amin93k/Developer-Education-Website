import getUserInfo from "./registerUser.js"

const userBtnInNav = document.querySelector(".header__user")

function showUserInTopNav() {


    getUserInfo().then(userInfo => {

        if(userInfo) {
            // TODO: change href to user page
            userBtnInNav.href = 'index.html'
            userBtnInNav.querySelector(".header__user--text").textContent = userInfo.username
        }
        else {
            console.log("userInfo")
        }
    })
}

export { showUserInTopNav }