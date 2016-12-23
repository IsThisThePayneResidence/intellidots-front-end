import { React, Component } from './../../../../viewUtils'
import {IFiltrationElementComponentProps, IFilterItem, IColumnProps} from './../../interfaces'



const EMPTY_FILTER = 'EMPTY_FILTER'
export default class FiltrationCell<T> extends Component<IFiltrationElementComponentProps & T, any> /*implements IFiltrationElement*/ {
  
  // needs for handler wrapper 
   static filterFunction(value, filterItem: IFilterItem): boolean {
    __DEV__ && console.warn('filterFunction must be overwritten')
    return true
  }

  get filterColumnValue() {
    return this.props.filter.hasOwnProperty(this.props.column.key)
      ? this.props.filter[this.props.column.key].value
      : undefined
  }

  get filterColumnMode() {
    return this.props.filter.hasOwnProperty(this.props.column.key)
      ? this.props.filter[this.props.column.key].filterMode || null
      : null
  }

  triggerChangeFilter = (value: any, filterMode: any = null) => {
    this.props.onFilterChange(value, this.props.column.key, filterMode)
  }
}
