class Auth {
  
    login(token, user) {
        window.localStorage.setItem('token', token)
        window.localStorage.setItem('user', JSON.stringify(user))
        window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        this.token = token
    }

    check() {
        return !!this.token
    }

    logOut() {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('user')
    }
   
}
export default new Auth()
