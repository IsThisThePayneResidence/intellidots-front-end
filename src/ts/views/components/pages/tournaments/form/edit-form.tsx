import { React, connect, IStore, IComponent, _prop } from './../../../../../viewUtils'
import { SelectField, MenuItem } from 'material-ui'
import { editRule } from '../../../../../reducer/entity/ddlRules'
import { IAccountNumbersStore } from '../../../../../reducer/list/accountNumbers'
import { IDdlPageStore } from '../../../../../reducer/page/tournaments'
import { IDdlRule } from './../../../../../resourcesInterfaces'
import { IInstrumentStore } from '../../../../../reducer/list/instruments'
import { isInteger, isFloat } from '../../../../../utils/other/checkers'
import FormComponent from '../../../common/form-component'
import ruleValidator from '../../../validators/ddlRule'
import TextField from '../../../common/basis/custom-textfield'


interface IProps extends IComponent, IAccountNumbersStore, IInstrumentStore, IDdlPageStore {
  onRequestClose?: (() => any)
}
interface IState {
  accountNumber?: number
  instrument?: string
  timeRange?: number,
  volume?: number,
}


@connect(mapState, null, null, {withRef: true})
export default class EditForm extends FormComponent<IProps, IState> {
  state: IState = {
    accountNumber: this.rule.accountNumber,
    instrument: this.rule.instrument,
    timeRange: this.rule.timeRange,
    volume: this.rule.volume,
  }

  get rule(): IDdlRule {
    return this.props.activeRules[0]
  }

  // FormComponent overwrite
  get validator() {
    return ruleValidator
  }

  get inputData(): IDdlRule {
    return _.assign({}, this.rule, {
      accountNumber: this.state.accountNumber,
      instrument: this.state.instrument,
      timeRange: this.state.timeRange,
      volume: this.state.volume,
    })
  }

  public callSubmit = () => {
    this.submit()
  }

  onValidateSuccess = (data: IDdlRule) => {
    this.props.dispatch(editRule(data))
    this.props.onRequestClose()
  }

  // own methods
  onSelectAccount = (e, i, accountNumber: number) => {
    // console.log(typeof accountNumber) // @todo on key down auto complete for numbers
    this.setState({
      accountNumber,
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
              onChange={this.onChangePeriodRange}
              errorText={this.errorText(_prop((o: IDdlRule) => o.timeRange))}
              {...this.errorFieldStyle}
            />
          </div>
          <div>
            <TextField
              floatingLabelText="Volume for rule"
              type={'number'}
              {...floatInput}
              value={this.state.volume || ""}
              onChange={this.onChangeVolumeForRule}
              errorText={this.errorText(_prop((o: IDdlRule) => o.volume))}
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
    state.list.instruments,
    state.page.ddl
  )
}