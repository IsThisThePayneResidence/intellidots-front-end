import * as R from "../../resources";
import {IAuthResponseData, refreshGet} from "../../resources";
import config from "../../basis/config";
import store from "../../basis/store";
import {ApiError} from "../../utils/other/fetch";
import {authStore} from "../../app/localStore";
import {goToPage} from "./app";
import {history} from "../../basis/history";
import {IAction, action, handleActions} from "../../utils/index";
import {notify} from "./notification";
import {tokenPromiseHelper} from "../../app/tokenPromiseHelper";

const GET_AUTH = 'auth/GET_AUTH'
const INIT_AUTH = 'auth/INIT_AUTH'
const LOGOUT = 'auth/LOGOUT'
const REFRESH = "app/REFRESH"
const REFRESH_FAIL = 'app/REFRESH_FAIL'


interface IAuthStore {
    userId?: number
    token?: string
    authIsLoading?: boolean
    authIsLoaded?: boolean
    authError?: any
}
type IAuth = {userid: number, accesstoken: string}

const refresh = action<IRefreshResponse>(REFRESH)
const refreshFail = action<any>(REFRESH_FAIL)
const getAuth = action(GET_AUTH, R.authGet, undefined, {fulfilled: afterAuthSuccess})

function afterAuthSuccess(dispatch, getState) {
    dispatch(goToPage('/'))
    // dispatch(refreshToken())
}

const logout = () => (dispatch, getState) => {
    authStore.resetData()
    dispatch(action(LOGOUT)())
    dispatch(goToPage('/login'))
}


const initialState: IAuthStore = {
    userId: null,
    token: authStore.getData() && authStore.getData().accesstoken,
    authIsLoading: false,
    authIsLoaded: false,
    authError: null,
}

export default handleActions<IAuthStore>({
    [ GET_AUTH ]: {
        PENDING: state => (_.assign({}, state, {authIsLoading: true})),
        FULFILLED: onAuthSuccess,
        REJECTED: onAuthFail
    },
    [ INIT_AUTH ]: onAuthSuccess,
    [ LOGOUT ]: _ => ({
        userId: null,
        token: null,
        authIsLoading: false,
        authIsLoaded: false,
        authError: null,
    }),
    [ REFRESH ]: (state, action) => ({
        token: action.meta as string, // as IRefreshResponse
    }),
}, initialState)


function onAuthSuccess(state: IAuthStore, action: IAction): IAuthStore {
    let data = ((action.payload || action.meta) as IAuthResponseData)
    let newState: IAuthStore = {
        userId: 1,
        token: "1488penis",
        authIsLoading: false,
        authIsLoaded: true,
        authError: false,
    }
    authStore.setData(data)
    return newState
}

function onAuthFail(state: IAuthStore, action: IAction): IAuthStore {
    let newState: IAuthStore = {
        authIsLoading: false,
        authIsLoaded: true,
        authError: action.payload.message,
    }
    return _.assign({}, state, newState) as IAuthStore
}


function initAuth() {
    const auth = authStore.getData()
    if (auth)
        store.dispatch((dispatch, getState) => {
            dispatch(action<IAuth>(INIT_AUTH)(auth))
            // dispatch(afterAuthSuccess)
            dispatch(goToPage(history.getCurrentLocation().pathname))
            // dispatch(refreshToken())
        })
}

type IRefreshResponse = string
function refreshToken() {
    return function (dispatch, getState) {
        if (getState().app.auth.token) { // check on start
            let onRefreshSuccess = (data: IRefreshResponse) => {
                tokenPromiseHelper.setTokenPromise(null)
                if (getState().app.auth.token) { // check on finish (case for logout)
                    dispatch(refresh(data))
                    tokenPromiseHelper.setTokenTimer(setTimeout(() => {
                        // dispatch(refreshToken())
                    }, config.duration.token))
                }
            }
            let onRefreshFail = (err) => {
                if (err instanceof ApiError)
                    err.getErrors().then(message => dispatch(notify({
                        message: `Api error: ${message}`,
                        level: 'error'
                    })))
                else
                    dispatch(notify({message: 'Api error', level: 'error'}))
                dispatch(refreshFail(err))
                dispatch(logout())
            }
            tokenPromiseHelper.setTokenPromise(
                refreshGet()
                    .then(onRefreshSuccess)
                    .catch(onRefreshFail) as Promise<any>
            )
        }
    }
}

export {
    getAuth,
    logout,
    initAuth,
    refreshToken,

    IAuth,
    IAuthStore,
}
