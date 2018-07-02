// logic for Maps
import axios from 'axios'

export default {
  // paths
  api_paths: {
    address_by_coord: 'https://nominatim.openstreetmap.org'
  },
  apiMethods: {
    // get all tags or some tag by id
    async getAddressByCoord (lat, lon) {
      if (!lat || !lon) {
        return 'uknown'
      }
      let getParams = {
        format: 'json',
        lat: lat,
        lon: lon,
        zoom: 18,
        addressdetails: 1
      }
      // not show error responce
      let respData = await axios.get(`${this.api_paths.address_by_coord}/reverse`, {params: getParams})
      if (respData && respData.data && respData.error) {
        return 'uknown'
      } else if (respData && respData.data) {
        return respData.data.display_name || 'uknown'
      }
    },
    async getCoordByAddress (addressStr) {
      let getParams = {
        format: 'json',
        q: addressStr
      }
      // not show error responce
      let respData = await axios.get(`${this.api_paths.address_by_coord}/search`, {params: getParams})

      return respData ? respData.data || [] : []
    }
  }
}
