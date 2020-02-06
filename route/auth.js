const router = require("express").Router();
const User = require("../model/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require("../validation.js");

router.post("/register", async (req, res) => {
  //validate the data before we register user.  
  const {error} = registerValidation(req.body);
  if(error){
      return res.status(400).send(error.details[0].message);
  }

  //检查用户是否存在
  const emailExist = await User.findOne({
      email: req.body.email
  })
  if(emailExist){
      return res.status(400).send("Email already exists");
  }

  //加密密码
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password,salt);

  //返回一个新注册用户
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword

  });
  try {
    const savedUser = await user.save();
    res.send({user: user._id});
  } catch (err) {
    res.status(400).send(err);
  }
});


//Login
router.post('/login',async (req, res) => {
    //validate the data before login
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //检查用户是否存在
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send("Email is not exists");
    
    //检查密码是否正确
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    //创造一个token；
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);

    //res.send('logged in');
});


module.exports = router;
