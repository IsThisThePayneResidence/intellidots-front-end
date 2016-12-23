import * as React from 'react'
import { action, handleActions } from '../../utils/index'


interface IShowSpinnerData {
  showSpinner: boolean
  componentName: any
}
interface ISpinnerStore {
  showSpinner?: boolean
  componentsMap?: {
    [key:string] : boolean
  }
}


const SHOW_SPINNER  = 'app/SHOW_SPINNER'

const showSpinner = action<IShowSpinnerData>(SHOW_SPINNER)

const initialState: ISpinnerStore = {
  showSpinner: false,
  componentsMap: {},
}

export default handleActions<ISpinnerStore>({
  [ SHOW_SPINNER ]: (state, action) => {
    let data: IShowSpinnerData = action.meta
    let componentsMap = state.componentsMap
    componentsMap[data.componentName] = data.showSpinner
    return ({
      showSpinner: Object.keys(componentsMap).some(comp => componentsMap[comp]),
      componentsMap,
    })
  },
}, initialState)



export {
  showSpinner,

  IShowSpinnerData,
  ISpinnerStore,
}
