const userRouter = require('express').Router()
const database = require('../database')
const validate = require('../validation/formValidation')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authRequired = require('../middleware/authRequired')

require('dotenv').config()

// POST request to create a new user
userRouter.post('/register', (req, res) => {
	const {errors, notValid} = validate(req.body)

	if(notValid){
		return res.status(400).json({
			status: 400,
			errors
		})
	}

	const checkUser = `SELECT * FROM user WHERE user.email = ${req.body.email}`

	database.all(checkUser, (err, checkedUser) => {
		if(checkedUser){
			return res.status(400).json({
				status: 400,
				message: 'email is already registered.'
			})
		}
		bcrypt.genSalt(10, (err, salt) => {
			if(err){
				return res.status(500).json({
					status: 500,
					message: 'something went wrong. try again.'
				})
			}
			bcrypt.hash(req.body.password, salt, (err, hash) => {
				if(err){
					return res.status(500).json({
						status: 500,
						message: 'something went wrong. try again.'
					})
				}

				const createNewUser = `INSERT INTO user VALUES (?, ?, ?, ?)`
				
				database.run(createNewUser, [req.body.display_name, req.body.email, hash, null], (err) => {
					if(err){
						console.log(err)
						return res.status(500).json({
							status: 500,
							message: 'something went wrong. try again.'
						})
					}else{
						res.status(201).json({
							status: 201,
							message: 'successfully registered.'
						})
					}
				})
			})
		})

	})
})

// POST request to log in a user
userRouter.post('/login', (req, res) => {
	if(!req.body.email || !req.body.password){
		return res.status(400).json({
			status: 400,
			message: 'enter email and password.'
		})
	}

	const checkUser = `
	SELECT *, rowid FROM user
	WHERE user.email = ?
	`

	database.all(checkUser, [req.body.email], (err, checkedUser) => {
		if(err){
			return res.status(500).json({
				status: 500,
				message: 'something went wrong. try again.'
			})
		}else if(checkedUser.length === 0){
			return res.status(400).json({
				status: 400,
				message: 'email or password is incorrect.'
			})
		}else{
			bcrypt.compare(req.body.password, checkedUser[0].password, (err, isMatch) => {
				if(err){
					return res.status(500).json({
						status: 500,
						message: 'something went wrong. try again.'
					})
				}else if(!isMatch){
					return res.status(400).json({
						status: 400,
						message: 'email or password is incorrect.'
					})
				}else if(isMatch){
					let user = {
						id: checkedUser[0].rowid
					}

					jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '1hr'}, (err, signedJwt) => {
						if(err){
							return res.status(500).json({
								status: 500,
								message: 'something went wrong. try again.'
							})
						}else{
							return res.status(200).json({
								status: 200,
								message: 'successfully logged in.',
								id: user,
								signedJwt
							})
						}
					})
				}
			})
		}
	})
})

// GET one request to get info for an authorized user
userRouter.get('/info', authRequired, (req, res) => {
	// const username = req.params.username
	// console.log(username)
	const getOneUsername = `
	SELECT * FROM user
	WHERE user.rowid = ${req.userId}
	`

	database.all(getOneUsername, (err, user) => {
		if(err){
			console.log(err)
			return res.status(500).json({
				status: 500,
				message: 'something went wrong. try again.'
			})
		}else{
			return res.status(200).json({
				rowid: req.userId,
				user
			})
		}
	})
})

// PUT request to update an authorized user
userRouter.put('/update', authRequired, (req, res) => {
	bcrypt.genSalt(10, (err, salt) => {
		if(err){
			return res.status(500).json({
				status:500,
				message: 'something went wrong. try again.'
			})
		}
		bcrypt.hash(req.body.password, salt, (err, hash) => {
			if(err){
				return res.status(500).json({
					status: 500,
					message: 'something went wrong. try again.'
				})
			}

			const updateUser = `
			UPDATE user SET display_name = ?, email = ?, password = ?, picture = ?
			WHERE user.rowid = ${req.userId}
			`
			
			database.run(updateUser, [req.body.display_name, req.body.email, hash, null], (err) => {
				if(err){
					return res.status(500).json({
						status: 500,
						message: 'something went wrong. try again.'
					})
				}else{
					return res.status(200).json({
						status: 200,
						message: 'successfully updated user info.'
					})
				}
			})
		})
	})
})

// DELETE request to delete an authorized user
userRouter.delete('/delete', authRequired, (req, res) => {
	const deleteUser = `DELETE FROM user WHERE user.rowid = ${req.userId}`

	database.run(deleteUser, (err) => {
		if(err){
			console.log(err)
			return res.status(500).json({
				status: 500,
				message: 'something went wrong. try again.'
			})
		}else{
			const deleteEntry = `DELETE FROM entry WHERE entry.user_id = ${req.userId}`

			database.run(deleteEntry, (err) => {
				if(err){
					return res.status(500).json({
						status: 500,
						message: 'something went wrong. try again.'
					})
				}else{
					const deleteTag = `DELETE FROM tag WHERE tag.user_id = ${req.userId}`

					database.run(deleteTag, (err) => {
						if(err){
							return res.status(500).json({
								status: 500,
								message: 'something went wrong. try again.'
							})
						}else{
							return res.status(200).json({
								status: 200,
								message: 'successfully deleted user and entry'
							})
						}
					})
				}
			})
		}
	})
})

module.exports = userRouter