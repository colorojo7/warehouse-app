import { format } from 'date-fns';

export function formatDate(date) {
  if (!date) return ''
  const parsedDate = Date.parse(date)
  if (isNaN(parsedDate)) return ''
  return format(new Date(parsedDate), 'dd/MM/yy')
}