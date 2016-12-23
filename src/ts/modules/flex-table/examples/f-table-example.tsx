import { React, Component, connect } from './../../../viewUtils'
import { FTable } from './../../flex-table'
let info = [
  {name: 'Vasya', ou: 500,},
  {name: 'Big man', ou: 2000,},
  {name: 'Petya', ou: 200,},
  {name: 'Katya', ou: 400,},
  {name: 'Sasha', ou: 1500,},
  {name: 'Alina', ou: 500,},
  {name: 'Timur', ou: 700
  }
]

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
      {key: 'name', title: "Имя", sortable: false},
      {key: 'ou',   title: "Оу", sortable: false},
  ]
  }
}
