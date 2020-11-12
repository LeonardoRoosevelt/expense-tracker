//刪除前再次確認
function deleteCheckAgain() {
  return window.confirm('Do you really want to delete this record?')
}

// function todayValue() {
//   let today = new Date()
//   let day = today.getDay()
//   let month = today.getMonth() + 1
//   if (month < 10) {
//     month = '0' + month
//   }
//   let year = today.getFullYear()
//   let dateString = year + '-' + month + '-' + day
//   let todayValue = dateString.toString()
//   console.log(todayValue)
//   return todayValue
// }
