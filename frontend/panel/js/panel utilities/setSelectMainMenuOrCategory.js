import {fetchData} from "../../../js/utilities/fetchData.js";
import {$, url} from "../../../js/base.js";

async function setSelectMainMenuOrCategory(type) {
    const route = type === "menu" ? "/menus/all" : "/category"
    const Menus = await fetchData(url + route)

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

export {setSelectMainMenuOrCategory};