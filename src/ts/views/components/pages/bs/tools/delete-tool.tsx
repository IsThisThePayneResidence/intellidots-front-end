import { React, Component, connect, IMapper, IComponent } from '../../../../../viewUtils'
import { CFlatButton, Confirm } from '../../../common/index'
import { ContentRemove } from 'material-ui/svg-icons'
import { deleteRulesGroup } from '../../../../../reducer/entity/ddlRules'
import { IBsPageStore } from '../../../../../reducer/page/bs'


interface IProps extends IBsPageStore, IComponent {}

let mapper: IMapper<IProps> = state => state.page.bs

@connect(mapper)
export default class DeleteTool extends Component<IProps, {}> {

  onRemove = () => {
    this.props.dispatch(deleteRulesGroup(this.props.activeRules))
  }

  render() {
    let s = this.props.activeRules.length != 1 ? 's' : ''
    return (
      <div className="tool-item">
        <Confirm
          onApprove={this.onRemove}
          message={ `
            Do you want delete rule${s}?\n
            Duplicate process will stop for deleted rule${s}.
          `}
          oneButton={true}
          header="Delete rule"
          dialogProps={{contentStyle: {width: '304px'}}}
        >
          <CFlatButton
            text="Delete"
            iconComp={<ContentRemove/>}
            disabled={this.props.activeRules.length == 0}
          />
        </Confirm>
      </div>
    )
  }
}