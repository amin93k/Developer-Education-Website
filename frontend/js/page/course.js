import {url, $} from "../base.js";
import {fetchData} from "../utilities/fetchData.js";
import {getToken} from "../utilities/localStorageManager.js"
import {getParam, changeDateToJalali} from "../utilities/utileFunction.js"
import {breadcrumbRoute} from "../component/breadCrumb.js";


window.addEventListener("load", () => {
    const isCoursePage = $.querySelector(".course-header")
    const getCourseUrl = url + "/courses/" + getParam("name")
    const relatedCourseUrl = url + "/courses/related/" + getParam("name")
    // Condition for doesn't run in episode page
    if (isCoursePage) {
        fetchData(getCourseUrl, "GET", {Authorization: `Bearer ${getToken()}`}).then(course => {
            addBreadcrumb(course)
            addCourseHeader(course)
            addCourseInfo(course)
            addCourseTeacher(course.creator)
            addSessions(course.sessions, course.isUserRegisteredToThisCourse, course.shortName)
        })
        fetchData(relatedCourseUrl).then(courses => {
            addRelatedCourse(courses)
        })
    }
})

// set sessions minute in calcCourseTime function
let minute = null

function addBreadcrumb(course) {
    const breadCrumb = $.querySelector(".breadcrumb2")
    const categoryName = course.categoryID.name
    const categoryTitle = course.categoryID.title

    breadCrumb.append(breadcrumbRoute(categoryName, categoryTitle, course.name))
}

function addCourseHeader(course) {
    const courseHeaderContentElm = $.querySelector(".course-header__content")
    const courseHeaderCoverElm = $.querySelector(".courses-header__video")
    const isUserRegistered = course.isUserRegisteredToThisCourse

    courseHeaderContentElm.innerHTML = `
        <h1 class="course-header__content--title">${course.name}</h1>
        <p class="course-header__content--description">${course.description}</p>
    `
    //TODO: لینک دادن به دکمه مشاهده و ثبت نام در دوره
    if (isUserRegistered) {
        courseHeaderContentElm.innerHTML += `
            <div class="course-header__register">
                <div class="course-header__register--content">
                    <i class="fa-regular fa-user course-header__register--icon"></i>
                    <p>شما دانشجوی این دوره هستید</p>
                </div>
                <a href="#" class="course-header__register--btn">مشاهده دوره</a>
            </div>
        `
    }
    else {
        courseHeaderContentElm.innerHTML += `
            <div class="course-header__register">
                <a href="course-register.html?name=${course.shortName}" class="course-header__register--btn">
                    <svg id="academic-cap"xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: currentColor; height: 30px; width: 30px">
                    \t\t<path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"></path>
                    \t
                    </svg>
                    ثبت نام در دوره
                </a>
                <div class="course-header__register--content">
                    <p class="course-header__register--price">
                    ${course.price === 0 ? "رایگان" : `
                        ${course.price.toLocaleString()}
                        <svg class="course-header__register--toman" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-width="4" stroke="currentColor" viewBox="0 0 57.988 55.588" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: currentColor;">
                            <g transform="translate(-4013.907 176.406)">
                                <path d="M4068.117-146.108s3,8.61,1.066,11.035-4.839,1.921-11.736,1.921-10.552.731-12.355-1.6-2.288-7.952,2.547-9.55,7.877,3.5,7.877,9.231.668,5.874-.732,8.36c-1.858,2.6-10.917,3.915-10.917,3.915"></path>
                                <path d="M4069.56-152.461v3.969" transform="translate(0 -1.945)"></path>
                                <path d="M4069.56-152.461v3.969" transform="translate(-7 -1.945)"></path>
                                <path d="M4069.56-152.461v3.969" transform="translate(-7 -1.945)"></path>
                                <path d="M4027.592-128.435s5.376,4.632,8.167,3.124a5.918,5.918,0,0,0,3.034-6.158c-.446-4.24-4.144-5.625-6.783-4.418s-4.016,5.866-4.016,5.866-1.857,4.934-6.114,4.934-4.928-2.6-5-4.934-.98-19.76-.98-19.76"></path>
                                <path d="M4069.56-152.461v3.969" transform="translate(-44 -23.945)"></path>
                                <path d="M4017.55-171.009s-3.525,12.094,2.454,15.619c5.623,3.035,12.585-.714,12.585-.714s3.473-2.1,3.436-4.864c-.089-3.883-1.651-12.986-1.651-12.986"></path>
                            </g>
                        </svg>
                    `}
                    </p>
                </div>
            </div>
        `
    }

    courseHeaderCoverElm.innerHTML = `
        <img class="courses-header__video--image"
             src="http://localhost:63342/learn.txt/Sabz%20Learn%20Project/backend-v0.3.0/public/courses/covers/${course.cover}" alt="course">
    `
}

function addCourseInfo(course) {
    const infoBoxes = $.querySelectorAll(".course-info__box--content")
    const courseInfo = {
        1: ["وضعیت دوره", course.isCompleted ? "تکمیل شده" : "در حال برگزاری"],
        2: ["مدت زمان دوره", ` ${calcCourseTime(course.sessions)} ساعت  `],
        3: ["آخرین بروزرسانی", changeDateToJalali(course.updatedAt)],
        4: ["روش پشتیبانی", course.support],
        5: ["پیش نیاز", "HTML & CSS"],
        6: ["نوع مشاهده", "دانلودی/آنلاین"],
        7: [course.courseStudentsCount, "دانشجو"],
        8: ["5.0", "رضایت"],
    }

    for (let i = 0; i < infoBoxes.length; i++) {
        infoBoxes[i].innerHTML = `
            <h3 class="course-info__box--title">${courseInfo[i + 1][0]}</h3>
            <span class="course-info__box--description">${courseInfo[i + 1][1]}</span>
    `
    }
}

function addCourseTeacher(creator) {
    const teacherInfoBox = $.querySelector(".course-teacher")
    const img = teacherInfoBox.querySelector("img")
    img.src = creator.profile

    img.onerror = () => {
        img.src = "images/teacher/online-education-male-teacher-and-books-internet-vector-31732020.jpg"
    }

    teacherInfoBox.querySelector(".course-teacher__name").innerText = `${creator.name} | مدرس دوره`
}

function addSessions(sessions, userRegisterToSession, courseName) {
    const sessionLength = sessions.length

    if (sessionLength) {

        const sessionsCount = $.querySelector(".accordion-button__left--session-count")
        const sessionsTime = $.querySelector(".accordion-button__left--whole-time")
        const sessionsWrapper = $.querySelector(".session-list")
        let sessionIconClass = ""

        sessions.forEach((session, index) => {
            sessionIconClass = (session.free || userRegisterToSession) ? "fa-play-circle" : "fa-lock"
            //TODO: زمانی که کاربر به ویدیو دسترسی ندارد به صفحه خرید منتقل شود
            sessionsWrapper.insertAdjacentHTML("beforeend", `
                <a class="list-group-item lesson" href="episode.html?name=${courseName}&id=${session._id}">
                    <span class="lesson__number">${index + 1}</span>
                    <span class="lesson__title">${session.title}</span>
                    <div class="lesson__time">
                        <div class="lesson__time--time">${session.time}</div>
                        <i class="fa-regular ${sessionIconClass}"></i>
                    </div>
                </a>
            `)
        })

        sessionsCount.innerHTML = `${sessionLength} جلسه`
        sessionsTime.innerHTML = `${minute} دقیقه`
    } else {
        const courseSession = $.querySelector(".course-topics")
        courseSession.innerHTML = `
            <h3 class="text-center">فعلا دوره ای ثبت نشده!</h3>    
        `
    }
}

function addRelatedCourse(courses) {
    if (courses.length) {

        const relatedCourseElm = $.querySelector(".course-related")
        let courseLink = ""

        courses.forEach(course => {
            courseLink = `course.html?name=${course.shortName}`

            relatedCourseElm.insertAdjacentHTML("beforeend", `
                <div class="course-related__card">
                    <img src="http://localhost:63342/learn.txt/Sabz%20Learn%20Project/backend-v0.3.0/public/courses/covers/${course.cover}" class="course-related__cars--image" alt="course">
                    <a href="${courseLink}" class="course-related__card--title">${course.name}</a>
                    <a href="${courseLink}" class="course-related__card--link">
                        مشاهده
                        <i class="course-related__link--icon fa-solid fa-circle-arrow-left"></i>
                    </a>
                </div>
            `)
        })
    }
}

function calcCourseTime(sessions) {
    if (!sessions) {
        return "0"
    }

    let time = null
    let second = 0
    minute = 0

    sessions.forEach(session => {
        time = session.time.split(":")
        minute += parseInt(time[0])
        second += parseInt(time[1])
    })
    minute += Math.ceil(second / 60)
    const hour = Math.ceil(minute / 60)
    return hour
}

// use function on episode page
export {addBreadcrumb, addCourseTeacher, addSessions, calcCourseTime}