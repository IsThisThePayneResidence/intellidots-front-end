import { React, Component, connect } from './../../../viewUtils'
import {
  IColumnProps, IFiltrationElementProps, IFlexTableHandlerComponentProps, IOnSort, IOnFilter,
  IFlexTableTriggerComponentProps, IOnSortChange, IOnFilterChange, IFilter, IOnRowSelect, IOnPagination,
} from './../interfaces'
import { FlexTableTrigger } from './../index'
import {FILTER_TYPE_SELECT} from './../constant'
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

class ExampleWithStoring extends Component<IFlexTableTriggerComponentProps, any> {

  
  onSort             :IOnSort             = (sorter)           => {console.log('onSort', sorter)}
  onSortChange       :IOnSortChange       = (column)           => {console.log('onSortChange', column)}
  onFilterChange     :IOnFilterChange     = (value, columnKey) => {console.log('onFilterChange', value, columnKey)}
  onFilter           :IOnFilter           = (filter)           => {console.log('onFilter', filter)}
  onPaginationChange :IOnPagination       = (pagination)       => {console.log('IOnPaginationChange', pagination)}
  onRowSelect        :IOnRowSelect        = (item, index)      => {console.log('onRowSelect', item, index)}

  render() {
    let empty = {
      filter: ({} as IFilter),
      sorter: null
    }
    let reduxDispatchActions: IFlexTableTriggerComponentProps = {
      onSort: this.onSort,
      onSortChange: this.onSortChange,
      onFilterChange: this.onFilterChange,
      onFilter: this.onFilter,
      onPaginationChange: this.onPaginationChange,
      onRowSelect: this.onRowSelect,
    }
    return  <FlexTableTrigger
              {...this.props}
              {...reduxDispatchActions}
              {...empty}/>
  }
}




function mapState(): IFlexTableHandlerComponentProps {
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
    },
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
    displayData: info
  }
}

export default connect(mapState)(ExampleWithStoring)