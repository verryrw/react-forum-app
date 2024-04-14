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

    return { success: true, data: responseData.data };
  } catch (e) {
    console.log(e.message);
    return { success: false, message: e.message };
  }
}

async function login({ email, password }) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  };

  try {
    const response = await fetch(BASE_URL + "/login", options);
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return { error: false, data: responseData.data };
  } catch (e) {
    return { error: true, message: e.message };
  }
}

async function fetchWithToken(url, options) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: "Bearer " + getAccessToken(),
    },
  });

  return response;
}

async function getUserLogged() {
  try {
    const options = {
      method: "GET",
    };
    const response = await fetchWithToken(BASE_URL + "/users/me", options);
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return { error: false, data: responseData.data };
  } catch (e) {
    return { error: true, message: e.message };
  }
}

async function getThreads() {
  try {
    const url = `${BASE_URL}/threads`;
    const options = {
      method: "GET",
    };
    const response = await fetchWithToken(url, options);
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }
    return { error: false, data: responseData.data };
  } catch (e) {
    return { error: true, message: e.message };
  }
}

async function getThread(threadId) {
  try {
    const url = `${BASE_URL}/threads/${threadId}`;
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return { error: false, data: responseData.data };
  } catch (e) {
    return { error: true, message: e.message };
  }
}

async function getUsers() {
  try {
    const url = `${BASE_URL}/users`;
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }
    return { error: false, data: responseData.data };
  } catch (e) {
    return { error: true, message: e.message };
  }
}

async function getLeaderboards() {
  try {
    const url = `${BASE_URL}/leaderboards`;
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }
    return { error: false, data: responseData.data };
  } catch (e) {
    return { error: true, message: e.message };
  }
}

export {
  register,
  login,
  getUserLogged,
  getThreads,
  getThread,
  getUsers,
  getLeaderboards,
};
