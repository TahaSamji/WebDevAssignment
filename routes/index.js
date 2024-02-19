const express = require('express');
const router = express.Router();

const authRouter = require("./auth");
const CarRouter = require("./car");
const jwt = require('jsonwebtoken');

router.use("/auth", authRouter);

router.use(async (req,res,next)=>{
try {
    const token = req.headers.authorization;
    console.log(token)
    const user = jwt.verify(token.split(" ")[1],"MY_SECRET")
    console.log(user)
    req.user = user;
    next()
} catch (error) {
    return res.json({ msg: "Token Not Found / Invalid"})
}
});
router.use("/car", CarRouter);

module.exports = router;