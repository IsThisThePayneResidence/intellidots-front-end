import { React, Component, connect, IMapper, IComponent } from './../../../../../viewUtils'
import { AvPause } from 'material-ui/svg-icons'
import { CFlatButton } from './../../../common/index'
import { IBsPageStore } from '../../../../../reducer/page/bs'
import { IBsRule } from './../../../../../resourcesInterfaces'
import { isRuleActive } from '../../../../../utils/simple/isRuleActive'
import { pauseRulesGroup } from '../../../../../reducer/entity/bsRules'
import { themeColor } from './../../../../../basis/theme'

const REF_FORM = 'REF_FORM'

interface IProps extends IBsPageStore, IComponent {}
let mapper: IMapper<IProps> = state => state.page.bs

@connect(mapper)
export default class PauseTool extends Component<IProps, any> {

  onPause = () => {
    this.props.dispatch(pauseRulesGroup(this.props.activeRules))
  }

  get disabled(): boolean {
    return (this.props.activeRules.length == 0) || this.props.activeRules.some((i: IBsRule) => !isRuleActive(i))
  }

  render() {
    let disabled = this.disabled
    return (
      <div className="tool-item">
        <CFlatButton
          text="Pause"
          iconComp={<AvPause style={{fill: disabled ? undefined : themeColor.warn}}/>}
          onTouchTap={this.onPause}
          disabled={disabled}
          style={{color: disabled ? undefined : themeColor.error}}
        />
      </div>
    )
  }
}