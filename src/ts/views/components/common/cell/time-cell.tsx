import * as React from 'react'
import * as moment from 'moment'
import Cell from './../../../../modules/flex-table/component/cell/cell'


export default class TimeCell extends Cell {

  get fieldValue(): any {
    return _.at(this.props.item, this.props.column.key)[0] || ""
  }

  get text() {
    let value = this.fieldValue
    return value
      ? moment(this.fieldValue).utc().format('DD.MM.YYYY HH:mm:ss')
      : value
  }
}

