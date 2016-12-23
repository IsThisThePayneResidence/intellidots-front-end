import { React, Component, IComponent } from './../../../viewUtils'
import { IFetchActionFunction } from './../../../utils/index'
import { autoLoader } from '../../../app/autoLoader'

type ILoadAction = (() => any) | IFetchActionFunction<any>
type ILoadRules = {[key: string]: ILoadAction}


/**
 *  Don't show(construct) component until props will be loaded
 *  @param loadRules takes Object of tasks
 *  {
 *    'isLoadedFlag' : actionForDispatch
 *  }
 *  @param autoReloadActions takes array of actions name
 *  @param infrequentAutoReloadActions takes array of actions name
 *
 *  use:
 *  @connect(mapState)
 *  @loader(fields)
 *  export default class Name {...}
 */
export function loader(loadRules: ILoadRules = {}, autoReloadActions: ILoadRules = {}, infrequentAutoReloadActions: ILoadRules = {}) {
  return (Comp: any): any => (
    class LoaderWrapper extends Component<IComponent, any> {
      componentWillMount(): void {
        __DEV__ && !this.props.hasOwnProperty('dispatch') && console.warn("dispatch isn't provided", this.props)
        // loader
        Object.keys(loadRules).forEach(fieldName => {
          __DEV__ && !this.props.hasOwnProperty(fieldName) && console.warn('there are not such field', this.props, fieldName)
          this.props[fieldName] || this.props.dispatch(loadRules[fieldName]())
        })
        // main reload
        for (let actionName in autoReloadActions){
          autoLoader.on(autoReloadActions[actionName], actionName)
        }
        // infrequent reload
        for (let actionName in infrequentAutoReloadActions){
          autoLoader.on(infrequentAutoReloadActions[actionName], actionName, true)
        }
      }

      componentWillUnmount(): void {
        for (let actionName in autoReloadActions){
          autoLoader.off(actionName)
        }
        for (let actionName in infrequentAutoReloadActions){
          autoLoader.off(actionName)
        }
      }

      render() {
        return (
          Object.keys(loadRules).every(fieldName => this.props[fieldName])
            ? <Comp {...this.props}/>
            : null
        )
      }
    }
  )
}