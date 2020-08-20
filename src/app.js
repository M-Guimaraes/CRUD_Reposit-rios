const express = require('express');
const { uuid } = require('uuidv4');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (request, response) => {
	return response.json(repositories);
});

app.post('/repositories', (request, response) => {
	const { title, url, techs, likes } = request.body;

	const repository = { id: uuid(), title, url, techs, likes };

	repositories.push(repository);

	return response.json(repository);
});

app.put('/repositories/:id', (request, response) => {
	const { id } = request.params;
	const { title, url, techs } = request.body;

	const repositoriesIndex = repositories.findIndex(
		repositories => repositories.id === id
	);

	if (repositoriesIndex < 0) {
		return response.status(400).json({ error: 'Repository not found!' });
	}
	let { likes } = repositories[repositoriesIndex];

	const repository = {
		id,
		title,
		url,
		techs,
		likes,
	};

	repositories[repositoriesIndex] = repository;
	return response.json(repository);
});

app.delete('/repositories/:id', (request, response) => {
	const { id } = request.params;

	const repositoriesIndex = repositories.findIndex(
		repositories => repositories.id === id
	);

	if (repositoriesIndex < 0) {
		return response.status(400).json({ error: 'Repositori not founf!' });
	}

	repositories.splice(repositoriesIndex, 1);
	return response.status(204).send();
});

app.post('/repositories/:id/like', (request, response) => {
	const { id } = request.params;

	const repository = repositories.find(repositories => repositories.id === id);

	if (repository) {
		repository.likes++;
	} else {
		return response.status(400).json({ error: 'Repository not found!' });
	}

	return response.send(repository);
});

module.exports = app;
