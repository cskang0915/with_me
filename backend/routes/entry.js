const entryRouter = require('express').Router()
const database = require('../database')
const authRequired = require('../middleware/authRequired')

// POST request to create a new entry
entryRouter.post('/new', authRequired, (req, res) => {
	const createNewEntry = `INSERT INTO entry VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

	database.run(
		createNewEntry,
		[
			req.userId,
			req.body.month,
			req.body.day,
			req.body.year,
			req.body.time,
			req.body.entry,
			req.body.collection_id,
			req.body.picture
		], (err) => {
			if(err){
				console.log(err)
				return res.status(500).json({
					status: 500,
					message: 'something went wrong. try again.'
				})
			}else{
				console.log('here')
				return res.status(200).json({
					status: 200,
					message: 'created a new entry.'
				})
			}
	})
})

// GET request for all entries
entryRouter.get('/get/all', authRequired, (req, res) => {
	const getAllEntry = `
	SELECT *, entry.rowid FROM entry
	JOIN collection ON collection.rowid = entry.collection_id
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

// GET by month
entryRouter.get('/get/month/:month', authRequired, (req, res) => {
	const getByMonth = `
	SELECT *, entry.rowid FROM entry
	JOIN collection ON collection.rowid = entry.collection_id
	WHERE entry.user_id = ${req.userId}
	AND entry.month = ${req.params.month}
	`

	database.all(getByMonth, (err, entry) => {
		if(err){
			return res.status(500).json({
				status: 500,
				message: 'something went wrong. try again.'
			})
		}else {
			return res.status(200).json(entry)
		}
	})
})

// GET by day
entryRouter.get('/get/day/:day', authRequired, (req, res) => {
	const getByDay = `
	SELECT *, entry.rowid FROM entry
	JOIN collection ON collection.rowid = entry.collection_id
	WHERE entry.user_id = ${req.userId}
	AND entry.day = ${req.params.day}
	`

	database.all(getByDay, (err, entry) => {
		if(err){
			return res.status(500).json({
				status: 500,
				message: 'something went wrong. try again.'
			})
		}else {
			return res.status(200).json(entry)
		}
	})
})

// GET by year
entryRouter.get('/get/year/:year', authRequired, (req, res) => {
	const getByYear = `
	SELECT *, entry.rowid FROM entry
	JOIN collection ON collection.rowid = entry.collection_id
	WHERE entry.user_id = ${req.userId}
	AND entry.day = ${req.params.year}
	`

	database.all(getByYear, (err, entry) => {
		if(err){
			return res.status(500).json({
				status: 500,
				message: 'something went wrong. try again'
			})
		}else {
			return res.status(200).json(entry)
		}
	})
})

// GET by month/day
entryRouter.get('/get/monthday/:month/:day', authRequired, (req, res) => {
	const getByMonthDay = `
	SELECT *, entry.rowid FROM entry
	JOIN collection ON collection.rowid = entry.collection_id
	WHERE entry.user_id = ${req.userId}
	AND entry.month = ${req.params.month}
	AND entry.day = ${req.params.day}
	`

	database.all(getByMonthDay, (err, entry) => {
		if(err) {
			return res.status(500).json({
				status: 500,
				message: 'something went wrong. try again.'
			})
		}else {
			return res.status(200).json(entry)
		}
	})
})

// GET by month/year
entryRouter.get('/get/monthyear/:month/:year', authRequired, (req, res) => {
	const getByMonthYear = `
	SELECT *, entry.rowid FROM entry
	JOIN collection ON collection.rowid = entry.collection_id
	WHERE entry.user_id = ${req.userId}
	AND entry.month = ${req.params.month}
	AND entry.year = ${req.params.year}
	`

	database.all(getByMonthYear, (err, entry) => {
		if(err) {
			return res.status(500).json({
				status: 500,
				message: 'something went wrong. try again.'
			})
		}else {
			return res.status(200).json(entry)
		}
	})
})

// GET by day/year
entryRouter.get('/get/dayyear/:day/:year', authRequired, (req, res) => {
	const getByDayYear = `
	SELECT *, entry.rowid FROM entry
	JOIN collection ON collection.rowid = entry.collection_id
	WHERE entry.user_id = ${req.userId}
	AND entry.day = ${req.params.day}
	AND entry.year = ${req.params.year}
	`

	database.all(getByDayYear, (err, entry) => {
		if(err) {
			return res.status(500).json({
				status: 500,
				message: 'something went wrong. try again.'
			})
		}else {
			return res.status(200).json(entry)
		}
	})
})

// GET by month/day/year
entryRouter.get('/get/monthdayyear/:month/:day/:year', authRequired, (req, res) => {
	const getByMonthDayYear = `
	SELECT *, entry.rowid FROM entry
	JOIN collection ON collection.rowid = entry.collection_id
	WHERE entry.user_id = ${req.userId}
	AND entry.month = ${req.params.month}
	AND entry.day = ${req.params.day}
	AND entry.year = ${req.params.year}
	`

	database.all(getByMonthDayYear, (err, entry) => {
		if(err) {
			return res.status(500).json({
				status: 500,
				message: 'something went wrong. try again.'
			})
		}else {
			return res.status(200).json(entry)
		}
	})
})

// GET by collection
entryRouter.get('/get/collection/:id', authRequired, (req, res) => {
	const getByCollection = `
	SELECT *, entry.rowid FROM entry
	JOIN collection ON collection.rowid = entry.collection_id
	WHERE entry.user_id = ${req.userId}
	AND entry.collection_id = ${req.params.id}
	`

	database.all(getByCollection, (err, entry) => {
		if(err) {
			return res.status(500).json({
				status: 500,
				message: 'something went wrong. try again.'
			})
		}else if(entry.length === 0){
			return res.status(200).json({
				message: 'collection not found'
			})
		}else {
			return res.status(200).json(entry)
		}
	})

})

// GET by location

// GET request for one entry by month and day
// entryRouter.get('/get/:month/:day', authRequired, (req, res) => {
// 	const getOneEntry = `
// 	SELECT *, entry.rowid FROM entry
// 	JOIN collection ON collection.rowid = entry.collection_id
// 	WHERE entry.user_id = ${req.userId}
// 	AND entry.month = ${req.params.month}
// 	AND entry.day = ${req.params.day}
// 	`

// 	database.all(getOneEntry, (err, entry) => {
// 		if(err){
// 			return res.status(500).json({
// 				status: 500,
// 				message: 'something went wrong. try again.'
// 			})
// 		}else if(entry.length === 0) {
// 			return res.status(200).json('No entries on this date.')
// 		}else {
// 			return res.status(200).json(entry)
// 		}
// 	})
// })

// DELETE request to delete an entry by month, day and rowid
entryRouter.delete('/delete/:month/:day/:rowid', authRequired, (req, res) => {
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

module.exports = entryRouter