import store from "./../../basis/store";
import {tokenPromiseHelper} from "../../app/tokenPromiseHelper";

interface IErrorData {
    field: string
    code: string
    additionalFields?: any
}


class ApiError extends Error {
    constructor(res: Response) {
        super("Api 4xx error occured")
        this.response = res
    }

    /**
     * Raw response
     */
    response: Response

    /**
     * Gets all errors
     */
    getErrors(): Promise<IErrorData[]> {
        return this.response.json()
            .then(e => e)
    }

    /**
     * Gets a code of first error
     */
    getErrorCode(): Promise<string> {
        return this.getErrors().then(errs => {
            return errs[0].code
        })
    }
}


function check4xx(res: Response) {
    if (!res.ok && res.status >= 400 && res.status < 500 && res.status !== 401)
        throw new ApiError(res)
    return res
}

/**
 * Wrapper on fetch. Handles 4xx and 5xx errors.
 * By default when method POST 'content-type' header is set to 'application/json'
 *
 * @returns bluebird promise
 */
function _fetch(url: string | Request, init?: RequestInit, withOutToken?: boolean): Promise<Response> {
    let fetchFunction = () => {
        let headers: any = {}
        // if (!withOutToken)
        //     (headers['authorization'] = store.getState().app.auth.token)

        if (init && init.method && (init.method.toLowerCase() === 'post' || init.method.toLowerCase() === 'put'))
            headers['content-type'] = 'application/json;charset=UTF-8'

        if (init.method.toLowerCase() === 'post' && ~(url as any).indexOf("login"))
            headers['content-type'] = 'application/x-www-form-urlencoded'

        init = _.merge<RequestInit, RequestInit>({
            headers,
        }, init)
        return Promise.resolve(fetch(url, init))
            .then(check4xx)
    }

    return (withOutToken || !tokenPromiseHelper.getTokenPromise())
        ? fetchFunction()
        : Promise.resolve(tokenPromiseHelper.getTokenPromise()).then(fetchFunction)
}

export {
    _fetch,
    ApiError,
    IErrorData,
}
