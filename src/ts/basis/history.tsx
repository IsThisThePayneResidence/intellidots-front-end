import * as React from 'react'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import store from './store'

const history = syncHistoryWithStore(browserHistory, store)
export { history }