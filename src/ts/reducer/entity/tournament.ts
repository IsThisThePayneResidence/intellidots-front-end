import * as R from '../../resources'
import { _prop, action, handleActions, handlePromise } from '../../utils/index'
import {ITournament, ITask} from "../../resourcesInterfaces";

const GET_TOURNAMENTS = 'tournaments/GET_TOURNAMENTS'
const SELECT_ACTIVE_TOURNAMENT = 'tournaments/SELECT_ACTIVE_TOURNAMENT'
const SELECT_ACTIVE_TASK = 'tournaments/SELECT_ACTIVE_TASK'



export interface ITournamentsStore {
  tournaments?: ITournament[]
  tournamentsIsLoading?: boolean
  tournamentsIsLoaded?: boolean
  activeTournament?: ITournament,
  activeTask?: ITask,
}

export const getTournaments = action(GET_TOURNAMENTS, R.tournamentGet)
export const selectActiveTournament = action<ITournament>(SELECT_ACTIVE_TOURNAMENT)
export const selectActiveTask = action<ITask>(SELECT_ACTIVE_TASK)


const initialState: ITournamentsStore = {
  tournaments: [],
  tournamentsIsLoading: false,
  tournamentsIsLoaded: false,
  activeTournament: null,
  activeTask: null,
}

export default handleActions<ITournamentsStore>({
  [ GET_TOURNAMENTS ]: handlePromise(_prop((o: ITournamentsStore) => o.tournaments)),
  [ SELECT_ACTIVE_TOURNAMENT ]: (state, action) => ({
    activeTournament: (action.meta as ITournament),
    activeTask: null,
  }),
  [ SELECT_ACTIVE_TASK ]: (state, action) => ({
    activeTask: (action.meta as ITask),
  }),

}, initialState)

