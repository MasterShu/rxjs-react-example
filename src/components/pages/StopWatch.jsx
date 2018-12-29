import React from 'react'
import {
  Page,
  Button,
  Link
} from 'framework7-react'
import padStart from 'lodash/padStart'
import { Subject, interval, empty, throwError, of, BehaviorSubject } from 'rxjs';
import { switchMap, timeInterval, scan, merge, map } from 'rxjs/operators';
import observe from '../utils/observe'

console.log('is stopwatch')

const StopWatchView = ({milliseconds, onStart, onStop, onReset}) => {
  return (
    <Page>
      <h1>{ms2Time(milliseconds)}</h1>
      <Button onClick={onStart}>Start</Button>
      <Button onClick={onStop}>SonStop</Button>
      <Button onClick={onReset}>RonReset</Button>
    <Link back>Back</Link>
    </Page>
  )
}

const ms2Time = (milliseconds) => {
  let ms = parseInt(milliseconds % 1000, 10)
  let seconds = parseInt((milliseconds / 1000) % 60, 10)
  let minutes = parseInt((milliseconds / (1000 * 60)) % 60, 10)
  let hours = parseInt(milliseconds / (1000 * 60 * 60), 10)
  return padStart(hours, 2, '0') + ':' + 
    padStart(minutes, 2, '0') + ':' +
    padStart(seconds, 2, '0') + ':' +
    padStart(ms, 3, '0')
}

const START = 'start'
const STOP = 'stop'
const RESET = 'reset'

const StopWatch = observe(
  StopWatchView,
  () => {
    const button = new Subject()
    const time$ = button.pipe(
      switchMap(val => {
        switch (val) {
          case START:
            return interval(10).pipe(
              timeInterval(),
              scan((res, ti) => res + ti.interval, 0)
            )
          case STOP: return empty()
          case RESET: return of(0)
          default: throwError(' Invaild value', val)
        }
      })
    )
    const stopWatch = new BehaviorSubject(0)

    return stopWatch.pipe(
      merge(time$),
      map(val => ({
        milliseconds: val,
        onStart: () => button.next(START),
        onStop: () => button.next(STOP),
        onReset: () => button.next(RESET)
      }))
    )
  },
  0
)

export default StopWatch
