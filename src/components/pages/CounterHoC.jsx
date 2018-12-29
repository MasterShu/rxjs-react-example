import React from 'react'
import { Page, Button, Link } from 'framework7-react'
import { BehaviorSubject, pipe } from 'rxjs'
import { scan, map } from 'rxjs/operators'
import observe from '../utils/observe'

const CounterView = ({ count, onIncrement, onDecrement }) => (
  <Page>
    <h1>Count: {count}</h1>
    <Button onClick={onIncrement}>+</Button>
    <Button onClick={onDecrement}>-</Button>
    <Link back>Back</Link>
  </Page>
)

console.log('hoc')

const CounterHoC = observe(
  CounterView,
  () => {
    const counter = new BehaviorSubject(0)

    return counter.pipe(
      scan((res, inc) => res + inc, 0),
      map(val => ({
        count: val,
        onIncrement: () => counter.next(1),
        onDecrement: () => counter.next(-1),
      }))
    )
  },
  0
)

export default CounterHoC