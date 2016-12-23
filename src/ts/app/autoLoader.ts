import * as moment from 'moment'
import config from '../basis/config'
import store from '../basis/store'


class AutoLoader {
  private timers = {}
  private lastUpdates = {}

  on = (actionToSubscribe: any, actionName: string, isInfrequent: boolean = false) => {
    let duration = isInfrequent
      ? config.duration.infrequentAutoloader
      : config.duration.autoloader
    let timeLeft = duration
    if (this.timers.hasOwnProperty(actionName)) {
      let nextUpdate = duration - (moment().valueOf() - this.lastUpdates[actionName])
      timeLeft = (nextUpdate > 0)
        ? nextUpdate
        : 0
    } else {
      this.lastUpdates[actionName] = moment().valueOf()
    }
    this.startTimer(timeLeft, actionToSubscribe, actionName, duration)
  }

  off = (actionName: string) => {
    clearTimeout(this.timers[actionName])
  }

  private startTimer = (ms: number, actionToSubscribe, actionName: string, duration: number) => {
    this.timers[actionName] = setTimeout(() => {
      store.dispatch(actionToSubscribe())
      this.lastUpdates[actionName] = moment().valueOf()
      this.startTimer(duration, actionToSubscribe, actionName, duration)
    }, ms)
  }
}

export const autoLoader = new AutoLoader()