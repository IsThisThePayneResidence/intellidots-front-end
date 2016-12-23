import { React, Component, IComponent } from '../../../viewUtils'
import { getValue } from '../../../utils/index'
import { notify, INotifyData } from '../../../reducer/app/notification'


interface IState {messages?: any}
interface IProps extends IComponent {}

export default class FormComponent<P, S> extends Component<P & IProps, S | IState> {

  state = {} as any

  get validator() {
    __DEV__ && console.warn('FormComponent.validator should be overwritten')
    return null
  }

  get inputData() {
    __DEV__ && console.warn('FormComponent.inputData should be overwritten, check')
    return null
  }

  onValidateSuccess = (data: any) => {
    __DEV__ && console.warn('FormComponent.onValidateSuccess should be overwritten, check')
    return null
  }

  onValidateError = (messages) => {
    this.setState({
      messages,
    })
    let notification: INotifyData = {
      message: 'Check your data',
      level: 'error',
    }
    this.props.dispatch(notify(notification))
  }
  
  errorText(prop): string {
    let value = getValue(this.state.messages, prop, true)
    value = value && value[0]
    return value
  }

  submit = (e?: __React.SyntheticEvent) => {
    e && e.preventDefault()
    e && e.stopPropagation()
    this.validator
      .setData(this.inputData).isValid()
      .then(this.onValidateSuccess, this.onValidateError)
  }


  get errorFieldStyle() {
    return {
      errorStyle: {
        position: 'absolute',
        marginBottom: '-25px',
      },
    }
  }
}
