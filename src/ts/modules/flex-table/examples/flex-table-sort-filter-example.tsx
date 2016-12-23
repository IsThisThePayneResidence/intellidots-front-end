import { React, Component, connect } from './../../../viewUtils'
import { FlexTable } from './../../flex-table'
import {
  IColumnProps, IFiltrationElementProps, IFilterFunction, IFilterItem,
  IFiltrationSettingsProps,
} from "./../../flex-table/interfaces";

import {FILTER_TYPE_SELECT} from "./../../flex-table/constant";
let pro = [
  {id: 0, top: 1, title: 'manager'},
  {id: 1, top: 3, title: 'qa'},
  {id: 2, top: 2, title: 'dev'},
  {id: 3, top: 0, title: 'boss'},
  {id: 4, top: 4, title: 'student'}
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

@connect(mapState)
export default class FlexTableSortFilterExample extends Component<any, any> {
  render() {
    return <FlexTable {...this.props} />
  }
}


function mapState() {
  let customFilter: IFilterFunction = (item, index: number, filterItem: IFilterItem, filterSettings: IFiltrationSettingsProps) : boolean => (
    (item as IInfoItem).name == filterItem.value
  )
  let filterElements: IFiltrationElementProps<any>[] = [{
    componentSettings: {
      valueKey: 'top',
      options: pro,
      placeholder: 'Должность',
      titleKey: 'title',
    },
    filterSettings: {
      filterKey: 'pro.top',
      columnKey: 'pro.title',
      filterType: FILTER_TYPE_SELECT
      // filterFunction: customFilter,
    },
    // filterRender: customRender,
  }]

  let customSort = (a: IInfoItem, b: IInfoItem) => (a.pro.top - b.pro.top)
  let columns: IColumnProps[] = [
    {key: 'name',       title: "Имя" ,      sortable: true  },
    {key: 'ou',         title: "Оу"  ,      sortable: true  },
    {key: 'pro.title',  title: "Должность", sortable: true, sortFunction: customSort },
  ]
  return {
    columns,
    filterElements,
    displayData: info,
    filter: {},
    onFilterChange: (value, columnKey) => { console.log('onFilterChange', value, columnKey)},
    onSortChange:  (col) => { console.log('onSortChange', col) },
  }
}