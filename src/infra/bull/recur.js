var repeatDaily = (data) => {
    let date = new Date(data)
    let hour = date.getHours()
    let minutes = date.getMinutes()
    return `${minutes} ${hour} */1 */1 *`
}
var repeatWeekly = (data) => {
    let date = new Date(data)
    let hour = date.getHours()
    let minutes = date.getMinutes()
    let currentDay = date.getDay()
    return `${minutes} ${hour} * * */${currentDay}`
}
var repeatEveryMonth = (data) => {
    let date = new Date(data)
    let hour = date.getHours()
    let minutes = date.getMinutes()
    let day = date.getDate()
    return `${minutes} ${hour} ${day} */1 *`
}

var repeatSevenDays = (data) => {
    let date = new Date(data)
    let hour = date.getHours()
    let minutes = date.getMinutes()
    return `${minutes} ${hour} */1 */1 *`
}

var repeatFourteenDays = (data) => {
    let date = new Date(data)
    let hour = date.getHours()
    let minutes = date.getMinutes()
    return `${minutes} ${hour} */1 */1 *`
}

module.exports = {
    repeatDaily,
    repeatWeekly,
    repeatEveryMonth,
    repeatSevenDays,
    repeatFourteenDays
}