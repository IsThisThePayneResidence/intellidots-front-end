import { React, Component } from './../../../../viewUtils'
import { IFlexTableComponentProps, IColumnProps } from './../../interfaces'
import Table from './f-table'
import Pagination from './../part/pagination'
import Filtration from '../part/filtration'


export default class FLexTable extends Component<IFlexTableComponentProps, any> {

  render() {
    let showFilter = this.props.columns.some((column: IColumnProps) => column.filterComponent)
    return (
      <div>
        {showFilter ? <Filtration {...this.props}/> : null}
        <div className="data-table-block">
          <Table {...this.props}/>
          {this.props.pagination ? <Pagination {...this.props}/> : null}
        </div>
      </div>
    )
  }
}
