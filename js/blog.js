// Handel blog topics table show & hidden
const topicsBtn = document.querySelector(".blog-body__topics__header--btn")
const topicContent = document.querySelector(".blog-body__topics__content")


topicsBtn.addEventListener("click", (eve) => {
    eve.target.classList.toggle("rotate-opposite")
    topicContent.classList.toggle("hidden")
})