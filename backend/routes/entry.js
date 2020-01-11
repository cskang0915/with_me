let express = require('express')
let database = require('../database')

let router = express.Router()

// POST a new diary entry

router.post('/create', (req, res)=>{
	const newEntry = [...Object.values(req.body)]
	const createNewEntry = 'INSERT INTO entry VALUES (?, ?, ?, ?, ?, ?, ?)'
})



// R
// D

module.exports = router