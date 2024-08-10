import {url} from "../base.js";
import {getToken} from "./localStorageManager.js";
import {popUp} from "../component/sweetAlertCustome.js";

async function courseRegister(coursePrice, id, redirectPage) {
    try {
        const registerRequest = await fetch(url + `/courses/${id}/register`, {

                method: "POST",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({price: coursePrice})
            }
        )

        if (registerRequest.status === 401) {
            popUp("ابتدا در سایت وارد شوید", false)
        } else {
            await popUp("ثبت نام در دوره با موفقیت انجام شد")
            window.location.replace(redirectPage)
        }
    }
    catch (e) {
        popUp("خطا در برقراری ارتباط", false)
    }

}

export {courseRegister}