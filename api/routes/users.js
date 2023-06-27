const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const salt = bcrypt.genSaltSync(10);
const secret = process.env.secret;


module.exports = (app) => {

  app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const userDoc = await User.findOne({username});
    // check password w/ hashed password (returns true/false)
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) { // logged in
      // .sign({payload}, secret key, {options}, (callback))
      jwt.sign({username, id:userDoc._id}, secret, {}, (err, token) => {
        if (err) throw err;
        // send as cookie named token 
        res.cookie('token', token).json({
          id:userDoc._id,
          username
        });
      });
    } else {
      res.status(400).json("wrong credentials")
    }
  });

  app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
  });

  app.post('/register', async (req, res) => {
    // grab both
    const {username, password} = req.body;
    try {
      const userDoc = await User.create({
        username, 
        password: bcrypt.hashSync(password, salt)
      });
      res.json(userDoc);
    } catch(e) {
      res.status(400).json(e);
    }
  });

  app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if(token ) {
      console.log("secret: ", token)
      jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info)
      });
    } else {
      return res.status(404).json({"message": "login you estupida"})
    }
  });

}