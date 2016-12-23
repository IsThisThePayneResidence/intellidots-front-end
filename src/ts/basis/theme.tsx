import getMuiTheme from 'material-ui/styles/getMuiTheme'
import * as Colors from 'material-ui/styles/colors'
import RawTheme = __MaterialUI.Styles.RawTheme
import MuiTheme = __MaterialUI.Styles.MuiTheme
const colors: __MaterialUI.Styles.Colors = Colors as any


const themeColor = {
  main: '#00bca4',
  info: '#52a7e0',
  warn: '#e67e22',
  success: '#2ecc71',
  error: '#e74c3c',
  text: '#3e4855',
  textLight: '#fff',
}

const ArgBaseTheme: RawTheme = {
  palette: {
    primary1Color: themeColor.info,
    accent1Color: themeColor.main,
    textColor: themeColor.text,
    primary2Color: themeColor.info, // datePicker
  },
}
const ArgMuiTheme: MuiTheme = {
  tabs: {
    backgroundColor: colors.white,
    textColor: themeColor.info,
    selectedTextColor: themeColor.info,
  },
}

const muiTheme = getMuiTheme(ArgBaseTheme, ArgMuiTheme)


export { muiTheme, themeColor }