import {url, $} from "../base.js"
import {fetchData} from "../utilities/fetchData.js";
import {changeDateToJalali, getParam, detectRole} from "../utilities/utileFunction.js";
import {getUserInfo} from "../utilities/userRegister.js";
import {popUp} from "./sweetAlertCustome.js";
import {getToken} from "../utilities/localStorageManager.js";

// TODO: نشان دادن کامنت ها برای دوره خودشان و نمایش ندادن کامنت های تایید نشده
let userCache = null
let commentPerLoad = 5
let currentDisplayComment = 1

window.addEventListener("load", async () => {
    fetchComment()

    const showMoreBtn = $.querySelector(".show-more")
    showMoreBtn.addEventListener("click", loadMoreComment)

    await userInfo()

    const postCommentForm = $.querySelector(".create-comment")
    postCommentForm.addEventListener("submit", postComment)
    const creator = $.querySelector("#creator")

    if (userCache) {
        creator.innerText = userCache
    }
})

function fetchComment() {
    fetchData(url + "/comments").then(comments => {

        if (comments) {
            const visibleComments = [...comments].slice((currentDisplayComment - 1) * commentPerLoad, currentDisplayComment * commentPerLoad)

            visibleComments.forEach(comment => {
                addComment(comment)
            })

            if (currentDisplayComment * commentPerLoad > comments.length) {
                hiddenShowMoreBtn()
            }
        } else {
            hiddenShowMoreBtn()
        }
    })

}

function addComment(comment) {
    const commentBox = $.querySelector(".show-more")
    const answerContent = comment.answerContent
    const topLevelComment = renderComment(comment)
    commentBox.insertAdjacentElement("beforebegin", topLevelComment)

    if (answerContent) {
        topLevelComment.append(renderComment(answerContent))
    }
}

function renderComment({creator, createdAt, body, isAnswer}) {
    const teacherBorderColor = creator.role === "ADMIN" ? "teacher" : ""
    const commentBoxClass = isAnswer ? "answer-container" : "user-comment"
    const newComment = $.createElement("div")
    newComment.className = commentBoxClass

    newComment.insertAdjacentHTML("beforeend", `
        <div class=${commentBoxClass}>
            <div class="comment-creator">
                <img src="images/user/751341daa89b19c74097aad28ad3ee9e.png" alt="user" class="comment-creator__image ${teacherBorderColor}">
                <div class="comment-creator__content">
                    <span class="comment-creator__content--name">
                        <span class="comment-creator--name">${creator.name}</span>
                        | ${detectRole(creator.role)}
                    </span>
                    <span class="comment-creator__content--text">${changeDateToJalali(createdAt)}</span>
                </div>
            </div>
            <div class="user-comment__content">
                <p class="user-comment__content--text">${body}</p>
            </div>
        </div>
    `)

    return newComment
}

function loadMoreComment() {
    currentDisplayComment += 1
    fetchComment()
}

function hiddenShowMoreBtn() {
    const showMoreBtn = $.querySelector(".show-more")
    showMoreBtn.classList.add("hidden")
}


async function postComment(eve) {
    eve.preventDefault()

    if (userCache) {

        const text = eve.target['comment-text'].value.trim()
        const postBody = {
            body: text,
            courseShortName: getParam("name"),
            score: 5
        }

        if (text) {
            await fetchData(url + "/comments", "POST", {
                Authorization: `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            }, postBody).then(res => {
                if (res) {
                    popUp("ارسال موفق")
                    eve.target['comment-text'].value = ""
                } else {
                    popUp("ارسال ناموفق", false)
                }
            })
        }
    } else {
        popUp("ابتدا وارد سایت شوید!", false)
    }

}

async function userInfo() {
    const userInfo = await getUserInfo()

    if (userInfo && userInfo.message !== "توکن نامعتبر است") {
        userCache = userInfo.username
    }

}