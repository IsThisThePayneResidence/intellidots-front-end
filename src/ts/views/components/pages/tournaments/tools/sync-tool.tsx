import { React, Component, connect, IMapper, IComponent } from './../../../../../viewUtils'
import { AvLoop } from 'material-ui/svg-icons'
import { CFlatButton } from './../../../common/index'
import { IDdlPageStore } from '../../../../../reducer/page/tournaments'
import { IDdlRule } from './../../../../../resourcesInterfaces'
import { isRuleActive } from '../../../../../utils/simple/isRuleActive'
import { syncRulesGroup } from '../../../../../reducer/entity/ddlRules'
import { themeColor } from './../../../../../basis/theme'

const REF_FORM = 'REF_FORM'

interface IProps extends IDdlPageStore, IComponent {}
let mapper: IMapper<IProps> = state => state.page.ddl

@connect(mapper)
export default class SyncTool extends Component<IProps, any> {

  onSync = () => {
    this.props.dispatch(syncRulesGroup(this.props.activeRules))
  }

  get disabled(): boolean {
    return (this.props.activeRules.length == 0) || this.props.activeRules.some((i: IDdlRule) => !isRuleActive(i))
  }

  render() {
    let disabled = this.disabled
    return (
      <div className="tool-item">
        <CFlatButton
          text="Sync"
          iconComp={<AvLoop style={{fill: disabled ? undefined : themeColor.info}}/>}
          onTouchTap={this.onSync}
          disabled={disabled}
          style={{color: disabled ? undefined : themeColor.info}}
        />
      </div>
    )
  }
}