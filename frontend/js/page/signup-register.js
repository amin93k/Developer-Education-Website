import { $, url } from "../base.js"
import {popUp} from "../component/sweetAlertCustome.js";

const signUpForm = $.querySelector(".sign__form")

signUpForm.addEventListener("submit", (eve) => {
    eve.preventDefault()

    const userInfo = {
        name: signUpForm["user-name"].value.trim(),
        username: signUpForm["user-name"].value.trim(),
        email: signUpForm.email.value.trim(),
        phone: signUpForm.phone.value.trim(),
        password: signUpForm.password.value.trim(),
        confirmPassword: signUpForm.password.value.trim()
    }

    register(userInfo)
})


async function register(userInfo) {

    await fetch(url + "/auth/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
        }).then(res => {
        if (res.status === 201) {
            popUp("ثبت نام با موفقیت انجام شد.")
            location.href = "index.html"
            return res.json()
        }
        else if(res.status === 409) {
            popUp("نام کاربری یا ایمیل قبلا استفاده شده!", false)
            return res.json()
        }
    })
        // .then(result => console.log(result))
}
