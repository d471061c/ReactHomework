
const reducer = (store = '', action) => {
  if (action.type === 'NOTIFICATION') {
    return action.message
  }
  return store
}

export const notify = (message, timeout) => {
  return async(dispatch) => {
    dispatch({
      type: 'NOTIFICATION',
      message
    })

    setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION',
        message: ''
      })
    }, timeout * 1000)
  }
}

export default reducer