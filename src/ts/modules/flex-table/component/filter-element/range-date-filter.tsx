import { React } from './../../../../viewUtils'
import * as moment from 'moment'
import FiltrationCell from './../part/filtration-component'
import { IFilterItem } from './../../interfaces'
import { getValue } from '../../../../utils/simple/getValue'
import { ActionCode } from "material-ui/svg-icons"
import { DatePicker } from 'material-ui'
import { joinDivStyle, dateStyle, joinIconStyle } from './style-params'


interface IFiltrationSearchProps {
  placeholderFrom?: string
  placeholderTo?: string
}
interface IDateRange {
  min?: any
  max?: any
}


export default class RangeDateFilter extends FiltrationCell<IFiltrationSearchProps> {

  static defaultProps: IFiltrationSearchProps = {
    placeholderFrom: 'Later than',
    placeholderTo: 'Earlier than',
  }

  static filterFunction(value, filterItem: IFilterItem): boolean {
    let item = moment(getValue(value, filterItem.columnKey)).valueOf()
    let min = (filterItem.value as IDateRange).min
    let max = (filterItem.value as IDateRange).max

    min && (min = moment((filterItem.value as IDateRange).min).startOf('day').valueOf())
    max && (max = moment((filterItem.value as IDateRange).max).endOf('day').valueOf())
    // @todo check for utc
    return ((min === undefined || (item >= min)) && (max === undefined || (item <= max)))
  }

  clearRange(range: IDateRange): IDateRange {
    !range.min && delete range.min
    !range.max && delete range.max
    return (range.min === undefined && range.max === undefined)
      ? undefined
      : range
  }
  
  onChangeValueFrom = (event, date) => {
    let range: IDateRange = (Object as any).assign({}, this.filterColumnValue, {
      min: date,
    })

    this.triggerChangeFilter(this.clearRange(range))
  }

  onChangeValueTo = (event, date) => {
    let range: IDateRange = (Object as any).assign({}, this.filterColumnValue, {
      max: date,
    })

    this.triggerChangeFilter(this.clearRange(range))
  }

  render() {
    let range: IDateRange = this.filterColumnValue
    let minDate = (range && range.min) ? range.min : null
    let maxDate = (range && range.max) ? range.max : null

    return (
      <div style={joinDivStyle}>
        <DatePicker
          container="inline"
          hintText={this.props.placeholderFrom}
          onChange={this.onChangeValueFrom}
          value={minDate}
          maxDate={maxDate || undefined}
          {...dateStyle}
        />
        <ActionCode style={joinIconStyle}/>
        <DatePicker
          container="inline"
          hintText={this.props.placeholderTo}
          onChange={this.onChangeValueTo}
          value={maxDate}
          minDate={minDate || undefined}
          style={{display: 'inline-block'}}
          {...dateStyle}
        />
      </div>
    )
  }
}
