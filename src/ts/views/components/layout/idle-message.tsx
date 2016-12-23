import { React, Component, connect, IComponent } from './../../../viewUtils'
import { Dialog, FlatButton } from 'material-ui'
import { IOtherStore, setIdle } from '../../../reducer/app/other'

interface IIdleMessage extends IComponent, IOtherStore {}

@connect((state) => (state.app.other))
export default class IdleMessage extends Component<IIdleMessage, any> {

  toLogin = () => {
    this.props.dispatch(setIdle(false));
  }

  render() {
    return this.props.idle ? (
      <div className="idle-warning">
        <Dialog
          title={'Session expired.'}
          open={true}
          onRequestClose={this.toLogin}
          actions={[
            <FlatButton
              label="Ok"
              primary={true}
              onClick={this.toLogin}
            />
          ]}
        >
          <p>To continue the work please log in.</p>
        </Dialog>
      </div>
    ) : (
      <div>
        {this.props.children}
      </div>
    )
  }
}