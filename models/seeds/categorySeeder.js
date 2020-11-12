const Category = require('../category')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  Category.find({
    category: { $in: ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他'] }
  }).then(category => {
    if (category.length !== 0) {
      console.log('categorySeeds already exist')
      return process.exit()
    } else {
      Promise.all(
        Array.from({ length: 1 }, (_, i) =>
          Category.create([
            {
              category: '家居物業',
              icon: 'fa-home'
            },
            {
              category: '交通出行',
              icon: 'fa-shuttle-van'
            },
            {
              category: '休閒娛樂',
              icon: 'fa-grin-beam'
            },
            {
              category: '餐飲食品',
              icon: 'fa-utensils'
            },
            {
              category: '其他',
              icon: 'fa-home'
            }
          ])
        )
      ).then(() => {
        console.log('done')
        process.exit()
      })
    }
  })
})
