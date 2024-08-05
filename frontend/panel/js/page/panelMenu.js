import {$, url} from "../../../js/base.js";
import {adminProtection} from "../panel utilities/adminProtection.js";
import {fetchData} from "../../../js/utilities/fetchData.js";
import {popUp} from "../../../js/component/sweetAlertCustome.js";
import {getToken} from "../../../js/utilities/localStorageManager.js";
import {deleteItem, setCoursesCategories} from "./panelCourses.js";


window.addEventListener("load", async () => {
    await adminProtection()
    await updateMenuTable()
    await setCoursesCategories()

    const newMenuForm = $.querySelector(".new-menu__form")
    newMenuForm.addEventListener("submit", createNewMenu)
})


async function updateMenuTable() {
    const menuTableElm = $.querySelector(".menu-table-body")
    menuTableElm.innerHTML = ""

    const menuResponse = await fetchData(url + "/menus/all")

    menuTableElm.append(menuTableRender(menuResponse))
}

function menuTableRender(menus) {

    if (menus.length) {
        const fragment = $.createDocumentFragment()

        menus.forEach((menu, index) => {
                const trElm = $.createElement("tr")
                trElm.insertAdjacentHTML("beforeend", `
                <th scope="row">${index}</th>
                <td>${menu.title}</td>
                <td>${menu.href}</td>
                <td>${menu.parent ? menu.parent.title : "اصلی"}</td>
                <td class="menu-table__delete">
                    <i class="fa-regular fa-trash-alt menu-table__delete--trash" data-route="menus"></i>
                </td>
            `)
                const deleteMenuIcon = trElm.querySelector(".menu-table__delete--trash")
                deleteMenuIcon.addEventListener("click",
                    (eve) => deleteItem(eve, menu._id, updateMenuTable))

                fragment.append(trElm)
            }
        )

        return fragment
    }

}

async function createNewMenu(eve) {
    eve.preventDefault()
    const form = eve.target

    if(form.checkValidity()) {
        const postBody = {
            title: form.name.value.trim(),
            href: form.href.value.trim(),
            parent: form.category.value
        }
        console.log(postBody)
        try {
            const createResponse = await fetchData(url + "/menus","POST",
                {Authorization: `Bearer ${getToken()}`, "content-tye": "application/json"},
                postBody)

            if(createResponse.href) {
                popUp("منو با موفقیت ایجاد شد")
                form.reset()
                await updateMenuTable()
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
