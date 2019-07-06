const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const User = require('./models/User');

const db = "mongodb+srv://wassim:507Mq04ysl46ZIPx@cluster0-8t2m5.mongodb.net/test?retryWrites=true&w=majority"

app.use(bodyParser.urlencoded({extended: false}));

mongoose
.connect(db, {})
.then(()=> console.log("Db Connected"))
.catch(err => console.log(err));

app.get('/',(req, res) => res.json({
    msg: "Hello You!"
}));

app.post('/users', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    newUser
	    .save()
	    .then(user => res.json(user))
	    .catch(err => res.json(err));

});

app.get('/users', (req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => console.log(err))
})

const port = process.env.port || 5000;

app.listen(port,() => console.log(`Your application is running at http://localhost:${port}`));