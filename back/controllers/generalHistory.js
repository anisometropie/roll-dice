const handleGeneralHistoryQuery = (knex) => (req, res) => {
	knex.select('*').from('queries').orderBy('date', 'desc').limit('15')
		.then(history => {
			if (history.length > 0) {
				res.json(history);
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

module.exports = { handleGeneralHistoryQuery };
