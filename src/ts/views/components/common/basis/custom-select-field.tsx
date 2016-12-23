import { React, Component } from '../../../../viewUtils'
import { SelectField } from 'material-ui'



export default class CSelectField extends Component<__MaterialUI.SelectFieldProps, any> {
  render() {
    const style: React.CSSProperties = {
      fontSize: '13px',
      fontFamily: "Roboto Condensed",
    }
    return (
      <SelectField {...this.props} style={_.merge(style, this.props.style)}/>
    )
  }
}
      
