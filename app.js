"use strict";
const express = require("express");
const app = express();
const cors = require('cors');
// const sequelize = require("./models").sequelize;
// const model = require("./models");

//sequelize.sync();

let test = []
app.use(express.static(`${__dirname}/src`));
app.use(express.json());
app.use(cors());

// app.post("/upup", (req, res) => {
// 	//const bodyObject = JSON.parse(req.body);
// 	//console.log(bodyObject);
// 	//console.log(req.body[0]);
// 	console.log(req.body[0].mood);
	
// 	for (let i = 0; i < req.body.length; i++)
// 	model.Market.create({
// 	"id": req.body[i].id,
// 	"name": req.body[i].name,
// 	"foodtag": req.body[i].foodtag,
// 	"likenum": req.body[i].likenum,
// 	"local": req.body[i].local,
// 	"seatnum": req.body[i].seatnum,
// 	"M_1": req.body[i].M_1,
// 	"M_2": req.body[i].M_2,
// 	"M_3": req.body[i].M_3,
// 	"M_4": req.body[i].M_4,
// 	"categ": req.body[i].categ,
// 	"mood": req.body[i].mood,
// 	"weather": req.body[i].weather,
// 	"image": req.body[i].image
// 	});
	
	
// });
// app.get("/give", (req, res) => {
// 	model.Market.findAll({
// 		where:{
// 		id: 1
// 		}
// 	}).then(result => { 
// 		res.send(req.body[0]);
// 		return req.body[0];
// 	}).catch(err => {
// 		console.log(err);
// 	});
// });
app.get("/gettest", (req, res) => {
	res.send("give one");
});

module.exports = app;
