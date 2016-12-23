import {
  ISorterProps, IColumnProps, IFilter, IFilterItem, IPagination, IFiltrationElement,
} from './../interfaces'
import { compareData } from './../../../utils'
import { _prop } from '../../../utils/simple/interfaceToString'

// filter

function getChangedFilter(value: any, column: IColumnProps, filter: IFilter, filterMode: string = null): IFilter {
  let newFilterItem: IFilterItem = {
    columnKey: column.key,
    value,
    filterMode,
  }
  let newFilter = _.assign({}, filter, {
    [column.key]: newFilterItem
  }) as IFilter
  if ((value === null) || (value === "") || (value === undefined))
    delete newFilter[column.key]
  return newFilter
}


// sort

function getInitSorter(defaultSorter: ISorterProps, columns: IColumnProps[]): ISorterProps {
  columns = columns.filter((c: IColumnProps) => (c.sortable !== false))
  return defaultSorter
    ? defaultSorter
    : columns[0]
      ? {ask: true, column: columns[0].key}
      : null
}

function getNewSorter(sorter: ISorterProps, columnName: string): ISorterProps {
  return sorter ? {
    column: columnName,
    ask: sorter.column === columnName 
      ? !sorter.ask 
      : true
  } : null
}



// paging

function getChangedPagination(pagination: IPagination, currentPage: number = null, pageSize: number = null): IPagination {
  let newPagination: IPagination = pageSize
    ? { currentPage: 1, pageSize }
    : { currentPage }
  return _.merge({}, pagination, newPagination)
}



// data

function getFilteredData(filter: IFilter, data: any[], showColumns: IColumnProps[]): any[] {
  showColumns
    .filter((column: IColumnProps) => column.hasOwnProperty(_prop((o: IColumnProps) => o.filterComponent)))
    .filter((column: IColumnProps) => filter.hasOwnProperty(column.key))
    .forEach((column: IColumnProps) => {
      data = data.filter(( item, index ) =>
        (column.filterComponent.type as IFiltrationElement).filterFunction(item, filter[column.key]))
    })

  return data
}

function getSortedData(originData: any[], columns: IColumnProps[], sorter: ISorterProps): any[] {
  return sorter
    ? _.clone(originData).sort((i1, i2) => (
    ((columns as any).find(c => (c.key === sorter.column)).sortFunction
      || ((i1, i2) => (compareData(i1[sorter.column], i2[sorter.column])))
    )(i1, i2) * (sorter.ask ? 1 : -1)
  ))
    : originData
}


function getDisplayData(
  originData: any[],
  filter: IFilter,
  sorter: ISorterProps,
  columns: IColumnProps[]
): any[] {
  let data = getFilteredData(filter, originData, columns)
  data = getSortedData(data, columns, sorter)
  return data
}


export { getNewSorter, getInitSorter, getDisplayData, getChangedFilter, getChangedPagination }
