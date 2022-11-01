class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _customFetch(url, headers) {
    return fetch(url, headers).then((res) => {
      if (res) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getInitialCards() {
    return this._customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  createCard(data) {
    return this._customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers,

      method: "POST",

      body: JSON.stringify(data),
    });
  }

  deleteCard(cardId) {
    console.log(cardId);

    return this._customFetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",

      headers: this._headers,
    });
  }

  editProfile({ name, about }) {
    return this._customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,

      method: "PATCH",

      body: JSON.stringify({
        name,

        about,
      }),
    });
  }

  likeCard(cardId, likeState) {
    if (!likeState) {
      return this._customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        headers: this._headers,

        method: "DELETE",
      });
    } else {
      return this._customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        headers: this._headers,

        method: "PUT",
      });
    }
  }

  setUserAvatar(avatar) {
    return this._customFetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",

      headers: this._headers,

      body: JSON.stringify(avatar),
    });
  }
}

const api = new Api({
  baseUrl: "https://api.gte34g.students.nomoredomainssbs.ru",
  headers: {
    authorization: "e5576ac3-5325-4ecf-8845-0a4515f9509c",
    "Content-Type": "application/json",
  },
});

export default api;
