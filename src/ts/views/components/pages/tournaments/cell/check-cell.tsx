import { React, Component, connect, IMapper } from '../../../../../viewUtils'
import { Checkbox } from 'material-ui'
import { ICellProps } from '../../../../../modules/flex-table/interfaces'
import { IDdlPageStore } from '../../../../../reducer/page/tournaments'


let mapper: IMapper<IDdlPageStore> = (state) => state.page.ddl

@connect(mapper)
export default class CheckCell extends Component<ICellProps & IDdlPageStore, any> {

  render() {
    return (
      <div className={"check-column"} >
        <div>
          <Checkbox
            checked={this.props.activeRules && this.props.activeRules.some(i => _.isEqual(i, this.props.item))}
          />
        </div>
      </div>
    )
  }
}