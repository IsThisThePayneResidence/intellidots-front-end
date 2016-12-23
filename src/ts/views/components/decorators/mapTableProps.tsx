import { React, Component, IComponent } from '../../../viewUtils'
import store from '../../../basis/store'
import config from "../../../basis/config"
import { IFlexTableHandlerProps, IOnSet } from "./../../../modules/flex-table/interfaces"
import { saveTable } from "../../../reducer/page/tables"

/**
 * maps props from 'store.pages.tables' by 'tableKey'
 *
 * @returns {(Comp: any) => any}
 */
export function mapTableProps() {
  return (Comp: any): any => (
    class MapTablePropsWrapper extends Component<IFlexTableHandlerProps & IComponent, any> {

      onSet: IOnSet = settings => {
        __DEV__ && !this.props.dispatch && console.warn('"dispatch" must be provided.', this.props)
        this.props.dispatch(saveTable({settings, table: this.props.tableKey}))
      }

      render() {
        let ownProps = this.props
        __DEV__ && !ownProps.tableKey && console.warn(`'tableKey' prop must be passed`, ownProps)
        let props = {
          defaultSets:  store.getState().page.tables[ownProps.tableKey],
          pageSizes: config.view.pageSizes,
          onSet: this.onSet
        }
        return <Comp {...ownProps} {...props}/>
      }
    }
  )
}
