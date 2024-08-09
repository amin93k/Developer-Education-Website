import {$, url} from "../../../js/base.js";
import {adminProtection} from "../panel utilities/adminProtection.js";
import {fetchData} from "../../../js/utilities/fetchData.js";
import {popUp} from "../../../js/component/sweetAlertCustome.js";
import {getToken} from "../../../js/utilities/localStorageManager.js";
import {deleteItem} from "../panel utilities/deleteItem.js";



window.addEventListener("load", async () => {
    await adminProtection()
    await categoryTableRender()

    const newMenuForm = $.querySelector(".new-menu__form")
    newMenuForm.addEventListener("submit", createNewCategory)
})



async function categoryTableRender() {
    const categories = await fetchData(url + "/category")

    if (categories.length) {
        const categoriesTableElm = $.querySelector(".category-table-body")
        categoriesTableElm.innerHTML = ""
        const fragment = $.createDocumentFragment()

        categories.forEach((category, index) => {
            const trElm = $.createElement("tr")
            trElm.insertAdjacentHTML("beforeend", `
                <th scope="row">${index + 1}</th>
                <td>${category.title}</td>
                <td>${category.name}</td>
                <td class="menu-table__edite">
                    <i class="fa-regular fa-pen menu-table__edite--pen edite_pen data-route=" data-route="articles" data-route="category"></i>
                </td>
                <td class="menu-table__delete">
                    <i class="fa-regular fa-trash-alt menu-table__delete--trash delete_trash" data-route="category"></i>
                </td>
            `)

            const deleteArticleElm = trElm.querySelector(".menu-table__delete--trash")
            deleteArticleElm.addEventListener("click",
                (eve) => deleteItem(eve, category._id, categoryTableRender))

            fragment.append(trElm)
        })

        categoriesTableElm.append(fragment)
    }
}

async function createNewCategory(eve) {
    eve.preventDefault()
    const form = eve.target

    if(form.checkValidity()) {
        const postBody = {
            title: form.title.value.trim(),
            name: form.name.value.trim()
        }

        try {
            const createResponse = await fetch(url + "/category",{
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    "content-type": "application/json"},
                body : JSON.stringify(postBody)
            })

            if(createResponse.ok) {
                await categoryTableRender()
                popUp("دسته بندی با موفقیت ایجاد شد")
                form.reset()
            }
            else {
                popUp("خطایی رخ داده است", false)
            }
        }
        catch (e) {
            popUp("مشکل در برقراری ارتباط", false)
            throw new Error(e)
        }
    }
    else {
        form.classList.add("was-validated")
    }
}
