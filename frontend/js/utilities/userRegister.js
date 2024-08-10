import {url} from "../base.js"
import {getToken} from "./localStorageManager.js"

async function getUserInfo() {
    const token = getToken()

    if(token) {
        try {
            const userResponse = await fetch(url + "/auth/me", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
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

    return null
}

export {getUserInfo}