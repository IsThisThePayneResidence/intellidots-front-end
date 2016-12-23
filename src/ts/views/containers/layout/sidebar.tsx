import { React, connect, Component, IStore } from './../../../viewUtils'
import { variables } from './../../style-variables'
import {IMenuStore, IMenu} from '../../../reducer/app/menu'
import { Drawer, List } from 'material-ui'
import SidebarItem from './../../components/layout/sidebar-item'
import {ITournamentsStore} from "../../../reducer/entity/tournament";
import {ITournament} from "../../../resourcesInterfaces";

interface ISidebarProps extends IMenuStore {
    menuList?: IMenu[]
}
let mapState = (state: IStore) => {
    let toMenuItem = ((t: ITournament): IMenu => ({
        name: t.description,
        tournament: t
    }))

    return {
        menuList:state.entity.tournaments.tournaments.map(toMenuItem)
    }
}



@connect(mapState)
export default class Sidebar extends Component<ISidebarProps, any> {
  render() {
    const style = {
      boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px'
    }
    return (
      <div className="sidebar" >
        <Drawer
          docked={true}
          open={true}
          containerStyle={style}
          width={variables.stylus._menu_width}
        >
          <List style={{paddingTop: `${variables.stylus._header_height}px`}}>
            {this.props.menuList ? this.props.menuList.map((i, index) => (
              <SidebarItem key={index} item={i}/>
            )) : null}
          </List>
        </Drawer>
      </div>
    )
  }
}
