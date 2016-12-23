/**
 * @see http://confluence.simcord.com/pages/viewpage.action?pageId=37159722
 */
import config from "./basis/config";
import {_fetch} from "./utils";
import {IAccountNumbersStore} from "./reducer/list/accountNumbers";
import {
    IDdlRule,
    IBsRule,
    IDdlRuleStatistic,
    IBsRuleStatistic,
    IInstrument,
    ICommonRule,
    ICommonLogMessage,
    ICommonMetric
} from "./resourcesInterfaces";


// auth
export type IAuthResponseData = {accesstoken: string, expires: number, userid: number}
export type IAuthData = {username: string, password: string}
export function authGet({username, password}: IAuthData): Promise<any> {
    return _fetch(url(`login/authenticate`), {
        method: 'post',
        body: 'username=' + username + '&password=' + password + '&remember-me=on'//JSON.stringify({username, password}),
    }, true)
        // .then(r => console.log(r))
}

// accesstoken
export function refreshGet(): Promise<any> {
    return _fetch(url(`refresh`), {
        method: 'post',
    })
        .then(r => r.json())
}


export function ruleGet(): Promise<IDdlRule[] | IBsRule[]> {
    return _fetch(url(`rules`), {
        method: 'get',
    })
        .then(r => r.json())
}

export function ruleStatisticsGet(): Promise<IDdlRuleStatistic[] | IBsRuleStatistic[]> {
    return _fetch(url(`rules/statistics`), {
        method: 'get',
    })
        .then(r => r.json())
}


export type IDdlAddData = ICommonRule // IDdlRule | IBsRule
export function ruleAdd(rule: IDdlAddData): Promise<any> {
    return _fetch(url(`rules/add`), {
        method: 'post',
        body: JSON.stringify(rule),
    })
        .then(r => undefined)
}


export type IRuleEditData = ICommonRule // IDdlRule | IBsRule
export function ruleEdit(rule: IRuleEditData): Promise<any> {
    return _fetch(url(`rules/edit`), {
        method: 'post',
        body: JSON.stringify(rule),
    })
        .then(r => undefined)
}

export type IRuleDeleteData = number
export function ruleDelete(id: IRuleDeleteData): Promise<any> {
    return _fetch(url(`rules/delete`), {
        body: JSON.stringify({id}),
        method: 'post',
    })
        .then(r => r.json())
}

export type IRuleStopData = number
export function ruleStop(id: IRuleStopData): Promise<any> {
    return _fetch(url(`rules/stop`), {
        body: JSON.stringify({id}),
        method: 'post',
    })
        .then(r => r.json())
}

export type IRuleSyncData = number
export function ruleSync(id: IRuleSyncData): Promise<any> {
    return _fetch(url(`rules/sync`), {
        body: JSON.stringify({id}),
        method: 'post',
    })
        .then(r => r.json())
}

export type IRuleStartData = number
export function ruleStart(id: IRuleStartData): Promise<any> {
    return _fetch(url(`rules/start`), {
        body: JSON.stringify({id}),
        method: 'post',
    })
        .then(r => r.json())
}

export type IRulePauseData = number
export function rulePause(id: IRulePauseData): Promise<any> {
    return _fetch(url(`rules/pause`), {
        body: JSON.stringify({id}),
        method: 'post',
    })
        .then(r => r.json())
}


// account-numbers
export function accountNumbersGet(): Promise<IAccountNumbersStore[]> {
    return _fetch(url(`account-numbers`), {
        method: 'get',
    })
        .then(r => r.json())
}


// instruments
export function instrumentsGet(): Promise<IInstrument[]> {
    return _fetch(url(`instruments`), {
        method: 'get',
    })
        .then(r => r.json())
}


// log-messages
export function logMessagesGet(): Promise<ICommonLogMessage[]> {
    return _fetch(url(`rules/statistics`), {
        method: 'get',
    })
        .then(r => r.json())
}

export function metricsGet(): Promise<ICommonMetric[]> {
    return _fetch(url(`rules/metrics`), {
        method: 'get',
    })
        .then(r => r.json())
}


export function url(path: string) {
    return `${config.api.url}${path}`
}

let test = b => a => {
    console.log(a, b)
    return a
}
export function tournamentGet() {
    return _fetch(url(`tournaments`), {
        method: 'get',
    })
        .then(r => {
            // r.json().then(test('success,json'), test('fail,json'))
            // r.text().then(test('success,text'), test('text,json'))
            return r.json()
            // return r.json()
            // return [{"id":1,"description":"Комбинаторика","enabled":true,"endDate":"2016-12-29T11:14:19Z","startDate":"2016-12-22T11:14:19Z","tasks":[{"id":1,"htmlBody":"<img src=\"https://pp.vk.me/c626120/v626120043/46873/lSIDf4WDoAE.jpg\"/>","name":"Разбиения на слагаемые","tests":[{"id":1,"input":"1 5 3 2 6","isOrdered":false,"isPlainText":true,"isUnordered":false,"output":"1 2 3 5 6","points":0,"task":{"_ref":"../..","class":"intellidots.Task"}}],"tournament":{"_ref":"../..","class":"intellidots.Tournament"}}],"topic":"Комбинаторика"}]
        })
}

