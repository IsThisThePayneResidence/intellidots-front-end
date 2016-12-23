import { React, Component } from '../../../../viewUtils'
import { TextField as TF } from 'material-ui'
import { themeColor } from '../../../../basis/theme'

const REF = 'ref'
export default class TextField extends Component<__MaterialUI.TextFieldProps, any> {

  getValue = () => {
    return (this.refs[REF] as __MaterialUI.TextField).getValue()
  }

  render() {
    let props = _.merge({
      underlineStyle: {
        color: themeColor.info,
      }
    },this.props)

    return (
      <TF {...props} ref={REF}/>
    )
  }
}