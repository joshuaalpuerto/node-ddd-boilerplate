var repeatDaily = (data) => {
    var date = new Date(data)
    var hour = date.getHours()
    var minutes = date.getMinutes()
    var day = date.getDate()
    var month = date.getMonth() + 1
    var year = date.getFullYear()
    return `${minutes} ${hour} */1 */1 *`
}
var repeatWeekly = (data) => {
    var date = new Date(data)
    var hour = date.getHours()
    var minutes = date.getMinutes()
    var day = date.getDate()
    var currentDay = date.getDay()
    var month = date.getMonth() + 1
    var year = date.getFullYear()
    return `${minutes} ${hour} * * */${currentDay}`
}
var repeatEveryMonth = (data) => {
    var date = new Date(data)
    var hour = date.getHours()
    var minutes = date.getMinutes()
    var day = date.getDate()
    var month = date.getMonth() + 1
    var year = date.getFullYear()
    return `${minutes} ${hour} ${day} */1 *`
}

var repeatSevenDays = (data) => {
    console.log(data);
    var date = new Date(data)
    var hour = date.getHours()
    var minutes = date.getMinutes()
    var day = date.getDate()
    var month = date.getMonth() + 1
    var year = date.getFullYear()
    return `${minutes} ${hour} */1 */1 *`
}

var repeatFourteenDays = (data) => {
    var date = new Date(data)
    var hour = date.getHours()
    var minutes = date.getMinutes()
    var day = date.getDate()
    var month = date.getMonth() + 1
    var year = date.getFullYear()
    return `${minutes} ${hour} */1 */1 *`
}

module.exports = {
    repeatDaily,
    repeatWeekly,
    repeatEveryMonth,
    repeatSevenDays,
    repeatFourteenDays
}