import {$} from "../base.js";
import {getParam} from "../utilities/utileFunction.js";

function breadcrumbRoute(categoryName, categoryTitle, name) {
    const route = window.location.href.split("/").pop()
    const isCourseOrBlog = route.includes("course") || route.includes("episode") ? "course" : "blog"
    const fragment = $.createDocumentFragment()

    if(isCourseOrBlog === "course") {
        fragment.append(creatorCrumbDiv("category.html?show=courses", "دوره ها"))
        fragment.append(creatorCrumbDiv(`category.html?cat=${categoryName}`, categoryTitle))
        fragment.append(creatorCrumbDiv(`course.html?name=${getParam("name")}`, name))
    }
    else {
        fragment.append(creatorCrumbDiv("category.html?show=articles", "مقالات"))
        fragment.append(creatorCrumbDiv("#", name))
    }

    return fragment
}

function creatorCrumbDiv(hrefLink, title) {
    const newCrumbDiv = $.createElement("div")
    newCrumbDiv.className = "breadcrumb2__item"
    newCrumbDiv.insertAdjacentHTML("beforeend",`
                <a href="${hrefLink}" class="breadcrumb2__item--link">
                    ${title}
                </a>
    `)

    return newCrumbDiv
}

export { breadcrumbRoute }