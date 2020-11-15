const Record = require('../../models/record')

module.exports = {
  dateFormat: date => {
    let unixTime = date.valueOf() / 1000
    let isoDate = new Date(unixTime * 1000)
    let day = isoDate.getDay()
    if (day < 10) {
      day = '0' + day
    }
    let month = isoDate.getMonth() + 1
    if (month < 10) {
      month = '0' + month
    }
    let year = isoDate.getFullYear()
    let dateString = year + '-' + month + '-' + day
    let dateFormat = dateString.toString()

    return dateFormat
  },
  monthFilter: date => {
    let unixTime = date.valueOf() / 1000
    let isoDate = new Date(unixTime * 1000)
    let monthFilter = isoDate.getMonth()

    return monthFilter
  },
  yearFilter: date => {
    let unixTime = date.valueOf() / 1000
    let isoDate = new Date(unixTime * 1000)
    let yearFilter = isoDate.getFullYear()

    return yearFilter
  },
  arrFilter: array => {
    let result = array.filter((element, index, arr) => {
      return arr.indexOf(element) === index
    })
    arrFilter = result.sort(function(a, b) {
      return a - b
    })
    return arrFilter
  }
}
