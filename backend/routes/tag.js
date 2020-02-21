const tagRouter = require('express').Router()
const database = require('../database')
const authRequired = require('../middleware/authRequired')

// POST new tags
tagRouter.post('/new', authRequired, (req, res) => {
  const createNewTag = 'INSERT INTO tag VALUES (?, ?)'

  database.run(createNewTag, [req.userId, req.tag_name], (err) => {
    if(err){
      return res.status(500).json({
        status: 500,
        message: 'something went wrong. try again.'
      })
    }else{
      return res.status(200).json({
        status: 200,
        message: 'created a new tag.'
      })
    }
  })
})

// GET all tags
tagRouter.get('/all', authRequired, (req, res) => {
  const getAllTag = `
  SELECT *, tag.rowid FROM tag
  WHERE tag.user_id = ${req.userId}`

  database.all(getAllTag, (err, tag) => {
    if(err){
      return res.status(500).json({
        status: 500,
        message: 'something went wrong. try again.'
      })
    }else{
      return res.status(200).json(tag)
    }
  })
})

// GET one tag
tagRouter.get('/get/:id', authRequired, (req, res) => {
  const getOneTag = `
  SELECT *, tag.rowid FROM tag
  WHERE tag.user_id = ${req.userId}
  AND tag.rowid = ${req.params.id}`

  database.all(getOneTag, (err, tag) => {
    if(err){
      return res.status(500).json({
        status: 500,
        message: 'something went wrong. try again'
      })
    }else{
      return res.status(200).json(tag)
    }
  })
})

