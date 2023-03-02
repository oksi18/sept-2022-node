const express = require('express')
const { body, validationResult } = require('express-validator');
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/welcome' , (req, res) => {
    res.send('welcome')
    res.end()
});

const Port = 5100

app.listen(Port, () => {
    console.log(`Server has started on Port ${Port}`)
});


// const fs = require('fs')
// const path = require('path')

// fs.mkdir(path.join('test'), (err) =>{
//     if (err) throw new Error(err.message)
// });
//
// // fs.writeFile(path.join('test', 'users.json'),(err) =>{
// //     if (err) throw new Error(err.message)
// // });

const users = require('./test/users.json')

app.get('/users',  (req, res) => {
    res.json(users)
});

app.get('/users/:userId', (req, res) => {
    const { userId } = req.params

    const user = users[+userId]

    res.json(user)
})

app.post('/user',
    body('name').isLength({min: 2}),
    body('age').isLength({ min: 0 }),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log(errors);
        User.create({
        name: req.body.name,
        age:req.body.age,
    }).then(user => res.json(user))
});

app.post('/users', (req, res) => {
const body = req.body
    users.push(body)
    res.json({
        message: "user created"
    })
    console.log(body);
})

app.put('/users/:userId', (req, res) => {
    const { userId } = req.params;
    users[+userId] = req.body

    res.status(200).json({
        message: 'user updated',
        data: users[+userId]
    })
} );

app.delete('/users/:userId', (req, res) =>{
    const {userId} = req.params;
    users.slice(+userId, 1);

    res.status(200).json({
        message: 'user deleted'
    })

});