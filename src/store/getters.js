/*
export const someGetter = (state) => {
}
*/
export default {
  getAuthData: (state) => {
    return (state.authenticatedData && state.authenticatedData.sid) || null
  }
}
