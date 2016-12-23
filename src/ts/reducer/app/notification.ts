import * as React from 'react'
import { action, handleActions } from '../../utils/promiseMiddleware/promise-middleware-helper'

const ADD_NOTIFICATION = 'notification/ADD_NOTIFICATION'

type INotifyData = INotification
const notify = action<INotifyData>(ADD_NOTIFICATION)

interface INotification {
  message: string
  level: "error" | "info" | "success" | "warning"
}

interface INotificationStore {
  notificationList?: INotification[]
}

let initialState: INotificationStore = {
  notificationList: [],
}


export default handleActions<INotificationStore>({
  [ ADD_NOTIFICATION ]: (state, action) => {
    let notificationList = _.clone(state.notificationList)
    notificationList.push(action.meta as INotifyData)
    return ({
      notificationList,
    })
  },
}, initialState)



export {
  notify,

  ADD_NOTIFICATION,

  INotification,
  INotifyData,
  INotificationStore,
}