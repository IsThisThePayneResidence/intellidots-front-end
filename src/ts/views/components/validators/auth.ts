import { InputFilter } from 'input-filter'
import { notEmpty, _prop } from './../../../utils/index'
import { IAuthData } from '../../../resources'

export default InputFilter.factory({
  [_prop((o: IAuthData) => o.password)]: {
    validators: [notEmpty], filters: ['StringTrim']
  },
  [_prop((o: IAuthData) => o.username)]: {
    validators: [notEmpty], filters: ['StringTrim']
  },
}) as {setData: (o)=> any}
