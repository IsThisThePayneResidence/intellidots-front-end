// app
import { IAuthStore } from '../reducer/app/auth'
import { IMenuStore } from '../reducer/app/menu'
import { INotificationStore } from '../reducer/app/notification'
import { IOtherStore } from '../reducer/app/other'
import { ISpinnerStore } from '../reducer/app/spinner'

// entities
import { IBsLogMessagesStore } from '../reducer/entity/bsLogMessages'
import { IBsMetricsStore } from '../reducer/entity/bsMetrics'
import { IBsRuleStore } from '../reducer/entity/bsRules'
import { IDdlLogMessagesStore } from '../reducer/entity/ddlLogMessages'
import { IDdlMetricsStore } from '../reducer/entity/ddlMetrics'
import { IDdlRuleStore } from '../reducer/entity/ddlRules'

// list
import { IAccountNumbersStore } from '../reducer/list/accountNumbers'
import { IInstrumentStore } from '../reducer/list/instruments'

// pages
import { IBsPageStore } from '../reducer/page/bs'
import { IDdlPageStore } from '../reducer/page/tournaments'
import { ITablesStore } from '../reducer/page/tables'
import {ITournamentsStore} from "../reducer/entity/tournament";


export interface IStore {
  app: IAppStore
  entity: IEntityStore
  list: IListStore
  page: IPageStore
  routing: { locationBeforeTransitions: Location}
}


interface IAppStore {
  auth: IAuthStore
  menu: IMenuStore
  notification: INotificationStore
  other: IOtherStore
  spinner: ISpinnerStore
}

interface IEntityStore {
  bsLogMessages: IBsLogMessagesStore
  bsMetrics: IBsMetricsStore
  bsRules: IBsRuleStore
  tournaments: ITournamentsStore

  ddlLogMessages: IDdlLogMessagesStore
  ddlMetrics: IDdlMetricsStore
  ddlRules: IDdlRuleStore
}

interface IListStore {
  accountNumbers: IAccountNumbersStore
  instruments: IInstrumentStore
}

interface IPageStore {
  bs: IBsPageStore
  ddl: IDdlPageStore
  tables: ITablesStore
}




