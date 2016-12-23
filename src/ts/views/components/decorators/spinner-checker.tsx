import { React, Component } from './../../../viewUtils'
import store from './../../../basis/store'
import { showSpinner } from '../../../reducer/app/spinner'

/**
 * @param loadingFieldList // fires when it is true
 * @param componentClassName
 * @param loadedFieldList // fires when it is false
 * @returns {function(any): any}
 *
 * use:
 * //must be used before loader
 * @spinner(['isLoading'], 'Dashboard')  //must have unique component_name in second param
 * @loader(...)
 */
export function spinner(loadingFieldList: string[] = [], loadedFieldList: string[] = [], componentClassName: string) {
  return (Comp:any) :any => (
    class SpinnerWrapper extends Component<any, any> {
      state = {
        show: store.getState().app.spinner.showSpinner
      }

      componentDidMount(): void {
        this.checkSpinner()
      }

      componentWillReceiveProps(nextProps): void {
        this.checkSpinner(nextProps)
      }

      componentWillUnmount(): void {
        this.state.show && this.toggleSpinner(false)
      }

      checkSpinner(props = this.props) {
        __DEV__ && loadingFieldList.forEach(fieldName => {
          props.hasOwnProperty(fieldName) || console.warn('there is not such property in ', props, fieldName)
        })
        __DEV__ && loadedFieldList.forEach(fieldName => {
          props.hasOwnProperty(fieldName) || console.warn('there is not such property in ', props, fieldName)
        })
        let show = loadingFieldList.some(i=> props[i]) || loadedFieldList.some(i=> !props[i])
        if (this.state.show !== show) {
          this.setState({
            show
          })
          this.toggleSpinner(show)
        }
      }

      toggleSpinner(show: boolean) {
        store.dispatch(showSpinner({
          showSpinner: show,
          componentName: componentClassName
        }))
      }

      render() {
        return (
          <Comp {...this.props}/>
        )
      }
    }
  )
}