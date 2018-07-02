// logic for Users
import { calcGetParams, getValueByParam } from './utils'

export default {
  // paths
  apiMethods: {
    // get all users or some user by id
    async getUsers (params, m) {
      params = params || {}
      // data from request
      let res = await this._get(`user/${getValueByParam(params.ids)}`, calcGetParams(params, ['name', 'fields']))
      return res
    },
    async createUsers (data, params, m = true) {
      params = params || {}
      // data from request
      let res = await this._post('user', calcGetParams(params, ['fields']), data, m)
      return res
    },
    async updateUsers (data, params, m = true) {
      params = params || {}
      let res = await this._put('user', calcGetParams(params, ['fields']), data, m)
      return res
    },
    async deleteUsers (params, m) {
      params = params || {}
      // data from request
      let res = await this._delete(`user/${getValueByParam(params.ids)}`, {})
      return res
    }
  }
}
