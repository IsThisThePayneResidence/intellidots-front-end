import { React, Component, connect, IComponent } from './../../../viewUtils'
import config from './../../../basis/config'
import { logout } from '../../../reducer/app/auth'
import { setIdle } from '../../../reducer/app/other'


@connect(()=>({}))
export default class IdleWatcher extends Component<IComponent, any> {
  timer = null

  componentDidMount() {
    this.onContinue()
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }

  onContinue = () => {
    this.timer && clearTimeout(this.timer)
    this.timer = setTimeout(this.onTimeOut, config.duration.idle)
  }

  onTimeOut = () => {
    this.props.dispatch(setIdle(true))
    this.props.dispatch(logout())
  }

  render() {
    return (
      <div className="idle-watcher" onMouseMove={this.onContinue} onKeyDown={this.onContinue}>
        {this.props.children}
      </div>
    )
  }
}
