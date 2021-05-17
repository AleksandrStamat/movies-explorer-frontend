class MainApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  async errorCheck(res) {
    const msg = await res.json();
    return res.ok ? msg : Promise.reject(msg);
  }

  getUserData(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this.errorCheck);
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

  getSavedMovies(token) {
    return fetch(`${this.baseUrl}/movies`, {
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this.errorCheck);
  }

  deleteMovie(movieId, token) {
    return fetch(`${this.baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this.errorCheck);
  }

  saveMovie(movie, token) {
    return fetch(`${this.baseUrl}/movies`, {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
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
  // baseUrl: "https://api.movies.stamat.nomoredomains.icu",
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;
