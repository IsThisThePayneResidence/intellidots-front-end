import { React, Component, connect, IMapper } from '../../../../../viewUtils'
import { CFlatButton } from '../../../common/index'
import { ContentCreate } from 'material-ui/svg-icons'
import { Dialog, FlatButton } from "material-ui"
import { IDdlPageStore } from '../../../../../reducer/page/tournaments'
import EditForm from '../form/edit-form'
const REF_FORM = 'REF_FORM'

interface IProps extends IDdlPageStore{}

let mapper: IMapper<IProps> = state => state.page.ddl


@connect(mapper)
export default class EditTool extends Component<IProps, {}> {

  state = {
    show: false,
  }

  submit = () => {
    return ((this.refs[REF_FORM] as any).getWrappedInstance() as EditForm).callSubmit()
  }

  hide = () => {
    this.setState({
      show: false,
    })
  }


  show = () => {
    this.setState({
      show: true,
    })
  }

  get actions() {
    return [
      <FlatButton
        label="Save"
        primary={true}
        onClick={this.submit}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.hide}
      />
    ]
  }

  render() {
    let disabled = (this.props.activeRules.length !==1) || !!this.props.activeRules[0].startTime
    return (
      <div className="tool-item">
        <Dialog
          title="Edit rule"
          actions={this.actions}
          open={this.state.show}
          onRequestClose={this.hide}
          contentStyle={{width: '304px'}}
          bodyStyle={{overflow: 'auto'}}
        >
          <EditForm ref={REF_FORM} onRequestClose={this.hide}/>
        </Dialog>
        <CFlatButton
          text="Edit"
          iconComp={<ContentCreate/>}
          onTouchTap={this.show}
          disabled={disabled}
        />
      </div>
    )
  }
  }