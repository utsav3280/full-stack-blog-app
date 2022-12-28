const User = require("../models/userModel");
const router = require("express").Router();
const bcrypt = require("bcrypt");
// const saltRounds = 10;
const cors = require("cors");
router.use(cors("*"));

// steps
/**
 * 1st check if email is already there or not
 * if email exists -> email already exists -> Please login instead
 * if email does not exists -> register this email in database 
 */

router.post("/", async (req, res) => {
    try { 
        console.log(req.body);
        // checking if email already exists or not
        const findUser = await User.findOne({ email: req.body.email });
        if (findUser) {
            return res.json({
                status: "Failed",
                message: "Entered email already exists"
            })
        }
        bcrypt.hash(req.body.email, 10, async (err, hash) => {
            // Store hash in your password DB.
            if (err) {
                return res.json({
                    status: "Failed in hashing",
                    message: err.message
                })
            }
            const newUser = await User.create({
                email: req.body.email,
                password: hash
            })
            res.json({
                newUser
            })
        });
    } catch (error) {
        res.json({
            status: "Failed",
            message: error.message
        })
    }
})

module.exports = router;