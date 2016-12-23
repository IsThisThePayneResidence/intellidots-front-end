import { action, handleActions } from '../../utils/index'
import { ISettingsReq } from '../../modules/flex-table/interfaces'

const SAVE_TABLE = 'tables/SAVE_TABLE'

export const TABLE_DDL = 'TABLE_DDL'
export const TABLE_DDL_METRIC = 'TABLE_DDL_METRIC'
export const TABLE_DDL_LOG_MESSAGE = 'TABLE_DDL_LOG_MESSAGE'

export const TABLE_BS = 'TABLE_BS'
export const TABLE_BS_METRIC = 'TABLE_BS_METRIC'
export const TABLE_BS_LOG_MESSAGE = 'TABLE_BS_LOG_MESSAGE'
export const TABLE_TASK = 'TABLE_TASK'

export interface ISaveTableData {
  settings: ISettingsReq
  table: string
}

export const saveTable = action<ISaveTableData>(SAVE_TABLE)


export interface ITablesStore {
  [key: string]: ISettingsReq
}

let initialState: ITablesStore = {
  // [TABLE_DDL] : undefined,
}



export default handleActions<ITablesStore>({
  [ SAVE_TABLE ]: (state, action) => {
    let data: ISaveTableData = action.meta
    return {
      [data.table]: _.assign({}, state[data.table], data.settings) as ISettingsReq
    }
  },
}, initialState)


