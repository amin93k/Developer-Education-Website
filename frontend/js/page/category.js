import {$, url} from "../base.js"
import {fetchData} from "../utilities/fetchData.js"
import {courseCardHorizontalRender, courseCardRender} from "../utilities/courseCardRender.js"
import {setDataToStorage, getDataFromStorage} from "../utilities/localStorageManager.js"


window.addEventListener("load", () => {
    const showCategoryBtn = $.querySelectorAll(".top-bar__show--btn")
    showCategoryBtn.forEach(element => {
        element.addEventListener("click", shiftCourseLayoutBtn)
    })

    showCategory(true)
})

function getLocationURL() {
    const param = window.location.search.split("/")
    const URL = url + "/courses/category/" + param[param.length - 1]

    return URL
}

function showCategory(initialLoad) {
    const categoryWrapper = $.querySelector(".courses-wrapper")
    categoryWrapper.innerHTML = ""
    const getActiveBtn = getDataFromStorage("show-category") || "show-windows"

    initialLoad && setActiveCourseLayoutBtn(getActiveBtn)

    let parentClass = getActiveBtn === "show-windows" ? "col-lg-3 col-md-4 col-sm-6 mb-3" : "col-12"
    // TODO: چون اطلاعات به درستی از بک دریافت نمیشود به جای استفاده از تابع بالا از مسیر کورس ها استفاده شده برای تست
    if(getActiveBtn === "show-windows") {

        fetchData(url + "/courses").then(courses => {
            categoryWrapper.append(courseCardRender(courses, parentClass))
        })
    }else {

        fetchData(url + "/courses").then(courses => {
            categoryWrapper.append(courseCardHorizontalRender(courses, parentClass))
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