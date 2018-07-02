// logic for Tags
import { calcGetParams, getValueByParam } from './utils'

export default {
  // paths
  apiMethods: {
    // get all tags or some tag by id
    async getTags (params, m) {
      params = params || {}
      // get accessable categorites from database
      let res = await this._get(`category/${getValueByParam(params.ids)}`, calcGetParams(params, ['name']), m)
      return res
    },
    async createTags (data, params, m = true) {
      params = params || {}
      // data from request
      let res = await this._post('category', calcGetParams(params, ['fields']), data, m)
      return res
    },
    async updateTags (data, params, m = true) {
      params = params || {}
      let res = await this._put('category', calcGetParams(params, ['fields']), data, m)
      return res
    },
    async deleteTags (params, m) {
      params = params || {}
      // data from request
      let res = await this._delete(`category/${getValueByParam(params.ids)}`, {})
      return res
    }
  }
}
