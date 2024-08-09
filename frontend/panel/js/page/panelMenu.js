import {$, url} from "../../../js/base.js";
import {adminProtection} from "../panel utilities/adminProtection.js";
import {fetchData} from "../../../js/utilities/fetchData.js";
import {popUp} from "../../../js/component/sweetAlertCustome.js";
import {getToken} from "../../../js/utilities/localStorageManager.js";
import {deleteItem} from "../panel utilities/deleteItem.js";
import {setSelectMainMenu} from "../panel utilities/setSelectMainMenu.js";



window.addEventListener("load", async () => {
    await adminProtection()
    await menuTableRender()
    await setSelectMainMenu()

    const newMenuForm = $.querySelector(".new-menu__form")
    newMenuForm.addEventListener("submit", createNewMenu)
})


async function menuTableRender() {
    const menus = await fetchData(url + "/menus/all")

    if (menus.length) {
        const menuTableElm = $.querySelector(".menu-table-body")
        menuTableElm.innerHTML = ""
        const fragment = $.createDocumentFragment()

        menus.forEach((menu, index) => {
                const trElm = $.createElement("tr")
                trElm.insertAdjacentHTML("beforeend", `
                <th scope="row">${index + 1}</th>
                <td>${menu.title}</td>
                <td>${menu.href}</td>
                <td>${menu.parent ? menu.parent.title : "اصلی"}</td>
                <td class="menu-table__delete">
                    <i class="fa-regular fa-trash-alt menu-table__delete--trash delete_trash" data-route="menus"></i>
                </td>
            `)
                const deleteMenuIcon = trElm.querySelector(".menu-table__delete--trash")
                deleteMenuIcon.addEventListener("click",
                    (eve) => deleteItem(eve, menu._id, menuTableRender))

                fragment.append(trElm)
            }
        )

        menuTableElm.append(fragment)
    }

}

async function createNewMenu(eve) {
    eve.preventDefault()
    const form = eve.target

    if(form.checkValidity()) {
        const postBody = {
            title: form.name.value.trim(),
            href: form.href.value.trim(),
            // parent: form.category.value.trim()
            parent: "66b4bd71cc76f0ac86099c52"
        }

        try {
            const createResponse = await fetch(url + "/menus",{
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    "content-type": "application/json"},
                body : JSON.stringify(postBody)
            })

            if(createResponse.ok) {
                popUp("منو با موفقیت ایجاد شد")
                form.reset()
                await menuTableRender()
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
