export const BASE_URL = "https://api.gte34g.mooo.com";

const customFetch = (url, headers) => {
  console.log("Request sent to:", url);
  console.log("Headers:", headers);
  return fetch(url, headers).then((res) =>
    res.ok ? res.json() : Promise.reject(res.statusText)
  );
};


export const register = (email, password) => {
  console.log(
    "registerUser called with email:",
    email,
    "and password:",
    password
  );
  return customFetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });
};

export const login = (email, password) => {
  console.log("login called with email:", email, "and password:", password);
  return customFetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export const checkToken = (token) => {
  console.log("checkToken called with token:", token);
  return customFetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
