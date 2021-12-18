"use strict";
const express = require("express");
const app = express();
const cors = require('cors');
const sequelize = require("./models").sequelize;
const model = require("./models");

sequelize.sync();

let test = []
app.use(express.static(`${__dirname}/src`));
app.use(express.json());
app.use(cors());

app.post("/upup", (req, res) => {
	//const bodyObject = JSON.parse(req.body);
	//console.log(bodyObject);
	//console.log(req.body[0]);
	console.log(req.body[0].mood);
	
	for (let i = 0; i < req.body.length; i++)
	model.Market.create({
	"id": req.body[i].id,
	"name": req.body[i].name,
	"foodtag": req.body[i].foodtag,
	"likenum": req.body[i].likenum,
	"local": req.body[i].local,
	"seatnum": req.body[i].seatnum,
	"M_1": req.body[i].M_1,
	"M_2": req.body[i].M_2,
	"M_3": req.body[i].M_3,
	"M_4": req.body[i].M_4,
	"categ": req.body[i].categ,
	"mood": req.body[i].mood,
	"weather": req.body[i].weather,
	"image": req.body[i].image
	});
	
	
});
app.get("/give", (req, res) => {
	let result;
	model.Market.findAll({
		where:{
		id: 1
		}
	}).then(result => { 
		res.send(req.body[0]);
		return req.body[0];
	}).catch(err => {
		console.log(err);
	});
	
});
app.get("/test2", (req, res) => {
	//	console.log(req.body);
	    console.log("아닙니다.");
	//if(!req)
	//if(req.body)
	//	test.push(req.body);	
	res.send(test);
	//else
	//	test.push(req.body);
	//	res.send(test);
});
app.post("/test", (req, res) => {
//	let test = JSON.parse(req);
	console.log(req.body);
	test.push(req.body);
	res.redirect("/test2");
	//res.redirect("/test");
//	console.log(req);
	/*model.Market.create({
	
	});
	*/
	console.log("아닙니다2");
//	res.send("안녕하세요");
	
});

app.get("/star", (req, res) => {
	const bodyObject = JSON.parse(req.body);
	model.Market.findAll({
		where:{
		id: bodyObject.id
		}
	}).then(result => { return {"star": result.star,"number": result.number};
	}).catch(err => {
		console.log(err);
	});
});

app.post("/star", (req, res) => {
	const bodyObject = JSON.parse(req.body);
	model.Market.update({
	"star": bodyObject.star,
	"number": bodyObject.number
	},{
	where: {id : bodyObject.id}
	});
});

app.post("/star2", (req, res) => {
	        //const bodyObject = JSON.parse(req.body);
	const bodyObject = req.body;
	console.log(bodyObject);
	model.Market.findAll({
		where: {id : bodyObject.id}
	 }).then(result => { res.send({"star": result[0].dataValues.star});
	 });
});
app.use(function (err, req, res, next) {
	    console.error(err.stack);
	    res.status(500).send('Something broke!');
});

module.exports = app;
