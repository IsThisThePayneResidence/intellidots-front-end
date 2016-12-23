import { React, Component } from '../../../../viewUtils'
import { cloneElement } from 'react'
import { FlatButton } from 'material-ui'



interface IProps extends __MaterialUI.FlatButtonProps {
  iconComp?: JSX.Element
  text?: string | JSX.Element
  iconAfter?: boolean
}

export default class CFlatButton extends Component<IProps, any> {
 
  render() {
    const iconStyle: React.CSSProperties = {
      width: '18px',
      height: '18px',
      verticalAlign: 'middle',
      margin: '-1px 10px 0 0',
      fill: this.props.disabled ? 'rgba(62, 72, 85, 0.298039)' : undefined
    }
    const buttonStyle: React.CSSProperties = {
      // fontSize: '13px',
      height: '30px',
      lineHeight: '30px',
      padding: '0 10px',
      fontFamily: 'Roboto Regular',
    }
    let icon = !this.props.iconComp
      ? null
      : cloneElement(this.props.iconComp, _.merge({style: iconStyle}, this.props.iconComp.props))
    let props = {}
    Object.keys(this.props)
      .filter(key => !~['iconAfter', 'text', 'iconComp'].indexOf(key))
      .forEach(key => {props[key] = this.props[key]})

    return (
      <FlatButton {...props} style={_.merge(buttonStyle, this.props.style)} >
        {icon && !this.props.iconAfter ? icon : null}
        {this.props.text}
        {icon && this.props.iconAfter ? icon : null}
      </FlatButton>
    )
  }
}
