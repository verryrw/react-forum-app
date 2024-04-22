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

  const response = await fetch(BASE_URL + "/register", header);
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message);
  }

  return responseData.data;
}

async function login({ email, password }) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  };
  const response = await fetch(BASE_URL + "/login", options);
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message);
  }

  return responseData.data.token;
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
  const options = {
    method: "GET",
  };
  const response = await fetchWithToken(BASE_URL + "/users/me", options);
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message);
  }

  return responseData.data.user;
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

async function addThread(thread) {
  try {
    const url = `${BASE_URL}/threads`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(thread),
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

async function addThreadComment(threadId, content) {
  try {
    const url = `${BASE_URL}/threads/${threadId}/comments`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    };
    const response = await fetchWithToken(url, options);
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return { error: false, data: response.data };
  } catch (e) {
    return { error: true, message: e.message };
  }
}

async function upVoteThread(threadId) {
  try {
    const url = `${BASE_URL}/threads/${threadId}/up-vote`;
    const options = {
      method: "POST",
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

async function downVoteThread(threadId) {
  try {
    const url = `${BASE_URL}/threads/${threadId}/down-vote`;
    const options = {
      method: "POST",
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

async function neutralizeVoteThread(threadId) {
  try {
    const url = `${BASE_URL}/threads/${threadId}/neutral-vote`;
    const options = {
      method: "POST",
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

async function upVoteComment(threadId, commentId) {
  try {
    const url = `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`;
    const options = {
      method: "POST",
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

async function downVoteComment(threadId, commentId) {
  try {
    const url = `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`;
    const options = {
      method: "POST",
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

async function neutralizeVoteComment(threadId, commentId) {
  try {
    const url = `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`;
    const options = {
      method: "POST",
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

export {
  register,
  login,
  getUserLogged,
  getThreads,
  getThread,
  getUsers,
  getLeaderboards,
  addThread,
  addThreadComment,
  upVoteThread,
  downVoteThread,
  neutralizeVoteThread,
  upVoteComment,
  downVoteComment,
  neutralizeVoteComment,
};
