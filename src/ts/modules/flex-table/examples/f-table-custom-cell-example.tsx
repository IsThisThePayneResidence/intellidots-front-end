import { React, Component, connect } from './../../../viewUtils'
import { FTable, Cell } from './../index'
import { ICellProps } from './../interfaces'
interface IInfo {
  name: string
  ou: {perMonth: number}
}
let info: IInfo[] = [
  {name: 'Vasya',   ou: {perMonth: 500}},
  {name: 'Big man', ou: {perMonth: 2000}},
  {name: 'Petya',   ou: {perMonth: 200}},
  {name: 'Katya',   ou: {perMonth: 400}},
  {name: 'Sasha',   ou: {perMonth: 1500}},
  {name: 'Alina',   ou: {perMonth: 500}},
  {name: 'Timur',   ou: {perMonth: 70},
  }
]

// own full Cell-class
class SeasonCell extends Component<ICellProps, any> {
  render() {
    return (
      <div className="season">
        <div>
          {3 * (this.props.item as IInfo).ou.perMonth}
        </div>
      </div>
    )
  }
}
// overwritten Cell-class
class YearCell extends Cell {
  get text(): string {
    return (12 * (this.props.item as IInfo).ou.perMonth).toString()
  }
  
  get className(): string {
    return 'mySell'
  }
}

@connect(mapState)
export default class FTableExample extends Component<any, any> {
  render() {
    return <FTable {...this.props}  />
  }
}

function mapState() {
  return {
    displayData: info,
    columns: [
      {key: 'name',        title: "Имя", sortable: false},
      {key: 'ou.perMonth', title: "В месяц", sortable: false},
      {key: 'season',      title: "В квартал", render: SeasonCell, sortable: false},
      {key: 'year',        title: "В год", render: YearCell, sortable: false},
  ]
  }
}
