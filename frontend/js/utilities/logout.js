import {confirmDialog} from "../component/sweetAlertCustome.js";

async function logout() {
    const isAgree = await confirmDialog("آیا از خروج اطمینان دارید؟", "بله")

    if(isAgree) {
        const isPanelPageRoute = window.location.href.includes("panel")
        const redirectRoute = isPanelPageRoute ? "../index.html" : "index.html"

        localStorage.removeItem("token")
        window.location.replace(redirectRoute)
    }
}

export {logout}