import { React, IComponent } from "./../../viewUtils"

// simple parts

interface IColumnProps {
  key: string
  title: any
  render?: React.ComponentClass<any> | IRenderFunction
  sortable?: boolean // set false to make unsorted. // it is used as follows: sortable === false
  sortFunction?: ISortFunction
  filterComponent?: any
}


interface ICellProps {
  key?: any
  item: any
  column: IColumnProps
  rowIndex?: number
}

interface ISorterProps {
  ask: boolean
  column: string
}

interface IFilterProps {
  filter?: IFilter
}

interface IFilter {
  [key: string]: IFilterItem
}


interface IFilterItem {
  columnKey: string
  filterMode?: string
  value: any
}

interface IFlexTableSorterProps {
  sorter?: ISorterProps
  onSortChange?: IOnSortChange
}

interface IPagination {
  currentPage?: number
  pageSize?: number
}

interface IPaginationProps {
  onPaginationChange?: IOnPagination
  pageSizes?: number[]
  maxButtons?: number
  itemsCount?: number
  pagination?: IPagination
}

type IOpenColumns = string[]

interface ISets {
  sorter?: ISorterProps,
  filter?: IFilter,
  pagination?: IPagination,
  openColumns?: IOpenColumns,
}
interface ISettingsReq extends ISets {
  sorter: ISorterProps,
  filter: IFilter,
  pagination: IPagination,
  openColumns?: IOpenColumns,
}

interface ISortFunction {
  (a, b): number
}

interface IFilterFunction {
  (item, index: number, filterItem: IFilterItem, filterSettings: IFiltrationSettingsProps) : boolean
}

interface IChangeFilterFunction {
  (value: any, columnKey: string, filterKey: string, filter: IFilter): IFilter
}

interface IOnFilterChange {
  (value: any, columnKey: string, filterMode?: string): any
}

interface IOnSortChange {
  (column: IColumnProps): any
}

interface IOnSort {
  (sorter: ISorterProps): any
}

interface IOnFilter {
  (filter: IFilter): any
}

interface IOnSet {
  (settings: ISettingsReq): any
}

interface IOnRowSelect {
  (item, index: number, items: number[]): any
}

interface IOnPagination {
  (pagination: IPagination): any
}

interface IRenderFunction {

}

interface IFilterCompFunction {
  (value, filterItem: IFilterItem): boolean
}


// interface IActiveCheckerFunction {
//   (item: any, activeItems: any[]) : boolean
// }

// complex parts


interface ITableExtraPartsProps { // todo optimise this
  openColumns?: IOpenColumns
}

interface ITableProps {
  columns?: IColumnProps[]
  displayData?: any[] | any // todo fix
  notActual?: boolean
  tableClassName?: string
  withOutHeader?: boolean
  onRowSelect?: IOnRowSelect
  activeItems?: any[]
  // activeChecker?: IActiveCheckerFunction
}

interface IHeadCellProps {
  column: IColumnProps
  onSortChange: IOnSortChange
  sorter: ISorterProps
  rowIndex: number
}

interface IFiltrationElementProps {
  column?: IColumnProps
  displayData?: any[] | any
  onFilterChange?: IOnFilterChange
}

interface IFiltrationElement {
  filterFunction?: IFilterCompFunction
}

interface IFiltrationSelectSettingsProps {
  options?: any[]
  valueKey?: string
  titleKey?: string
  placeholder?: string
}
interface IFiltrationSearchSettingsProps {
  placeholder?: string
}

interface IFiltrationEqGtLtSettingsProps {
  value?: any
  condition?: string
  placeholder?: string
}


interface IFiltrationSettingsProps {
  filterKey: string // which data value will check (f.e. role_id)
  columnKey: string // which column is filtering (r.e. role_name)
  filterType?: string
  filterFunction?: IFilterFunction
}

interface IFiltrationProps {
  filterElements?: IFiltrationElementProps[]
}

interface IFlexTableHandlerProps {
  columns?: IColumnProps[]
  defaultSets?: ISets
  onSet?: IOnSet
  tableKey?: string // not implemented yet. used for settings tool 
}

interface IFlexTableTriggerProps {
  onSort?: IOnSort
  onFilter?: IOnFilter
}

interface ITransmittedProps {
  sorter?: ISorterProps,
  displayData?: any[] | any
  filter?: IFilter
  pagination?: IPagination
  itemsCount?: number
}

// components

interface ICellComponentProps extends ICellProps, IComponent {
  key?: any
}

interface ITableComponentProps extends ITableProps, IFlexTableSorterProps, ITableExtraPartsProps {}

interface IFlexTableComponentProps extends ITableComponentProps, IFiltrationComponentProps, IPaginationProps, ITableExtraPartsProps {} // total

interface IHeadCellComponentProps extends IHeadCellProps {}

interface IFiltrationComponentProps extends IFiltrationProps, IFilterProps {
  onFilterChange?: IOnFilterChange
}

interface IFiltrationElementComponentProps extends IFiltrationElementProps, IFilterProps {}

interface IFlexTableHandlerComponentProps extends IFlexTableHandlerProps, ITableProps, IFiltrationProps, IPaginationProps {}

interface IFlexTableTriggerComponentProps extends IFlexTableTriggerProps, ITableProps, IFlexTableSorterProps, IFiltrationComponentProps, IPaginationProps {} // IFlexTableComponentProps, ITableProps, IFlexTableSorterProps

interface IPaginationComponentProps extends IPaginationProps {}



export {

// components
  // tables
  ITableComponentProps,
  IFlexTableComponentProps,
  IFlexTableHandlerComponentProps,
  IFlexTableTriggerComponentProps,
  // cells
  ICellComponentProps,
  IHeadCellComponentProps,
  // other
  IFlexTableSorterProps,
  IFiltrationComponentProps,
  IFiltrationElementComponentProps,
  IPaginationComponentProps,

// filter-parts
  IFilter,
  IFilterItem,
  IOnFilterChange,
  IFilterFunction,
  IChangeFilterFunction,

  IFiltrationElementProps,
  IFiltrationSettingsProps,
  IFiltrationSelectSettingsProps,
  IFiltrationSearchSettingsProps,
  IFiltrationEqGtLtSettingsProps,

// sort-parts
  ISortFunction,
  IOnSortChange,

// pagination-parts
  IPagination,
  IOnPagination,
  IPaginationProps,
// other-parts
  ISettingsReq,
  ISets,
  IOpenColumns,
  ITableExtraPartsProps,
  // IActiveCheckerFunction,
  IFilterCompFunction,
  IFiltrationElement,
  ITransmittedProps,

// self-element props
  IFilterProps,
  ITableProps,
  ICellProps,
  IHeadCellProps,
  IColumnProps,
  ISorterProps,
  IFiltrationProps,
  IFlexTableHandlerProps,
  IFlexTableTriggerProps,

// wrapper events
  IOnSort,
  IOnFilter,
  IOnSet,
  IOnRowSelect,
}