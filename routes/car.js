const Users = require("../models/User");
const Cars = require("../models/Car");
var express = require("express");
var router = express.Router();
// const jwt = require("jsonwebtoken")



router.get("/ShowCars", async (req, res) => {
    try {
        
       const cars  =  await Cars.find().populate('user');

         res.json({data: cars})
    }catch (error) {
        console.error(error)
    
}}
);

router.post("/ShowCarsbycolor", async (req, res) => {
    try {
        let Color = req.body.color;
        const cars = await Cars.find({ color: Color }).populate('user');
        if (cars.length == 0) return res.json({ msg: "Cars With this mentioned Color not Found" })

         res.json({data: cars})
    }catch (error) {
        console.error(error)
    
}}
);

router.post("/ShowCarsbyCarName", async (req, res) => {
    try {
        let Carname = req.body.CarName;
        const cars = await Cars.find({ CarName: Carname });
        if (cars.length== 0 ) return res.json({ msg: "Car Not available" })

         res.json({data: cars})
    }catch (error) {
        console.error(error)
    
}}
);
router.use((req,res,next)=>{
    if(!req.user.admin) {
        console.log(req.user.admin);
        return res.json({msg: "Non Admin can not add Cars!!"})
    }
    else{
next()
    }});

router.post("/addCar", async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email })
        if (!user) return res.json({ msg: "USER NOT FOUND" })

        
         await (await Cars.create({ ...req.body, user: user._id }))

         res.json({ msg: "Car added" })
    }catch (error) {
        console.error(error)
    
}}
);

router.post("/DeleteCar", async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email })
        if (!user) return res.json({ msg: "USER NOT FOUND" })

        let CarID = req.body.carID;

        
         await Cars.deleteOne({carID : CarID})

         res.json({ msg: "Car Deleted" })
    }catch (error) {
        console.error(error)
    
}}
);


router.post("/updateCar", async (req, res) => {
    try {
    
        const { carID,email, color, model,price } = req.body;
    
        const user = await Users.findOne({ email });
        if (!user) {
            return res.json({ msg: "USER NOT FOUND" });
        }

    
        const existingCar = await Cars.findOne({carID});
        
        if (!existingCar) {
            return res.json({ msg: "CAR NOT FOUND" });
        }

        
      let cardetail =  await Cars.findOneAndUpdate({carID}, { color, model ,price });

        res.json({ msg: "Car Details updated" ,data : cardetail}, );
    } catch (error) {
        console.error(error);
    }
});




module.exports = router
