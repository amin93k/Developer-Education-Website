import {$, url} from "../base.js";
import {showUserInTopNav} from "../utilities/showUserSignIn.js";

async function getNavLinks() {

    const res = await fetch(url + "/menus")
    const menuLinks = await res.json()

    return menuLinks ? menuLinks : false
}

function renderNavLinks() {
    const navbar = $.querySelector(".header__nav")
    let fragment = $.createDocumentFragment()

    getNavLinks().then(links => {
        links.forEach(menu => {

            let newMenuElm = $.createElement("li")
            newMenuElm.className = "header__nav--menu nav-item dropdown"
            newMenuElm.innerHTML += `

                    <a class="header__nav__menu--title nav-link dropdown-toggle" href="#" role="button"
                       data-bs-toggle="dropdown" aria-expanded="false">${menu.title}</a>
                    <ul class="header__nav--submenu dropdown-menu p-3 mt-4 border-light-subtle rounded-4">
                    </ul>
                    `

            menu.submenus.forEach(submenu => {
                newMenuElm.lastElementChild.innerHTML += `
                         <li class="my-2 header__nav--submenu--li">
                            <a class="header__nav--submenu-link dropdown-item" href= ${submenu.href}>
                                ${submenu.title}
                            </a>
                         </li>
                `
            })

            fragment.append( newMenuElm)
        })

        navbar.append(fragment)
    })
}

renderNavLinks()

// If user is sign in display username in navbar
showUserInTopNav()