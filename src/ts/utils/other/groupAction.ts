import { IAction } from './../index'
import { notify, INotification } from '../../reducer/app/notification'
import Dispatch = Redux.Dispatch

export function groupActionBody<T>(
  startAction: (...a) => IAction,
  endAction: (...a) => IAction | any,
  resource: (...a) => Promise<any>,
  list: T[],
  accessor: (T) => any,
  successMessagePrefix: string,
  failMessagePrefix: string,
  dispatch: (action: any) => any,
  // service parameters
  currentIndex: number = 0,
  successList: T[] = [],
  failList: T[] = []
) {
  if (currentIndex === 0 ) {
    dispatch(startAction())
  }
  let onFinish = () => {
    let notification: INotification
    if (successList.length) {
      notification = {
        message: `${successMessagePrefix}(${successList.length})`,
        level: "success",
      }
    }
    if (failList.length)
      notification = {
        message: `${failMessagePrefix}(${failList.length}) : ${failList.map(accessor).join(',\n')}`,
        level: "error",
      }

    dispatch(notify(notification))
    dispatch(endAction)
    return
  }
  resource(accessor(list[currentIndex])).then(() => {
    successList.push(list[currentIndex] as T)
    if ((list.length - 1) === currentIndex) {
      onFinish()
    } else {
      groupActionBody(
        startAction, endAction, resource, list, accessor, successMessagePrefix, failMessagePrefix, dispatch, currentIndex + 1, successList, failList
      )
    }
  }).catch(() => {
    failList.push(list[currentIndex] as T)
    if ((list.length - 1) === currentIndex) {
      onFinish()
    } else {
      groupActionBody(
        startAction, endAction, resource, list, accessor, successMessagePrefix, failMessagePrefix, dispatch, currentIndex + 1, successList, failList
      )
    }
  })
}
