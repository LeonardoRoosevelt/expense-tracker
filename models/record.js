const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  topic: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  date: {
    type: String,
    required: true,
    default: Date.now
  },
  category: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  category_icon: {
    type: String // 資料型別是字串
  },
  price: {
    type: Number, // 資料型別是字串
    required: true, // 這是個必填欄位
    trim: true, //   去除掉不必要的空白
    min: [1, 'too small']
  },
  merchant: {
    type: String, // 資料型別是字串
    required: true
  }
})

module.exports = mongoose.model('Record', recordSchema)
