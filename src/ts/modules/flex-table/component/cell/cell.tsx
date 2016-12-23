import { React, Component } from './../../../../viewUtils'
import { ICellComponentProps } from './../../interfaces'


export default class Cell extends Component<ICellComponentProps, any> {

  get fieldValue(): any {
    let value = _.at(this.props.item, this.props.column.key)[0]
    if (value === undefined) {
      console.warn('object has not such property way', this.props.item, this.props.column.key)
    }
    return (value === undefined) ? "" : value
  }

  get fieldText(): string {
    return this.fieldValue.toString()
  }


  get className(): string {
    return this.props.column.key.replace(/\./gi, '_')
  }

  get text(): string {
    return this.fieldText
  }

  render() {
    let text = this.text
    return (
      <div title={text} className={this.className}>
        <div>
          {text}
        </div>
      </div>
    )
  }
}
