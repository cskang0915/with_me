const collectionRouter = require('express').Router()
const database = require('../database')
const authRequired = require('../middleware/authRequired')

// POST new collections
collectionRouter.post('/new', authRequired, (req, res) => {
  const createNewCollection = 'INSERT INTO collection VALUES (?, ?)'

  database.run(createNewCollection, [req.userId, req.collection_name], (err) => {
    if(err){
      return res.status(500).json({
        status: 500,
        message: 'something went wrong. try again.'
      })
    }else{
      return res.status(200).json({
        status: 200,
        message: 'created a new collection.'
      })
    }
  })
})

// GET all collections
collectionRouter.get('/all', authRequired, (req, res) => {
  const getAllCollection = `
  SELECT *, collection.rowid FROM collection
  WHERE collection.user_id = ${req.userId}`

  database.all(getAllCollection, (err, collection) => {
    if(err){
      return res.status(500).json({
        status: 500,
        message: 'something went wrong. try again.'
      })
    }else{
      return res.status(200).json(collection)
    }
  })
})

// GET one collection
collectionRouter.get('/get/:id', authRequired, (req, res) => {
  const getOneCollection = `
  SELECT *, collection.rowid FROM collection
  WHERE collection.user_id = ${req.userId}
  AND collection.rowid = ${req.params.id}`

  database.all(getOneCollection, (err, collection) => {
    if(err){
      return res.status(500).json({
        status: 500,
        message: 'something went wrong. try again'
      })
    }else{
      return res.status(200).json(collection)
    }
  })
})

module.exports = collectionRouter