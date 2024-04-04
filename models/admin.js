module.exports = class Admin {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    isLoggedIn = false;

    login(username, password) {
        this.isLoggedIn = (username === this.username && password === this.password);
    }

    logout() {
        this.isLoggedIn = false;
    }
}