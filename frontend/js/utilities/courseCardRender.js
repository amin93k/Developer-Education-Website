function courseCardRender(courses, parentDivElmClasses, numberOfRender = courses.length) {
    const fragment = document.createDocumentFragment()

    if (courses.length) {
        numberOfRender = numberOfRender > courses.length ? courses.length : numberOfRender

        for (let i = 0; i < numberOfRender; i++) {
            const courseInfo = courses[i]

            const {
                name, description, cover, shortName, price, creator, registers, courseAverageScore, discount
            } = courseInfo
            const finalPrice = discount > 0 ? price - (price * discount / 100) : price

            const newDivElm = document.createElement("div")
            newDivElm.className = parentDivElmClasses
            newDivElm.innerHTML += `
                <div class="course-card">
                    <div class="course-card__banner">
                        <a href="course.html?name=${shortName}">
                            <img class="course-card__banner--img"
                                 src="../backend-v0.3.0/public/courses/covers/${cover}" alt="course">
                        </a>
                        ${(discount > 0) && (price > 0) ? `
                            <div class="course-card__off-budget">
                                <span class="course-card__off-budget--percent">${discount}</span>
                                <i class="fa-solid fa-percent course-card__off-budget--icon"></i>
                            </div>` : ""}
                    </div>
                    <div class="course-card__content">
                        <div class="course-card__content--title">
                            <a href="course.html?name=${shortName}">${name}</a>
                        </div>
                        <p class="course-card__content--description">${description}</p>
                    </div>
                    <div class="course-card__footer">
                        <div class="course-card__footer--teacher-rating">
                            <div class="course-card__teacher">
                                <a href="course.html?name=${shortName}">
                                    <i class="fa-regular fa-chalkboard-teacher"></i>
                                    <span class="course-card__teacher--name">${creator}</span>
                                </a>
                            </div>
                            <div class="course-card__rating">
                                <span class="card__rating--number">${courseAverageScore}</span>
                                <i class="fa-solid fa-star"></i>
                            </div>
                        </div>
                        <div class="course-card__footer--user-price">
                             <span class="course-card__footer--users">
                                    <i class="fa-regular fa-user-group"></i>
                                    ${registers}
                             </span>
                            <div class="course-card__footer--price">
                                <span>
                                    ${finalPrice === 0 ? "رایگان": 
                                    `${finalPrice.toLocaleString()}
                                    <svg class="course-card__footer--toman" xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     stroke-width="4" stroke="currentColor" viewBox="0 0 57.988 55.588">
                                    <g transform="translate(-4013.907 176.406)">
                                        <path d="M4068.117-146.108s3,8.61,1.066,11.035-4.839,1.921-11.736,1.921-10.552.731-12.355-1.6-2.288-7.952,2.547-9.55,7.877,3.5,7.877,9.231.668,5.874-.732,8.36c-1.858,2.6-10.917,3.915-10.917,3.915"></path>
                                        <path d="M4069.56-152.461v3.969" transform="translate(0 -1.945)"></path>
                                        <path d="M4069.56-152.461v3.969" transform="translate(-7 -1.945)"></path>
                                        <path d="M4069.56-152.461v3.969" transform="translate(-7 -1.945)"></path>
                                        <path d="M4027.592-128.435s5.376,4.632,8.167,3.124a5.918,5.918,0,0,0,3.034-6.158c-.446-4.24-4.144-5.625-6.783-4.418s-4.016,5.866-4.016,5.866-1.857,4.934-6.114,4.934-4.928-2.6-5-4.934-.98-19.76-.98-19.76"></path>
                                        <path d="M4069.56-152.461v3.969" transform="translate(-44 -23.945)"></path>
                                        <path d="M4017.55-171.009s-3.525,12.094,2.454,15.619c5.623,3.035,12.585-.714,12.585-.714s3.473-2.1,3.436-4.864c-.089-3.883-1.651-12.986-1.651-12.986"></path>
                                    </g>
                                    </svg>
                                    `}
                                </span> 
                            </div>
                        </div>
                    </div>
                </div>`

            fragment.append(newDivElm)
        }

    }
    else {
        const notFoundImg = document.createElement("div")
        notFoundImg.className = "col-12"
        notFoundImg.innerHTML = `
        <div class="d-flex align-items-center justify-content-center mb-4">
            <img src="images/logo/not-found.png" style="width: 50%;">
        </div>`

        const showMoreBtn = document.querySelector(".show-more")
        showMoreBtn.classList.add("hidden")

        fragment.append(notFoundImg)
    }
    return fragment
}


function courseCardHorizontalRender(courses, parentDivElmClasses, numberOfRender = courses.length) {
    const fragment = document.createDocumentFragment()

    if (courses.length) {
        numberOfRender = numberOfRender > courses.length ? courses.length : numberOfRender

        for (let i = 0; i < numberOfRender; i++) {
            const courseInfo = courses[i]

            const {
                name, description, cover, shortName, price, creator, registers, courseAverageScore, discount
            } = courseInfo
            const finalPrice = discount > 0 ? price - (price * discount / 100) : price

            const newDivElm = document.createElement("div")
            newDivElm.className = parentDivElmClasses
            newDivElm.innerHTML += `
            <div class="col-12">
                <div class="course-card horizontal">
                    <div class="course-card__banner horizontal">
                        <a href="course.html?name=${shortName}">
                            <img class="course-card__banner--img horizontal"
                                 src="../backend-v0.3.0/public/courses/covers/${cover}" alt="course">
                        </a>
                        ${(discount > 0) && (price > 0) ? `
                            <div class="course-card__off-budget">
                                <span class="course-card__off-budget--percent">${discount}</span>
                                <i class="fa-solid fa-percent course-card__off-budget--icon"></i>
                            </div>` : ""
                        }
                    </div>
                    <div class="course-card__content horizontal">
                        <div class="course-card__content--title">
                            <a href="course.html?name=${shortName}">${name}</a>
                        </div>
                        <div class="course-card__teacher horizontal">
                            <a href="course.html?name=${shortName}">
                                <i class="fa-regular fa-chalkboard-teacher"></i>
                                <span class="course-card__teacher--name">${creator}</span>
                            </a>
                        </div>
                        <p class="course-card__content--description">${description}</p>
                        <div class="course-card__rating-user">
                            <span class="course-card__footer--users">
                                    <i class="fa-regular fa-user-group"></i>
                                    ${registers}
                            </span>
                            <div class="course-card__rating">
                                <span class="card__rating--number">${courseAverageScore}</span>
                                <i class="fa-solid fa-star"></i>
                            </div>

                        </div>
                    </div>
                    <div class="course-card__price">
                        <h3 class="course-card__price--title">قیمت</h3>
                        <div class="course-card__footer--price">
                            <span>
                                ${finalPrice === 0 ? "رایگان":
                                `${finalPrice.toLocaleString()}
                                    <svg class="course-card__footer--toman" xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     stroke-width="4" stroke="currentColor" viewBox="0 0 57.988 55.588">
                                        <g transform="translate(-4013.907 176.406)">
                                            <path d="M4068.117-146.108s3,8.61,1.066,11.035-4.839,1.921-11.736,1.921-10.552.731-12.355-1.6-2.288-7.952,2.547-9.55,7.877,3.5,7.877,9.231.668,5.874-.732,8.36c-1.858,2.6-10.917,3.915-10.917,3.915"></path>
                                            <path d="M4069.56-152.461v3.969" transform="translate(0 -1.945)"></path>
                                            <path d="M4069.56-152.461v3.969" transform="translate(-7 -1.945)"></path>
                                            <path d="M4069.56-152.461v3.969" transform="translate(-7 -1.945)"></path>
                                            <path d="M4027.592-128.435s5.376,4.632,8.167,3.124a5.918,5.918,0,0,0,3.034-6.158c-.446-4.24-4.144-5.625-6.783-4.418s-4.016,5.866-4.016,5.866-1.857,4.934-6.114,4.934-4.928-2.6-5-4.934-.98-19.76-.98-19.76"></path>
                                            <path d="M4069.56-152.461v3.969" transform="translate(-44 -23.945)"></path>
                                            <path d="M4017.55-171.009s-3.525,12.094,2.454,15.619c5.623,3.035,12.585-.714,12.585-.714s3.473-2.1,3.436-4.864c-.089-3.883-1.651-12.986-1.651-12.986"></path>
                                        </g>
                                    </svg>
                                `}
                            </span> 
                        </div>
                    </div>
                </div>
            </div>`

            fragment.append(newDivElm)
        }

    }
    else {
        const newElm = document.createElement("div")
        newElm.className = "col-12"
        newElm.innerHTML = `
        <div class="d-flex align-items-center justify-content-center mb-4">
            <img src="images/logo/not-found.png" style="width: 50%;">
        </div>`

        fragment.append(newElm)
    }

    return fragment
}


export {courseCardRender, courseCardHorizontalRender}