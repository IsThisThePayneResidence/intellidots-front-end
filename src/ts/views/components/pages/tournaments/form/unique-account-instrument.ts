import { Callback } from 'input-filter'
import { IDdlRule } from './../../../../../resourcesInterfaces'
import store from './../../../../../basis/store'


export default new Callback((value, context: IDdlRule) => (
  // not editing and not used 
  ~store.getState().entity.ddlRules.tasks
    .filter((ddl: IDdlRule) => (ddl.accountNumber == context.accountNumber))
    .filter((ddl: IDdlRule) => (ddl.id != context.id))
    .map((ddl: IDdlRule) => ddl.instrument) // used instruments for account
    .indexOf(value)
    ? Promise.reject('instrument already is used for this account')
    : true
))
