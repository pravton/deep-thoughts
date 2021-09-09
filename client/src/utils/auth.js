import decode from 'jwt-decode';

class Auth {
  // retrive date saved in token
  getProfile() {
    return decode(this.getToken());
  }

  // check if the user still logged in
  loggedIn() {
    // Check if there is a saved token and it's still valid
    const token = this.getToken();
    // use type coersion to check if token is NOT undefined and the token is NOT expired
    return !!token && !this.isTokenExpired(token);
  }

  // check if the token has expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if(decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  // retrive token from localstorage
  getToken() {
    // Retrives the user token from localstorage
    return localStorage.getItem('id_token');
  }

  // set token to localStorage and reload page to homepage
  login(idToken) {
    // Saves user token to localstorage
    localStorage.setItem('id_token', idToken);

    window.location.assign('/');
  }

  // clear token from localstorage and force logout with reload
  logout() {
    // clear user token and profile date from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new Auth();