import {$} from "../base.js"

const setupGlobalSearch = () => {
    window.addEventListener("load", () =>  {
        const search = $.querySelectorAll(".header__search")
        const searchIcon = $.querySelectorAll(".header__search--icon")
        // set searching event on both search box on desktop and mobile
        for(let i = 0; i < 2; i++) {
            search[i].addEventListener("keypress", globalSearch)
            searchIcon[i].addEventListener("click", globalSearch)
        }
    })
}

function globalSearch(eve) {
    const isClickIcon = eve.target.className.includes("icon")
    let searchValue = ""

    if(isClickIcon) {
        searchValue = eve.target.parentElement.previousElementSibling.value.trim()
        window.location.href = `category.html?search=${searchValue}`
    }
    else {
       if(eve.key === "Enter") {
           searchValue = eve.target.value
           window.location.href = `category.html?search=${searchValue}`
       }
    }
}

setupGlobalSearch()