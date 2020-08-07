const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
	
      res.send('hello from route folder')

})

router.get('/home',  (req, res, next) => {

     res.render('home', null)
   })


router.get('/json',  (req, res, next) => {

     res.json({

     greeting: 'hello from route folder'

     })

   })

module.exports = router