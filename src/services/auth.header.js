export function authHeader() {
    // return authorization header with jwt token
    const localUser = localStorage.getItem('user') || '{}';
    let user = JSON.parse(localUser);
    // let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {  //'Bearer ' +
        return { 'Authorization':  user.token };
    } else {
        return {};
    }
}