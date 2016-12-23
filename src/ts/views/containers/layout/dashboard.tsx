import { React, Component, connect, IComponent } from './../../../viewUtils'


@connect(() => ({}))
export default class Dashboard extends Component<IComponent, {}> {

  render() {
    return (
      <h1>
        Yo ho hello there!
      </h1>
    )
  }
}
