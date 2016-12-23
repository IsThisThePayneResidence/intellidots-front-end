import { React, connect, IMapper, _prop, cn } from './../../../viewUtils'
import { IAuthData } from './../../../resources'
import { IAuthStore, getAuth } from '../../../reducer/app/auth'
import { RaisedButton } from 'material-ui'
import authValidator from './../../components/validators/auth'
import FormComponent from '../../components/common/form-component'
import IdleMessage from './../../components/layout/idle-message'
import TextField from '../../components/common/basis/custom-textfield'


interface ILoginProps extends IAuthStore {}

const REF_PASSWORD = 'REF_PASSWORD'
const REF_USERNAME = 'REF_USERNAME'


const mapper: IMapper<IAuthStore> = state => state.app.auth
@connect(mapper)
export default class Login extends FormComponent<ILoginProps, {}> {

  get validator() {
    return authValidator
  }

  get inputData(): IAuthData {
    return {
      password: (this.refs[REF_PASSWORD] as TextField).getValue(),
      username: (this.refs[REF_USERNAME] as TextField).getValue(),
    }
  }

  onValidateSuccess = (data: IAuthData) => {
    this.props.dispatch(getAuth(data))
  }

  render() {
    return (
      <IdleMessage>
        <div className="login-form-wrapper">
          <form autoComplete="on" onSubmit={this.submit} className="login-form">
            <h2 >Discount DOTS</h2>
            <TextField
              floatingLabelText="Username"
              floatingLabelFixed
              fullWidth
              type={'text'}
              ref={REF_USERNAME}
              errorText={this.errorText(_prop((o: IAuthData) => o.username))}
              {...this.errorFieldStyle}
            />
            <TextField
              floatingLabelText="Password"
              floatingLabelFixed
              fullWidth
              type={'password'}
              ref={REF_PASSWORD}
              errorText={this.errorText(_prop((o: IAuthData) => o.password))}
              {...this.errorFieldStyle}
            />
            <RaisedButton
              label="Sign in"
              type={"submit"}
              className={cn('submit', {loading: this.props.authIsLoading})}
              style={{display: 'block', marginTop: '45px', overflow: 'hidden'}}
              fullWidth
              primary
              disabled={this.props.authIsLoading}
            ><i className="spin"/></RaisedButton>
          </form>
        </div>
      </IdleMessage>
    )
  }
}


