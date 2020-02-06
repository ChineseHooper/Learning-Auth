const router = require("express").Router();
const verify = require('./verifyToken');


//在请求添加 verify 中间件进行验证；
router.get('/', verify, (req,res) =>{
    res.send(req.user);
})

module.exports = router;