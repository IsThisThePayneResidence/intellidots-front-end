import store from './../basis/store'

export const isAuthorized = (): boolean => !!store.getState().app.auth.token
