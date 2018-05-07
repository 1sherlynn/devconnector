# Install Dependencies & Basic Server Setup
- Go to devconnector folder via the terminal 
```javascript
npm init
npm i express mongoose passport passport-jwt jsonwebtoken body-parser bcryptjs validator
npm i -D nodemon
```
- **Mongoose**: used to connect and interact with mongoDB
- **Passport**: authentication
- **Passport-jwt** (JSON web token)
- jsonwebtoken: to generate the token
- **body-parser**: to take in data to do what we want with it 
- **bcryptjs**: to encrypt password
- **nodemon**: dev dependency. Will constantly watch our application and when we make changes it will update automatically instead of us having to manually restart everytime


- Add server.js file as entry point and set it up
- Edit package.json to add: 
```javascript
  "scripts": {
    "start": "node server.js",
    "server": "nodemon server.js"
  }
```
- To enable automatic update
- npm run server 

- Initialise git and add .gitignore file 
- If git already starting tracking gitignore files, do this: 
```javascript
git rm -r --cached .
git add .
git commit -m "fixed untracked files"
```

____________________________________________

# Connecting to MongoDB with Mongoose 
- Create config folder and keys.js file to add **MongoURI keys and value**
- Configure MongoDB using mongoose in server.js file
- Upon saving, should see in terminal: 'MongoDB connected'

____________________________________________

# Route Files with Express Router

- So that we can have separate files for each of our resources 
- Resources: users, profiles and posts 
- create routes folder, api sub folder and configure routes 
- Configure server.js file
- In order to access a private route (with authentication details), you have to send a **JSON web token** along with it 
- The way to get a token is by registering and then logging in (token is sent to you)
- You then send that token to your request
____________________________________________

# Creating The User Model

- Each resource we have needs to have a mongoose model with a schema
- create a new folder in the root called models
- In it, create User.js
- The convention for models is to be singular and to be capital

____________________________________________

# User Registration & Postman

- Use Postman HTTP Client (to test without a front-end application)
- HTTP status 200: OK and successful response
- HTTP status 400: validation error
- HTTP status 404: Not Found
- HTTP status 500 plus: server error

- Use **Mongoose** to first find if the email exists
- When sending data through our route, it will be through a form 
- We access the data though req.body and then the form input name e.g. req.body.email
- Configure **body-parser** in server.js
```javascript
const bodyParser = require('body-parser')
// Body parser middleware 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
```

- Now, we can access req.body 
- For Gravatar, we need to **npm install gravatar**
- And pass in the email from the form through gravatar.url(email);
- Need to encrypt the password via bcrypt otherwise it will be plain text


____________________________________________

# Email & Password Login

- When a user logs in, email and password will be entered
- Once successfully verified, they will get back a **token** using the **jsonwebtoken module** 
- The **token** is then sent along to access a protected route
- The way that it is validated when a token is sent by the user is by **passport** and **passport jwt** 
- **jsonwebtoken** creates the token
- **passport** will validate the token and extract the user's information from it 
- At this point, the logic for login is createed but **no token (JSON Web Token) is returned yet** (next video)

____________________________________________

# Creating the JSON Web Token (JWT)

- After validating credentials, to create the JST to be sent to access-protected routes 
- After getting the token, we would put it in the header as an authorization, and that will send it to the server, the server will validate the user, and get the user information 

```javascript

const jwt = require('jsonwebtoken'); 
const keys = require('../../config/keys');

// User Matched 
 const payload = { id: user.id,  user.name, avatar: user.avatar Create JWT payload

// Sign Token 
jwt.sign(
	payload, 
	keys.secretOrKey, 
	{ expiresIn: 3600 }, 
	(err, token) => {
		res.json({
			success: true,
			token: 'Bearer ' + token
		});
```

____________________________________________

# Passport JWT Authentication Strategy

- Now, we need to **verify** the token with **passport** 
- Passport has alot of authentication options (sub modules)
- JWT is one of them (sub module)
- Create config/passport.js: 

```javascript
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
	passport.use(
		new JwtStrategy(opts, (jwt_payload, done) => {
		  User.findById(jwt_payload.id)
			  .then(user => {
				  if(user) {
					  return done(null, user);
				} 
				  return done(null, false);
			})
			.catch(err => console.log(err));
	})
	);
};
```
- In routes/api/users.js:
```javascript
// @route 	GET api/users/current
// @des		  Return current user
// @access 	Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req,res) => {
	res.json({
		id: req.user.id,
		name: req.user.name,
		email: req.user.email
	});
});
```
____________________________________________

# Validation Handlers - 1

- Create a new folder called Validation
- **validator** module have helper methods to validate during things
- However, it has to be a **string** is order to validate
- Added is-empty validation (global check function): 

```javascript
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
	let errors = {}; 

	if(!Validator.isLength(data.name, { min: 2, max: 30 })){
		errors.name = 'Name must be between 2 and 30 characters.';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
```

____________________________________________

# Create & Update Profile Routes
 










