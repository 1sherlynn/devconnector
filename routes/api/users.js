const express = require('express'); 
const router = express.Router(); 

// Load User model 
const User = require('../../models/User')

// @route 	GET api/users/test
// @des		Tests users route
// @access 	Public

router.get('/test', (req, res) => res.json({msg: "Users Works"}));

// @route 	GET api/users/register
// @des		Register user
// @access 	Public

router.post('./register', (req, res) => {
	User.findOne({ email: req.body.email })
		.then(user => {
			if(user) {
				return res.status(400).json({email: 'Email also exists.'});
			} else {
				const newUser = new User({
					name: req.body.name, 
					email: req.body.email,
					password: req.body.password
				});
			}
		})
});


module.exports = router;

// Go to http://localhost:5000/api/users/test
// to see output