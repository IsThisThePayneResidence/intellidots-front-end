import { React, Component } from './../../../../viewUtils'
import {
  getNewSorter, getChangedFilter, getDisplayData, getInitSorter,
} from './../../handler/handlers'
import { FlexTable } from './../../index'
import {
  IColumnProps, IFlexTableHandlerComponentProps, ISorterProps, IOnSortChange, IFiltrationElementProps, IFilter,
  IOnFilterChange, IPagination, IFlexTableComponentProps, ISettingsReq, ITransmittedProps
} from './../../interfaces'

interface IFlexTableHandlerState {
  sorter?: ISorterProps,
  displayData?: any[] | any
  originData?: any[] | any
  activeRowIndex?: number
  filter?: IFilter
  pagination?: IPagination
  itemsCount?: number
}



export default class FlexTableHandler extends Component<IFlexTableHandlerComponentProps, IFlexTableHandlerState> {

  state = this.getInitState()

  getDefaultSettings(): ISettingsReq {
    return {
      filter: {} as IFilter,
      sorter: null,
      pagination: {
        pageSize: this.props.pageSizes && this.props.pageSizes[0] || 30,
        currentPage: 1,
      },
    }
  }

  getInitState(): IFlexTableHandlerState {
    let settings = _.merge(this.getDefaultSettings(), this.props.defaultSets)
    let filter = _.cloneDeep(settings.filter)
    let sorter = _.cloneDeep(getInitSorter(settings.sorter, this.props.columns))
    let displayData = getDisplayData(this.props.displayData, filter, sorter, this.props.columns)
    return {
      activeRowIndex: null,
      displayData: this.getPageData(displayData, settings.pagination),
      filter: filter,
      originData: this.props.displayData,
      sorter: sorter,
      pagination: settings.pagination,
      itemsCount: displayData.length,
    }
  }

  componentWillReceiveProps(nextProps: IFlexTableHandlerComponentProps) {
    if (!_.isEqual(nextProps.displayData, this.props.displayData)) {
      this.onGetData(nextProps.displayData)
    }
  }

  // triggers  // here should not be installed default values from state (they can be overwritten)
  onSetTrigger(sorter: ISorterProps, filter: IFilter, pagination: IPagination) {
    this.props.onSet && this.props.onSet({sorter, filter, pagination})
  }

  // handlers
  onGetData(originData) {
    this.needUpdateData(originData, this.state.filter, this.state.sorter, this.state.pagination)
  }
  
  onSortChange: IOnSortChange = (column: IColumnProps) => {
    let sorter: ISorterProps = getNewSorter(this.state.sorter, column.key)
    
    this.onSetTrigger(sorter, this.state.filter, this.state.pagination)
    this.needUpdateData(this.props.displayData, this.state.filter, sorter, this.state.pagination)
  }

  onFilterChange: IOnFilterChange = (value: any, columnKey: string, filterMode: string = null) => {
    let column: IColumnProps = (this.props.columns as any).find((c: IColumnProps) => c.key === columnKey)
    let filter = getChangedFilter(value, column, this.state.filter, filterMode)

    this.onSetTrigger(this.state.sorter, filter, this.state.pagination)
    this.needUpdateData(this.props.displayData, filter, this.state.sorter, this.state.pagination)
  }

  // processing
  needUpdateData(originData: any[], filter: IFilter, sorter: ISorterProps, pagination: IPagination) {
    let data = getDisplayData(originData, filter, sorter, this.props.columns)
    let itemsCount = data.length
    data = this.getPageData(data, pagination)

    this.updateData(data, filter, sorter, pagination, itemsCount)
  }

  getPageData(displayData: any[], pagination: IPagination): any[] {
    let start = pagination.pageSize * (pagination.currentPage - 1)
    return displayData.slice(start, start + pagination.pageSize)
  }

  // paging
  onPaginationChange(pagination: IPagination) {
    this.onSetTrigger(this.state.sorter, this.state.filter, pagination)
    this.needUpdateData(this.props.displayData, this.state.filter, this.state.sorter, pagination)
  }

  updateData(displayData: any[], filter: IFilter, sorter: ISorterProps, pagination: IPagination, itemsCount: number) {
    this.setState({
      displayData,
      sorter,
      filter,
      pagination,
      itemsCount,
    })
  }

  render() {
    let handlers: IFlexTableComponentProps = {
      onSortChange: this.onSortChange.bind(this),
      onFilterChange: this.onFilterChange.bind(this),
      onPaginationChange: this.onPaginationChange.bind(this),
    }
    let props: IFlexTableComponentProps = {}
    if (this.props.defaultSets && this.props.defaultSets.openColumns)
      props.openColumns = this.props.defaultSets.openColumns
    return (
      <FlexTable
        {...this.props}
        {...this.state}
        {...handlers}
        {...props}
      />
    )
  }
}
