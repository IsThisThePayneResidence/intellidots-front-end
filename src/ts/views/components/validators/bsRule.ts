import { InputFilter, Between } from 'input-filter'
import { IBsRule } from './../../../resourcesInterfaces'
import { notEmpty, _prop, integer, float } from './../../../utils/index'
import uniqueAccountInstrument from '../pages/tournaments/form/unique-account-instrument'

export default InputFilter.factory({
  [_prop((o: IBsRule) => o.id)]: {},
  [_prop((o: IBsRule) => o.accountNumber)]: {
    validators: [notEmpty], filters: ['StringTrim']
  },
  [_prop((o: IBsRule) => o.instrument)]:    {
    validators: [notEmpty, uniqueAccountInstrument], filters: ['StringTrim']
  },
  [_prop((o: IBsRule) => o.timeRange)]:     {
    validators: [integer], filters: ['StringTrim']
  },
  [_prop((o: IBsRule) => o.volume)]:        {
    validators: [float], filters: ['StringTrim']
  },
  [_prop((o: IBsRule) => o.traderank)]: {},
  [_prop((o: IBsRule) => o.kDif)]: {},
  [_prop((o: IBsRule) => o.ignoreList)]: {},
  [_prop((o: IBsRule) => o.pp)]: {},
})

