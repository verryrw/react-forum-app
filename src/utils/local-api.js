const TOKEN = 'access_token';

function getAccessToken() {
  return localStorage.getItem(TOKEN);
}

function putAccessToken(token) {
  localStorage.setItem(TOKEN, token);
}

export { getAccessToken, putAccessToken };
