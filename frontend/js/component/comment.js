import {url, $} from "../base.js"
import {fetchData} from "../utilities/fetchData.js";
import {changeDateToJalali, getParam} from "../utilities/utileFunction.js";
import {getUserInfo} from "../utilities/userRegister.js";
import {popUp} from "./sweetAlertCustome.js";
import {getToken} from "../utilities/localStorageManager.js";

//TODO: استفاده از دکمه نمایش بیشتر در انتهای بخش کامنت ها

let userCache = null

window.addEventListener("load",  async () => {
    fetchData(url + "/comments").then(comments => {
        comments.forEach(comment => {
            addComment(comment)
        })
    })

    await userInfo()

    const postCommentForm = $.querySelector(".create-comment")
    postCommentForm.addEventListener("submit", postComment)
    const creator = $.querySelector("#creator")

    if(userCache) {
        creator.innerText = userCache
    }
})


function addComment(comment) {
    const commentBox = $.querySelector(".comment-wrapper")
    const answerContent = comment.answerContent
    const topLevelComment = renderComment(comment)
    commentBox.append(topLevelComment)

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

function detectRole(user) {
    let role = ""
    switch (user) {
        case "ADMIN":
            role = "مدرس";
            break
        case "USER":
            role = "کاربر";
            break
    }

    return role
}

async function postComment(eve) {
    eve.preventDefault()

    if(userCache) {

        const text = eve.target['comment-text'].value.trim()
        const postBody = {
            body : text,
            courseShortName: getParam("name"),
            score: 5
        }

        if(text) {
            await fetchData(url + "/comments", "POST", {Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json'}, postBody).then(res => {
                if (res) {
                    popUp("ارسال موفق")
                    eve.target['comment-text'].value = ""
                }
                else {
                    popUp("ارسال ناموفق", false)
                }
            })
        }
    }
    else {
        popUp("ابتدا وارد سایت شوید!", false)
    }

}

async function userInfo() {

    try {
        const userInfo = await getUserInfo()
        if(userInfo.message !== "توکن نامعتبر است") {
            userCache = userInfo.username
        }
    }
    catch (e) {
        throw new Error(e)
    }
}