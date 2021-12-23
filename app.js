"use strict";
// import dotenv from 'dotenv'
const express = require("express");
const app = express();
const model = require("./models");
const sequelize = require("./models").sequelize;
const request = require('request');
const cors = require('cors');
//const axios = require('axios');

require("dotenv").config();
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
			"address": req.body[i].address,
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
	res.send("입력완료");
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
//식당 DB 일부 수정
app.put("/market:market_id/edit", (req, res) => {
	let market_id = req.params.market_id;
	model.Market.update({
		"M_1": req.body.M_1,
		"M_2": req.body.M_2,
		"M_3": req.body.M_3,
		"M_4": req.body.M_4
	}, {
		where: {
			"id": market_id
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
	for (let i = 0; i < req.body.length; i++)
		model.Review.create({
			"market_id": req.body[i].market_id,
			"user_id": req.body[i].user_id,
			"star_num": req.body[i].star_num,
			"content": req.body[i].content
		});
	res.send("입력완료");
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
//리뷰 DB 일부 전송(식당)
app.get("/review:market_id", (req, res) => {
	let market_id = req.params.market_id;
	model.Review.findAll({
		where: {
			"market_id": market_id
		}
	}).then(result => {
		res.json(result);
		return result;
	}).catch(err => {
		console.log(err);
	});
});
//리뷰 DB 일부 전송(유저)
app.get("/review:market_id/:user_id", (req, res) => {
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
//리뷰 DB 일부 수정(유저)
app.put("/review:market_id/:user_id", (req, res) => {
	let market_id = req.params.market_id;
	let user_id = req.params.user_id;
	model.Market.update({
		star_num: req.body.star_num,
		content: req.body.content
	}, {
		where: {
			market_id: market_id,
			user_id: user_id
		}
	}).then(result => {
		res.json(result);
		return result;
	}).catch(err => {
		console.log(err);
	});
});
//리뷰 DB 일부 삭제
app.delete("/review:market_id/:user_id", (req, res) => {
	let user_id = req.params.user_id;
	let market_id = req.params.market_id;
	model.Review.findAll({
		where: {
			"user_id": user_id,
			"market_id": market_id
		}
	}).then(result => {
		if (result == null)
			res.send(`${market_id}의 식당에 ${user_id}가 쓴 리뷰는 존재하지 않습니다.`);
	}).catch(err => {});

	model.Review.destroy({
		where: {
			"user_id": user_id,
			"market_id": market_id
		}
	}).then(result => {
		res.send(`${market_id}의 식당에 ${user_id}가 쓴 리뷰가 삭제되었습니다.`);
	}).catch(err => {
		console.log(err);
	});
});
//User
//유저 DB 입력
app.post("/fetchUser", (req, res) => {
	for (let i = 0; i < req.body.length; i++)
		model.User.create({
			"user_id": req.body[i].user_id,
			"tag_list": req.body[i].tag_list,
			"like_list": req.body[i].like_list,
			"M_1": req.body[i].M_1,
			"M_2": req.body[i].M_2,
			"M_3": req.body[i].M_3,
			"M_4": req.body[i].M_4,
			"local": req.body[i].local
		});
	res.send("입력완료");
});
//유저 DB 전송
app.get("/userAll", (req, res) => {
	model.User.findAll({
		where: {}
	}).then(result => {
		res.send(result);
		return result;
	}).catch(err => {
		console.log(err);
	});
});
//유저 DB 일부 전송
app.get("/user:user_id", (req, res) => {
	let user_id = req.params.user_id;
	model.User.findAll({
		where: {
			"user_id": user_id
		}
	}).then(result => {
		res.send(result);
		return result;
	}).catch(err => {
		console.log(err);
	});
});
//유저 DB 일부 수정(유저)
app.put("/user:user_id/edit", (req, res) => {
	let user_id = req.params.user_id;
	model.User.update({
		"tag_list": req.body.tag_list,
		"like_list": req.body.like_list,
		"M_1": req.body.M_1,
		"M_2": req.body.M_2,
		"M_3": req.body.M_3,
		"M_4": req.body.M_4,
		"local": req.body.local
	}, {
		where: {
			"user_id": user_id
		}
	}).then(result => {
		res.json(result);
		return result;
	}).catch(err => {
		console.log(err);
	});
});
//유저가 쓴 리뷰 받기
app.get("/user:user_id/review", (req, res) => {
	let user_id = req.params.user_id;
	model.Review.findAll({
		where: {
			"user_id": user_id
		}
	}).then(result => {
		res.json(result);
		return result;
	}).catch(err => {
		console.log(err);
	});
});
//유저 DB 일부 삭제
app.delete("/user:user_id/delete", (req, res) => {
	let user_id = req.params.user_id;
	let market_id = req.params.market_id;
	model.User.findAll({
		where: {
			"user_id": user_id
		}
	}).then(result => {
		if (result == null)
			res.send(`${user_id}는 존재하지 않습니다.`);
	}).catch(err => {});

	model.User.destroy({
		where: {
			"user_id": user_id
		}
	}).then(result => {
		res.send(`${user_id}는 삭제되었습니다.`);
	}).catch(err => {
		console.log(err);
	});
});
//유저 위치 검색
async function userSearch(user_id) {
	let user_local;
	await model.User.findAll({
		where: {
			"user_id": user_id
		}
	}).then(result => {
		if (result != null) {
			if (result[0].local == null) {
				user_local = [0, 0];
			} else {
				user_local = result[0].local;
			}
		}
	}).catch(err => {
		console.log(err);
	});
	return user_local
}
//식당검색
async function marketSearch(market_id) {
	let market_name;
	await model.Market.findAll({
		where: {
			id: market_id
		}
	}).then(result => {
		if (result != null) {
			market_name = result[0].address;
		} else {
			return res.send("nothing here");
		}
	}).catch(err => {
		console.log(err);
	});
	return market_name;
}
//카카오에서 주소 가져오기
async function kakaodata(user_local, market_name, callback) {
	let stringer;
	let options = {
		headers: {
			Authorization: 'KakaoAK 7ad583a800060a5dc0f42a89897b2c5c'
		},
		url: `https://dapi.kakao.com/v2/local/search/address.json?query=` + encodeURI(market_name),
	};
	fetch(options.url, options.headers).then(function(response){
		stringer = response.json();
		return response.json();
	});
	// await request.get(options, (err, res, body) => {
	// 	let data = JSON.parse(body);
	// 	stringer = {
	// 		"market_local": [`${data.documents[0].x}`, `${data.documents[0].y}`],
	// 		"user_local": [`${user_local}`]
	// 	};
	// 	callback(null, stringer);
	// });
	return stringer;
}

app.get("/map:user_id/:market_id", async (req, res) => {
	let user_id = req.params.user_id;
	let market_id = req.params.market_id;

	let user_local = await userSearch(user_id);
	let market_name = await marketSearch(market_id);
	let localfull = await kakaodata(user_local, market_name);

	console.log(user_local);
	console.log(market_name);
	console.log(localfull);
	return 0;
});

module.exports = app;
