import { Subject } from "rxjs";
import { startWith, scan, tap } from "rxjs/operators";

const createReactiveStore = (reducer, initialState) => {
  const action$ = new Subject()
  let currentState = initialState

  const store$ = action$.pipe(
    startWith(initialState),
    scan(reducer),
    tap(state => (currentState = state))
  )

  return {
    dispatch: (action) => {
      return action$.next(action)
    },
    getState: () => currentState,
    subscribe: (func) => {
      store$.subscribe(func)
    }
  }
}

export default createReactiveStore