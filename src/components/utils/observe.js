import React from 'react'

const observe = (WrappedComponent, observableFactory, defaultState) => {
  return class extends React.Component {
    constructor() {
      super(...arguments)
      this.props$ = observableFactory(this.props, this.state)
      this.state = defaultState
    }
    render() {
      return <WrappedComponent {...this.props} {...this.state} />
    }

    componentWillUnmount() {
      this.subscription.unsubscribe()
    }

    componentDidMount() {
      this.subscription = this.props$.subscribe(v => this.setState(v))
    }
  }
}

export default observe