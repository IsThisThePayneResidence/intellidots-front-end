import { React, connect, IStore, IComponent, _prop } from './../../../../../viewUtils'
import { editRule } from '../../../../../reducer/entity/ddlRules'
import { IAccountNumbersStore } from '../../../../../reducer/list/accountNumbers'
import { IBsPageStore } from '../../../../../reducer/page/bs'
import { IBsRule } from './../../../../../resourcesInterfaces'
import { IInstrumentStore } from '../../../../../reducer/list/instruments'
import { isInteger, isFloat } from '../../../../../utils/other/checkers'
import { SelectField, MenuItem } from 'material-ui'
import FormComponent from '../../../common/form-component'
import ruleValidator from '../../../validators/bsRule'
import TextField from '../../../common/basis/custom-textfield'


interface IProps extends IComponent, IAccountNumbersStore, IInstrumentStore, IBsPageStore {
  onRequestClose?: (() => any)
}
interface IState {
  accountNumber?: number
  instrument?: string
  timeRange?: number,
  volume?: number,
  kDif: null,
  traderank: null,
  ignoreList: null,
}


@connect(mapState, null, null, {withRef: true})
export default class EditForm extends FormComponent<IProps, IState> {
  state: IState = {
    accountNumber: this.rule.accountNumber,
    instrument: this.rule.instrument,
    timeRange: this.rule.timeRange,
    volume: this.rule.volume,
    kDif: this.state.kDif,
    traderank: this.state.traderank,
    ignoreList: this.state.ignoreList,
  }

  get rule(): IBsRule {
    return this.props.activeRules[0]
  }

  // FormComponent overwrite
  get validator() {
    return ruleValidator
  }

  get inputData(): IBsRule {
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

  onValidateSuccess = (data: IBsRule) => {
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

  onChangeKDif = (e) => {
    let value = e.target.value
    if ((value === "") || isFloat(value)) {
      this.setState({
        kDif: value,
      })
    }
  }

  onChangeTradeRank = (e) => {
    let value = e.target.value
    if ((value === "") || isInteger(value)) {
      this.setState({
        traderank: value,
      })
    }
  }

  onChangeIgnoreList = (e) => {
    let value = e.target.value.split(';')
    this.setState({
      ignoreList: value,
    })
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
              errorText={this.errorText(_prop((o: IBsRule) => o.accountNumber))}
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
              errorText={this.errorText(_prop((o: IBsRule) => o.instrument))}
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
              errorText={this.errorText(_prop((o: IBsRule) => o.timeRange))}
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
              errorText={this.errorText(_prop((o: IBsRule) => o.volume))}
              {...this.errorFieldStyle}
            />
          </div>
          <div>
            <TextField
              floatingLabelText="KDif"
              type={'number'}
              value={this.state.kDif || ""}
              errorText={this.errorText(_prop((o: IBsRule) => o.kDif))}
              onChange={this.onChangeKDif}
              {...this.errorFieldStyle}
            />
          </div>
          <div>
            <TextField
              floatingLabelText="Traderank for source accounts"
              type={'number'}
              value={this.state.traderank || ""}
              errorText={this.errorText(_prop((o: IBsRule) => o.traderank))}
              onChange={this.onChangeTradeRank}
              {...this.errorFieldStyle}
            />
          </div>
          <div>
            <TextField
              floatingLabelText="Ignore list of source accounts "
              type={'text'}
              value={(this.state.ignoreList || []).join(';')}
              errorText={this.errorText(_prop((o: IBsRule) => o.ignoreList))}
              onChange={this.onChangeIgnoreList}
              {...this.errorFieldStyle}
              multiLine={true}
              rows={3}
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
    state.page.bs
  )
}