import Cell from '../../../../modules/flex-table/component/cell/cell'

export default class CustomCell extends Cell {
  propKey = undefined // override it

  get fieldValue(): any {
    let value = _.at(this.props.item, this.propKey)[0]
    if (value === undefined) {
      console.warn('object has not such property way', this.props.item, this.propKey)
    }
    return value
  }
}