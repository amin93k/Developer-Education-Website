import {$, url} from "../base.js"
import {fetchData} from "../utilities/fetchData.js"
import {courseCardHorizontalRender, courseCardRender} from "../utilities/courseCardRender.js"
import {setDataToStorage, getDataFromStorage} from "../utilities/localStorageManager.js"


window.addEventListener("load", () => {
    const showCategoryBtn = $.querySelectorAll(".top-bar__show--btn")
    showCategoryBtn.forEach(element => {
        element.addEventListener("click", shiftCourseLayoutBtn)
    })

    const sortButtons = $.querySelectorAll(".top-bar__sort--type")
    sortButtons.forEach(sortBtn => {
        sortBtn.addEventListener("click", shiftSortBtn)
    })

    showCategory(true, "all")
})

function getLocationURL() {
    const param = window.location.search.split("/")
    const URL = url + "/courses/category/" + param[param.length - 1]

    return URL
}

function showCategory(initialLoad, sortBase) {
    const categoryWrapper = $.querySelector(".courses-wrapper")
    categoryWrapper.innerHTML = ""
    const getActiveBtn = getDataFromStorage("show-category") || "show-windows"

    initialLoad && setActiveCourseLayoutBtn(getActiveBtn)

    let parentClass = getActiveBtn === "show-windows" ? "col-lg-3 col-md-4 col-sm-6 mb-3" : "col-12 mb-3"
    // TODO: چون اطلاعات به درستی از بک دریافت نمیشود به جای استفاده از تابع بالا از مسیر کورس ها استفاده شده برای تست
    if(getActiveBtn === "show-windows") {
        fetchData(url + "/courses").then(courses => {

            const sortedCourses = sortCourses([...courses], sortBase)
            categoryWrapper.append(courseCardRender(sortedCourses, parentClass))
        })
    }else {
        fetchData(url + "/courses").then(courses => {

            const sortedCourses = sortCourses([...courses], sortBase)
            categoryWrapper.append(courseCardHorizontalRender(sortedCourses, parentClass))
        })
    }
}

function shiftCourseLayoutBtn(eve) {
    const btnId = eve.currentTarget.id

    setDataToStorage("show-category", btnId)
    // update active btn
    const showCategoryBtn = $.querySelectorAll(".top-bar__show--btn")
    showCategoryBtn.forEach(btn => {
        btn.classList.toggle("active")
    })

    showCategory(false)
}

function setActiveCourseLayoutBtn(activeBtn) {
    const showCategoryBtn = $.querySelectorAll(".top-bar__show--btn")
    showCategoryBtn.forEach(btn => {
        if(btn.id === activeBtn) {
            btn.classList.add("active")
        }
    })
}

function shiftSortBtn(eve) {
    const sortButtons = $.querySelectorAll(".top-bar__sort--type")
    sortButtons.forEach(sortBtn => {
        sortBtn.classList.remove("active")
    })

    eve.target.classList.add("active")
    const sortBase = eve.target.id

    showCategory(false, sortBase)
}

function sortCourses(courses, sortBase) {
    let sortedCourses = courses

    if(sortBase === "popular") {
        sortedCourses = courses.sort((a, b) => b.registers - a.registers)
    }
    else if(sortBase === "cheaper") {
        sortedCourses = courses.sort((a, b) => a.price - b.price)
    }
    else if(sortBase === "expensive") {
        sortedCourses = courses.sort((a, b) => b.price - a.price)
    }else {
        return courses
    }

    return sortedCourses
}
