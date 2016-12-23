import { Callback } from 'input-filter'
import { IBsRule } from './../../../../../resourcesInterfaces'
import store from './../../../../../basis/store'


export default new Callback((value, context: IBsRule) => (
  // not editing and not used 
  ~store.getState().entity.bsRules.rules
    .filter((bs: IBsRule) => (bs.accountNumber == context.accountNumber))
    .filter((bs: IBsRule) => (bs.id != context.id))
    .map((bs: IBsRule) => bs.instrument) // used instruments for account
    .indexOf(value)
    ? Promise.reject('instrument already is used for this account')
    : true
))
