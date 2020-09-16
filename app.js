// require packages used in the project
const express = require("express")
const app = express()
const port = 3000
// handlebars setting
const exphbs = require("express-handlebars")
const Record = require("./models/record")
const Category = require("./models/category")

require("./config/mongoose")

app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs" }))
app.set("view engine", "hbs")

app.use(express.static("public"))
// routes setting
app.get("/", (req, res) => {
  res.render("index")
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
