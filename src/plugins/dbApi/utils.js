// return value by param-type, default 'all'
function getValueByParam (param = undefined) {
  let val = 'all'
  if (param) {
    if (typeof param === 'object') {
      val = param.join()
    } else {
      val = param
    }
  }
  return val
}

// calculate get-params from Array by fields-names
function calcGetParams (params, fields) {
  // result get-params
  let getParams = {}
  // calculate
  for (let i in fields) {
    if (params[fields[i]]) {
      getParams[fields[i]] = ((typeof params[fields[i]]) === 'object') ? params[fields[i]].join() : params[fields[i]]
    }
  }

  return getParams
}

export {
  getValueByParam,
  calcGetParams
}
