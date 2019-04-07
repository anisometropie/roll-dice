const handleProfileGet = (knex) => (req, res) => {
	const { id } = req.params;
	knex.select('*').from('users').where('id', id)
		.then(user => {
			if (user.length > 0) {
				res.json(user[0]);
			}
			else {
				res.json('user not found');
			}
		})
		.catch(err => {
			console.log(err);
			res.status(400).json('database error');
		});
}

module.exports = { handleProfileGet };
