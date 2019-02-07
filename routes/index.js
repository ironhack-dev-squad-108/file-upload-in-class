const express = require('express')
const multer = require('multer')
const Picture = require('../models/Picture')
const router = express.Router()

router.get('/', (req, res, next) => {
  Picture.find()
    .then(pictures => {
      res.render('index', { pictures })
    })
    .catch(next)
})

// multer creates a tool to parse an input with `type="file"`
const upload = multer({ dest: './public/uploads/' })

// `upload.single('photo')` takes the content from <input type="file" name="photo"> and save the information inside req.file
router.post('/upload', upload.single('photo'), (req, res, next) => {
  console.log('TCL: req.body', req.body)
  console.log('TCL: req.file', req.file)

  const pic = new Picture({
    name: req.body.name,
    path: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname
  })
  pic.save()
    .then(() => {
      res.redirect('/')
    })
    .catch(next)
})

module.exports = router
