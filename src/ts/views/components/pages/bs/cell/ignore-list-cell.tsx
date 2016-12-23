import { React, Component, connect, IMapper } from './../../../../../viewUtils'
import Cell from '../../../../../modules/flex-table/component/cell/cell'




export default class IgnoreListCell extends Cell {

  get text(): string {
    return (this.fieldValue || []).join(';')
  }
}