const ConnectToMongo = require('./database');
const express = require('express')

ConnectToMongo();

const app = express()
const port = 5000

app.use(express.json())

// available routes 
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.get('/',(req,res)=>{
  res.json("Hello world");
} )

app.listen(port, () => {
  console.log(`iNoteBook server listening on port ${port}`)
})