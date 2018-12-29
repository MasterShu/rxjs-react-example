import { filter, delay, map } from "rxjs/operators";
import * as ActionTypes from './ActionTypes'
import { increment, decrement } from './Actions'

const epic = (action$, store) => {
    return action$.pipe(
        filter(
            action => (action.type === ActionTypes.DECREMENT ||
                action.type === ActionTypes.INCREMENT)
        ),
        delay(1000),
        map(action => {
            const count = store.getState().count
            if (count > 0) {
                return decrement()
            } else if (count < 0) {
                return increment()
            } else {
                return {type: 'no-op'}
            }
        })
    )
}

export default epic