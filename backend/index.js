const express = require('express')
const userRouter = require('./routes/user')
const entryRouter = require('./routes/entry')

const app = express()
app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/entry', entryRouter)


app.get('/', (req, res)=>{
	res.send('backend')
})

app.listen(9000, ()=>{
	console.log('Listening on port 9000')
})