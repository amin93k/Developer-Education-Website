import {url, $} from "../base.js";
import {getToken} from "../utilities/localStorageManager.js";
import {popUp} from "../component/sweetAlertCustome.js";
import {fetchData} from "../utilities/fetchData.js";
import {getParam} from "../utilities/utileFunction.js";
import {courseRegisterRequest} from "../utilities/courseRegisterRequest.js";

let courseId = null
let coursePrice = null

window.addEventListener("load", async () => {
    await setCourseInfo()

    const discountInputElm = $.querySelector(".register__discount--input")
    discountInputElm.addEventListener("change", checkDiscountValidity)

    const registerBtn = $.querySelector("#register-btn")
    const redirectRoute = `course.html?name=${getParam("name")}`
    registerBtn.addEventListener("click",
        () => courseRegisterRequest(coursePrice, courseId, redirectRoute))
})

async function setCourseInfo() {
    const courseUrl = url + "/courses/" + getParam("name")
    const course = await fetchData(courseUrl,
        "GET", {Authorization: `Bearer ${getToken()}`})

    if (course) {
        const courseNameElm = $.querySelector(".register__course-name")
        const coursePriceElm = $.querySelector("#main-price")
        courseNameElm.innerText = course.name
        courseId = course._id
        coursePrice = course.price

        const coursePriceElmContent = coursePrice === 0 ? "رایگان" : `${coursePrice.toLocaleString()}
                <svg class="price__currency" xmlns="http://www.w3.org/2000/svg" fill="none"
                     stroke-width="4" stroke="currentColor" viewBox="0 0 57.988 55.588">
                    <g transform="translate(-4013.907 176.406)">
                        <path d="M4068.117-146.108s3,8.61,1.066,11.035-4.839,1.921-11.736,1.921-10.552.731-12.355-1.6-2.288-7.952,2.547-9.55,7.877,3.5,7.877,9.231.668,5.874-.732,8.36c-1.858,2.6-10.917,3.915-10.917,3.915"></path>
                        <path d="M4069.56-152.461v3.969" transform="translate(0 -1.945)"></path>
                        <path d="M4069.56-152.461v3.969" transform="translate(-7 -1.945)"></path>
                        <path d="M4069.56-152.461v3.969" transform="translate(-7 -1.945)"></path>
                        <path d="M4027.592-128.435s5.376,4.632,8.167,3.124a5.918,5.918,0,0,0,3.034-6.158c-.446-4.24-4.144-5.625-6.783-4.418s-4.016,5.866-4.016,5.866-1.857,4.934-6.114,4.934-4.928-2.6-5-4.934-.98-19.76-.98-19.76"></path>
                        <path d="M4069.56-152.461v3.969" transform="translate(-44 -23.945)"></path>
                        <path d="M4017.55-171.009s-3.525,12.094,2.454,15.619c5.623,3.035,12.585-.714,12.585-.714s3.473-2.1,3.436-4.864c-.089-3.883-1.651-12.986-1.651-12.986"></path>
                    </g>
                </svg>`

        coursePriceElm.insertAdjacentHTML("beforeend", `${coursePriceElmContent}`)

        calcFinalPrice(course.discount)
    }
}

async function checkDiscountValidity(eve) {
    const discountText = eve.target.value.trim()

    if (discountText) {
        try {
            const res = await fetch(url + "/offs/" + discountText, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({course: courseId})
            })

            if (res.ok) {
                const discountData = await res.json()
                calcFinalPrice(discountData.percent)
                console.log(discountData)
            } else if (res.status === 409) {
                popUp("مهلت استفاده از کد تخفیف تمام شده", false)
            } else if (res.status === 404) {
                popUp("کد تخفیف نامعتبر است", false)
            }
        } catch (e) {
            popUp("خطا در برقراری ارتباط", false)
        }
    }
}

function calcFinalPrice(percent) {
    let mountOfDiscount = 0
    let finalPrice

    if (percent > 0) {
        const discountPriceElm = $.querySelector("#discount-price")
        mountOfDiscount = coursePrice * parseInt(percent) / 100

        discountPriceElm.innerHTML = `
            ${mountOfDiscount.toLocaleString()}
            <svg class="price__currency" xmlns="http://www.w3.org/2000/svg" fill="none"
             stroke-width="4" stroke="currentColor" viewBox="0 0 57.988 55.588">
            <g transform="translate(-4013.907 176.406)">
                <path d="M4068.117-146.108s3,8.61,1.066,11.035-4.839,1.921-11.736,1.921-10.552.731-12.355-1.6-2.288-7.952,2.547-9.55,7.877,3.5,7.877,9.231.668,5.874-.732,8.36c-1.858,2.6-10.917,3.915-10.917,3.915"></path>
                <path d="M4069.56-152.461v3.969" transform="translate(0 -1.945)"></path>
                <path d="M4069.56-152.461v3.969" transform="translate(-7 -1.945)"></path>
                <path d="M4069.56-152.461v3.969" transform="translate(-7 -1.945)"></path>
                <path d="M4027.592-128.435s5.376,4.632,8.167,3.124a5.918,5.918,0,0,0,3.034-6.158c-.446-4.24-4.144-5.625-6.783-4.418s-4.016,5.866-4.016,5.866-1.857,4.934-6.114,4.934-4.928-2.6-5-4.934-.98-19.76-.98-19.76"></path>
                <path d="M4069.56-152.461v3.969" transform="translate(-44 -23.945)"></path>
                <path d="M4017.55-171.009s-3.525,12.094,2.454,15.619c5.623,3.035,12.585-.714,12.585-.714s3.473-2.1,3.436-4.864c-.089-3.883-1.651-12.986-1.651-12.986"></path>
            </g>
        </svg>
        `
    }
    finalPrice = coursePrice - mountOfDiscount

    const finalPriceElm = $.querySelector("#final-price")
    finalPriceElm.innerHTML = `
            ${finalPrice.toLocaleString()}
            <svg class="price__currency" xmlns="http://www.w3.org/2000/svg" fill="none"
                 stroke-width="4" stroke="currentColor" viewBox="0 0 57.988 55.588">
                <g transform="translate(-4013.907 176.406)">
                    <path d="M4068.117-146.108s3,8.61,1.066,11.035-4.839,1.921-11.736,1.921-10.552.731-12.355-1.6-2.288-7.952,2.547-9.55,7.877,3.5,7.877,9.231.668,5.874-.732,8.36c-1.858,2.6-10.917,3.915-10.917,3.915"></path>
                    <path d="M4069.56-152.461v3.969" transform="translate(0 -1.945)"></path>
                    <path d="M4069.56-152.461v3.969" transform="translate(-7 -1.945)"></path>
                    <path d="M4069.56-152.461v3.969" transform="translate(-7 -1.945)"></path>
                    <path d="M4027.592-128.435s5.376,4.632,8.167,3.124a5.918,5.918,0,0,0,3.034-6.158c-.446-4.24-4.144-5.625-6.783-4.418s-4.016,5.866-4.016,5.866-1.857,4.934-6.114,4.934-4.928-2.6-5-4.934-.98-19.76-.98-19.76"></path>
                    <path d="M4069.56-152.461v3.969" transform="translate(-44 -23.945)"></path>
                    <path d="M4017.55-171.009s-3.525,12.094,2.454,15.619c5.623,3.035,12.585-.714,12.585-.714s3.473-2.1,3.436-4.864c-.089-3.883-1.651-12.986-1.651-12.986"></path>
                </g>
            </svg>
        `
}

