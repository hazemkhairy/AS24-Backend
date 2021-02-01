
const convertToMoney = (money, currency = "€") => {
    return `${currency} ${money},-`;
}
const isValidNumber = (toCheck) => {
    return !isNaN(toCheck);
}

const isValidAlphaNumeric = (toCheck) => {
    return toCheck.match(/^[0-9a-z\-]+$/i);
}
module.exports = { isValidNumber, isValidAlphaNumeric, convertToMoney }