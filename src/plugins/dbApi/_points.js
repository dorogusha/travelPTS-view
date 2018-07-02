// logic for Geofences
import { calcGetParams, getValueByParam } from './utils'

export default {
  // paths
  apiMethods: {
    // get all points or some point by id
    async getPoints (params, m) {
      params = params || {}
      // data from request
      let res = await this._get(`point/${getValueByParam(params.ids)}`, calcGetParams(params, ['name', 'fields']))
      return res
    },
    async createPoints (data, params, m = true) {
      params = params || {}
      // data from request
      let res = await this._post('point', calcGetParams(params, ['fields']), data, m)
      return res
    },
    async updatePoints (data, params, m = true) {
      params = params || {}
      let res = await this._put('point', calcGetParams(params, ['fields']), data, m)
      return res
    },
    async deletePoints (params, m) {
      params = params || {}
      // data from request
      let res = await this._delete(`point/${getValueByParam(params.ids)}`, {})
      return res
    }
  }
}
