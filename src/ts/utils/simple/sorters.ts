
export function textSorter(i1: string, i2: string): number {
  let s1 = (i1 || "").toLowerCase()
  let s2 = (i2 || "").toLowerCase()
  return s1 > s2
    ? 1
    : (s1 < s2
      ? -1
      : 0)

}

type IItem = string | number
export function compareData(i1: IItem, i2: IItem): number {
  return (isNaN(i1 as number) && isNaN(i2 as number))
    ? textSorter(i1 as string, i2 as string)
    : (i1 as number) - (i2 as number)
}


export function compareTimeStamp(i1: number, i2: number): number {
  return ((!i1 || !i2)
    ? ((!i1 && !i2)
      ? 0
      : (i1
        ? 1
        : -1))
    : (i1 - i2))
}

