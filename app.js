const { application } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config();
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const homeRoute = require("./routes/blogs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MongoBlog, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to database");
});

app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/blogs", homeRoute);

app.listen(5000, () => { console.log("Server is up and running at port 5000") })