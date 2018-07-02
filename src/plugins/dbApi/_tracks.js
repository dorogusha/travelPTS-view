// logic for Tracks
import { calcGetParams, getValueByParam } from './utils'

export default {
  // paths
  apiMethods: {
    // get all tracks or some track by id
    async getTracks (params, m) {
      params = params || {}
      // get accessable categorites from database
      let res = await this._get(`category/${getValueByParam(params.ids)}`, calcGetParams(params, ['name']), m)
      return res
    },
    async createTracks (data, params, m = true) {
      params = params || {}
      // data from request
      let res = await this._post('category', calcGetParams(params, ['fields']), data, m)
      return res
    },
    async updateTracks (data, params, m = true) {
      params = params || {}
      let res = await this._put('category', calcGetParams(params, ['fields']), data, m)
      return res
    },
    async deleteTracks (params, m) {
      params = params || {}
      // data from request
      let res = await this._delete(`category/${getValueByParam(params.ids)}`, {})
      return res
    }
  }
}
