import { React, Component, connect, IMapper, IComponent } from './../../../../../viewUtils'
import { AvStop } from 'material-ui/svg-icons'
import { CFlatButton } from './../../../common/index'
import { IDdlPageStore } from '../../../../../reducer/page/tournaments'
import { IDdlRule } from './../../../../../resourcesInterfaces'
import { isRuleActive } from '../../../../../utils/simple/isRuleActive'
import { stopRulesGroup } from '../../../../../reducer/entity/ddlRules'
import { themeColor } from './../../../../../basis/theme'

const REF_FORM = 'REF_FORM'

interface IProps extends IDdlPageStore, IComponent {}
let mapper: IMapper<IProps> = state => state.page.ddl

@connect(mapper)
export default class StopTool extends Component<IProps, any> {

  onStop = () => {
    this.props.dispatch(stopRulesGroup(this.props.activeRules))
  }

  get disabled(): boolean {
    return (this.props.activeRules.length == 0) || this.props.activeRules.some((i: IDdlRule) => !isRuleActive(i))
  }

  render() {
    let disabled = this.disabled
    return (
      <div className="tool-item">
        <CFlatButton
          text="Stop"
          iconComp={<AvStop style={{fill: disabled ? undefined : themeColor.error}}/>}
          onTouchTap={this.onStop}
          disabled={disabled}
          style={{color: disabled ? undefined : themeColor.error}}
        />
      </div>
    )
  }
}