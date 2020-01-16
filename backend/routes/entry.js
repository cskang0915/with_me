let express = require('express')
let database = require('../database')

let router = express.Router()

// C

router.post('/create', authRequired, (req, res)=>{
	const newEntry = [...Object.values(req.body)]
	const createNewEntry = 'INSERT INTO entry VALUES (?, ?, ?, ?, ?, ?)'
	database.run(createNewEntry, newEntry, (err)=>{
		if(err){
			console.log('adding new entry failed', err)
			res.sendStatus(500)
		}else{
			console.log('added new entry')
			res.sendStatus(200)
		}
	})
})

// R

router.get('/get/all', authRequired, (req, res)=>{
	const getAllEntry = `
		SELECT * FROM entry
		WHERE user_id = ${req.user}
	`
})

// D

module.exports = router