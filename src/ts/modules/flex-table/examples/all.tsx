import { React, Component } from './../../../viewUtils'
import E1 from './f-table-example'
import E2 from './f-table-custom-cell-example'
import E3 from './flex-table-sort-filter-example'
import E4 from './wrap-handler-example-with-storing'
import E5 from './wrap-trigger-example'

let tabs = [
  "f-table-example",
  "f-table-custom-cell-example",
  "flex-table-sort-filter-example",
  "wrap-handler-example-with-storing",
  "wrap-trigger-example",
]
let tabsRender = [E1, E2, E3, E4, E5]

export default class AllExamples extends Component<any, any> {
  state = {
    tab: 0
  }
  
  render() {
    let Tab = tabsRender[this.state.tab]
    let action = (tab) => (()=>{this.setState({tab})})
    return <div>
      {_.range(5).map(i => (
        <div key={i}> <button onClick={action(i)}>{tabs[i]}</button> </div>
      ))}
      <h1 style={{padding: '25px'}}>{tabs[this.state.tab]}</h1>
      <Tab/>
    </div>
  }
}
