import {$, url} from "../base.js";
import {fetchData} from "../utilities/fetchData.js";
import {getUserInfo} from "../utilities/userRegister.js";
import "./globalSearch.js"
import {logout} from "../utilities/logout.js";

window.addEventListener("load", async () => {
    renderNavLinks()
    await showUserInTopNav()
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
            } else {
                newMenuElm.lastElementChild.remove()
            }

            fragment.append(newMenuElm)
        })

        navbar.append(fragment)

        // showSubmenu()
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

    const userInfo = await getUserInfo()

    if (userInfo && userInfo.message !== "توکن نامعتبر است") {
        // change user sign button style
        userBtnInNav.removeAttribute("href")
        userBtnInNav.querySelector(".header__user--text").remove()
        userBtnInNav.insertAdjacentHTML("afterbegin", `
        <i class= "fa-regular fa-user"></i>
        `)
        // show sub contextmenu
        userBtnInNav.insertAdjacentHTML("afterend", `
            <div class="user-contexmenu">
                <div class="user-contexmenu__name px-4">
                    <i class="fa-regular fa-user"></i>
                    <span class="user-contexmenu__name--text">${userInfo.name}</span>
                </div>
                ${userInfo.role === "ADMIN" ? `
                    <a href="Panel/panel-home.html" class="user-contexmenu__title px-4">
                        <i class="fa-regular fa-home"></i>
                        <span class="user-contexmenu__title--text">پنل ادمین</span>
                    </a>
                `: ""}
                <div class="user-contexmenu__logout px-4">
                    <i class="fa-regular fa-sign-out"></i>
                    <span class="user-contexmenu__title--text">خروج</span>
                </div>
            </div>
        `)

        const logoutBtn = $.querySelector(".user-contexmenu__logout")

        userBtnInNav.addEventListener("click", showHiddenContextMenu)
        logoutBtn.addEventListener("click", logout)
    }
}


function showHiddenContextMenu() {
    $.querySelector(".user-contexmenu").classList.toggle("show")
}