
async function fetchData(url, method, headers, body) {

    const res = await fetch(url, {
        method, headers, body: JSON.stringify(body)
    })

    return res.json()
}

export {fetchData}