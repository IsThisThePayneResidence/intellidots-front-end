import { React, Component, IMapper, connect } from './../../../viewUtils'
import * as NotificationSystem from 'react-notification-system'
import config from '../../../basis/config'
import { INotificationStore } from '../../../reducer/app/notification'
import System = NotificationSystem.System
import Style = NotificationSystem.Style

const NOTIFICATION = 'NOTIFICATION'

interface IProps extends INotificationStore {}
let mapper: IMapper<IProps> = (state) => (state.app.notification)

@connect(mapper)
export default class Notification extends Component<IProps, any> {

  _notificationSystem: System = null

  componentDidMount() {
    this._notificationSystem = this.refs[NOTIFICATION] as any
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (this.props.notificationList.length !== nextProps.notificationList.length) {
      this._notificationSystem.addNotification(
        (Object as any).assign({},
          nextProps.notificationList[nextProps.notificationList.length - 1], {
            position: 'br', // bottom right
            autoDismiss: config.duration.notification,
        })
      )
    }

  }

  render() {
    var style: Style = {
      Dismiss: {
        DefaultStyle: {
          display: 'none',
        }
      },
      NotificationItem: {
        DefaultStyle: {
          color: 'white',
          fontSize: '15px',
          border: 'none',
          boxShadow: 'none',
        },
        success: {
          background: 'rgba(64, 159, 221, 0.8)' // now info color instead
        },
        error: {
          background: 'rgba(229, 60, 42, 0.8)' // themeColor.error,
        },
        // debug: {
        //   background: 'rgba(42, 187, 103, 0.8)' // themeColor.success,
        // },
        info: {
          background: 'rgba(64, 159, 221, 0.8)' // themeColor.info,
        },
        warning: {
          color: 'black',
          background: 'rgba(255, 235, 59, 0.8)' // themeColor.success,
        },
      }
    }
    return (
      <div>
        {this.props.children}
        <NotificationSystem ref={NOTIFICATION} style={style} />
      </div>
    )
  }
}
