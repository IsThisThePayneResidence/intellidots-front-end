/**
 * @see http://confluence.simcord.com/pages/viewpage.action?pageId=38407470
 */
import { React, Component, connect, _prop } from '../../../../../viewUtils'
import { IStore } from '../../../../../basis/storeInterface'
import { IColumnProps, IFlexTableHandlerComponentProps } from '../../../../../modules/flex-table/interfaces'
import { IDdlMetric, IDdlRule } from '../../../../../resourcesInterfaces'
import { TABLE_DDL_METRIC } from '../../../../../reducer/page/tables'
import { compareTimeStamp } from '../../../../../utils/simple/sorters'
import { mapTableProps } from '../../../decorators/mapTableProps'
import TimeCell from '../../../common/cell/time-cell'
import RangeDateFilter from '../../../../../modules/flex-table/component/filter-element/range-date-filter'
import FlexTableHandler from '../../../../../modules/flex-table/component/wrapper/flex-table-handler'
import Cell from '../../../../../modules/flex-table/component/cell/cell'


interface IOwnProps {
  rule: IDdlRule
}
interface IState {}



@connect(mapState)
@mapTableProps()
export default class Metrics extends Component<IOwnProps, IState> {


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
    key: _prop((o: IDdlMetric) => o.timeStamp),
    title: "Date and time",
    render: TimeCell,
    filterComponent: <RangeDateFilter/>,
    sortFunction: (i1: IDdlMetric, i2: IDdlMetric) => compareTimeStamp(i1.timeStamp, i2.timeStamp),
  }, {
    key: _prop((o: IDdlMetric) => o.Cs),
    title: "Cs",
  }, {
    key: _prop((o: IDdlMetric) => o.Cbuy),
    title: "Cbuy",
  }, {
    key: _prop((o: IDdlMetric) => o.Csell),
    title: "Csell",
  }, {
    key: _prop((o: IDdlMetric) => o.Vbuy),
    title: "Vbuy",
  }, {
    key: _prop((o: IDdlMetric) => o.Vsell),
    title: "Vsell",
  }, {
    key: _prop((o: IDdlMetric) => o.Cnet),
    title: "Cnet",
  }, {
    key: _prop((o: IDdlMetric) => o.Vnet),
    title: "Vnet",
  }, {
    key: _prop((o: IDdlMetric) => o.BV_n),
    title: "BV_n",
  }, {
    key: "BV_n_1",
    title: "BV_(n-1)",
    render: LastCell,
  },
  ]

  let tableProps: IFlexTableHandlerComponentProps = {
    tableKey:    TABLE_DDL_METRIC,
    columns,
    displayData: state.entity.ddlMetrics.metrics.filter(message => message.ruleId == ownProps.rule.id),
  }
  return tableProps
}

class LastCell extends Cell {
  get fieldValue(): any {
    let value = _.at(this.props.item, 'BV_(n-1)')[0]
    if (value === undefined) {
      console.warn('object has not such property way', this.props.item, 'BV_(n-1)')
    }
    return value
  }
}

