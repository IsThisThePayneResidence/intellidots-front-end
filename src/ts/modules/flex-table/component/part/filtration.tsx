import { React, Component, IComponent } from './../../../../viewUtils'
import { IFlexTableComponentProps, IFlexTableHandlerProps, IColumnProps } from '../../interfaces'
import { ContentFilterList } from 'material-ui/svg-icons'
import { IconButton } from 'material-ui'


export default class Filtration extends Component<IFlexTableComponentProps & IFlexTableHandlerProps & IComponent, any> {

  resetFiltration = () => {
    Object.keys(this.props.filter).forEach(columnName => this.props.onFilterChange(null, columnName))
  }

  render() {
    let toolBlockStyle: React.CSSProperties = {
      background: '#e3f2fd',
      zIndex: 5,
    }
    let iconStyle: React.CSSProperties = {
      margin: '0 10px',
      fill: "rgb(52, 152, 219)",
    }
    let iconButtonStyle: React.CSSProperties = {
      padding: '0px',
    }
    return (
      <div>
        <div className="tool-block border-block" style={toolBlockStyle}>
          <IconButton tooltip="Reset current filter" onClick={this.resetFiltration} iconStyle={iconStyle} style={iconButtonStyle} >
            <ContentFilterList/>
          </IconButton>
          {this.props.columns.map((column: IColumnProps, key) => (
            column.filterComponent
              ? React.cloneElement(column.filterComponent, _.assign({key, column}, this.props))
              : null
          ))}
        </div>
      </div>
    )
  }
}