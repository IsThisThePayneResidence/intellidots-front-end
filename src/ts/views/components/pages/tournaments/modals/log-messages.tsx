/**
 * @see http://confluence.simcord.com/pages/viewpage.action?pageId=38407472
 */
import { React, Component, connect, IComponent, _prop } from '../../../../../viewUtils'
import { IStore } from '../../../../../basis/storeInterface'
import { IColumnProps, IFlexTableHandlerComponentProps } from '../../../../../modules/flex-table/interfaces'
import { IBsLogMessage, IBsRule } from '../../../../../resourcesInterfaces'
import { TABLE_DDL_LOG_MESSAGE } from '../../../../../reducer/page/tables'
import { compareTimeStamp } from '../../../../../utils/simple/sorters'
import { mapTableProps } from '../../../decorators/mapTableProps'
import TimeCell from '../../../common/cell/time-cell'
import RangeDateFilter from '../../../../../modules/flex-table/component/filter-element/range-date-filter'
import FlexTableHandler from '../../../../../modules/flex-table/component/wrapper/flex-table-handler'


interface IOwnProps {
  rule: IBsRule
}
interface IState {}



@connect(mapState)
@mapTableProps()
export default class LogMessages extends Component<IOwnProps, IState> {


  render() {
    return (
      <FlexTableHandler
        {...this.props}
      />
    )
  }
}


function mapState(state: IStore, ownProps: IOwnProps) {
  let columns: IColumnProps[] =  [{
    key: _prop((o: IBsLogMessage) => o.timeStamp),
    title: "Date and time",
    render: TimeCell,
    filterComponent: <RangeDateFilter/>,
    sortFunction: (i1: IBsLogMessage, i2: IBsLogMessage) => compareTimeStamp(i1.timeStamp, i2.timeStamp),
  }, {
    key: _prop((o: IBsLogMessage) => o.type),
    title: "Type",
  }, {
    key: _prop((o: IBsLogMessage) => o.message),
    title: "Message",
  },
  ]

  let tableProps: IFlexTableHandlerComponentProps = {
    tableKey:    TABLE_DDL_LOG_MESSAGE,
    columns,
    displayData: state.entity.ddlLogMessages.logMessages.filter(message => message.ruleId == ownProps.rule.id),
  }
  return tableProps
}

