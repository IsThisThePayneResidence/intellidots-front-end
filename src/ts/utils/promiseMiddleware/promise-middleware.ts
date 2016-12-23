import { IAction, IPromiseActionHandler, IHandleActionOptions } from './promise-middleware-interfaces'
import { actionPrefix } from './promise-middleware-helper'
import { ApiError } from '../other/fetch'
import { IStore } from '../../basis/storeInterface'
import { notify } from '../../reducer/app/notification'
import Dispatch = ReactRedux.Dispatch
const { assign } = Object

export const promise =
  ({ dispatch }: Redux.MiddlewareAPI<IStore>) =>
    (next: Dispatch<any>) =>
      (action: IAction & Dispatch<any>) => {
        if (action.payload && typeof action.payload.then === 'function') {
          let dispatchSubAction = (prefix: string) => (action.subActions && action.subActions[prefix] && dispatch(action.subActions[prefix]))
          let pendingAction = assign({}, action, { type: `${action.type}${actionPrefix.pending}`, payload: null } as IAction)


          let onFulfilledAction = data => {
            dispatch(assign({}, action, { type: `${action.type}${actionPrefix.fulfilled}`, payload: data }))
            dispatchSubAction('fulfilled')
          }

          let onRejectedAction = err => {
            if (err instanceof ApiError)
              err.getErrors().then(message => dispatch(notify({message: `Api error: ${message}`, level: 'error'})))
            else
              dispatch(notify({message: 'Api error', level: 'error'}))

            console.error(err)
            dispatch(assign({}, action, { type: `${action.type}${actionPrefix.rejected}`, payload: err }))
            dispatchSubAction('rejected')
          }

          dispatch(pendingAction)
          dispatchSubAction('pending')

          let promise: Promise<void> = action.payload
          promise
            .then(onFulfilledAction)
            .catch(onRejectedAction)

          return
        }

        return next(action)
      }



export function handlePromise<T>(payloadProp: string, options?: IHandleActionOptions<T>): IPromiseActionHandler<T> {
  const loadingProp = payloadProp + 'IsLoading'
  const loadedProp  = payloadProp + 'IsLoaded'
  return {
    PENDING: (state) => (assign(({}), state, {[loadingProp]: true}) as T),
    FULFILLED: (state, action) => (assign({}, state, {
      [payloadProp]: options && options.postProcess
        ? options.postProcess(action)
        : action.payload,
      [loadingProp]: false,
      [loadedProp]: true,
    }) as T),
    REJECTED: state => (assign({}, state, {[loadingProp]: false, [loadedProp]: true}) as T),
  }
}