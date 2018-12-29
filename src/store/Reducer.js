import * as ActionType from './ActionTypes'

const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.INCREMENT:
      return {...state, count: state.count + 1}
    case ActionType.DECREMENT:
      return {...state, count: state.count - 1}
    default:
      return state
  }
}

export default reducer