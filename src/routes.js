import HomePage from './components/pages/HomePage'
import Counter from './components/pages/Counter'
import HocCounter from './components/pages/CounterHoC'
import StopWatch from './components/pages/StopWatch'
import ReduxCounter from './components/pages/redux/Counter'

export default [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/hoc',
    component: HocCounter
  },
  {
    path: '/stop-watch',
    component: StopWatch
  },
  {
    path: '/counter',
    component: Counter
  },
  {
    path: '/redux/counter',
    component: ReduxCounter
  }
];
