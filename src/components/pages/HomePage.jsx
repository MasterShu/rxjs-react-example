import React from 'react'
import { View, Link } from 'framework7-react';

export default class HomePage extends React.Component {
  render() {
    return (
      <View>
        <Link href="/counter/">counter</Link>
        <Link href="/hoc/">HOC</Link>
        <Link href="/stop-watch/">stopwatch</Link>
        <Link href="/redux/counter">Redux Counter</Link>
      </View>
    )
  }
}