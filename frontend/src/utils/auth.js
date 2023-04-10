require("dotenv").config();
export const BASE_URL = "https://api.gte34g.mooo.com";

export const register = (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log('[REGISTER]', data);
      return data;
    });
};

export const login = (email, password) => {
  console.log("login called with email:", email, "and password:", password);
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password, email: email }),
  })
    .then((response) => {
      console.log("login response status:", response.status);
      return response.json();
    })
    .then((data) => {
      console.log("login response data:", data);
      if (data.token) {
        localStorage.setItem("token", data.token);
        return data;
      }
    })
    .catch((error) => {
      console.log("login error:", error);
    });
};


export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
    .then((data) => {
      return data;
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
};
