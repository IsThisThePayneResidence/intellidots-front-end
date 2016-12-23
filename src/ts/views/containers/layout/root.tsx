import {React, Component, connect, IStore, cn, spinner} from './../../../viewUtils'
import { IMenuStore } from '../../../reducer/app/menu'
import { ISpinnerStore } from '../../../reducer/app/spinner'

import Header from './header'
import Sidebar from './sidebar'
import Spinner from '../../components/common/basis/spinner-component'
import IdleWatcher from './../../components/layout/idle-watcher'
import {getTournaments, ITournamentsStore} from "../../../reducer/entity/tournament";
import {_prop} from "../../../utils/simple/interfaceToString";
import {loader} from "../../components/decorators/loader";




@connect((state: IStore) => (_.assign({},  state.entity.tournaments )))
// @spinner([
//       // _prop((o: IProps) => o.tournamentsIsLoading)
//     ], [
//       _prop((o: ITournamentsStore) => o.tournamentsIsLoaded),
//     ],
//     'tournament')
// @loader({
//   // [_prop((o: ITournamentsStore) => o.tournamentsIsLoaded)]: getTournaments,
// }, {
//   // getRule, getRuleStatistics, getMetrics, getLogMessages // often reload
// }, {
//   // getAccountNumbers, getInstruments // seldom reload
// })
class RootLoader extends Component<ITournamentsStore, any> {
  render() {
    return (
        <div>
          {this.props.children}
        </div>
    )
  }
}




@connect((state: IStore) => (_.assign({},  state.app.spinner )))
export default class Root extends Component<ISpinnerStore, any> {
  render() {
    return (
      <IdleWatcher>
        <div>
          <RootLoader>
            <Header />
            <Sidebar />
            <div className={cn("pages-wrapper", {'show-menu' : true})}>
              <div className="pages-content">
                {this.props.children}
              </div>
            </div>
          </RootLoader>
          <Spinner show={this.props.showSpinner}/>
        </div>
      </IdleWatcher>
    )
  }
}


