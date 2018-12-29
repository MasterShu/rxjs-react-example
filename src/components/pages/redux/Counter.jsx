import React from 'react'
import {connect} from 'react-redux'
import * as Actions from '../../../store/Actions'
import { Page, Button, Link } from 'framework7-react'

const CounterView = ({ count, onIncrement, onDecrement }) => (
  <Page>
    <h1>Count: {count}</h1>
    <Button onClick={onIncrement}>+</Button>
    <Button onClick={onDecrement}>-</Button>
    <Link back>Back</Link>
  </Page>
)

function mapStateToProps(state, ownProps) {
    return {
        count: state.count
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onIncrement: () => dispatch(Actions.increment()),
        onDecrement: () => dispatch(Actions.decrement()),
    }
}

const Counter = connect(mapStateToProps, mapDispatchToProps)(CounterView)

export default Counter