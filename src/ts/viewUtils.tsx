import * as React from 'react'
import * as cn from 'classnames'
import { Dispatch, bindActionCreators } from 'redux'
import { IStore } from './basis/storeInterface'
import { connect } from 'react-redux'

/**
 * check for fix
 * @see https://github.com/Microsoft/TypeScript/issues/9365
 */
const connectFix: any = connect as any
export { connectFix as connect }

export { React, cn, bindActionCreators }
export { IStore }

export { _prop } from './utils'
export { Component } from 'react'
export { loader } from './views/components/decorators/loader'
export { spinner } from './views/components/decorators/spinner-checker'

export type IMapper<T> = (state: IStore) => T


export interface IComponent extends React.ClassAttributes<any>{
  dispatch?: Dispatch<IStore>
}
