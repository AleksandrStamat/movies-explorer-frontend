class MainApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  errorCheck(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserData(token) {
    return fetch(`${this.baseUrl}/users/me`, { 
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      } 
    })
    .then(this.errorCheck);
  }

  editUser(user, token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    }).then(this.errorCheck);
  }

  getSavedMovies() {
    return fetch(`${this.baseUrl}/movies`, { headers: this.headers }).then(
      this.errorCheck
    );
  }

  deleteMovie(movieId) {
    return fetch(`${this.baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this.errorCheck);
  }

  saveMovie(movie) {
    return fetch(`${this.baseUrl}/movies`, {
      method: "POST",
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailer: movie.trailer,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: movie.image,
        movieId: movie.movieId,
      }),
      headers: this.headers,
    }).then(this.errorCheck);
  }

  changeSavedMovieStatus(movieId, like) {
    return fetch(`${this.baseUrl}/movies/${movieId}`, {
      method: like ? "PUT" : "DELETE",
      headers: this.headers,
    }).then(this.errorCheck);
  }

  register(data) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(this.errorCheck);
  }

  login(email, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(this.errorCheck);
  }
}

const mainApi = new MainApi({
  baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;
