import { browserHistory } from 'react-router'
import thunkMiddleware from 'redux-thunk'
import * as createLogger from 'redux-logger'
import { createStore, compose, combineReducers, applyMiddleware, Store } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { promise } from './../utils'
import { IStore } from './storeInterface'

// app
import auth from '../reducer/app/auth'
import menu from '../reducer/app/menu'
import notification from '../reducer/app/notification'
import other from '../reducer/app/other'
import spinner from '../reducer/app/spinner'

// list
import accountNumbers from '../reducer/list/accountNumbers'
import instruments from '../reducer/list/instruments'

// entities
import bsLogMessages from '../reducer/entity/bsLogMessages'
import bsMetrics from '../reducer/entity/bsMetrics'
import bsRules from '../reducer/entity/bsRules'

import ddlLogMessages from '../reducer/entity/ddlLogMessages'
import ddlMetrics from '../reducer/entity/ddlMetrics'
import ddlRules from '../reducer/entity/ddlRules'
import tournaments from '../reducer/entity/tournament'

// pages
import bs from '../reducer/page/bs'
import ddl from '../reducer/page/tournaments'
import tables from '../reducer/page/tables'



const reducer = combineReducers({
  app: combineReducers({
    auth,
    menu,
    notification,
    other,
    spinner,
  }),
  list: combineReducers({
    accountNumbers,
    instruments,
    ddlRules,
    ddlLogMessages,
    ddlMetrics,
    bsRules,
    bsLogMessages,
    bsMetrics,
  }),
  entity: combineReducers({
    accountNumbers,
    bsLogMessages,
    bsMetrics,
    bsRules,
    ddlLogMessages,
    ddlMetrics,
    ddlRules,
    instruments,
    tournaments,
  }),
  page: combineReducers({
    bs,
    ddl,
    tables,
  }),
  routing: routerReducer,
})

let middleware = [
  routerMiddleware(browserHistory),
  thunkMiddleware,
  promise,
]

if (__DEV__) {
  middleware.push(createLogger({collapsed: true}))
}


let composeFunctions = [
  applyMiddleware(...middleware ),
]

const store = (compose as (...args: any[]) => any)( ...composeFunctions )(createStore)(reducer)

export default store as Store<IStore>


