class Auth {
  constructor({ url, headers }) {
    this.baseUrl = url;
    this.headers = headers;
  }

  registerUser(email, password) {
    return this._customFetch(`${this.baseUrl}/signup`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  login(email, password) {
    return this._customFetch(`${this.baseUrl}/signin`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  checkToken(token) {
    return this._customFetch(`${this.baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  _customFetch(url, options) {
    const headers = Object.assign({}, this.headers, options.headers);
    return fetch(url, { ...options, headers }).then((res) =>
      res.ok ? res.json() : Promise.reject(res.statusText)
    );
  }
}

const auth = new Auth({
  url: "https://api.gte34g.mooo.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default auth;
