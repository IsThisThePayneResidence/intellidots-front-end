import { React, Component } from '../../../../viewUtils'
import { Tab } from 'material-ui'
import TabProps = __MaterialUI.Tabs.TabProps


export default class LightThemeTab extends Component<TabProps, any> {
  render() {
    let props = this.props
    return (
      <Tab {...props} />
    )
  }
}