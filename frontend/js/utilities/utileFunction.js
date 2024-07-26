// import {url} from "../base.js";

function getParam(name) {
    const params = new URLSearchParams(window.location.search)

    return params.get(name)
}

function changeDateToJalali(date) {
    const extractionDate = date.slice(0, 10).split("-")
    const formatDate = new Date(extractionDate[0], extractionDate[1], extractionDate[2])
    const jalaliDate = new Intl.DateTimeFormat('fa-IR').format(formatDate)

    return jalaliDate
}

export {getParam, changeDateToJalali}