const db = require('./database')

db.serialize(()=>{
	const dropTableUser = 'DROP TABLE user'
	const dropTableEntry = 'DROP TABLE entry'
	const dropTableCollection = 'DROP TABLE collection'
	const dropTableMapInfo = 'DROP TABLE map'
	const createTableUser = 'CREATE TABLE IF NOT EXISTS user (display_name TEXT, email TEXT UNIQUE, password TEXT, picture TEXT)'
	const createTableEntry = 'CREATE TABLE IF NOT EXISTS entry (user_id INTEGER, month INTEGER, day INTEGER, year INTEGER, time TEXT, entry TEXT, collection_id INTEGER, picture TEXT)'
	const createTableCollection = 'CREATE TABLE IF NOT EXISTS collection (user_id INTEGER, collection_name TEXT)'
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

	db.run(dropTableCollection, (err)=>{
		if(err){
			console.log('failed to drop collection table', err)
		}else{
			console.log('dropped collection table')
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

	db.run(createTableCollection, (err)=>{
		if(err){
			console.log('failed to create entry table', err)
		}else{
			console.log('created collection table')
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