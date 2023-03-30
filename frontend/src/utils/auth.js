class Auth {
  constructor({ url, headers }) {
    this.baseUrl = url;
    this.headers = headers;
  }

  _customFetch = (url, headers) => {
    return fetch(url, headers).then((res) =>
      res.ok ? res.json() : Promise.reject(res.statusText)
    );
  };

  registerUser(email, password) {
    return this._customFetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    });
  }

  login(email, password) {
    return this._customFetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password}),
    });
  }

  checkToken(token) {
    return this._customFetch(`${this.baseUrl}/users/me`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

const auth = new Auth({
  url: "https://gte34g.mooo.com",
  headers: { "Content-Type": "application/json" },
});

export default auth;
