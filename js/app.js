
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
            slidesPerView : 4
        },
        768: {
            slidesPerView: 3
        },
        576: {
            slidesPerView: 2
        }
    }
})
