import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, RouterState, RedirectFunction } from 'react-router'
import { history } from './basis/history'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { muiTheme } from './basis/theme'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import store from './basis/store'

// import Bs from './views/containers/pages/bs'
// import Ddl from './views/containers/pages/ddl'
import Tournaments from './views/containers/pages/tournaments'
import Login from './views/containers/pages/login'
import Notification from './views/components/layout/notification'
import Root from './views/containers/layout/root'
import { initAuth } from './reducer/app/auth'
import { routes, routesParts } from './basis/routes'
import { isAuthorized } from './app/authHelper'


injectTapEventPlugin() // Needs for onTouchTap ( material ui )


initAuth()


//<Route path={routesParts.bs} component={Ddl} />
//<Route path={routesParts.bs} component={Bs} />
render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <div className="provider">
        <Notification>
          <Router history={history}>
            <Route path="/login" component={Login} onEnter={onEnterLogin} />
            <Route path="/" component={Root} onEnter={onEnterRoot}>
              <IndexRoute onEnter={(s, r) => r(routesParts.tournaments)} />
              <Route path={routesParts.tournaments} component={Tournaments} />

              <Route path="*" onEnter={redirectFromNotFound}/>
            </Route>
          </Router>
        </Notification>
      </div>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'))





function onEnterRoot(nextState: RouterState, replace: RedirectFunction) {
  if (!isAuthorized()) //{ nextPathname: nextState.location.pathname } //@todo
    replace('/login')
}

function onEnterLogin(nextState: RouterState, replace: RedirectFunction) {
  if (isAuthorized())
    replace('/')
}

function redirectFromNotFound(nextState: RouterState, replace: RedirectFunction) {
  replace(isAuthorized() ? '/' : '/')
}
