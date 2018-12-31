import React from 'react'
import { View, Link, Page, Button } from 'framework7-react';

export default class HomePage extends React.Component {
  render() {
    return (
      <Page>
        <Button>
          <Link href="/counter/">counter</Link>
        </Button>
        <Button>
          <Link href="/hoc/">HOC</Link>
        </Button>
        <Button>
          <Link href="/stop-watch/">stopwatch</Link>
        </Button>
        <Button>
          <Link href="/redux/counter">Redux Counter</Link>
        </Button>
        <Button>
          <Link href="/games/breakout">Breakout-games</Link>
        </Button>
      </Page>
    )
  }
}