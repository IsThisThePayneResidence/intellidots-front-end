import { React, Component, connect, IMapper } from '../../../../../viewUtils'
import { CFlatButton } from '../../../common/index'
import { ContentAdd } from 'material-ui/svg-icons'
import { Dialog, FlatButton } from 'material-ui'
import AddForm from '../form/add-form'

const REF_FORM = 'REF_FORM'

interface IProps {}
let mapper: IMapper<IProps> = (state) => ({})

@connect(mapper)
export default class AddTool extends Component<IProps, any> {
  state = {
    show: false,
  }

  submit = () => {
    return ((this.refs[REF_FORM] as any).getWrappedInstance() as AddForm).callSubmit()
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
        label="Create"
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
    // @todo try using confirm (but ref will not work)
    return (
      <div className="tool-item">
        <Dialog
          title="Add rule"
          actions={this.actions}
          open={this.state.show}
          onRequestClose={this.hide}
          contentStyle={{width: '304px'}}
          bodyStyle={{overflow: 'auto'}}
        >
          <AddForm ref={REF_FORM} onRequestClose={this.hide}/>
        </Dialog>
        <CFlatButton
          text="Add"
          iconComp={<ContentAdd/>}
          onTouchTap={this.show}
        />
      </div>
    )
  }
}