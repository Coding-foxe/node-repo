require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const dbURI = require('./database/dbConnect')
const router = require('./routes/authroute')

const app = express()

// middleware
app.use(express.static('public'))

// view engine
app.set('view engine', 'ejs')

// database connection
mongoose.set({ strictQuery: false })
mongoose
	.connect(dbURI)
	.then(() =>
		app.listen(3000, () =>
			console.log(`started server on port ${process.env.PORT}`)
		)
	)
	.catch(err => console.log(err))

// routes
app.get('/', (req, res) => res.render('home'))
app.get('/smoothies', (req, res) => res.render('smoothies'))
app.use(router)
