import { React, Component, cn } from './../../../../viewUtils'
import { ITableComponentProps, IColumnProps } from './../../interfaces'
import { Cell, HeadCell } from './../../index'


export default class FTable extends Component<ITableComponentProps, any> {

  static defaultProps = {
    notActual: false,
    withOutHeader: false,
    activeRowIndex: null,
  }
  
  onSelect = (item, i) => () => {
    if (this.props.onRowSelect) {
      let items = _.clone(this.props.activeItems)
      let position = (this.props.activeItems as any).findIndex(i => _.isEqual(i, item))
      if (~position) {
        items.splice(position, 1)
      } else {
        items.push(item)
      }
      this.props.onRowSelect(item, i, items)
    }
  }

  get showColumns(): IColumnProps[] {
    return this.props.openColumns
      ? this.props.columns.filter(c => !!(this.props.openColumns.indexOf(c.key) + 1))
      : this.props.columns
  }
  
  get renderHeaders() {
    return this.props.withOutHeader ? null : (
      <div className="f-head f-row">
        {this.showColumns.map((column, i) => (
          <HeadCell
            key={i}
            rowIndex={i}
            column={column}
            onSortChange={this.props.onSortChange}
            sorter={this.props.sorter}
          />
        ))}
      </div>
    )
  }

  get renderRows() {
    return this.props.displayData.map((item, i) => (
      <div 
        key={i} 
        className={cn('f-row', {
          'active-row': this.props.activeItems && this.props.activeItems.some(i => _.isEqual(i, item))
        })}
        onClick={this.onSelect(item, i)}
      >
        {this.showColumns.map((column, j) => {
          
          let CellItem = (column.render
            ? column.render
            : Cell) as React.ComponentClass<any>
          return <CellItem key={j} item={item} column={column} rowIndex={i}/>
        })}
      </div>
    ))
  }


  render() {
    let className = cn(
      this.props.tableClassName || "f-table bordered",
      {'not-actual': this.props.notActual}
    )
    return (
      <div className={className}>
          {this.renderHeaders}
          {this.props.displayData.length
            ? this.renderRows
            : <div key="no-data" className="f-row"><div style={{justifyContent: 'center'}}>No data</div></div>
          }
      </div>
    )
  }

}
