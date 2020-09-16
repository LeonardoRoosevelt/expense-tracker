const Category = require("../category")
const db = require("../../config/mongoose")

db.once("open", () => {
  console.log("mongodb connected!")

  Category.create([
    {
      category: "家居物業",
      icon: "fa-home"
    },
    {
      category: "交通出行",
      icon: "fa-shuttle-van"
    },
    {
      category: "休閒娛樂",
      icon: "fa-grin-beam"
    },
    {
      category: "餐飲食品",
      icon: "fa-utensils"
    },
    {
      category: "其他",
      icon: "fa-home"
    }
  ])
  console.log("done")
})
