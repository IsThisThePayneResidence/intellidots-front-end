import * as React from "react";
import {action, handleActions} from "../../utils/promiseMiddleware/promise-middleware-helper";
import {routes} from "../../basis/routes";
import {ITournament} from "../../resourcesInterfaces";

const TOGGLE_MENU = 'TOGGLE_MENU'


let toggleMenu = action(TOGGLE_MENU)


interface IMenuStore {
    menuList?: IMenu[],
    showMenu?: boolean,
}

interface IMenu {
    name: string
    tournament?: ITournament
    route?: string
    nested?: IMenu[]
    iconClass?: React.ComponentClass<any>
    className?: string
}


export default handleActions<IMenuStore>({
    [ TOGGLE_MENU ]: (state, action) => ({
        showMenu: !state.showMenu
    }),
}, getInitialState())


function getInitialState(): IMenuStore {
    return {
        menuList: [
            {name: "Сортировки", route: `${routes.tournaments}/1}`},
            {name: "Комбинаторика", route: `${routes.tournaments}/2}`},
        ],
        showMenu: true
    }
}


export {
    toggleMenu,

    IMenu,
    IMenuStore,
}