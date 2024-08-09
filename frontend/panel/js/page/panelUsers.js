import {$, url} from "../../../js/base.js";
import {adminProtection} from "../panel utilities/adminProtection.js";
import {fetchData} from "../../../js/utilities/fetchData.js";
import {confirmDialog, popUp} from "../../../js/component/sweetAlertCustome.js";
import {getToken} from "../../../js/utilities/localStorageManager.js";
import {deleteItem} from "../panel utilities/deleteItem.js";
import {detectRole} from "../../../js/utilities/utileFunction.js";


window.addEventListener("load", async () => {
    await adminProtection()
    await userTableRender()

    const userEditForm = $.querySelector(".user-edit__form")
    userEditForm.addEventListener("submit", userEditRequest)
})

// TODO: ساخت پیج نیشن برای نمایش کاربران
async function userTableRender() {
    const users = await fetchData(url + "/users", "GET", {Authorization: `Bearer ${getToken()}`})

    if (users.length) {
        const userTableElm = $.querySelector(".users-table-body")
        userTableElm.innerHTML = ""
        const fragment = $.createDocumentFragment()

        users.forEach((user, index) => {
            const trElm = $.createElement("tr")

            trElm.insertAdjacentHTML("beforeend", `
                <th scope="row">${index + 1}</th>
                <td>${user._id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${detectRole(user.role)}</td>
                <td class="user-table__edite">
                    <i class="fa-regular fa-pen user-table__edite--pen edite_pen"></i>
                </td>
                <td class="user-table__block">
                    <i class="fa-regular fa-ban user-table__block--ban cursor_pointer" data-route="users"></i>
                </td>
                <td class="user-table__delete">
                    <i class="fa-regular fa-trash-alt user-table__delete--trash delete_trash" data-route="users"></i>
                </td>
            `)

            const deleteElm = trElm.querySelector(".user-table__delete--trash")
            deleteElm.addEventListener("click",
                (eve) => deleteItem(eve, user._id, userTableRender))

            const editElm = trElm.querySelector(".user-table__edite--pen")
            editElm.addEventListener("click",
                () => displayUserInfoOnForm(user))

            const blockElm = trElm.querySelector(".user-table__block--ban")
            blockElm.addEventListener("click",
                () => blockUser(user))

            fragment.append(trElm)
        })

        userTableElm.append(fragment)
    }
}

function displayUserInfoOnForm(user) {
    const userEditForm = $.querySelector(".user-edit__form")

    userEditForm.name.value = user.name
    userEditForm.username.value = user.username
    userEditForm.email.value = user.email
    userEditForm.phone.value = user.phone

    $.documentElement.scrollTop = 0
}

async function userEditRequest(eve) {
    eve.preventDefault()
    const form = eve.target

    if (form.checkValidity()) {
        const putBody = {
            name: form.name.value.trim(),
            username: form.username.value.trim(),
            email: form.email.value.trim(),
            phone: form.phone.value.trim(),
            password: form.password.value.trim()
        }

        try {
            const editResponse = await fetch(url + "/users", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'content-type': 'application/json'
                },
                body: JSON.stringify(putBody)
            })
            console.log(putBody)
            if (editResponse.ok) {
                popUp("ویرایش با موفقیت انجام شد")
                form.reset()
                await userTableRender()
            }
            else {
                const errorMassage = await editResponse.json()
                let textMassage = ''
                console.log(errorMassage)
                errorMassage.message.forEach(item => {
                    textMassage += item.message + " "
                })
                popUp(textMassage, false)
            }
        } catch (e) {
            popUp("خطایی رخ داده است", false)
            throw new Error(e)
        }
    }
    else {
        form.classList.add("was-validated")
    }
}

async function blockUser(user) {
    const blockAgree = await confirmDialog("آیا از مسدود کردن کاربر مطمئن هستید",
        "مسدود کردن")

    if (blockAgree) {
        const putBody = {
            username: user.username,
            name: user.name,
            email: user.email,
            password: user.password,
            phone: user.phone
        }

        try {
            const blockResponse = await fetch(url + `/users/ban/${user._id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(putBody)
                })

            if (blockResponse.ok) {
                popUp("کاربر با موفقیت مسدود شد")
            } else {
                popUp("مسدود سازی انجام نشد", false)
            }
        } catch (e) {
            popUp("خطا در برقراری ارتباط", false)
        }
    }
}