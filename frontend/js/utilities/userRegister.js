import {url} from "../base.js"
import {getToken} from "./localStorageManager.js"

async function getUserInfo() {
    try {
        const userResponse = await fetch(url + "/auth/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })

        if(userResponse.ok) {
            return await userResponse.json()
        }
    }
    catch (e) {
        throw new Error(e)
    }
}

export {getUserInfo}