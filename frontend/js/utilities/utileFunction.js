import {url} from "../base.js";

function getLocationURL(route) {
    const param = window.location.search.split("/")
    const URL = url + route + param[param.length - 1]

    return URL
}

export {getLocationURL}