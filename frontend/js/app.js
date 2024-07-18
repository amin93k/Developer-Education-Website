import { $ } from './base.js'

// swiper slider configuration
const swiper = new Swiper(".swiper-container", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    autoplay: {
        pauseOnMouseEnter: true,
        disableOnInteraction: false
    },
    loop: true,
    breakpoints: {
        991: {
            slidesPerView: 4
        },
        768: {
            slidesPerView: 3
        },
        576: {
            slidesPerView: 2
        }
    }
})


// Animate the information section of the home section
const homeTitle = $.querySelector(".home__content--title")
const haveUser = $.getElementById("have-user")
const haveCourses = $.getElementById("have-courses")
const haveMinute = $.getElementById("have-minute")

window.addEventListener("load", () => {
    typeWriter(homeTitle, 0)
    numerator(1657, haveUser)
    numerator(23, haveCourses)
    numerator(2647, haveMinute)
})

function typeWriter(elem, num) {
    const title = "مرکز آموزش برنامه نویسی"
    let index = num

    if (index < title.length) {
        setTimeout(() => {
            elem.textContent += title[index]
            index++

            typeWriter(elem, index)
        }, 100)
    }
}

function numerator(number, element) {
    let counter = 0
    const step = number < 200 ? 1 : 4
    // TODO: add comma to the number
    const interval = setInterval(() => {
        if (counter > number) {
            clearInterval(interval)
        }

        element.textContent = counter
        counter += step
    }, 1)
}
