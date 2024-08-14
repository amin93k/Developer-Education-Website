import {$, url} from "../../../js/base.js";
import {adminProtection} from "../panel utilities/adminProtection.js";
import {deleteItem} from "../panel utilities/deleteItem.js";
import {fetchData} from "../../../js/utilities/fetchData.js";
import {popUp} from "../../../js/component/sweetAlertCustome.js";
import {getToken} from "../../../js/utilities/localStorageManager.js";
import {setSelectMainMenu} from "../panel utilities/setSelectMainMenu.js";


window.addEventListener("load", async () => {
    const newCourseForm = $.querySelector(".new-course__form")

    if (newCourseForm) {
        const loaderElm = $.querySelector(".loader")
        const bodyElm = $.querySelector("body")

        await adminProtection()
        await renderCoursesTable()
        await setSelectMainMenu()
        newCourseForm.addEventListener("submit", createNewCourse)

        bodyElm.classList.add("onload")
        loaderElm.classList.add("hidden")
    }
})


async function createNewCourse(eve) {
    eve.preventDefault()
    const form = eve.target

    if(form.checkValidity()) {
        const formData = new FormData()

        formData.append("name",form.name.value.trim())
        formData.append("description",form.description.value.trim())
        formData.append("cover",form.cover.files[0])
        formData.append("shortName",form.shortName.value.trim())
        formData.append("price",parseInt(form.price.value))
        formData.append("status",form.status.value)
        formData.append("categoryID",form.category.value)

        try {
            const res = await fetch(url + "/courses", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getToken()}`
                },
                body: formData
            })

            if(res.ok) {
                popUp("دوره با موفقیت ایجاد شد")
                form.reset()
                await renderCoursesTable()
            }
            else {
                popUp("ایجاد دوره ناموفق", false)
            }
        }
        catch (e) {
            popUp("ایجاد دوره ناموفق", false)
            throw new Error(e)
        }
    }
    else {
        form.classList.add("was-validated")
    }
}

async function renderCoursesTable() {
    const courses = await fetchData(url + "/courses")

    if(courses.length){
        const coursesTableElm = $.querySelector(".course-table-body")
        coursesTableElm.innerHTML = ""
        const fragment = $.createDocumentFragment()

        courses.forEach((course, index) => {
            const trElm = $.createElement("tr")
                trElm.insertAdjacentHTML("beforeend", `
                <th scope="row">${index + 1}</th>
                <td>${course._id}</td>
                <td>${course.name}</td>
                <td>${course.price === 0 ? "رایگان" : course.price.toLocaleString()}</td>
                <td>${course.isComplete ? "تکمیل شده" : "در حال برگزاری"}</td>
                <td class="course-table__edite">
                    <i class="fa-regular fa-pen course-table__edite--pen edite_pen" data-route="courses"></i>
                </td>
                <td class="course-table__delete">
                    <i class="fa-regular fa-trash-alt course-table__delete--trash delete_trash" data-route="courses"></i>
                </td>
        `)

            const editeBtn = trElm.querySelector(".course-table__edite--pen")
            const deleteBtn = trElm.querySelector(".course-table__delete--trash")

            editeBtn.addEventListener("click",
                (eve) => editeCourse(eve, course._id))
            deleteBtn.addEventListener("click",
                (eve) => deleteItem(eve, course._id, renderCoursesTable))

            fragment.append(trElm)
        })

        coursesTableElm.append(fragment)
    }
}

function editeCourse() {
    console.log("edite")
}

