import {$, url} from "../../../js/base.js";
import {adminProtection} from "../panel utilities/adminProtection.js";
import {deleteItem} from "../panel utilities/deleteItem.js";
import {changeDateToJalali} from "../../../js/utilities/utileFunction.js";
import {fetchData} from "../../../js/utilities/fetchData.js";
import {setSelectMainMenuOrCategory} from "../panel utilities/setSelectMainMenuOrCategory.js";
import {getToken} from "../../../js/utilities/localStorageManager.js";
import {popUp} from "../../../js/component/sweetAlertCustome.js";

let articleBodyEditor = null

window.addEventListener("load", async () => {
    const loaderElm = $.querySelector(".loader")
    const bodyElm = $.querySelector("body")

    await adminProtection()
    await articlesTableRender()
    await setSelectMainMenuOrCategory("category")

    const createArticleForm = $.querySelector(".new-article__form")
    createArticleForm.addEventListener("submit", createNewArticle)

    ClassicEditor.create($.querySelector("#editor"))
        .then(editor => articleBodyEditor = editor)
        .catch(error => { console.error(error)})

    bodyElm.classList.add("onload")
    loaderElm.classList.add("hidden")
})

async function articlesTableRender() {
    const articles = await fetchData(url + "/articles")

    if (articles.length) {
        const articlesTableElm = $.querySelector(".articles-table-body")
        articlesTableElm.innerHTML = ""
        const fragment = $.createDocumentFragment()

        articles.forEach((article, index) => {
            const trElm = $.createElement("tr")
            trElm.insertAdjacentHTML("beforeend", `
                <th scope="row">${index + 1}</th>
                <td>${article.title}</td>
                <td>${article.creator.name}</td>
                <td>${changeDateToJalali(article.createdAt)}</td>
                <td>${article.publish ? "منتشر شده" : "پیش نویس"}</td>
                <td class="menu-table__edite">
                    <i class="fa-regular fa-pen menu-table__edite--pen edite_pen" data-route="articles"></i>
                </td>
                <td class="menu-table__delete">
                    <i class="fa-regular fa-trash-alt menu-table__delete--trash delete_trash" data-route="articles"></i>
                </td>
            `)

            const deleteArticleElm = trElm.querySelector(".menu-table__delete--trash")
            deleteArticleElm.addEventListener("click",
                (eve) => deleteItem(eve, article._id, articlesTableRender))

            fragment.append(trElm)
        })

        articlesTableElm.append(fragment)
    }
}

async function createNewArticle(eve) {
    eve.preventDefault()
    const form = eve.target
    const articleBodyContent =  articleBodyEditor.getData().trim()

    if(form.checkValidity() && articleBodyContent) {
        const formData = new FormData()

        formData.append("cover",form.cover.files[0])
        formData.append("title",form.title.value.trim())
        formData.append("description",form.description.value.trim())
        formData.append("body",articleBodyContent)
        formData.append("shortName",form.shortName.value.trim())
        formData.append("categoryID",form.category.value)

        try {
            const res = await fetch(url + "/articles", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getToken()}`
                },
                body: formData
            })

            if(res.ok) {
                popUp("مقاله با موفقیت ایجاد شد")
                await articlesTableRender()
                articleBodyEditor.setData("")
                form.reset()
            }
            else {
                popUp("ایجاد مقاله ناموفق", false)
            }
        }
        catch (e) {
            popUp("خطا در برقراری ارتباط", false)
            throw new Error(e)
        }
    }
    else {
        form.classList.add("was-validated")
        if(articleBodyContent === "") {
            const editorDiv =  $.querySelector(".ck-editor")
            editorDiv.classList.add("validated-error")
        }
    }
}