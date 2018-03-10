
const reducer = (store = '', action) => {
  if (action.type === 'NOTIFICATION') {
    return action.message
  }
  return store
}

export const notify = (message) => {
  return {
    type: 'NOTIFICATION',
    message
  }
}

export default reducer