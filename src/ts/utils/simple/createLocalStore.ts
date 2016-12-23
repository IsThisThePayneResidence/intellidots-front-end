/**
 * it is localStorage simple wrapper
 * @param key
 * @returns {{resetData: (()=>void), setData: ((data:T)=>void), getData: (()=>T)}}
 */
export function createLocalStore<T>(key: string): ILocalStore<T> {
  return {
    resetData: () => localStorage.removeItem(key),
    setData: (data: T) => localStorage.setItem(key, JSON.stringify(data)),
    getData: (): T => {
      let data = localStorage.getItem(key)
      return data
        ? JSON.parse(data)
        : null
    }
  }
}

interface ILocalStore<T> {
  getData: () => T
  setData: (data: T) => void
  resetData: () => void
}
