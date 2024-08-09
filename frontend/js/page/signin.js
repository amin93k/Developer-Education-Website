import {$, url} from "../base.js"
import { popUp } from "../component/sweetAlertCustome.js";
import {setTokenToStorage} from "../utilities/localStorageManager.js"

const signInForm = $.querySelector(".sign__form")

signInForm.addEventListener("submit", (eve) => {
    eve.preventDefault()

    const userInfo = {
        identifier: signInForm["user-name"].value.trim(),
        password: signInForm.password.value.trim()
    }

    signInRegister(userInfo)
})


async function signInRegister(userInfo) {
    await fetch(url + "/auth/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    }).then(res => {
        console.log(res)
        if(res.status === 200) {
            popUp("ورود با موفقیت")
            location.href = 'index.html'
            setTokenToStorage()
            return res.json()
        }
        else if(res.status === 401) {
            popUp("نام کاربری یا پسورد اشتباه است!", false)
        }
    }).then(result => {
        setTokenToStorage(result.accessToken)
    })
}

