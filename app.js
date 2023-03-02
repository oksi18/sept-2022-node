const express = require('express')

const app = express()

app.get('/welcome' , (req, res) => {
    res.send('welcome')
    res.end()
});

const Port = 5100

app.listen(Port, () => {
    console.log(`Server has started on Port ${Port}`)
});


const fs = require('fs')
const path = require('fs')

fs.writeFile(path.join("users.json"), (err) =>{
    if (err) throw new Error(err.message)
});