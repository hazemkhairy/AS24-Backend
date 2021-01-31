
const convertToMoney = (money, currency = "€") => {
    return `${currency} ${money},-`;
}

module.exports={convertToMoney}