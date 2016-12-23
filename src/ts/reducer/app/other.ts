import * as React from 'react'
import { action, handleActions } from '../../utils/index'

const SET_IDLE = 'app/SET_IDLE'

const setIdle = action<boolean>(SET_IDLE)

interface IOtherStore {
  idle?: boolean
}

let initialState: IOtherStore = {
  idle: false,
}


export default handleActions<IOtherStore>({
  [ SET_IDLE ]: (state, action) => ({
    idle: action.meta,
  }),
}, initialState)



export {
  setIdle,

  IOtherStore,
}