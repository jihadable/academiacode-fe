import dayjs from 'dayjs'
import 'dayjs/locale/id'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.locale('id')

export function DateParser(dateString) {
  return dayjs(dateString).fromNow()
}
