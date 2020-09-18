# Expense Tracker 1.0
簡易記帳工具

## Features
-列出所有記帳的資料並顯是總金額
-可依照類別分類顯示
-可新增、變更、刪除支出明細
-可新增類別

### Filter
select category to filter the record list

### Create
click the create button to add new record information
click create category button to add new category information

### Record Edit
click the edit button bellow to edit the information

### Record Delete
click the delete button bellow to delete the information

### Environment SetUp - 環境建置
mongoDB: 3.6.0
mongoose: 5.10.2
Node.js
Express: 4.17.1
Express-Handlebars: 5.1.0
nodemon
body-parser: 1.19.0

### Installing - 專案安裝流程
打開你的 terminal，Clone 此專案至本機電腦
```
git clone https://github.com/LeonardoRoosevelt/expense-tracker
```
開啟終端機(Terminal)，進入存放此專案的資料夾
```
cd expense-tracker
```
安裝 npm 套件
```
在 Terminal 輸入 npm install 指令
```
安裝 nodemon 套件
```
在 Terminal 輸入 nodemon app.js 指令
```
啟動伺服器，執行 app.js 檔案
```
nodemon app.js
```
導入預設資料
```
npm run seed
```
當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結
```
The Express server is running on http://localhost:3000
```

現在，你可開啟任一瀏覽器瀏覽器輸入 "http://localhost:3000" 開始使用



### Contributor - 專案開發人員
[Leonardo Roosevelt](https://github.com/LeonardoRoosevelt)