const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize()) // 初始化 Passport 模組
  app.use(passport.session()) // 設定本地登入策略

  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, {
              message: 'email is not registered yet!'
            })
          }
          return bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) {
              return done(null, false, {
                message: 'Email or Password incorrect.'
              })
            }
            return done(null, user)
          })
        })
        .catch(err => done(err, false))
    })
  )

  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    // console.log(user)
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
