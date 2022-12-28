const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blogModel");
require('dotenv').config();

const cors = require("cors");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

router.use(cors("*"));
router.use(fileUpload({
    useTempFiles: true
}))

cloudinary.config({
    cloud_name: 'dw6w3k8go',
    api_key: '543141475848981',
    api_secret: 'yqq2MBZG5EXsZuydocH59XjBdG4'
});

const authorization = (req, res, next) => {
    jwt.verify(req.headers.authorization, process.env.secret, function (err, decoded) {
        if (err) {
            return res.json({
                message: "token verification failed"
            })
        }
        console.log(decoded.data) // bar
        req.user = decoded.data
        next();
    });
}

router.get("/", authorization, async (req, res) => {
    const blogs = await Blog.find({ userId: req.user });
    res.json({
        blogs
    })
})

router.post("/create", authorization, async (req, res) => {
    try {
        cloudinary.uploader.upload(req.files.image.tempFilePath, async (err, result) => {
            const blog = await Blog.create({
                title: req.body.author,
                description: req.body.description,
                image: result.url,
                author: req.body.author,
                userId: req.user
            });
            console.log(blog);
            res.json({
                blog
            })
        })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;