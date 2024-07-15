const courseIntroduction = document.querySelector(".course-introduction")
const accordionShowBtn = document.querySelector(".accordion-btn--show .accordion-btn__text")
const accordionHiddenBtn = document.querySelector(".accordion-btn--hide")

accordionShowBtn.addEventListener("click", eve => {
    courseIntroduction.classList.add("active")
    eve.target.parentElement.classList.add("hidden")
})

accordionHiddenBtn.addEventListener("click", eve => {
    courseIntroduction.classList.remove("active")
    accordionShowBtn.parentElement.classList.remove("hidden")
})