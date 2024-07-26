import {url, $} from "../base.js"
import {fetchData} from "../utilities/fetchData.js";
import {changeDateToJalali} from "../utilities/utileFunction.js";

//TODO: استفاده از دکمه نمایش بیشتر در انتهای بخش کامنت ها
fetchData(url + "/comments").then(comments => {
    console.log(comments)
    comments.forEach(comment => {
        addComment(comment)
    })
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