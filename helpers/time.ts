import { formatInTimeZone } from 'date-fns-tz'
import { pt } from 'date-fns/locale'

export function inHours(hours: number) {
  return hours * 60 * 60 * 1000
}

export const formatToTimezone = (
  dateCandidate: string | Date,
  formatStr = "'em' dd 'de' MMMM 'de' yyyy 'às' HH:mm",
) => formatInTimeZone(new Date(dateCandidate), 'America/Sao_Paulo', formatStr, {
    locale: pt,
  })
