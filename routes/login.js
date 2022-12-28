const User = require("../models/userModel");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const cors = require("cors");
router.use(cors("*"));

// steps
/**
 * 1st check if that email exists or not in the database
 * if it does not exists -> Email does not exists -> Please register instead
 * if it exists -> Check if password is valid or not
 * if valid -> generate a jwt -> login successfull
 * if not valid -> Invalid Credentials
 */

router.post("/", async (req, res) => {
    try {
        // checking if email exists or not
        const findUser = await User.findOne({ email: req.body.email });
        if (!findUser) {
            return res.json({
                status: "Login Failed",
                message: "Entered email is not registered. Please register first"
            })
        }
        // const { email, password } = req.body;
        // console.log(password, findUser.password);
        // bcrypt.compare(password, findUser.password, function (err, result) {
        //     // result == true
        //     console.log(result);
        //     if (err) {
        //         return res.json({
        //             status: "Error while comparing",
        //             message: err.message
        //         })
        //     }
        //     if (result) {
        //         const token = jwt.sign({
        //             exp: Math.floor(Date.now() / 1000) + (60 * 60),
        //             data: findUser._id
        //         }, process.env.secret);

        //         return res.json({
        //             status: "Login Successful",
        //             token: token
        //         })
        //     }
        //     res.json({
        //         status: "Failed",
        //         message: "Invalid Credentials"
        //     })
        // });
    
        const { username, password } = req.body;
        if (findUser) {
            bcrypt.compare(password, findUser.password, function (err, result) {
              if (err) {
                return res.status(500).json({
                  status: "Failed",
                  message: err.message,
                });
              }
              if (!result) {
                // true
                const token = jwt.sign(
                  {
                    exp: Math.floor(Date.now() / 1000) + 60 * 60,
                    data: findUser._id,
                  },
                  process.env.secret
                );
      
                return res.json({
                  status: "success",
                  message: "Login successfull",
                  token: token,
                  name: findUser.name,
                });
              }
              res.json({
                status: "Failed",
                message: "Invalid Password",
              });
            });
          } else {
            res.json({
              status: "Failed",
              message: "User does not exists",
            });
          }
    } catch (error) {
        res.json({
            status: "Failed",
            message: error.message
        })
    }
})

module.exports = router;