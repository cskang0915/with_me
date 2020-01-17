const express = require('express')
const database = require('../database')
const authRequired = require('../middleware/authRequired')

const router = express.Router()

// POST request to create a new entry
router.post('/new', authRequired, (req, res) => {
	const createNewEntry = `INSERT INTO entry VALUES (?, ?, ?, ?, ?, ?)`

	database.run(
		createNewEntry,
		[
			req.userId,
			req.body.month,
			req.body.day,
			req.body.year,
			req.body.time,
			req.body.entry
		], (err) => {
			if(err){
				console.log(err)
				return res.status(500).json({
					status: 500,
					message: 'something went wrong. try again.'
				})
			}else{
				return res.status(200).json({
					status: 200,
					message: 'created a new entry.'
				})
			}
	})
})

// GET request for all entries
router.get('/get/all', authRequired, (req, res) => {
	const getAllEntry = `
	SELECT *, entry.rowid FROM entry
	WHERE entry.user_id = ${req.userId}
	`

	database.all(getAllEntry, (err, entry) => {
		if(err){
			return res.status(500).json({
				status: 500,
				message: 'something went wrong. try again.'
			})
		}else{
			return res.status(200).json(entry)
		}
	})
})

// GET request for one entry by month and day
router.get('/get/:month/:day', authRequired, (req, res) => {
	const getOneEntry = `
	SELECT *, entry.rowid FROM entry
	WHERE entry.user_id = ${req.userId}
	AND entry.month = ${req.params.month}
	AND entry.day = ${req.params.day}
	`

	database.all(getOneEntry, (err, entry) => {
		if(err){
			return res.status(500).json({
				status: 500,
				message: 'something went wrong. try again.'
			})
		}else{
			return res.status(200).json(entry)
		}
	})
})

// DELETE request to delete an entry by month, day and rowid
router.delete('/delete/:month/:day/:rowid', authRequired, (req, res) => {
	const deleteOneEntry = `
	DELETE FROM entry WHERE entry.user_id = ${req.userId}
	AND entry.month = ${req.params.month}
	AND entry.day = ${req.params.day}
	AND entry.rowid = ${req.params.rowid}
	`

	database.run(deleteOneEntry, (err) => {
		if(err){
			return res.status(500).json({
				status: 500,
				message: 'something went wrong. try again.'
			})
		}else{
			return res.status(200).json({
				status: 200,
				message: 'deleted entry'
			})
		}
	})
})

module.exports = router