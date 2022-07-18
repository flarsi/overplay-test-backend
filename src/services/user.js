const User = require("../models/user");
const passport = require("passport");
const jwt = require('jsonwebtoken');
const { validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function signUp(req, res) {
  try {
    const { name, email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const user = new User({
      name,
      email,
      password,
    });
  
    await user.save();

    const payload = {
      sub: user._id,
      iat: Date.now(),
    };

    const token = jwt.sign(payload, 'secret_key', {expiresIn: '1d'});

    return res.status(201).send({ message: "success", token: 'Bearer ' + token , expiresIn: '1d' });
  } catch (e) {
    return res.status(500).send({ message: `Something wrong --> ${e.message}` });
  }
}

async function signIn(req, res, next) {
  try {
  const { email, password } = req.body;
  const user = await User.findOne({email});
  if (!user) {
    return res.status(401).json({ error: 'could not find user' });
  }
 
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Incorrect password.' });
  } 

  const payload = {
    sub: user._id,
    iat: Date.now(),
  };

  const token = jwt.sign(payload, 'secret_key', {expiresIn: '1d'});

  return res.status(200).send({ message: "success", token: 'Bearer ' + token , expiresIn: '1d' });
  } catch (e) {
    return res.status(500).send({ message: `Something wrong --> ${e.message}` });
  }
}

function logOut(req, res) {
  try {
    req.logout();
    res.status(200).send({ message: "user logout" });
  } catch (e) {
    res.status(500).send({ message: `Something wrong --> ${e.message}` });
  }
}

module.exports = {
  signUp,
  signIn,
  logOut,
};
