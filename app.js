"use strict";
const express = require("express");
const app = express();
const sequelize = require("./models").sequelize;

sequelize.sync();

app.use(express.static(`${__dirname}/src`));
app.use(express.json());



app.get("/test", (req, res) => {
    console.log("아닙니다.");
    res.json({
        name: "지지고",
        star: 4
    }); 
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;