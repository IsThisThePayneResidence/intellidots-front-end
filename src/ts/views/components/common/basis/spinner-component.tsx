import { React, Component, cn } from '../../../../viewUtils'
import { CircularProgress } from 'material-ui'

export default class Spinner extends Component<{show?: boolean}, any> {
  render() {
    return (
      <div className={cn('spinner-component', {show: this.props.show})}>
        <CircularProgress size={60}/>
      </div>
    )
  }
}