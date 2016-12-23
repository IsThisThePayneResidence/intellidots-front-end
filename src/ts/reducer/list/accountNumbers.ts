import * as R from '../../resources'
import { IAccountNumber } from '../../resourcesInterfaces'
import { action, handleActions, handlePromise } from '../../utils/index'

const GET_ACCOUNTS_NUMBERS = 'accountNumbers/GET_ACCOUNTS_NUMBERS'

interface IAccountNumbersStore {
  accountNumbers?: IAccountNumber[]
  accountNumbersIsLoaded?: boolean
  accountNumbersIsLoading?: boolean
}

const getAccountNumbers  = action(GET_ACCOUNTS_NUMBERS, R.accountNumbersGet)

const initialState: IAccountNumbersStore = {
  accountNumbers: [],
  accountNumbersIsLoaded: false,
  accountNumbersIsLoading: false,
}

export default handleActions<IAccountNumbersStore>({
  [ GET_ACCOUNTS_NUMBERS ]: handlePromise('accountNumbers'),
}, initialState)

export {
  getAccountNumbers,

  IAccountNumbersStore,
}

