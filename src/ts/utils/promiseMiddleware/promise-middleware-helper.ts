// created to avoid import/export conflict
import { assign, forEach } from 'lodash'
import { IPromiseWrapper, ISubActions, IFetchActionFunction, IAction, IPromiseActionHandler, IActions, IActionHandler } from './promise-middleware-interfaces'

export const actionPrefix = {
  pending: '_LOADING',
  fulfilled: '_SUCCESS',
  rejected: '_ERROR'
}

/**
 * @example
 * export const addTodo = action<{id: number}>(ADD_TODO, { id })
 */
export function action<T extends {}>(type: string, payload?: T | IPromiseWrapper<T>, meta?: T, subActions?: ISubActions): IFetchActionFunction<T> {
  return (data = null) => {
    let action: IAction = { type, meta }
    if (subActions)
      action.subActions = subActions

    if (typeof payload === 'function') // payload instanceof Promise
      action.payload = (payload as IPromiseWrapper<T>)(data)
    else
      action.meta = (payload !== undefined) ? payload : data

    return action
  }
}

export function handleActions<T>(actions: IActions<T>, initialState: T) {
  let flatActions: { [key: string]: IActionHandler<T> } = {}

  forEach(actions, (value, key) => {
    if (typeof value === 'object') {
      flatActions[key + actionPrefix.pending] = (value as IPromiseActionHandler<any>).PENDING
      flatActions[key + actionPrefix.fulfilled] = (value as IPromiseActionHandler<any>).FULFILLED
      flatActions[key + actionPrefix.rejected] = (value as IPromiseActionHandler<any>).REJECTED
    } else {
      flatActions[key] = value as any
    }
  })


  return function (state: T = initialState, action: IAction) {
    return flatActions[action.type]
      ? assign(({} as T), state, flatActions[action.type](state, action))
      : state
  }
}
