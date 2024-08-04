import {$, url} from "../../../js/base.js";
import {adminProtection} from "../panel utilities/adminProtection.js";
import {fetchData} from "../../../js/utilities/fetchData.js";
import {confirmDialog, popUp} from "../../../js/component/sweetAlertCustome.js";
import {getToken} from "../../../js/utilities/localStorageManager.js";


window.addEventListener("load", async () => {
    await adminProtection()

    await Promise.all([
        fetchData(url + "/category")
    ]).then(([categories]) => {
        setCoursesCategories(categories)
    })

    updateCourseTable()

    const newCourseForm = $.querySelector(".new-course__form")
    newCourseForm.addEventListener("submit", createNewCourse)
})


function setCoursesCategories(categories) {
    if(categories) {
        const categoriesSelectElm = $.querySelector(".course-category__select")

        categories.forEach(category => {
            const optionElm = $.createElement("option")
            optionElm.setAttribute("value", `${category._id}`)
            optionElm.innerText = `${category.title}`

            categoriesSelectElm.insertAdjacentElement("beforeend", optionElm)
        })
    }
}

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
                updateCourseTable()
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

async function updateCourseTable() {
    const coursesResponse = await fetchData(url + "/courses")
    if(coursesResponse) {
        const coursesTable = $.querySelector(".course-table-body")
        coursesTable.innerHTML = ""
        coursesTable.append(renderCoursesTable(coursesResponse))
    }
}

function renderCoursesTable(courses) {
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
                <i class="fa-regular fa-pen course-table__edite--pen" ></i>
            </td>
            <td class="course-table__delete">
                <i class="fa-regular fa-trash-alt course-table__delete--trash"></i>
            </td>
        `)

        const editeBtn = trElm.querySelector(".course-table__edite--pen")
        const deleteBtn = trElm.querySelector(".course-table__delete--trash")

        editeBtn.addEventListener("click", () => editeCourse(course._id))
        deleteBtn.addEventListener("click", () => deleteCourse(course._id))

        fragment.append(trElm)
    })

    return fragment
}

async function deleteCourse(courseId) {
    const isAgreeToDelete = await confirmDialog("آیا از حذف دوره مطمئن هستید؟", "حذف")

    if(isAgreeToDelete) {
        try {
            const deleteResponse = await fetchData(url + `/courses/${courseId}`, "DELETE", {authorization: `Bearer ${getToken()}`})

            if(deleteResponse._id === courseId) {
                popUp("حذف دوره موفق")
                updateCourseTable()
            }
            else {
                popUp("حذف انجام نشد", false)
            }
        }
        catch (e) {
            popUp("حذف انجام نشد", false)
            throw new Error(e)
        }
    }
}

function editeCourse() {
    console.log("edite")
}
