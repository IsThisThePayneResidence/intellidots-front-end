export interface ICommonRule {
    id?: number // Порядковый номер правила. Заполняется автоматически системой.
    accountNumber?: number // Счет дублирования на котором механизм дублирования будет управлять совокупной позицией согласно входящим параметрам и алгоритму дублирования.
    instrument?: string // Входящие параметры для алгоритма дублирования. Детальное описание - FR-RM-AlgDP-01 Алгоритм DDL.
    timeRange?: number // Входящие параметры для алгоритма дублирования. Детальное описание - FR-RM-AlgDP-01 Алгоритм DDL.
    volume?: number // Входящие параметры для алгоритма дублирования. Детальное описание - FR-RM-AlgDP-01 Алгоритм DDL.
    startTime?: any // Дата и время старта алгоритма дублирования.
    stopTime?: any // Дата и время остановки алгоритма дублирования.
}

export interface ICommonRuleStatistic {
    ruleId: string
    message: string
    timeStamp: number
    type: string
}

export interface ICommonLogMessage {
    ruleId: number
    timeStamp: number
    message: string
    type: string
    shown: boolean
}

export interface ICommonMetric {
    ruleId: number
    timeStamp: number
    Cs: number
    Cbuy: number
    Csell: number
    Vbuy: number
    Vsell: number
}

export interface ITournament {
    id: number,
    description: string,
    enabled: boolean,
    endDate: any,
    startDate: any,
    tasks: ITask[],
    topic: string,
}
export interface ITask {
    id: number
    htmlBody: any
    name: string
    tests: any
}


// ddl
/**
 * @see http://confluence.simcord.com/pages/viewpage.action?pageId=37159514
 */
export interface IDdlRule extends ICommonRule {
}

export interface IDdlRuleStatistic extends ICommonRuleStatistic {
}

export interface IDdlLogMessage extends ICommonLogMessage {
}

export interface IDdlMetric extends ICommonMetric {
    Cnet: number
    Vnet: number
    BV_n: number
    "BV_(n-1)": number
}

// bs
/**
 * @see http://confluence.simcord.com/pages/viewpage.action?pageId=39683658
 */
export interface IBsRule extends ICommonRule {
    kDif?: number // Корректирующий коэффициент
    pp?: number // Корректирующий коэффициент
    traderank?: number // трейдранк счета
    ignoreList?: number[] //	Список игнорируемых счетов
}

export interface IBsRuleStatistic extends ICommonRuleStatistic {
}

export interface IBsLogMessage extends ICommonLogMessage {
}

export interface IBsMetric extends ICommonMetric {
    BVbuy_n: number
    BVsell_n: number
    BCbuy: number
    BCsell: number
    "BVbuy_(n-1)": number
    "BVsell_(n-1)": number
}


export type IAccountNumber = number
export type IInstrument = string
