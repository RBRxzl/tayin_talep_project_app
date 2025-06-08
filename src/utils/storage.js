export function saveToken(tokenType, accessToken) {
  localStorage.setItem('token', `${tokenType} ${accessToken}`);
}

export function saveSicilNo(sicilNo) {
  localStorage.setItem('sicilNo', sicilNo);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function getSicilNo() {
  return localStorage.getItem('sicilNo');
}
