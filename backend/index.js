let express = require('express')
let entryRouter = require('./routes/entry')
let userRouter = require('./routes/entry')

let app = express()

app.use('/api/user', userRouter)
app.use('/api/entry', entryRouter)


app.get('/', (req, res)=>{
	res.send('')
})

app.listen(9000, ()=>{
	console.log('Listening on port 9000')
})