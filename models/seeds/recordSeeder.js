const Record = require("../record")
const db = require("../../config/mongoose")

db.once("open", () => {
  console.log("mongodb connected!")

  Record.create([
    {
      topic: "午餐",
      date: "2019/04/23",
      category: "餐飲食品",
      price: 60
    },
    {
      topic: "晚餐",
      date: "2019/04/23",
      category: "餐飲食品",
      price: 60
    },
    {
      topic: "捷運",
      date: "2019/04/23",
      category: "交通出行",
      price: 120
    },
    {
      topic: "電影:驚奇隊長",
      date: "2019/04/23",
      category: "休閒娛樂",
      price: 220
    },
    {
      topic: "租金",
      date: "2019/04/01",
      category: "家居物業",
      price: 25000
    }
  ])
  console.log("done")
})
