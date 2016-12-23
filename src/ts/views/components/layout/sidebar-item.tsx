import { React, connect, Component, cn, IComponent, IStore} from './../../../viewUtils'
import { ListItem } from 'material-ui'

import { IMenu } from '../../../reducer/app/menu'
import { goToPage } from '../../../reducer/app/app'
import {selectActiveTournament} from "../../../reducer/entity/tournament";
import {ITournament} from "../../../resourcesInterfaces";


interface ISidebarItem extends IComponent{
  item?: IMenu,
}


class SidebarItem extends Component<ISidebarItem, any> {

  toPage = (tournament: ITournament) => () => {
    this.props.dispatch(selectActiveTournament(tournament))
  }

  render() {
    const staticAttributes: __MaterialUI.List.ListItemProps = {
      primaryText: this.props.item.name,
      className: cn(this.props.item.className),
      nestedListStyle: {paddingBottom: 'none', paddingTop: 'none'},
      onTouchTap: this.toPage(this.props.item.tournament),
    }
    return <ListItem {...staticAttributes}  />
  }
}



export default connect()(SidebarItem)