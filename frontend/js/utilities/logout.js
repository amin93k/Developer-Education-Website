import {confirmDialog} from "../component/sweetAlertCustome.js";

async function logout() {
    const isAgree = await confirmDialog("آیا از خروج اطمینان دارید؟", "بله")

    if(isAgree) {
        localStorage.removeItem("token")
        window.location.replace("http://localhost:63342/learn.txt/Sabz%20Learn%20Project/frontend/index.html")
    }
}

export {logout}