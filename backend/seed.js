const db = require('./database')

db.serialize(()=>{
	const dropTableEntry = 'DROP TABLE entry_table'
	const dropTableMapInfo = 'DROP TABLE map_info_table'
	const createTableEntry = 'CREATE TABLE IF NOT EXISTS entry_table (month INTEGER, day INTEGER, year INTEGER, time TEXT, entry TEXT)'
	const createTableMapInfo = 'CREATE TABLE IF NOT EXISTS map_info_table (lat INTEGER, lon INTEGER)'

	db.run(dropTableEntry, (err)=>{
		if(err){
			console.log('failed to drop entry table', err)
		}else{
			console.log('dropped entry table')
		}
	})

	db.run(dropTableMapInfo, (err)=>{
		if(err){
			console.log('failed to drop map_info table', err)
		}else{
			console.log('dropped map_info table')
		}
	})

	db.run(createTableEntry, (err)=>{
		if(err){
			console.log('failed to create entry table', err)
		}else{
			console.log('created entry table')
		}
	})

	db.run(createTableMapInfo, (err)=>{
		if(err){
			console.log('failed to create map_info table', err)
		}else{
			console.log('created map_info table')
		}
	})
})