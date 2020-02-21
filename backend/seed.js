const db = require('./database')

db.serialize(()=>{
	const dropTableUser = 'DROP TABLE user'
	const dropTableEntry = 'DROP TABLE entry'
	const dropTableTag = 'DROP TABLE tag'
	const dropTableMapInfo = 'DROP TABLE map'
	const createTableUser = 'CREATE TABLE IF NOT EXISTS user (display_name TEXT, email TEXT UNIQUE, password TEXT, picture TEXT)'
	const createTableEntry = 'CREATE TABLE IF NOT EXISTS entry (user_id INTEGER, month INTEGER, day INTEGER, year INTEGER, time TEXT, entry TEXT, tag_id INTEGER, picture TEXT)'
	const createTableTag = 'CREATE TABLE IF NOT EXISTS tag (user_id INTEGER, tag_name TEXT)'
	const createTableMapInfo = 'CREATE TABLE IF NOT EXISTS map (lat INTEGER, lon INTEGER)'

	db.run(dropTableUser, (err)=>{
		if(err){
			console.log('failed to drop user table', err)
		}else{
			console.log('dropped user table')
		}
	})

	db.run(dropTableEntry, (err)=>{
		if(err){
			console.log('failed to drop entry table', err)
		}else{
			console.log('dropped entry table')
		}
	})

	db.run(dropTableTag, (err)=>{
		if(err){
			console.log('failed to drop tag table', err)
		}else{
			console.log('dropped tag table')
		}
	})

	db.run(dropTableMapInfo, (err)=>{
		if(err){
			console.log('failed to drop map table', err)
		}else{
			console.log('dropped map table')
		}
	})

	db.run(createTableUser, (err)=>{
		if(err){
			console.log('failed to create user table', err)
		}else{
			console.log('created user table')
		}
	})

	db.run(createTableEntry, (err)=>{
		if(err){
			console.log('failed to create entry table', err)
		}else{
			console.log('created entry table')
		}
	})

	db.run(createTableTag, (err)=>{
		if(err){
			console.log('failed to create entry table', err)
		}else{
			console.log('created tag table')
		}
	})

	db.run(createTableMapInfo, (err)=>{
		if(err){
			console.log('failed to create map table', err)
		}else{
			console.log('created map table')
		}
	})
})