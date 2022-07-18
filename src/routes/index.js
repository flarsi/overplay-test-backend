const { 
  signUp, 
  signIn, 
  logOut,
} = require('../services/user');

const { 
  getAnimationsData
} = require('../services/animation');

const { Router } = require('express');
const router = Router();
const passport = require('passport');
const { body } = require('express-validator');

router.post('/signup', 
  body('name').isAlpha(),
  body('email').isEmail(),
  body('password').isStrongPassword(),
  (req, res) => signUp(req, res)
);
router.post('/signin', (req, res) => signIn(req, res));
router.post('/logout', passport.authenticate('jwt', { session: false }), (req, res) => logOut(req, res));
router.get('/animations', (req, res) => getAnimationsData(req, res));

module.exports = router;