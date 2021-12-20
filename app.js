"use strict";
const express = require("express");
const app = express();
const model = require("./models");
const sequelize = require("./models").sequelize;
const cors = require('cors');

sequelize.sync();

app.use(express.static(`${__dirname}/src`));
app.use(express.json());
app.use(cors());

//Market
//새로운 식당 입력
app.post("/fetchMarket", (req, res) => {
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
//좋아요 개수 수정
app.put("/heart:market_id/:number", (req, res) => {
	let market_id = req.params.market_id;
	let number = req.params.number;
	model.Market.update({
		likenum: number
	}, {
		where: {
			id: market_id
		}
	}).then(result => {
		res.json(result);
		return result;
	}).catch(err => {
		console.log(err);
	});
});
//식당 DB 모두 전송
app.get("/marketAll", (req, res) => {
	model.Market.findAll({
		where: {}
	}).then(result => {
		res.send(result);
		return result;
	}).catch(err => {
		console.log(err);
	});
});
//식당 DB 일부 전송
app.get("/market:number", (req, res) => {
	let number = req.params.number;
	model.Market.findAll({
		where: {
			id: number
		}
	}).then(result => {
		res.json(result);
		return result;
	}).catch(err => {
		console.log(err);
	});
});
//Review
//리뷰 입력
app.post("/fetchReview", (req, res) => {
	model.Review.create({
		"market_id": req.body.market_id,
		"user_id": req.body.user_id,
		"star_num": req.body.star_num,
		"content": req.body.content
	});
});
//리뷰 DB 모두 전송
app.get("/reviewAll", (req, res) => {
	model.Review.findAll({
		where: {}
	}).then(result => {
		res.send(result);
		return result;
	}).catch(err => {
		console.log(err);
	});
});
//리뷰 DB 일부 전송
app.get("/review:user_id/:market_id", (req, res) => {
	let user_id = req.params.user_id;
	let market_id = req.params.market_id;
	model.Review.findAll({
		where: {
			"user_id": user_id,
			"market_id": market_id
		}
	}).then(result => {
		res.json(result);
		return result;
	}).catch(err => {
		console.log(err);
	});
});

app.get("/gettest", (req, res) => {
	res.send("give one");
});

module.exports = app;
