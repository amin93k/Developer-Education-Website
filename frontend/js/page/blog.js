import {$, url} from "../base.js";
import {breadcrumbRoute} from "../component/breadCrumb.js";
import {fetchData} from "../utilities/fetchData.js";
import {changeDateToJalali, getParam} from "../utilities/utileFunction.js";


window.addEventListener("load", async () => {
    // Handel blog topics table show & hidden
    // const topicsBtn = document.querySelector(".blog-body__topics__header--btn")
    // const topicContent = document.querySelector(".blog-body__topics__content")
    //
    // topicsBtn.addEventListener("click", (eve) => {
    //     eve.target.classList.toggle("rotate-opposite")
    //     topicContent.classList.toggle("hidden")
    // })

    const loaderElm = $.querySelector(".loader")
    const bodyElm = $.querySelector("body")

    const articlePram = getParam("name")
    const article = await fetchData(url + `/articles/${articlePram}`)

    if(article) {
        addBreadcrumb(article)
        blogBodyRender(article)
    }

    bodyElm.classList.add("onload")
    loaderElm.classList.add("hidden")
})


function addBreadcrumb(article) {
    const breadCrumb = $.querySelector(".breadcrumb2")
    const categoryName = article.categoryID.name
    const categoryTitle = article.categoryID.title

    breadCrumb.append(breadcrumbRoute(categoryName, categoryTitle, article.title))
}


function blogBodyRender(article) {
    const blogBodyElm = $.querySelector(".blog-body")

    blogBodyElm.insertAdjacentHTML("afterbegin", `
        <h1 class="blog-body__head--title">${article.title}</h1>
        <!--Blog Info (author & date & view )-->
        <div class="blog-body__info">
            <i class="blog-body__info--icon fa-regular fa-user"></i>
            <span class="blog-body__info--author">${article.creator.name}</span>

            <i class="blog-body__info--icon fa-regular fa-calendar"></i>
            <span class="blog-body__info--date">${changeDateToJalali(article.updatedAt)}</span>
        </div>
        <!--Blog Top Image-->  
        <img src="../backend-v0.3.0/public/courses/covers/${article.cover}" alt="blog" class="blog-body__image my-5">
        <!--Topics Table-->
        <div class="blog-body__topics">
                        <div class="blog-body__topics__header">
                            <i class="fa fa-bars-staggered blog-body__topics__header--icon"></i>
                            <span class="blog-body__topics__header--title">سرفصل های این مقاله</span>
                            <i class="blog-body__topics__header--btn fa fa-chevron-up"></i>
                        </div>
                        <div class="blog-body__topics__content">
                            <a href="#topic-1" class="blog-body__topics__content--link">دیتا بیس یا پایگاه داده
                                چیست؟</a>
                            <a href="#topic-2" class="blog-body__topics__content--link">انواع دیتابیس</a>
                        </div>
        </div>
        <!--Blog Article-->
        <div class="blog-body__article">${article.body}</div>
    `)
}