import { React, Component, connect, IMapper, IComponent } from '../../../../../viewUtils'
import { AvPlayArrow } from 'material-ui/svg-icons'
import { CFlatButton } from './../../../common/index'
import { IBsPageStore } from '../../../../../reducer/page/bs'
import { IBsRule } from './../../../../../resourcesInterfaces'
import { isRuleActive } from '../../../../../utils/simple/isRuleActive'
import { startRulesGroup } from '../../../../../reducer/entity/ddlRules'
import { themeColor } from './../../../../../basis/theme'

const REF_FORM = 'REF_FORM'

interface IProps extends IBsPageStore, IComponent {}
let mapper: IMapper<IProps> = state => state.page.bs

@connect(mapper)
export default class StartTool extends Component<IProps, {}> {

  onStart = () => {
    this.props.dispatch(startRulesGroup(this.props.activeRules))
  }

  get disabled(): boolean {
    return (this.props.activeRules.length == 0) || this.props.activeRules.some((i: IBsRule) => isRuleActive(i))
  }

  render() {
    let disabled = this.disabled
    return (
      <div className="tool-item">
        <CFlatButton
          text="Start"
          iconComp={<AvPlayArrow style={{fill: disabled ? undefined : themeColor.success}}/>}
          onTouchTap={this.onStart}
          disabled={disabled}
          style={{color: disabled ? undefined : themeColor.success}}
        />
      </div>
    )
  }
}