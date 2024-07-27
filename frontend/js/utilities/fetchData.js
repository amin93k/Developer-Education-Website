
async function fetchData(url, method, headers, body) {

    try {
        const res = await fetch(url, {
            method,
            headers: headers,
            body: JSON.stringify(body)
        })

        return await res.json()

    }
    catch (e) {
        throw new Error(e)
    }
}

export {fetchData}