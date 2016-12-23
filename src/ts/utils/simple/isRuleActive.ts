import { IDdlRule } from '../../resourcesInterfaces'

export function isRuleActive(rule: IDdlRule): boolean {
  return !!rule.startTime
}