'use client'
import type { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Footer['clubs']>[number]>()
  const rowNumber = data?.rowNumber !== undefined ? data.rowNumber + 1 : ''

  const label = data?.data?.name ? `Verein ${rowNumber}: ${data.data.name}` : 'Verein'

  return <div>{label}</div>
}
