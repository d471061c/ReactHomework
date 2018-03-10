import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notifierReducer from './reducers/notifierReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notifierReducer,
  filter: filterReducer
})

const store = createStore(reducer)

export default store