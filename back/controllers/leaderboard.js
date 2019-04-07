const handleLeaderboardQuery = (knex) => (req, res) => {
	knex.select('*').from('users').orderBy('entries', 'desc').limit('100')
		.then(user => {
			if (user.length > 0) {
				res.json(user);
			}
			else {
				res.json('No users in the database!');
			}
		})
		.catch(err => {
			console.log(err);
			res.status(400).json('database error');
		});
}

module.exports = { handleLeaderboardQuery };
