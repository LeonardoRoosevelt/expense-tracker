// require packages used in the project
const express = require("express")
const app = express()
const port = 3000
// handlebars setting
const exphbs = require("express-handlebars")
const Category = require("./models/category")
const Record = require("./models/record")

require("./config/mongoose")

app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs" }))
app.set("view engine", "hbs")

app.use(express.static("public"))
// routes setting
app.get("/", (req, res) => {
  let totalAmount = 0
  let categorysList = []
  Category.find()
    .lean()
    .then(categorys => {
      for (const category of categorys) {
        categorysList.push(category)
      }
      return categorysList
    })
  Record.find()
    .lean()
    .then(records => {
      for (const record of records) {
        totalAmount += record.price
      }
      return res.render("index", { records, totalAmount, categorysList })
    })
    .catch(err => console.error(err))
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
