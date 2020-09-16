const Record = require("../record")
const db = require("../../config/mongoose")

db.once("open", () => {
  console.log("mongodb connected!")

  Record.create([
    {
      topic: "午餐",
      date: "2019/04/23",
      category: "餐飲食品",
      category_icon: "fa-utensils",
      price: 60
    },
    {
      topic: "晚餐",
      date: "2019/04/23",
      category: "餐飲食品",
      category_icon: "fa-utensils",
      price: 60
    },
    {
      topic: "捷運",
      date: "2019/04/23",
      category: "交通出行",
      category_icon: "fa-shuttle-van",
      price: 120
    },
    {
      topic: "電影:驚奇隊長",
      date: "2019/04/23",
      category: "休閒娛樂",
      category_icon: "fa-grin-beam",
      price: 220
    },
    {
      topic: "租金",
      date: "2019/04/01",
      category: "家居物業",
      category_icon: "fa-home",
      price: 25000
    }
  ])
  console.log("done")
})
