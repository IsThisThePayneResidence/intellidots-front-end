import { React, connect, IStore, IComponent, _prop } from './../../../../../viewUtils'
import { addRule } from '../../../../../reducer/entity/ddlRules'
import { IAccountNumbersStore } from '../../../../../reducer/list/accountNumbers'
import { IDdlRule } from './../../../../../resourcesInterfaces'
import { IInstrumentStore } from '../../../../../reducer/list/instruments'
import { isInteger, isFloat } from '../../../../../utils/other/checkers'
import { SelectField, MenuItem } from 'material-ui'
import FormComponent from '../../../common/form-component'
import ruleValidator from '../../../validators/ddlRule'
import TextField from '../../../common/basis/custom-textfield'


interface IProps extends IComponent, IAccountNumbersStore, IInstrumentStore {
  onRequestClose?: (() => any)
}
interface IState {
  accountNumber?: number
  instrument?: string
  timeRange?: number
  volume?: number
}


@connect(mapState, null, null, {withRef: true})
export default class AddForm extends FormComponent<IProps, IState> {
  state: IState = {
    accountNumber: null,
    instrument: null,
    timeRange: null,
    volume: null,
  }

  // FormComponent overwrite
  get inputData(): IDdlRule {
    return {
      accountNumber: this.state.accountNumber,
      instrument: this.state.instrument,
      timeRange: this.state.timeRange,
      volume: this.state.volume,
    }
  }

  get validator() {
    return ruleValidator
  }

  onValidateSuccess = (data: IDdlRule) => {
    this.props.dispatch(addRule(data))
    this.props.onRequestClose()
  }

  // own methods
  public callSubmit = () => {
    this.submit()
  }

  onSelectAccount = (e, i, accountNumber: number) => {
    // console.log(typeof accountNumber) // @todo on key down auto complete for numbers
    this.setState({
      accountNumber: accountNumber,
    })
  }

  onSelectInstrument = (e, i, instrument: string) => {
    // console.log(typeof instrument)
    this.setState({
      instrument,
    })
  }

  onChangePeriodRange = (e) => {
    let value = e.target.value
    if ((value === "") || isInteger(value)) {
      this.setState({
        timeRange: value,
      })
    }
  }

  onChangeVolumeForRule = (e) => {
    let value = e.target.value
    if ((value === "") || isFloat(value)) {
      this.setState({
        volume: value,
      })
    }
  }

  render() {
    let floatInput = {step: 'any'} // disable integer validation tooltip
    return (
      <div>
        <form onSubmit={this.callSubmit}>
          <div>
            <SelectField
              ref="test"
              floatingLabelText="Account number"
              onChange={this.onSelectAccount}
              value={this.state.accountNumber}
              errorText={this.errorText(_prop((o: IDdlRule) => o.accountNumber))}
              {...this.errorFieldStyle}
            >
              {this.props.accountNumbers.map((item, index) => (
              <MenuItem
                key={index}
                value={item}
                primaryText={item}
              />
                ))}
            </SelectField>
          </div>
          <div>
            <SelectField
              floatingLabelText="Instrument"
              onChange={this.onSelectInstrument}
              value={this.state.instrument}
              errorText={this.errorText(_prop((o: IDdlRule) => o.instrument))}
              {...this.errorFieldStyle}
            >
              {this.props.instruments.map((item, index) => (
              <MenuItem
                key={index}
                value={item}
                primaryText={item}
              />
                ))}
            </SelectField>
          </div>
          <div>
            <TextField
              floatingLabelText="Period range"
              type={'number'}
              value={this.state.timeRange || ""}
              errorText={this.errorText(_prop((o: IDdlRule) => o.timeRange))}
              onChange={this.onChangePeriodRange}
              {...this.errorFieldStyle}
            />
          </div>
          <div>
            <TextField
              floatingLabelText="Volume for rule"
              type={'number'}
              {...floatInput}
              value={this.state.volume || ""}
              errorText={this.errorText(_prop((o: IDdlRule) => o.volume))}
              onChange={this.onChangeVolumeForRule}
              {...this.errorFieldStyle}
            />
          </div>
        </form>
      </div>
    )
  }
}

function mapState(state: IStore): IProps {
  return _.assign(
    {},
    state.list.accountNumbers,
    state.list.instruments
  )
}