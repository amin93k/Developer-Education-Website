import { $, url } from "../base.js"
import {popUp} from "../component/sweetAlertCustome.js";
import {setTokenToStorage} from "../utilities/localStorageManager.js"

const signUpForm = $.querySelector(".sign__form")

signUpForm.addEventListener("submit", async (eve) => {
    eve.preventDefault()

    const userInfo = {
        name: signUpForm["user-name"].value.trim(),
        username: signUpForm["user-name"].value.trim(),
        email: signUpForm.email.value.trim(),
        phone: signUpForm.phone.value.trim(),
        password: signUpForm.password.value.trim(),
        confirmPassword: signUpForm.password.value.trim()
    }

    await register(userInfo)
})


async function register(userInfo) {

    try {
        const signUpResponse = await fetch(url + "/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })

        if (signUpResponse.status === 201) {
            popUp("ثبت نام با موفقیت انجام شد.")
            const result = await signUpResponse.json()
            setTokenToStorage(result.accessToken)
            location.href = "index.html"
        }
        else if(signUpResponse.status === 409) {
            popUp("نام کاربری یا ایمیل قبلا استفاده شده!", false)
        }
        else if(signUpResponse.status === 403) {
            popUp("با این شماره قادر به ثبت نام نیستید!", false)
        }
    }
    catch (e) {
        popUp("خطا در برقراری ارتباط", false)
        throw new Error(e)
    }
}
