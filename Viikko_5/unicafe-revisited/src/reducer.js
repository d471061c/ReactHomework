const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  let { good, ok, bad } = state
  switch (action.type) {
    case 'GOOD':
      good++
      return { good, ok, bad }
    case 'OK':
      ok++
      return { good, ok, bad }
    case 'BAD':
      bad++
      return { good, ok, bad }
    case 'ZERO':
      good =  ok =  bad = 0
      return { good, ok, bad }
  }
  return state
}

export default counterReducer
