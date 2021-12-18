"use strict";
const express = require("express");
const app = express();
const model = require("./models");
const sequelize = require("./models").sequelize;
const cors = require('cors');

sequelize.sync();

let test = []
app.use(express.static(`${__dirname}/src`));
app.use(express.json());
app.use(cors());

app.post("/fetch", (req, res) => {
	console.log(req.body[0].mood);
	
	for (let i = 0; i < req.body.length; i++)
	model.Market.create({
	"id": req.body[i].id,
	"name": req.body[i].name,
	"categ": req.body[i].categ,
	"likenum": req.body[i].likenum,
	"local": req.body[i].local,
	"seatnum": req.body[i].seatnum,
	"M_1": req.body[i].M_1,
	"M_2": req.body[i].M_2,
	"M_3": req.body[i].M_3,
	"M_4": req.body[i].M_4,
	"foodtag": req.body[i].foodtag,
	"mood": req.body[i].mood,
	"weather": req.body[i].weather,
	"image": req.body[i].image
	});
});

app.get("/giveAll", (req, res) => {
	model.Market.findAll({
		where:{}
	}).then(result => { 
		res.send(req.body);
		return req.body;
	}).catch(err => {
		console.log(err);
	});
});

app.get("/give:number", (req, res) => {
	let number = req.params.number;
	model.Market.findAll({
		where:{
			id: number
		}
	}).then(result => { 
		res.json(req.body);
		return req.body;
	}).catch(err => {
		console.log(err);
	});
});

app.get("/gettest", (req, res) => {
	res.send("give one");
});

module.exports = app;
