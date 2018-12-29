import React from 'react'
import { Page, Button, Link } from 'framework7-react'
import { Subject, pipe } from 'rxjs'
import { scan } from 'rxjs/operators'

const CounterView = ({ count, onIncrement, onDecrement }) => (
  <Page>
    <h1>Count: {count}</h1>
    <Button onClick={onIncrement}>+</Button>
    <Button onClick={onDecrement}>-</Button>
    <Link back>Back</Link>
  </Page>
)

export default class RxCounter extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {count: 0}
    this.counter = new Subject()
    const observer = v => this.setState({count: v})
    this.counter.pipe(scan((result, inc) => result + inc, 0)).subscribe(observer)
  }

  render() {
    return (
      <CounterView
        count={this.state.count}
        onIncrement={() => this.counter.next(1)}
        onDecrement={() => this.counter.next(-1)}
      />
    )
  }
}