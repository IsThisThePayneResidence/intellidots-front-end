/**
 * @see http://confluence.simcord.com/pages/viewpage.action?pageId=38407470
 */
import { React, Component, connect, _prop } from '../../../../../viewUtils'
import { compareTimeStamp } from '../../../../../utils/simple/sorters'
import { IBsMetric, IBsRule } from '../../../../../resourcesInterfaces'
import { IColumnProps, IFlexTableHandlerComponentProps } from '../../../../../modules/flex-table/interfaces'
import { IStore } from '../../../../../basis/storeInterface'
import { mapTableProps } from '../../../decorators/mapTableProps'
import { TABLE_DDL_METRIC } from '../../../../../reducer/page/tables'
import Cell from '../../../../../modules/flex-table/component/cell/cell'
import FlexTableHandler from '../../../../../modules/flex-table/component/wrapper/flex-table-handler'
import RangeDateFilter from '../../../../../modules/flex-table/component/filter-element/range-date-filter'
import TimeCell from '../../../common/cell/time-cell'


interface IOwnProps {
  rule: IBsRule
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
    key: _prop((o: IBsMetric) => o.timeStamp),
    title: "Date and time",
    render: TimeCell,
    filterComponent: <RangeDateFilter/>,
    sortFunction: (i1: IBsMetric, i2: IBsMetric) => compareTimeStamp(i1.timeStamp, i2.timeStamp),
  }, {
    key: _prop((o: IBsMetric) => o.Cs),
    title: "Cs",
  }, {
    key: _prop((o: IBsMetric) => o.Cbuy),
    title: "Cbuy",
  }, {
    key: _prop((o: IBsMetric) => o.Csell),
    title: "Csell",
  }, {
    key: _prop((o: IBsMetric) => o.Vbuy),
    title: "Vbuy",
  }, {
    key: _prop((o: IBsMetric) => o.Vsell),
    title: "Vsell",
  }, {
    key: _prop((o: IBsMetric) => o.BVbuy_n),
    title: "BVbuy_n",
  }, {
    key: _prop((o: IBsMetric) => o.BCbuy),
    title: "BCbuy",
  }, {
    key: _prop((o: IBsMetric) => o.BCsell),
    title: "BCsell",
  }, {
    key: "BVbuy_(n-1)",
    title: "BVbuy_(n-1)",
  }, {
    key: "BVsell_(n-1)",
    title: "BVsell_(n-1)",
  },
  ]

  let tableProps: IFlexTableHandlerComponentProps = {
    tableKey:    TABLE_DDL_METRIC,
    columns,
    displayData: state.entity.bsMetrics.metrics.filter(message => message.ruleId == ownProps.rule.id),
  }
  return tableProps
}


