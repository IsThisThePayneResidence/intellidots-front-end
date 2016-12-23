import { React, Component, connect, IMapper } from './../../../../../viewUtils'
import { ActionViewHeadline, ImageTune } from 'material-ui/svg-icons'
import { Dialog } from 'material-ui'
import { ICellProps } from './../../../../../modules/flex-table/interfaces'
import { IconButton } from 'material-ui'
import { IDdlLogMessagesStore } from '../../../../../reducer/entity/ddlLogMessages'
import { IDdlMetricsStore } from '../../../../../reducer/entity/ddlMetrics'
import { IDdlPageStore } from '../../../../../reducer/page/tournaments'
import { IDdlRule } from '../../../../../resourcesInterfaces'
import { IStore } from '../../../../../basis/storeInterface'
import LogMessages from '../modals/log-messages'
import Metrics from '../modals/metrics'



export default class DetailsCell extends Component<ICellProps & IDdlPageStore, any> {

  render() {
    let rule: IDdlRule = this.props.item as IDdlRule
    return (
      <div className={this.props.column.key} >
        <div>
          <MetricsDialog rule={rule}/>
          <LogMessageDialog rule={rule}/>
        </div>
      </div>
    )
  }
}



let iconStyle = (disabled): React.CSSProperties => ({
  height: '18px',
  width: '18px',
  fill: disabled ? 'rgba(62, 72, 85, 0.298039)' : 'rgb(52, 152, 219)',
})

let iconButtonStyle: React.CSSProperties = {
  padding: '0px',
  height: '32px',
  width: '32px',
}
let modalStyles = {
  bodyStyle: {
    overflowY: 'auto',
  },
  style: {
    maxWidth: 'inherit',
  },
  contentStyle: {
    maxWidth: 'inherit',
  }
}




let metricMapper: IMapper<IDdlMetricsStore> = (state: IStore) => state.entity.ddlMetrics
@connect(metricMapper)
class MetricsDialog extends Component<IDdlMetricsStore & IWithRule, any> {

  state = {show: false}
  hide = () => this.setState({show: false})
  show = () => this.setState({show: true})

  render() {
    let title = 'Detailed status of metrics view'
    let disabled = !this.props.metrics.some(metric => metric.ruleId == this.props.rule.id)
    return (
      <span>
        <Dialog
          title={title}
          open={this.state.show}
          onRequestClose={this.hide}
          {...modalStyles}
        >
          <Metrics rule={this.props.rule}/>
        </Dialog>
        <IconButton onClick={this.show} tooltip={title} iconStyle={iconStyle(disabled)} style={iconButtonStyle} disabled={disabled}>
          <ImageTune/>
        </IconButton>
      </span>
      )
    }
}



let messageMapper: IMapper<IDdlLogMessagesStore> = (state: IStore) => state.entity.ddlLogMessages
@connect(messageMapper)
class LogMessageDialog extends Component<IDdlLogMessagesStore & IWithRule, any> {

  state = {show: false}
  hide = () => this.setState({show: false})
  show = () => this.setState({show: true})

  render() {
    let title = 'Detailed status of errors view'
    let disabled = !this.props.logMessages.some(message => message.ruleId == this.props.rule.id)
    return (
      <span>
        <Dialog
          title={title}
          open={this.state.show}
          onRequestClose={this.hide}
          {...modalStyles}
        >
          <LogMessages rule={this.props.rule}/>
        </Dialog>
        <IconButton onClick={this.show} tooltip={title} iconStyle={iconStyle(disabled)} style={iconButtonStyle} disabled={disabled}>
          <ActionViewHeadline/>
        </IconButton>
      </span>
      )
    }
}

interface IWithRule {
  rule: IDdlRule
}