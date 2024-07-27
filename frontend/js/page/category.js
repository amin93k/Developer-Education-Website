import {$, url} from "../base.js"
import {fetchData} from "../utilities/fetchData.js"
import {courseCardHorizontalRender, courseCardRender} from "../utilities/courseCardRender.js"
import {setDataToStorage, getDataFromStorage} from "../utilities/localStorageManager.js"
import {search} from "../utilities/search.js"

let searchWord = ""
let routeName = null
// TODO: مدیریت دکمه مشاهده بیشتر
window.addEventListener("load", () => {
    const showCategoryBtn = $.querySelectorAll(".top-bar__show--btn")
    showCategoryBtn.forEach(element => {
        element.addEventListener("click", shiftCourseLayoutBtn)
    })

    const sortButtons = $.querySelectorAll(".top-bar__sort--type")
    sortButtons.forEach(sortBtn => {
        sortBtn.addEventListener("click", shiftSortBtn)
    })

    const searchBox = $.querySelector(".top-bar__search--input")
    searchBox.addEventListener("change", showSearchCourse)

    showCategory(true, "all")
})

function getLocationURL() {
    let URL = null
    const param = new URLSearchParams(window.location.search)
    const paramKey = param.keys()
    routeName = paramKey.next().value

    if(routeName === "all") {
        URL = url + "/courses"
    }
    else if(routeName === "articles") {
        URL = url + "/articles"
    }
    else if(routeName === "cat"){
        URL = url + "/courses/category/" + param.get(routeName)
    }
    else if(routeName === "search"){
        URL = url + "/search/" + param.get(routeName)
    }

    return URL
}

function showCategory(initialLoad, sortBase) {
    const categoryWrapper = $.querySelector(".courses-wrapper")
    categoryWrapper.innerHTML = ""
    const getLayoutActiveBtn = getDataFromStorage("show-category") || "show-windows"

    initialLoad && setCourseLayoutActiveBtn(getLayoutActiveBtn)

    let parentClass = getLayoutActiveBtn === "show-windows" ? "col-lg-3 col-md-4 col-sm-6 mb-3" : "col-12 mb-3"

    fetchData(getLocationURL()).then(courses => {
        let coursesList = routeName === "search" ? [...courses.allResultCourses] : [...courses]
        // check search happened
        if(searchWord) {
            coursesList = search(coursesList, searchWord, "name")
        }

        const sortedCourses = sortBase === "all" ? coursesList : sortCourses(coursesList, sortBase)
        // TODO: بعد از ایجاد رندر کارد مقالات باید انجا تغییر کند
        if (getLayoutActiveBtn === "show-windows") {
            categoryWrapper.append(courseCardRender(sortedCourses, parentClass))
        } else {
            categoryWrapper.append(courseCardHorizontalRender(sortedCourses, parentClass))
        }
    })

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

function setCourseLayoutActiveBtn(activeBtn) {
    const showCategoryBtn = $.querySelectorAll(".top-bar__show--btn")
    showCategoryBtn.forEach(btn => {
        if (btn.id === activeBtn) {
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

    if (sortBase === "popular") {
        sortedCourses = courses.sort((a, b) => b.registers - a.registers)
    } else if (sortBase === "cheaper") {
        sortedCourses = courses.sort((a, b) => a.price - b.price)
    } else if (sortBase === "expensive") {
        sortedCourses = courses.sort((a, b) => b.price - a.price)
    }
    return sortedCourses
}

function showSearchCourse(eve) {
    searchWord = eve.target.value

    showCategory(false, "all")
}