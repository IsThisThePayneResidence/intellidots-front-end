import * as React from 'react'
import { IDdlRule } from '../../resourcesInterfaces'
import { GET_RULES } from '../entity/ddlRules'
import { action, actionPrefix, handleActions } from '../../utils/promiseMiddleware/promise-middleware-helper'

const SELECT_ACTIVE_RULES = 'ddl_page/SELECT_ACTIVE_RULES'

type ISelectActiveRulesData = IDdlRule[]
const selectActiveRules = action<ISelectActiveRulesData>(SELECT_ACTIVE_RULES)


interface IDdlPageStore {
  activeRules?: IDdlRule[]
}

let initialState: IDdlPageStore = {
  activeRules: [],
}


export default handleActions<IDdlPageStore>({
  [ SELECT_ACTIVE_RULES ]: (state, action) => ({
      activeRules: (action.meta as ISelectActiveRulesData)
  }),
    // on renew tasks
  [ `${GET_RULES}${actionPrefix.fulfilled}` ]: (state, action) => {
      let newRules: IDdlRule[]       = action.payload
      let oldActiveIndexes           = state.activeRules.map((r: IDdlRule) => r.id)
      let newActiveRules: IDdlRule[] = newRules.filter((r: IDdlRule) => (oldActiveIndexes.indexOf(r.id) !== -1))
      return {
        activeRules: newActiveRules,
      }
  },
}, initialState)



export {
  selectActiveRules,

  IDdlPageStore,
}