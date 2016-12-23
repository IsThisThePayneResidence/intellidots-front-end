// created to avoid import/export conflict

import ThunkAction = Redux.ThunkAction
import Dispatch = Redux.Dispatch
export interface IAction {
  type: string
  payload?: any
  meta?: any
  subActions?: ISubActions
}

export interface ISubActions {
  pending?: IActionHandler<any>,
  fulfilled?: IActionHandler<any>,
  rejected?: IActionHandler<any>,
}

export type IActionHandler<T> = (state: T, action: IAction) => T

export type IPromiseActionHandler<T> = {
  PENDING: IActionHandler<T>,
  FULFILLED: IActionHandler<T>,
  REJECTED: IActionHandler<T>
}

export interface IActions<T> {
  [key: string]: IPromiseActionHandler<T> | IActionHandler<T>
}

export interface IHandleActionOptions<T> {
  /**
   * Post process payload on fulfilled
   *
   * @returns Payload
   */
  postProcess?: (action: IAction) => any
}

export interface IPromiseWrapper<D>{
  (data?: D): Promise<any>
}

export interface IFetchActionFunction<D> {
  (data?: D): IAction/*<D>*/
}
