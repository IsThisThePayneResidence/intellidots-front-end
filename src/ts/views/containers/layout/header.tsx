import { React, Component, connect, cn, bindActionCreators, IStore } from './../../../viewUtils'
import { toggleMenu } from '../../../reducer/app/menu'
import { goToPage } from '../../../reducer/app/app'
import { logout } from '../../../reducer/app/auth'
import { IconButton, FlatButton } from 'material-ui'
import { HardwareKeyboardArrowRight, ActionExitToApp } from 'material-ui/svg-icons'
import * as Colors from 'material-ui/styles/colors'
let colors: __MaterialUI.Styles.Colors = (Colors as any)

interface IHeaderProps {
  showMenu?: boolean
  goToPage?: any
  toggleMenu?: any
  logout?: any
}

class Header extends Component<IHeaderProps, {}> {
  render() {
    let showMenu = true//this.props.showMenu
    let iconStyle = {
      height: 'initial',
      fill: colors.white,
      transform: `rotate(${showMenu ? 180 : 0}deg)`,
      position: 'absolute',
      left: 0,
      top: 'calc(50% - 12px)',
    } as any
    return (
      <div className={cn("header", {'show-menu': showMenu})}>
        <div className="logo-part">
          <div className="logo-text" >
            <span onClick={() => this.props.goToPage('/')}>
              {showMenu
                ? <span>Discount DOTS</span>
                : <span>DD</span>
              }
            </span>
          </div>
          <IconButton
            style={{width: '24px', marginRight: '16px'}}
            iconStyle={iconStyle}
            onClick={() => this.props.toggleMenu()}>
            <HardwareKeyboardArrowRight/>
          </IconButton>
        </div>
        <div className="tool-part">
          <div style={{flex: 1}}/>
          <div>
            <FlatButton
              icon={<ActionExitToApp/>}
              style={{color: "#fff"}}
              labelStyle={{textTransform: 'none'}}
              label="Logout"
              onTouchTap={() => this.props.logout()}
            />
          </div>
        </div>
      </div>
    )
  }
}

let mapState = (state: IStore) => ({
  showMenu: state.app.menu.showMenu,
})

let mapDispatch = (dispatch) => (bindActionCreators({
  goToPage,
  toggleMenu,
  logout,
}, dispatch))

export default connect(mapState, mapDispatch)(Header)
