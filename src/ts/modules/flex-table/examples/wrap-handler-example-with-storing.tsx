import { React, Component, connect } from './../../../viewUtils'
import {
  IColumnProps, IFiltrationElementProps, IFlexTableHandlerComponentProps, IOnSet,
  IFiltrationSelectSettingsProps, IFiltrationSearchSettingsProps, ISets,
  IFiltrationEqGtLtSettingsProps
} from './../interfaces'
import { FlexTableHandler } from './../index'
import { FILTER_TYPE_SELECT, FILTER_SEARCH, FILTER_EQ_GT_LT } from './../constant'
let pro = [
  {id: 0, top: 1, title: 'manager'},
  {id: 1, top: 3, title: 'qa'},
  {id: 2, top: 2, title: 'dev'},
  {id: 3, top: 0, title: 'boss'},
  {id: 4, top: 4, title: 'student'},
  {id: 5, top: 5, title: 'else'},
]

let info: IInfoItem[] = [
  {
    name: 'Vasya',
    ou: 500,
    pro: pro[2]
  },  {
    name: 'Big man',
    ou: 2000,
    pro: pro[3]
  },  {
    name: 'Petya',
    ou: 200,
    pro: pro[4]
  },  {
    name: 'Katya',
    ou: 400,
    pro: pro[1]
  },  {
    name: 'Sasha',
    ou: 1500,
    pro: pro[0]
  },  {
    name: 'Alina',
    ou: 500,
    pro: pro[1]
  },  {
    name: 'Timur',
    ou: 700,
    pro: pro[2]
  }
]
interface IInfoItem {
  name: string
  ou: number
  pro:
    {
      id: number
      top: number
      title: string
    }
}


interface IState {
  test?: boolean,
  settings?: ISets
}


class ExampleWithStoring extends Component<{}, IState> {
  
  // this data should store in redux store
  state = {
    test: null,
    settings: {
    }
  } as IState
  
  // deprecated triggers
  // onSort   : IOnSort    = (sorter) => {console.log('next sorter', sorter)}
  // onFilter : IOnFilter  = (filter) => {console.log('next filter', filter)}
  // onSetData: IOnSetData = (data)   => {console.log('now you can see', data)}
  // onGetData: IOnGetData = (data)   => {console.log('received new data', data)}
  onSet: IOnSet = settings => {
    this.setState({settings}) // dispatch
  }

  render() {
    let reduxDispatchActions: IFlexTableHandlerComponentProps = {
      onSet: this.onSet
    }
    return <div className="dashboard">
      <button onClick={() => {this.setState({test: !this.state.test})}}>test</button>
      {this.state.test ? null : (
        <FlexTableHandler
          {...this.props}
          {...reduxDispatchActions}
          defaultSets={this.state.settings}
        />
      )}
    </div>
  }
}




function mapState(): IFlexTableHandlerComponentProps {
  let c = _.uniq(info.map((i: IInfoItem) => i.pro.title))
  // let selectExample: IFiltrationElementProps<IFiltrationSelectSettingsProps> = {
  //   componentSettings: {
  //     valueKey: 'top',
  //     options: pro,
  //     placeholder: 'Должность',
  //     titleKey: 'title',
  //   },
  //   filterSettings: {
  //     filterKey: 'pro.top',
  //     columnKey: 'pro.title',
  //     filterType: FILTER_TYPE_SELECT
  //   },
  // }
  // let selectFromDataExample: IFiltrationElementProps<IFiltrationSelectSettingsProps> = {
  //   componentSettings: {
  //     options: c,
  //     placeholder: 'Должность',
  //     titleKey: 'title',
  //   },
  //   filterSettings: {
  //     filterKey: 'pro.title',
  //     columnKey: 'pro.title',
  //     filterType: FILTER_TYPE_SELECT
  //   },
  // }
  // let searchExample: IFiltrationElementProps<IFiltrationSearchSettingsProps> = {
  //   componentSettings: {
  //     placeholder: 'Имя',
  //   },
  //   filterSettings: {
  //     filterKey: 'name',
  //     columnKey: 'name',
  //     filterType: FILTER_SEARCH,
  //   },
  // }
  // let gleExample: IFiltrationElementProps<IFiltrationEqGtLtSettingsProps> = {
  //   filterSettings: {
  //     filterKey: 'ou',
  //     columnKey: 'ou',
  //     filterType: FILTER_EQ_GT_LT,
  //   },
  // }
  // let filterElements: IFiltrationElementProps<any>[] = [
  //   // gleExample,
  //   // searchExample,
  //   // selectExample,
  //   selectFromDataExample,
  // ]


  let customSort = (a: IInfoItem, b: IInfoItem) => (a.pro.top - b.pro.top)
  let columns: IColumnProps[] = [
    {key: 'name',       title: "Имя" ,      sortable: true  },
    {key: 'ou',         title: "Оу"  ,      sortable: true  },
    {key: 'pro.title',  title: "Должность", sortable: true, sortFunction: customSort },
  ]
  return {
    columns,
    // filterElements,
    displayData: info
  }
}

export default connect(mapState)(ExampleWithStoring)