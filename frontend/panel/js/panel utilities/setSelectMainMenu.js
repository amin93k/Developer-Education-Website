import {fetchData} from "../../../js/utilities/fetchData.js";
import {$, url} from "../../../js/base.js";

async function setSelectMainMenu() {
    const Menus = await fetchData(url + "/menus/all")

    if (Menus.length) {
        const SelectElm = $.querySelector(".course-category__select")

        Menus.forEach(menu => {

            if(!menu.parent) {
                const optionElm = $.createElement("option")
                optionElm.setAttribute("value", `${menu._id}`)
                optionElm.innerText = `${menu.title}`

                SelectElm.insertAdjacentElement("beforeend", optionElm)
            }
        })
    }
}

export {setSelectMainMenu};