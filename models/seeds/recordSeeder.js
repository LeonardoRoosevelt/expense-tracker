const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const User = require('../user')
const Record = require('../record')
const db = require('../../config/mongoose')
const SEED_USER = {
  name: '野原廣志',
  email: 'hiroshi@tokyo.com.jp',
  password: '12345678'
}
db.once('open', () => {
  console.log('mongodb connected!')
  User.find({
    email: { $in: [SEED_USER.email] }
  }).then(user => {
    if (user.length !== 0) {
      console.log('userSeeds already exist')
      return process.exit()
    } else {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER.password, salt))
        .then(hash =>
          User.create({
            name: SEED_USER.name,
            email: SEED_USER.email,
            password: hash
          })
        )
        .then(user => {
          const userId = user._id
          return Promise.all(
            Array.from({ length: 1 }, (_, i) =>
              Record.create([
                {
                  topic: '午餐',
                  date: '2019/04/23',
                  category: '餐飲食品',
                  category_icon: 'fa-utensils',
                  price: 60,
                  userId
                },
                {
                  topic: '晚餐',
                  date: '2019/04/23',
                  category: '餐飲食品',
                  category_icon: 'fa-utensils',
                  price: 60,
                  userId
                },
                {
                  topic: '捷運',
                  date: '2019/04/23',
                  category: '交通出行',
                  category_icon: 'fa-shuttle-van',
                  price: 120,
                  userId
                },
                {
                  topic: '電影:驚奇隊長',
                  date: '2019/04/23',
                  category: '休閒娛樂',
                  category_icon: 'fa-grin-beam',
                  price: 220,
                  userId
                },
                {
                  topic: '租金',
                  date: '2019/04/01',
                  category: '家居物業',
                  category_icon: 'fa-home',
                  price: 25000,
                  userId
                }
              ])
            )
          )
        })
        .then(() => {
          console.log('done')
          process.exit()
        })
    }
  })
})
