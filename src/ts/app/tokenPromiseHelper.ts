class TokenPromiseHelper {
  private tokenTimer = null
  private tokenPromise = null

  setTokenTimer = (newTokenTimer): void => {
    this.tokenTimer = newTokenTimer
  }

  setTokenPromise = (newTokenPromise: Promise<Response>): void => {
    this.tokenPromise = newTokenPromise
  }

  getTokenPromise = (): Promise<Response> => {
    return this.tokenPromise
  }
}


export const tokenPromiseHelper = new TokenPromiseHelper()