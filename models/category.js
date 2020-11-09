const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  category: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  icon: {
    type: String
  },
  userId: {
    // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true
  }
})

module.exports = mongoose.model('Category', categorySchema)
