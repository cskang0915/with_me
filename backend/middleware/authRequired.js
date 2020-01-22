const express = require('express')
const database = require('../database')
const jwt = require('jsonwebtoken')

require('dotenv').config()

module.exports = (req, res, next) => {
	const bearerHeader = req.headers['authorization']

	if(typeof bearerHeader !== 'undefined'){
		const bearer = bearerHeader.split(' ')
		const bearerToken = bearer[1]
		req.token = bearerToken

		let verified = jwt.verify(bearerToken, process.env.JWT_SECRET)
		req.userId = verified.id

		const checkUser = `SELECT *, rowid FROM user WHERE user.rowid = ${verified.id}`

		database.all(checkUser, (err, checkedUser) => {
			if(err){
				return res.status(500).json({
					status: 500,
					message: 'something went wrong. try again.'
				})
			}else if(checkedUser.length === 0){
				return res.status(403).json({
					status: 403,
					message: 'requires permissions.'
				})
			}else{
				next()
			}
		})
	}else{
		return res.status(403).json({
			status: 403,
			message: 'requires permissions.'
		})
	}
}