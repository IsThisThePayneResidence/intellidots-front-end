import { Callback } from 'input-filter'


let notEmpty = new Callback(value => (
  isNotEmpty(value)
    ? true
    : Promise.reject('required')
))

let float = new Callback(value => {
  let newValue = parseFloat(value)
  return (isNotEmpty(value) && isNotEmpty(value) && (newValue.toString() === value.toString()))
    ? newValue
    : Promise.reject('is not a float number')
})

let integer = new Callback(value => {
  let newValue = parseInt(value)
  return (isNotEmpty(value) && isNotEmpty(value) && (newValue.toString() === value.toString()))
    ? newValue
    : Promise.reject('is not a integer number')
})

function isFloat(value: any): boolean {
  return /^[+-]?\d+(\.\d+)?$/.test(value)
}

function isInteger(value: any): boolean {
  return /^\d+$/.test(value)
}

function isNotEmpty(value: any): boolean {
  return value || (value === 0)
}



export {
  notEmpty, integer, float,
  isFloat, isInteger, isNotEmpty
}