/**
 * @see http://confluence.simcord.com/pages/viewpage.action?pageId=39683658
 */
import { React, Component, connect, IComponent, loader, _prop, spinner } from './../../../viewUtils'
import {
    ITournamentsStore, getTournaments, selectActiveTournament,
    selectActiveTask
} from "../../../reducer/entity/tournament";
import {IOnRowSelect, IFlexTableHandlerComponentProps, IColumnProps} from "../../../modules/flex-table/interfaces";
import {ITournament, ITask} from "../../../resourcesInterfaces";
import FlexTableHandler from "../../../modules/flex-table/component/wrapper/flex-table-handler";
import {TABLE_TASK} from "../../../reducer/page/tables";
import {IStore} from "../../../basis/storeInterface";
import {mapTableProps} from "../../components/decorators/mapTableProps";
import {FlatButton} from "material-ui";


interface IProps extends ITournamentsStore, IComponent {}
interface IState { }



@connect(mapState)
@mapTableProps()
@spinner([
        // _prop((o: IProps) => o.tournamentsIsLoading)
    ], [
        _prop((o: ITournamentsStore) => o.tournamentsIsLoaded),
    ],
    'tournament')
@loader({
    [_prop((o: ITournamentsStore) => o.tournamentsIsLoaded)]: getTournaments,
}, {
    [_prop((o: ITournamentsStore) => o.tournamentsIsLoaded)]: getTournaments,
    // getRule, getRuleStatistics, getMetrics, getLogMessages // often reload
}, {
    // getAccountNumbers, getInstruments // seldom reload
})
export default class TaskComponent extends Component<IProps, IState> {
  renderTools = () => (
    <div className="tool-block border-block">
      <div style={{flex: 1}}/>
    </div>
  )

  onRowSelect: IOnRowSelect = (item: ITask, index, items) => {
    this.props.dispatch(selectActiveTask(item))
  }

  renderTable = () => {
    return (
      <div>
        <FlexTableHandler
          {...this.props}
          onRowSelect={this.onRowSelect}
        />
      </div>
    )
  }

  renderActiveTask = () => {
      return (
          <div>
              <div>
                  <FlatButton onClick={() => {this.onRowSelect(null,null,null)}}>
                      Назад
                  </FlatButton>
              </div>
              <div dangerouslySetInnerHTML={{__html: this.props.activeTask.htmlBody}}>
              </div>
          </div>
      )

  }


  renderContent() {
      return this.props.activeTask
          ? this.renderActiveTask()
          : this.renderTable()
  }

  render() {
      return (
          <div>
              {this.props.activeTournament
                  ? this.renderContent()
                  : null
              }
          </div>
      )
  }
}


function mapState(state: IStore): IProps {
  let tournaments = state.entity.tournaments
  let columns: IColumnProps[] =  [{
    key: _prop((o: ITask) => o.id),
    title: "Id",
  }, {
    key: _prop((o: ITask) => o.name),
    title: "Name",
  }
  ]
    let tableProps: IFlexTableHandlerComponentProps = {
        columns,
        tableKey: TABLE_TASK,
        activeItems: tournaments.activeTask ? [tournaments.activeTask] : [],
        displayData: tournaments.activeTournament ? tournaments.activeTournament.tasks : []
    }
  return (Object as any).assign(
    {},
    tableProps,
    tournaments
  )
}

