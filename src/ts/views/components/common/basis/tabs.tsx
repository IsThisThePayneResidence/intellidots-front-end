import { React, Component } from '../../../../viewUtils'
import TabTemplate from './tab-template'
import { Tabs } from 'material-ui'
import TabsProps = __MaterialUI.Tabs.TabsProps

export default class UnMountableTabs extends Component<TabsProps, any> {
  render() {
    return (
      <Tabs tabTemplate={TabTemplate} {...this.props} />
    )
  }
}