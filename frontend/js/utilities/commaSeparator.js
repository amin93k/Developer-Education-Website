
function commaSeparator(number, separateDigit) {
    number = number.toString()
    let separatedNumber = ""

    while (number.length > separateDigit) {
        separatedNumber = "," + number.slice(- separateDigit) + separatedNumber
        number = number.slice(0, - separateDigit)
    }


    return number + separatedNumber
}


export {commaSeparator}