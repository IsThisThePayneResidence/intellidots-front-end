import { React, Component } from '../../../../viewUtils'
import { cloneElement } from 'react'
import { findDOMNode } from 'react-dom'
import { FlatButton, Dialog } from 'material-ui'
import DialogProps = __MaterialUI.DialogProps
import FlatButtonProps = __MaterialUI.FlatButtonProps
import HTMLAttributes = __React.HTMLAttributes


export interface IConfirmTriggerProps {
  message?: string
  header?: string
  messageContent?: JSX.Element | (() => JSX.Element)
  dialogProps?:  DialogProps | { open?: boolean }

  approveText?: string
  onApprove: Function
  approveButton?: JSX.Element
  approveProps?: FlatButtonProps

  declineText?: string
  onDecline?: Function
  declineButton?: JSX.Element
  declineProps?: FlatButtonProps

  children?: any
  oneButton?: boolean
  wrapperProps?: HTMLAttributes
  sameDisplay?: boolean // for display_block child, wrapper will be display_block too, etc.

}


export default class Confirm extends Component<IConfirmTriggerProps, any> {

  static defaultProps = {
    approveText: 'Ok',
    declineText: 'Cancel',
    header:      'Attention!',
    message:     'Confirm your action',
    messageContent: null,
    local: false,
    dialogProps: {},
    approveProps: {},
    declineProps: {},
    wrapperProps: {},
  }

  state = {
    show: false,
    display: 'initial'
  }

  componentDidMount() {
    if (this.props.sameDisplay) {
      this.setState({
        display: window.getComputedStyle(findDOMNode(this.refs['target'])).display
      })
    }
  }

  
  approve = (e) => {
    this.setState({
      show: false
    })
    this.props.onApprove(e)
  }

  
  decline = (e) => {
    this.setState({
      show: false
    })
    this.props.onDecline && this.props.onDecline(e)
  }

  
  show = () => {
    this.setState({
      show: true
    })
  }

  render() {
    return (
      <div className="confirm" {...this.wrapProps}>
        {cloneElement(
          React.Children.only(this.props.children),
          {onClick: this.show, ref: 'target'}
        )}
        {this.renderDialog}
      </div>
    )
  }

  get renderDialog() {
    return (
      <Dialog
        title={this.props.header}
        actions={this.actions}
        open={this.state.show}
        onRequestClose={this.decline}
        {...this.props.dialogProps}
      >
        {this.dialogContent}
      </Dialog>
    )
  }

  get dialogContent() {
    return this.props.messageContent
      ? this.props.messageContent
      : this.props.message.split('\n').map((line, i) => <p key={i}>{line}</p>)
  }


  get actions() {
    let approve = this.props.approveButton ? (
      cloneElement(
        React.Children.only(this.props.approveButton),
        {onClick: this.approve}
      )
    ) : (
      <FlatButton
        label={this.props.approveText}
        primary={true}
        onClick={this.approve}
        {...this.props.approveProps}
      />
    )
    let decline = this.props.oneButton ? null : this.props.declineButton ? (
      cloneElement(
        React.Children.only(this.props.declineButton),
        {onClick: this.decline}
      )
    ) : (
      <FlatButton
        label={this.props.declineText}
        primary={true}
        onClick={this.decline}
        {...this.props.declineProps}
      />
    )
    return [
      approve,
      decline,
    ]
  }

  get wrapProps() {
    if (!this.props.sameDisplay) {
      return this.props.wrapperProps
    } else {
      let props = (Object as any).assign({}, this.props.wrapperProps)
      _.set(props, 'style.display', this.state.display)
      return props
    }
  }

}
