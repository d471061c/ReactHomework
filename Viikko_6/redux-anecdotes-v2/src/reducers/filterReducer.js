
const reducer = (store = '', action) => {
  if (action.type === 'SET_FILTER') {
    return action.keyword
  }
  return store
}

export const setFilter = (keyword) => {
  return {
    type : 'SET_FILTER',
    keyword
  }
}

export default reducer