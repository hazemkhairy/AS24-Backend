
const convertToMoney = (money, currency = "€") => {
    return `${currency} ${Number(money)},-`;
}
const isValidNumber = (toCheck) => {
    return !isNaN(toCheck);
}

const isValidAlphaNumeric = (toCheck) => {
    return toCheck.match(/^[0-9a-z\-]+$/i) ? true : false;
}
module.exports = { isValidNumber, isValidAlphaNumeric, convertToMoney }