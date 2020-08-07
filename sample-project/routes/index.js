// Full Documentation - https://docs.turbo360.co
const express = require('express')
const router = express.Router()


const profiles = {

	sjobs: {
		username:'sjobs',
		image:'/images/shakil-cv.jpg',
		name: 'hakil',
		company: 'self',
		languages: ['pyhton', 'java', 'c#']

	},

	bgates: {
		username:'bgates',
		image:'/images/shakil.jpg',
		name: 'akil',
		company: 'self',
		languages: ['pyhton', 'java', 'c#']

	}

}

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.get('/', (req, res) => {
	res.render('index', {text: 'This is the dynamic data. Open index.js from the routes directory to see.'})
})

router.get('/profiles', (req, res) => {
  const keys = Object.keys(profiles)
  const list = []

  keys.forEach( key => {

  	list.push(profiles[keys])
  })
   
  
  const data = {
  	profiles: list,
  	timestamp:req.timestamp
  }

  res.render('profiles', data)

})


router.post('/addprofile', (req, res) => {
    const body = req.body
     body['languages'] = req.body.languages.split(' ,')
     profiles[body.username] = body

     res.redirect('/profile'+body.username )

})

router.get('/:profile/:username', (res,req) => {

const profile = req.params.profile
const username = req.params.username
const Currentprofile = profiles[username]

if (Currentprofile == null) {
	res.json({

		confirmation:'fail',
		message: 'profile' + username + "not found"
	})

	return
}

Currentprofile.timestamp = req.timestamp
res.render('profile', Currentprofile)

})



router.get('/query', (req, res) => {
	const name = req.query.name
	const occupation = req.query.occupation
	
	const data = {

		name: name,
		occupation : occupation
	}

	res.render('profile', data)

})

module.exports = router
