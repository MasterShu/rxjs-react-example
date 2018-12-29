import createReactiveStore from './createReactiveStore'
import reducer from './store/Reducer'

const initValue = {
    count: 0
}

const store = createReactiveStore(reducer, initValue)

export default store