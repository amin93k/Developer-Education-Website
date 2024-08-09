import {popUp} from "../component/sweetAlertCustome.js";

async function fetchData(url, method, headers, body) {

    try {
        const res = await fetch(url, {
            method,
            headers: headers,
            body: JSON.stringify(body)
        })

        if(res.ok) {
            return await res.json()
        }
        else {
            popUp("خطا در برقراری ارتباط", false)
        }

    }
    catch (e) {
        popUp("خطا در برقراری ارتباط", false)
        throw new Error(e)
    }
}

export {fetchData}