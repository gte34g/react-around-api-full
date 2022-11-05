class Auth {
  constructor({ url, headers }) {
    this.baseUrl = url;
    this.headers = headers;
  }

  _customFetch(url, headers) {
    return fetch(url, headers).then((res) => {
      if (res) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  register(email, password) {
    return this._customFetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    });
  }
  login(email, password) {
    return this._customFetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    });
  }
  checkToken(jwt) {
    return this._customFetch(`${this.baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
  }
}

const auth = new Auth({
  url: "https://api.gte34g.students.nomoredomainssbs.ru",
  headers: { "Content-Type": "application/json" },
});

export default auth;