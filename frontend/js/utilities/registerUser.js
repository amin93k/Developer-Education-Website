import { $, url } from "../base.js"
import {getToken} from "./localStorageManager.js"

async function getUserInfo() {
    const token = getToken()

    if (!token) {
        return false
    }

    const res = await fetch(url + "/auth/me", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(result => result)

    // const data = await res.json()
    // const userInfo = data.then(result => console.log(result))
    //
    // return userInfo
    // console.log(userInfo)
}

export default getUserInfo