import {url, $} from "../base.js";
import {fetchData} from "../utilities/fetchData.js";
import {getToken} from "../utilities/localStorageManager.js";
import {addBreadcrumb, addCourseTeacher, addSessions, calcCourseTime} from "./course.js"
import {getParam} from "../utilities/utileFunction.js";


window.addEventListener("load", () => {
    const loaderElm = $.querySelector(".loader")
    const bodyElm = $.querySelector("body")

    const token = getToken()
    const getSessionUrl = url + `/courses/${getParam("name")}/${getParam("id")}`
    const getCourseUrl = url + `/courses/${getParam("name")}`

    // Synchronous fetch data and use
    Promise.all([
        fetchData(getCourseUrl, "GET", {Authorization: `Bearer ${token}`}),
        fetchData(getSessionUrl, "GET", {Authorization: `Bearer ${token}`})
    ]).then(([course, sessionInfo]) => {
        const poster = course.cover;
        addBreadcrumb(course);
        addCourseTeacher(course.creator);
        calcCourseTime(course.sessions);
        addSessions(course.sessions, course.isUserRegisteredToThisCourse, course.shortName);
        addVideo(sessionInfo.session, poster);
    })

    bodyElm.classList.add("onload")
    loaderElm.classList.add("hidden")
})

function addVideo(session, cover) {
    const video = $.querySelector(".video-wrapper__video")
    video.src = session.video
    video.poster = `../backend-v0.3.0/public/courses/covers/${cover}`
    playPauseVideo()
}

function playPauseVideo() {
    const video = $.querySelector(".video-wrapper__video")
    const playPauseBtn = $.querySelector(".video-wrapper__video--icon")
    video.volume = 0.7

    video.addEventListener("play",() => {
        playPauseBtn.classList.remove("fa-play-circle")
    })
    video.addEventListener("pause",() => {
        playPauseBtn.classList.add("fa-play-circle")
    })
    video.addEventListener("ended",() => {
        playPauseBtn.classList.add("fa-play-circle")
    })
}

