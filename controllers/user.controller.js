const shortid = require('shortid')
const db = require('../db')

// exports module cho routes su dung

module.exports.index = function (req, res) {
	res.render('users/index', {
		users: db.get('users').value()
	})
}

module.exports.search = function (req, res) {
	console.log(req.query)
	let q = req.query.q;
	let matchedUsers = db.get('users').value().filter(function (user) {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
	})

	let notfound = {
		id: 'error-404',
		name: 'Not found'
	}

	if (matchedUsers.length === 0) {
		matchedUsers.push(notfound)
	}

	res.render('users/index', {
		users: matchedUsers
	})
}

module.exports.create = function (req, res) {
	res.render('users/create')
}

module.exports.get = function (req, res) {
	let id = req.params.id
	let user = db.get('users').find({
		id: id
	}).value()
	res.render('users/view', {
		user: user
	})
}

module.exports.postCreate = function (req, res) {
	//console.log(!req.body.name)
	let errors = []

	if (!req.body.name) {
		errors.push('Name is required')
	}

	if (!req.body.phone) {
		errors.push('Phone is required')
	}

	// neu co loi thi return luon
	if (errors.length) {
		console.log(req.body)
		res.render('users/create', {
			errors: errors,
			values: req.body
		})
		
		return;
	}

	req.body.id = shortid.generate()
	db.get('users').push(req.body).write()
	res.redirect('/users')
}