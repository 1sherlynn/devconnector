# Install Dependencies & Basic Server Setup
- Go to devconnector folder via the terminal 
```javascript
npm init
npm i express mongoose passport passport-jwt jsonwebtoken body-parser bcryptjs validator
npm i -D nodemon
```
- Mongoose: used to connect and interact with mongoDB
- Passport: authentication
- Passport-jwt (JSON web token)
- jsonwebtoken: to generate the token
- body-parser: to take in data to do what we want with it 
- bcryptjs 
- nodemon: dev dependency. Will constantly watch our application and when we make changes it will update automatically instead of us having to manually restart everytime


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
- Create config folder and keys.js file to add MongoURI keys and value
- Configure MongoDB using mongoose in server.js file
- Upon saving, should see in terminal: 'MongoDB connected'

____________________________________________

# Route Files with Express Router
- So that we can have separate files for each of our resources 
- Resources: users, profiles and posts 
- create routes folder, api sub folder and configure routes 
- Configure server.js file
- In order to access a private route (with authentication details), you have to send a JSON web token along with it 
- The way to get a token is by registering and then logging in (token is sent to you)
- You then send that token to your request
____________________________________________

# Route Files with Express Router












