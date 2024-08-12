import {logout} from "../../../js/utilities/logout.js";

window.addEventListener("load", () => {
    const logoutBtn = document.querySelector(".logout")
    logoutBtn.addEventListener("click", logout)
})