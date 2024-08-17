function blogCardRender(blogs, parentElmClasses, numberOfRender = blogs.length) {
    const fragment = document.createDocumentFragment()

    numberOfRender = numberOfRender > blogs ? blogs.length : numberOfRender

    for (let i = 0; i < numberOfRender; i++) {
        const {title, description, cover, shortName} = blogs[i]
        const author = blogs[i].creator.name

        const newDivElm = document.createElement("div")
        newDivElm.className = parentElmClasses
        newDivElm.innerHTML = `
                <div class="blog-card">
                    <div class="blog-card__banner">
                        <img class="blog-card__banner-image" src="../backend-v0.3.0/public/courses/covers/${cover}" alt="blog image">
                    </div>
                    <div class="blog-card__body">
                        <div class="blog-card__content">
                            <div class="blog-card__content--title">
                                <a class="blog-card__title--text" href="blog.html?name=${shortName}">${title}</a>
                            </div>
                            <p class="blog-card__content--description">${description}</p>
                        </div>
                        <div class="blog-card__author">
                            <a href="blog.html?name=${shortName}">
                                <i class="fa-regular fa-user blog-card__author--icon"></i>
                                <span class="blog-card__author--name">${author}</span>
                            </a>
                        </div>
                        <div class="blog-card__show">
                            <a class="blog-card__show--link" href="blog.html?name=${shortName}">
                                مطالعه مقاله
                                <i class="fa-solid fa-circle-arrow-left blog-card__show--icon"></i>
                            </a>
                        </div>
                    </div>
                </div>`

        fragment.append(newDivElm)
    }

    return fragment
}


export {blogCardRender}