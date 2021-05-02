export default class Api {
	constructor({ baseUrl }) {
		this._url = baseUrl;
	}

	getUserData(token) {
		return fetch(`${this._url}/users/me`, {
			headers: {
				authorization: token,
				'Content-Type': 'application/json'
			}
		}).then(this._erorrCheck);
	}

	setUserData({ data, token }) {
		return fetch(`${this._url}/users/me`, {
			method: 'PATCH',
			headers: {
				authorization: token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}).then(this._erorrCheck);
	}

	getMoviesList() {
		return fetch(`${this._url}/movies`, {
			headers: {
				authorization: token,
				'Content-Type': 'application/json'
			}
		}).then(this._erorrCheck);
	}

	addMovies({ country, director, duration, year, description, image, trailer, movieId, nameRU, nameEN, thumbnail }) {
		return fetch(`${this._url}/cards`, {
			method: 'POST',
			headers: {
				authorization: token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				country,
				director,
				duration,
				year,
				description,
				image,
				trailer,
				movieId,
				nameRU,
				nameEN,
				thumbnail
			})
		}).then(this._erorrCheck);
	}

	deleteMovies(id, token) {
		return fetch(`${this._url}/movies/${id}`, {
			method: 'DELETE',
			headers: {
				authorization: token,
				'Content-Type': 'application/json'
			}
		}).then(this._erorrCheck);
	}
}
