
export function saveToken(tokenType, accessToken) {
    localStorage.setItem('token', `${tokenType} ${accessToken}`);
}

export function saveId(id) {
    localStorage.setItem('id', id);
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

export function savePersonnelInfo(personnel) {
    localStorage.setItem('personnel', JSON.stringify(personnel));
}

export function getPersonnelInfo() {
    const data = localStorage.getItem('personnel');
    return data ? JSON.parse(data) : null;
}
