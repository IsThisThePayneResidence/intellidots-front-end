import { createLocalStore } from '../utils/simple/createLocalStore'
import { IAuthResponseData } from '../resources'

const AUTH_STORE_KEY = 'auth'

export const authStore = createLocalStore<IAuthResponseData>(AUTH_STORE_KEY)