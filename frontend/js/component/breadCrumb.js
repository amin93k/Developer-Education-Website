import {$} from "../base.js";

function breadcrumbRoute(categoryName, categoryTitle, name) {
    const isCourseOrBlog = window.location.href.split("/").pop().includes("course")

    const fragment = $.createDocumentFragment()

    // Is course
    if(isCourseOrBlog) {
        fragment.append(creatorCrumbDiv("category.html?show=courses", "دوره ها"))
        fragment.append(creatorCrumbDiv(`category.html?cat=${categoryName}`, categoryTitle))
        fragment.append(creatorCrumbDiv(window.location.href, name))
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