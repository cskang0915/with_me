let express = require('express')
let database = require('../database')
let authRequired = require('../middleware/authRequired')

let router = express.Router()

// C

// router.post('/register', (req, res)=>{
// 	const newEntry = [...Object.values(req.body)]
// 	const createNewEntry = 'INSERT INTO entry VALUES (?, ?, ?, ?, ?, ?)'
// 	database.run(createNewEntry, newEntry, (err)=>{
// 		if(err){
// 			console.log('adding new entry failed', err)
// 			res.sendStatus(500)
// 		}else{
// 			console.log('added new entry')
// 			res.sendStatus(200)
// 		}
// 	})
// })

// R

router.get('/get/all', (req, res)=>{
	const getAllEntry = `
		SELECT * FROM entry
		WHERE user_id = ${req.user}
	`
})

// D

module.exports = router