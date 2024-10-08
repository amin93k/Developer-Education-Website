import {$, url} from "../../../js/base.js";
import {adminProtection} from "../panel utilities/adminProtection.js";
import {fetchData} from "../../../js/utilities/fetchData.js";
import {popUp} from "../../../js/component/sweetAlertCustome.js";
import {getToken} from "../../../js/utilities/localStorageManager.js";
import {deleteItem} from "../panel utilities/deleteItem.js";
import {changeDateToJalali} from "../../../js/utilities/utileFunction.js";



window.addEventListener("load", async () => {
    const loaderElm = $.querySelector(".loader")
    const bodyElm = $.querySelector("body")

    await adminProtection()
    await discountTableRender()
    await setSelectCourseList()

    const newDiscountForm = $.querySelector(".new-discount__form")
    newDiscountForm.addEventListener("submit", createNewDiscount)

    bodyElm.classList.add("onload")
    loaderElm.classList.add("hidden")
})



async function discountTableRender() {
    const discounts = await fetchData(url + "/offs", "GET",
        {Authorization: `Bearer ${getToken()}`})

    if (discounts.length) {
        const discountsTableElm = $.querySelector(".discount-table-body")
        discountsTableElm.innerHTML = ""
        const fragment = $.createDocumentFragment()

        discounts.forEach((discount, index) => {
            const trElm = $.createElement("tr")
            trElm.insertAdjacentHTML("beforeend", `
                <th scope="row">${index + 1}</th>
                <td>${discount.code}</td>
                <td>${discount.percent}</td>
                <td>${discount.max}</td>
                <td>${discount.uses}</td>
                <td>${discount.creator}</td>
                <td>${changeDateToJalali(discount.createdAt)}</td>
                <td class="discount-table__edite">
                    <i class="fa-regular fa-pen discount-table__edite--pen edite_pen data-route=" data-route="articles" data-route="offs"></i>
                </td>
                <td class="discount-table__delete">
                    <i class="fa-regular fa-trash-alt discount-table__delete--trash delete_trash" data-route="offs"></i>
                </td>
            `)

            const deleteDiscountElm = trElm.querySelector(".discount-table__delete--trash ")
            deleteDiscountElm.addEventListener("click",
                (eve) => deleteItem(eve, discount._id, discountTableRender))

            fragment.append(trElm)
        })

        discountsTableElm.append(fragment)
    }
}

async function createNewDiscount(eve) {
    eve.preventDefault()
    const form = eve.target
    const isDiscountAllCourses = form.course.value.trim() === "all"

    if(isDiscountAllCourses) {
        form.code.value = "اعمال بر روی همه ی دوره ها"
    }

    if(form.checkValidity()) {
        let postBody = null
        let postRoute = null

        if(isDiscountAllCourses) {
            postBody = { discount: form.percent.value.trim() }
            postRoute = "/offs/all"
        }
        else {
            postBody = {
                code: form.code.value.trim(),
                percent: form.percent.value.trim(),
                course: form.course.value.trim(),
                max: form.max.value.trim()
            }
            postRoute = "/offs"
        }

        try {
            const createResponse = await fetch(url + postRoute,{
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    "content-type": "application/json"},
                body : JSON.stringify(postBody)
            })

            if(createResponse.ok) {
                await discountTableRender()
                popUp("تخفیف با موفقیت ایجاد شد")
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

async function setSelectCourseList() {
    const courses = await fetchData(url + "/courses")

    if (courses.length) {
        const selectElm = $.querySelector(".course__select")

        courses.filter(item => item.price > 0).forEach(course => {
            const optionElm = $.createElement("option")
            optionElm.setAttribute("value", course._id)
            optionElm.innerText = course.name
            selectElm.insertAdjacentElement("beforeend", optionElm)
        })
    }
}