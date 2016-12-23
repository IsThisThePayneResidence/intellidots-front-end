import * as React from 'react'


const height = "32px"
const lineHeight = "32px"
const fontSize = "12px"
const bottom = "0px"
const underlineBottom = "4px"


type IStyles = {
  style?: React.CSSProperties
  underlineStyle?: React.CSSProperties
  hintStyle?: React.CSSProperties
  iconStyle?: React.CSSProperties
  labelStyle?: React.CSSProperties
  textFieldStyle?: React.CSSProperties
}

const rangeStyle: IStyles = {
  style: {
    height,
    lineHeight: '24px', // important when somebody input char instead number in <input type="number">
    fontSize,
    bottom,
  },
  hintStyle: {
    bottom,
    lineHeight,
  },
  underlineStyle: {
    bottom: underlineBottom,
  },
}
const dateStyle: IStyles = {
  textFieldStyle: {
    height,
    lineHeight,
    fontSize,
    bottom,
  },
  hintStyle: {
    bottom,
  },
  underlineStyle: {
    bottom: underlineBottom,
  },
}

const joinIconStyle: React.CSSProperties = {
  fill: '#4D5056',
  width: '18px',
  height: '18px',   // marginBottom: '-10px',
  margin: '0px 10px',
}
const joinDivStyle: React.CSSProperties  = {
  display: 'flex',
  alignItems: 'center',
}

export {
  rangeStyle,
  dateStyle,
  joinDivStyle,
  joinIconStyle,
}