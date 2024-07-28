import {$, url} from "../base.js"
import {fetchData} from "../utilities/fetchData.js"
import {courseCardHorizontalRender, courseCardRender} from "../utilities/courseCardRender.js"
import {setDataToStorage, getDataFromStorage} from "../utilities/localStorageManager.js"
import {search} from "../utilities/search.js"

let searchWord = ""
let routeName = null
let sortBase = "all"
const displayCoursePerLoad = 4
let currentCoursesShow = 1

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

    const showMoreBtn = $.querySelector(".show-more")
    showMoreBtn.addEventListener("click", loadMoreCourses)

    showCategory(true)
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

function showCategory(initialLoad) {
    const categoryWrapper = $.querySelector(".courses-wrapper")
    // categoryWrapper.innerHTML = ""
    const getLayoutActiveBtn = getDataFromStorage("show-category") || "show-windows"

    initialLoad && setCourseLayoutActiveBtn(getLayoutActiveBtn)

    let parentClass = getLayoutActiveBtn === "show-windows" ? "col-lg-3 col-md-4 col-sm-6 mb-3" : "col-12 mb-3"

    fetchData(getLocationURL()).then(courses => {
        let coursesList = routeName === "search" ? [...courses.allResultCourses] : [...courses]

        // check search happened
        if(searchWord) {
            coursesList = search(coursesList, searchWord, "name")
        }

        // handel show more button
        coursesList = coursesList.slice((currentCoursesShow - 1) * displayCoursePerLoad, displayCoursePerLoad * currentCoursesShow)

        // sort course use sortBase variable
        coursesList = sortBase === "all" ? coursesList : sortCourses(coursesList)

        // TODO: بعد از ایجاد رندر کارد مقالات باید انجا تغییر کند
        if (getLayoutActiveBtn === "show-windows") {
            categoryWrapper.append(courseCardRender(coursesList, parentClass))
        } else {
            categoryWrapper.append(courseCardHorizontalRender(coursesList, parentClass))
        }

        if(displayCoursePerLoad * currentCoursesShow > coursesList.length){
            $.querySelector(".show-more").classList.add("hidden")
        }
        else {
            $.querySelector(".show-more").classList.remove("hidden")
        }
    })

}

function loadMoreCourses() {
    currentCoursesShow += 1
    showCategory(false)
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
    sortBase = eve.target.id

    showCategory(false)
}

function sortCourses(courses) {

    if (sortBase === "popular") {
        courses = courses.sort((a, b) => b.registers - a.registers)
    } else if (sortBase === "cheaper") {
        courses = courses.sort((a, b) => a.price - b.price)
    } else if (sortBase === "expensive") {
        courses = courses.sort((a, b) => b.price - a.price)
    }
    return courses
}

function showSearchCourse(eve) {
    searchWord = eve.target.value
    // reset show current course number
    currentCoursesShow = 1
    showCategory(false)
}