import { React, Component } from './../../../../viewUtils'
import { CFlatButton } from './../../../../views/components/common'
import { HardwareKeyboardArrowLeft, HardwareKeyboardArrowRight} from 'material-ui/svg-icons'
import { IPaginationComponentProps, IPagination } from './../../interfaces'
import { MenuItem } from 'material-ui'
import { CSelectField } from './../../../../views/components/common'
import { getChangedPagination } from '../../handler/handlers'



interface IPageRange {
  startPage: number
  endPage: number
}


export default class Pagination extends Component<IPaginationComponentProps, {}> {

  static defaultProps: IPaginationComponentProps = {
    maxButtons: 5,
    pageSizes: [15, 30, 50, 100],
  }

  onPaginationChange(pagination: IPagination) {
    this.props.onPaginationChange(pagination)
  }
  
  onChangePage = (page: number) => {
    this.onPaginationChange(getChangedPagination(this.props.pagination, page))
  }

  onChangePageSize = (e, i, pageSize: number) => {
    this.onPaginationChange(getChangedPagination(this.props.pagination, null , pageSize))
  }

  getPagesCount(): number {
    let
      itemsCount = this.props.itemsCount,
      pageSize = this.props.pagination.pageSize,
      pagesCount

    pagesCount = (itemsCount - (itemsCount % pageSize)) / pageSize
    if (itemsCount % pageSize || !itemsCount)
      pagesCount++

    return pagesCount
  }
  
  getPageRange(pagesCount: number): IPageRange {
    let startPage, endPage, hasHiddenPagesAfter,
      maxButtons = this.props.maxButtons,
      activePage = this.props.pagination.currentPage

    if (maxButtons) {
      let hiddenPagesBefore = activePage - parseInt((maxButtons / 2) as any, 10)
      startPage = hiddenPagesBefore > 1 ? hiddenPagesBefore : 1
      hasHiddenPagesAfter = startPage + maxButtons <= pagesCount
      if (!hasHiddenPagesAfter) {
        endPage = pagesCount
        startPage = pagesCount - maxButtons + 1
        if (startPage < 1) {
          startPage = 1
        }
      } else {
        endPage = startPage + maxButtons - 1
      }
    } else {
      startPage = 1
      endPage = pagesCount
    }
    return { startPage, endPage }
  }

  get totalInfo(): string {
    let from = (this.props.pagination.currentPage - 1) * this.props.pagination.pageSize + 1
    let to = this.props.pagination.currentPage * this.props.pagination.pageSize
    if (to > this.props.itemsCount)
      to = this.props.itemsCount
    if (to === 0)
      from = 0
    return `Showing ${from} to ${to} of ${this.props.itemsCount} entries`
  }

  render() {
    let pagesCount = this.getPagesCount()
    let range = this.getPageRange(pagesCount)
    let currentPage = this.props.pagination.currentPage
    let disabledPrev = 1 === currentPage
    let disabledNext = pagesCount === currentPage
    const border = `1px solid #dfe8f1`
    const pageBtnStyle: React.CSSProperties = {
      minWidth: '30px',
      padding: 0,
      border,
      borderRadius: 0,
      margin: '0 0 0 -1px',
      fontFamily: 'Roboto Regular',
    }
    let firstBtnStyle: React.CSSProperties = {
      border,
      borderRadius: '2px 0 0 2px',
      fontFamily: 'Roboto Regular',
      position: 'static',
    }
    let lastBtnStyle: React.CSSProperties = {
      border,
      borderRadius: 0,
      margin: '0 0 0 -1px',
      fontFamily: 'Roboto Regular',
      position: 'static',
    }
    let selectStyle: React.CSSProperties = {
      border,
      borderRadius: '0 2px 2px 0',
      margin: '0 0 0 -1px',
      width: '50px',
      height: '28px',
      fontFamily: 'Roboto Regular',
      position: 'static',
    }
    return (
      <div className="flex-table-pagination">
        <div className="total-pager-into">{this.totalInfo}</div>
        <div className="pagination">
          <CFlatButton
            text="Prev"
            style={firstBtnStyle}
            onClick={ _ => this.onChangePage(currentPage - 1)}
            disabled={disabledPrev}
            iconComp={<HardwareKeyboardArrowLeft style={{
              margin: '-1px 0px 0px -5px',
              fill: disabledPrev ? 'rgba(62, 72, 85, 0.298039)' : undefined,
            }}/>}
          />
          {_.range(range.startPage, range.endPage + 1).map(i => (
          <CFlatButton
            key={i}
            text={`${i}`}
            onClick={ _ => this.onChangePage(i)}
            secondary={ i === currentPage}
            style={pageBtnStyle}
          />
            ))}
          <CFlatButton
            text="Next"
            style={lastBtnStyle}
            onClick={ _ => this.onChangePage(currentPage + 1)}
            disabled={disabledNext}
            iconAfter={true}
            iconComp={<HardwareKeyboardArrowRight style={{
              margin: '-1px -5px 0px 0px',
              fill: disabledNext ? 'rgba(62, 72, 85, 0.298039)' : undefined
            }}/>}
          />
          <div className="page-size-selector">
            <CSelectField
              value={this.props.pagination.pageSize}
              onChange={this.onChangePageSize}
              iconStyle={{top: '5px'}}
              style={selectStyle}
              labelStyle={{lineHeight: '28px', top: '0px', left: '5px'}}
              underlineStyle={{display: 'none'}}
            >
            {this.props.pageSizes.map((size: number, index) => (
              <MenuItem
                key={index}
                value={size}
                primaryText={size}/>
            ))}
            </CSelectField>
          </div>
        </div>
      </div>
    )
  }
}