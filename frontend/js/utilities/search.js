
function search(list, word, property) {
    if(!list) {
        return []
    }

    let result = null
    const typeOfListItem = Object.prototype.toString.call(list[0])
    word = word.trim().toLowerCase()

    if(typeOfListItem === "[object Object]") {
        result = list.filter(item => item[property].toLowerCase().includes(word))
    }
    else {
        result = list.filter(item => item.toLowerCase().includes(word))
    }
    return result
}

export {search}