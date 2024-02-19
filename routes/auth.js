const bcrypt = require("bcrypt");
const Users = require("../models/User");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");


router.post("/signUp", async (req, res) => {
    try {
        const { email, password } = req.body

      if(password.length<8) return  res.json({ msg: "Minimun length for password is 8 " }) 
      if(!password.match(/[0-9]/g)) return  res.json({ msg: "Password must contain atleast 1 Digit" })
      if(!password.match(/[A-Z]/g)) return  res.json({ msg: "Password must contain atleast 1 Upper Case letter" })


      if(!email.match(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/g)) return res.json({ msg: "Email Must be in correct format ex. example@gmail.com" })




        let user = await Users.findOne({ email })
        if (user) return res.json({ msg: "USER EXISTS" })

        await Users.create({ ...req.body, password: await bcrypt.hash(password, 5) });

        return res.json({ msg: "USER CREATED" })
    } catch (error) {
        // console.error(e)
       res.json({ msg: error.message})
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await Users.findOne({ email })
        if (!user) return res.json({ msg: "USER NOT FOUND" })

        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) return res.json({ msg: "WRONG PASSWORD" })

        const token = jwt.sign({
            email,
            createdAt: new Date(),
            age: user.age,
            admin : user.admin
        }, "MY_SECRET", { expiresIn: "1d" });

        res.json({
            msg: "LOGGED IN", token
        })
    } catch (error) {
        console.error(error)
    }
});

module.exports = router
