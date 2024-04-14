import { getAccessToken } from "./local-api";

const BASE_URL = "https://forum-api.dicoding.dev/v1";

async function register({ name, email, password }) {
  const header = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, email: email, password: password }),
  };

  try {
    const response = await fetch(BASE_URL + "/register", header);
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return { success: true, response: responseData };
  } catch (e) {
    console.log(e.message);
    return { success: false, message: e.message };
  }
}

async function login({ email, password }) {
  const header = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  };

  try {
    const response = await fetch(BASE_URL + "/login", header);
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return { success: true, response: responseData };
  } catch (e) {
    return { success: false, message: e.message };
  }
}

async function fetchWithToken(url, options) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: getAccessToken(),
    },
  });

  return response;
}

export { register, login, fetchWithToken };
