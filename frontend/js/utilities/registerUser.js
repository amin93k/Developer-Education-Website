import { $, url } from "../base.js"
import {getToken} from "./localStorageManager.js"

async function getUserInfo() {
    const token = getToken();

    if (!token) {
        return false;
    }

    const res = await fetch(url + "/auth/me", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const data = await res.json();

    return data;

}

export default getUserInfo