import { React, Component, cn } from './../../../../viewUtils'
import { IHeadCellComponentProps } from './../../interfaces'
import { NavigationArrowUpward, NavigationArrowDownward } from "material-ui/svg-icons"


export default class HeadCell extends Component<IHeadCellComponentProps, any> {

  get className(): string {
    let { column } = this.props
    return cn(
      column.key.replace(/\./gi, '_'), {
        'sort': column.sortable !== false,
        'sorted': this.sorted,
      }
    )
  }

  get sorted(): boolean {
    return this.props.sorter && (this.props.sorter.column === this.props.column.key) && (this.props.column.sortable !== false)
  }

  onSortChange = () => {
    this.props.column.sortable !== false && this.props.onSortChange(this.props.column)
  }

  render() {
    let sorter = this.props.sorter
    let column = this.props.column
    let iconStyle: React.CSSProperties = {
      width: '16px',
      height: '16px',
      fill: '#757575',
    }

    let divAttr = (typeof column.title === 'string')
      ? {title: column.title}
      : {}
    return (
      <div 
        className={this.className}
        onClick={this.onSortChange}
        {...divAttr}>
        <div>
          <span>{column.title}</span>
          {!this.sorted ? null : (sorter.ask
            ? <NavigationArrowDownward style={iconStyle}/>
            : <NavigationArrowUpward style={iconStyle}/>)}
        </div>
      </div>
    )
  }
}
