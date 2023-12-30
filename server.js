const express = require('express')
const fs = require('fs');
const path = require('path');
const app = express()
const filePath = path.join(__dirname, 'data.json');
let jsonData
let currentuser
app.use(express.static(__dirname))
app.use(express.json())


app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'./signin.html'))
})
app.get('/signin',(req,res) => {
  res.sendFile(path.join(__dirname,'./signin.html'))
})
app.get('/register',(req,res) =>{
    res.sendFile(path.join(__dirname,'./Views/register.html'))
})

app.get('/user-dashboard',(req,res)=>{
  res.sendFile(path.join(__dirname,'./Views/userdashboard.html'))
})

app.get('/users-data', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      jsonData = JSON.parse(data);
      res.json(jsonData);
    }
  });
});

app.get('/get-user',(req,res) => {
    res.json(currentuser)
})

app.post('/add-user', (req,res)=>{
  const adduser = req.body;
  jsonData.users.push(adduser);
  fs.writeFileSync(filePath,JSON.stringify(jsonData,null,2),'utf8')
  res.json(jsonData)
})

app.post('/add-tasks',(req,res)=>{
  const newtask = req.body;
  jsonData.tasks.push(newtask)
  fs.writeFileSync(filePath,JSON.stringify(jsonData,null,2),'utf8')
  res.json(jsonData)
})

app.post('/modify-tasks',(req,res)=>{
  const modifyitem = req.body
  jsonData.tasks[modifyitem.id-1] = modifyitem
  fs.writeFileSync(filePath,JSON.stringify(jsonData,null,2),'utf8')
  res.json(jsonData)
})
app.post('/load-user',(req,res)=>{
  currentuser = req.body
  res.json(jsonData)
})

const port = process.env.PORT || 3000
app.listen(port,()=>{
  console.log('Listening on ',port)
})