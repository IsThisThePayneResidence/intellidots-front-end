import { history } from '../../basis/history'
import { action } from '../../utils/promiseMiddleware/promise-middleware-helper'
const GO_TO_PAGE = 'app/GO_TO_PAGE'


const goToPage = (route: string) => (dispatch, getState) => {
  dispatch(action(GO_TO_PAGE)(route))
  history.push(route)
}


export {
  goToPage,
}