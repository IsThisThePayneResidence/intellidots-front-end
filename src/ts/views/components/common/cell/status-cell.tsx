import { React, Component, cn } from './../../../../viewUtils'
import { ICellProps } from './../../../../modules/flex-table/interfaces'
import { IDdlRule } from './../../../../resourcesInterfaces'
import { isRuleActive } from '../../../../utils/simple/isRuleActive'

export default class ActionCell extends Component<ICellProps, any> {

  render() {
    let active = isRuleActive((this.props.item) as IDdlRule)
    return (
      <div className={cn("status-cell", {active})} >
        <div>
          {active ? 'On' : 'Off'}
        </div>
      </div>
    )
  }
}