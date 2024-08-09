import {$, url} from "../../../js/base.js";
import {adminProtection} from "../panel utilities/adminProtection.js";
import {deleteItem} from "../panel utilities/deleteItem.js";
import {changeDateToJalali} from "../../../js/utilities/utileFunction.js";
import {fetchData} from "../../../js/utilities/fetchData.js";
import {setSelectMainMenu} from "../panel utilities/setSelectMainMenu.js";
import {getToken} from "../../../js/utilities/localStorageManager.js";
import {confirmDialog, popUp} from "../../../js/component/sweetAlertCustome.js";


window.addEventListener("load", async () => {
    await adminProtection()
    await commentsTableRender()
    await setSelectMainMenu()
})

async function commentsTableRender() {
    const comments = await fetchData(url + "/comments")

    if (comments.length) {
        const commentsTableElm = $.querySelector(".comment-table-body")
        commentsTableElm.innerHTML = ""
        const fragment = $.createDocumentFragment()

        comments.forEach((comment, index) => {
            const trElm = $.createElement("tr")
            trElm.insertAdjacentHTML("beforeend", `
                <th scope="row">${index + 1}</th>
                <td>${comment.creator.name}</td>
                <td>${comment.course}</td>
                <td>${changeDateToJalali(comment.createdAt)}</td>
                <td>
                    <i class="fa-regular fa-eye comment-table__show edite_pen" data-route="comments"></i>
                </td>
                <td> 
                    <i class="fa-regular fa-comment-dots comment-table__answer ${comment.answer ? "answered" : "does-not-answer"}" data-route="comments"></i>
                </td>
                <td class="comment-table__edite">
                    <i class="fa-regular fa-check-circle comment-table__accept edite_pen" data-route="comments"></i>
                </td>
                <td class="comment-table__edite">
                    <i class="fa-regular fa-xmark-circle comment-table__reject delete_trash" data-route="comments"></i>
                </td>
                <td class="comment-table__edite">
                    <i class="fa-regular fa-pen comment-table__edite--pen edite_pen" data-route="comments"></i>
                </td>
                <td class="comment-table__delete">
                    <i class="fa-regular fa-trash-alt comment-table__delete--trash delete_trash" data-route="comments"></i>
                </td>
            `)

            const showCommentElm = trElm.querySelector(".comment-table__show")
            showCommentElm.addEventListener("click",
                () => showCommentContent(comment.body))

            const answerCommentElm = trElm.querySelector(".comment-table__answer")
            answerCommentElm.addEventListener("click",
                () => answerComment(comment._id))

            const acceptCommentElm = trElm.querySelector(".comment-table__accept")
            acceptCommentElm.addEventListener("click",
                (eve) => acceptAndRejectComment("accept", comment._id))

            const rejectCommentElm = trElm.querySelector(".comment-table__reject")
            rejectCommentElm.addEventListener("click",
                (eve) => acceptAndRejectComment("reject", comment._id))

            const deleteCommentElm = trElm.querySelector(".comment-table__delete--trash")
            deleteCommentElm.addEventListener("click",
                (eve) => deleteItem(eve, comment._id, commentsTableRender))


            fragment.append(trElm)
        })

        commentsTableElm.append(fragment)
    }
}


function showCommentContent(commentContent) {
    Swal.fire(commentContent)
}

async function answerComment(id) {
    await Swal.fire({
        title: "پاسخ به نظر",
        input: "textarea",
        inputPlaceholder: "نوشتن پاسخ ...",
        inputAttributes: {
            autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "ارسال",
        cancelButtonText: "انصراف",
        showLoaderOnConfirm: true,

        preConfirm: async answerText => {

            if(answerText) {
                try {
                    const response = await fetch(url + `/comments/answer/${id}`, {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${getToken()}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({body: answerText})
                    });

                    if (!response.ok) {
                        return Swal.showValidationMessage(`
                        ${JSON.stringify(await response.json())}
                    `);
                    }

                    popUp("پاسخ مورد نظر با موفقیت ارسال شد")
                    await commentsTableRender()
                }
                catch (error) {
                    Swal.showValidationMessage(`Request failed: ${error}`);
                }
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
    })
}

async function acceptAndRejectComment(operate, id) {
    const agreementText = operate === "accept" ? "تایید" : "رد"
    const isAgree = await confirmDialog(` آیا از ${agreementText} نظر مطمئن هستید ؟`, agreementText)

    if (isAgree) {
        const putResponse = await fetchData(url + `/comments/${operate}/${id}`, "PUT", {Authorization: `Bearer ${getToken()}`})

        if (putResponse) {
            popUp(`نظر با موفقیت ${agreementText} شد`)
            await commentsTableRender()
        }
    }

}