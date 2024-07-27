import {$, url} from "../base.js";
import {fetchData} from "../utilities/fetchData.js";
import {getUserInfo} from "../utilities/userRegister.js";
import "./globalSearch.js"

window.addEventListener("load", () => {
    renderNavLinks()
    showUserInTopNav()
})


function renderNavLinks() {
    const navbar = $.querySelector(".header__nav")
    let fragment = $.createDocumentFragment()

    fetchData(url + "/menus").then(links => {
        links.forEach(menu => {
            const hasSubmenu = menu.submenus.length

            let newMenuElm = $.createElement("li")
            newMenuElm.className = "header__nav--menu nav-item"
            newMenuElm.innerHTML += `

                    <a class="header__nav__menu--title nav-link" href="category.html?cat=${menu.href}">${menu.title}
                    <i class="fa-solid fa-chevron-down"></i>
                    </a>
                    <ul class="header__nav--submenu p-3 border-light-subtle rounded-4">
                    </ul>
                    `

            if (hasSubmenu) {
                menu.submenus.forEach(submenu => {
                    newMenuElm.lastElementChild.innerHTML += `
                         <li class="my-3 header__nav--submenu--li">
                            <a class="header__nav--submenu-link" href= course.html?name=${submenu.href}>
                                ${submenu.title}
                            </a>
                         </li>
                `
                })
            }else {
                newMenuElm.lastElementChild.remove()
            }

            fragment.append( newMenuElm)
        })

        navbar.append(fragment)

        showSubmenu()
    })
}

function showSubmenu() {
    const screenWidth = window.outerWidth
    const navbarMenu = $.querySelectorAll(".header__nav--menu")

    navbarMenu.forEach(menu => {
        const menuTitle = menu.querySelector(".header__nav__menu--title")

        menuTitle.addEventListener("click", (eve) => {
            const submenuElement = menu.querySelector(".header__nav--submenu")

            if (screenWidth < 991) {
                // prevent to change location
                eve.preventDefault()
                submenuElement.classList.toggle("show")
            }
        })
    })

}

async function showUserInTopNav() {
    const userBtnInNav = document.querySelector(".header__user")

    try {
        const userInfo = await getUserInfo()

        if(userInfo.message !== "توکن نامعتبر است") {
            // TODO: change href to user page
            userBtnInNav.href = 'index.html'
            userBtnInNav.querySelector(".header__user--text").textContent = userInfo.username
        }
    }
    catch (e) {
        throw new Error(e)
    }
}