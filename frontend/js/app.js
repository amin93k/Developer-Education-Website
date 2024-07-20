import {$, url} from './base.js'
import {fetchData} from "./utilities/fetchData.js";
import {courseCardRender} from "./utilities/courseCardRender.js";
import {blogCardRender} from "./utilities/blogCardRender.js";
// import Swiper from "../vendor/SwiperSlider/swiper.js";

// // swiper slider configuration
// const swiper = new Swiper(".swiper-container", {
//         slidesPerView: 1,
//         spaceBetween: 30,
//         freeMode: true,
//         autoplay: {
//             pauseOnMouseEnter: true,
//             disableOnInteraction: false
//         },
//         loop: true,
//         breakpoints: {
//             991: {
//                 slidesPerView: 4
//             },
//             768: {
//                 slidesPerView: 3
//             },
//             576: {
//                 slidesPerView: 2
//             }
//         }
//     })


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

    const interval = setInterval(() => {
        if (counter > number) {
            clearInterval(interval)

        } else {
            element.innerText = counter.toLocaleString()
            counter += step
        }
    }, 1)
}

// Render new course section
const newCoursesSection = $.querySelector(".courses-wrapper")

fetchData(url + "/courses", "GET").then(courses => {
    const classes = "col-lg-3 col-md-4 col-sm-6 mb-3"

    newCoursesSection.append(courseCardRender(courses, classes, 4))
})


// Render popular slider
const swiperWrapper = $.querySelector(".swiper-wrapper")

fetchData(url + "/courses/popular", "GET").then(courses => {
    const classes = "swiper-slide"

    swiperWrapper.append(courseCardRender(courses, classes))

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
})


// Render blog section
const blogWrapper = $.querySelector(".blog-wrapper")

fetchData(url + "/articles").then(blogs => {
    const classes = "col-lg-3 col-md-4 col-sm-6 mb-3"

    blogWrapper.append(blogCardRender(blogs, classes, 4))

})