import dayjs, { ConfigType, ManipulateType, OpUnitType } from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const dateFormat = (datetime: ConfigType, fmt: string) => {
  return dayjs(datetime).local().format(fmt)
}

export const now = (fmt?: string) => {
  return dayjs().local().format(fmt)
}

export const nowAdd = (value: number, unit?: ManipulateType, fmt?: string) => {
  return dayjs().local().add(value, unit).format(fmt)
}

export const nowAddDay = (day: number, fmt?: string) => {
  return dayjs().local().add(day, 'day').format(fmt)
}

export const nowStartOf = (unit: OpUnitType, fmt?: string) => {
  return dayjs().local().startOf(unit).format(fmt)
}

export const nowEndOf = (unit: OpUnitType, fmt?: string) => {
  return dayjs().local().endOf(unit).format(fmt)
}
