import { InputFilter, Between } from 'input-filter'
import { IDdlRule } from './../../../resourcesInterfaces'
import { notEmpty, _prop, integer, float } from './../../../utils/index'
import uniqueAccountInstrument from '../pages/tournaments/form/unique-account-instrument'

export default InputFilter.factory({
  [_prop((o: IDdlRule) => o.id)]:            {},
  [_prop((o: IDdlRule) => o.accountNumber)]: {
    validators: [notEmpty], filters: ['StringTrim']
  },
  [_prop((o: IDdlRule) => o.instrument)]:    {
    validators: [notEmpty, uniqueAccountInstrument], filters: ['StringTrim']
  },
  [_prop((o: IDdlRule) => o.timeRange)]:     {
    validators: [integer], filters: ['StringTrim']
  },
  [_prop((o: IDdlRule) => o.volume)]:        {
    validators: [float], filters: ['StringTrim']
  },
})

