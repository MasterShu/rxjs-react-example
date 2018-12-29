import { createStore, applyMiddleware } from 'redux'
import reducer from './Reducer'
import { createEpicMiddleware } from 'redux-observable';
import epic from './epic';

const epicMiddleware = createEpicMiddleware(epic)

const initValues = {
  count: 0
}

const store = createStore(
  reducer,
  initValues,
  applyMiddleware(epicMiddleware)
  )

export default store