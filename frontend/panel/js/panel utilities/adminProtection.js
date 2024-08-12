import {$, url} from "../../../js/base.js";
import {getUserInfo} from "../../../js/utilities/userRegister.js";

const userNameElm = $.querySelector(".top-header__user-profile--name")
const signInPageUrl = "../signin.html"

async function adminProtection() {
    try {
        const userInfo = await getUserInfo()

        if (userInfo.role === "ADMIN") {
            userNameElm.textContent = userInfo.name
        } else {
            window.location.replace(signInPageUrl)
        }
    } catch (e) {
        window.location.replace(signInPageUrl)
        throw new Error(e)
    }
}

export {adminProtection}