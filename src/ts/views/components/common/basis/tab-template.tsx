import { React, Component } from '../../../../viewUtils'

/**
 * Template allows to mount child element only when his tab is selected
 * usage
 * <Tabs tabTemplate={T} {...props}>{...tabs}</Tabs>
 */
export default class TabTemplate extends Component<{selected?: boolean}, {}> {
  render() {
    return this.props.selected ? (
      <div>
        {this.props.children}
      </div>
    ) : null
  }
}

