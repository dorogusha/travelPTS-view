// logic for TSP

export default {
  // paths
  api_paths: {
    login: 'login',
    logout: 'logout'
  },
  apiMethods: {
    // login
    async login (login, password, m = true) {
      // data from request
      let respData = await this._post(this.api_paths.login, {}, {login: login, password: password}, m)
      return respData
    },
    // logout
    async logout (m = true) {
      // data from request
      let respData = await this._post(this.api_paths.logout, {}, {}, m)
      return respData
    }
  }
}
