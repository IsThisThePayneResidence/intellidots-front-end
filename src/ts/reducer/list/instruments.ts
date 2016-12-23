import * as R from '../../resources'
import { action, handleActions, handlePromise } from '../../utils/index'
import { IInstrument } from '../../resourcesInterfaces'

const GET_INSTRUMENTS = 'instruments/GET_INSTRUMENTS'

interface IInstrumentStore {
  instruments?: IInstrument[]
  instrumentsIsLoading?: boolean
  instrumentsIsLoaded?: boolean
}

const getInstruments  = action(GET_INSTRUMENTS, R.instrumentsGet)

const initialState: IInstrumentStore = {
  instruments: [],
  instrumentsIsLoading: false,
  instrumentsIsLoaded: false,
}

export default handleActions<IInstrumentStore>({
  [ GET_INSTRUMENTS ]: handlePromise('instruments'),
}, initialState)

export {
  getInstruments,

  IInstrumentStore,
}

