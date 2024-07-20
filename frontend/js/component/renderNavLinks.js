import {$, url} from "../base.js";
import {showUserInTopNav} from "../utilities/showUserSignIn.js";
import {fetchData} from "../utilities/fetchData.js";


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
                            <a class="header__nav--submenu-link" href= ${submenu.href}>
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

    // If user is sign in display username in navbar
    showUserInTopNav()
}

function showSubmenu() {
    const screenWidth = window.outerWidth
    const navbarMenu = $.querySelectorAll(".header__nav--menu")

    navbarMenu.forEach(menu => {
        const menuTitle = menu.querySelector(".header__nav__menu--title")

        menuTitle.addEventListener("click", (eve) => {
            // prevent to change location
            eve.preventDefault()
            const submenuElement = menu.querySelector(".header__nav--submenu")

            if (screenWidth < 991) {
                submenuElement.classList.toggle("show")
            }
        })
    })

}


renderNavLinks()