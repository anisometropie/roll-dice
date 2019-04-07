const Clarifai = require('clarifai');
const app = new Clarifai.App({
 apiKey: '76d11ac6a2be4bf6a0af5cdec23e9623'
});

const handleImageQuery = (knex) => (req, res) => {
	const { id, imageURL } = req.body;
	let response = {};
	knex.transaction( trx => {
		return app.models.predict(Clarifai.FACE_DETECT_MODEL, imageURL)
		.then(clarifaiResponse => {
			response.clarifaiResponse = clarifaiResponse;
			return trx.insert({
				id: id,
				url: imageURL,
				date: new Date()
			})
			.into('queries')
		})
		.then(() => {
			return trx('users').where('id', id).increment('entries', 1).returning('entries');
		})
		.then(trx.commit)
		.catch(trx.rollback);
	})
	.then(entries => {
		if (entries.length > 0) {
			response.entries = entries[0];
			return knex.select('*').from('queries').where('id', id).orderBy('date', 'desc').limit('15');
		}
		else {
			res.json("no such id");
		}
	})
	.then(lastQueries => {
		response.lastQueries = lastQueries;
		res.json(response);
	});
};

module.exports = { handleImageQuery };
