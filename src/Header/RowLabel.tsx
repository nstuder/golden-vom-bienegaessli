'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'
import React from 'react'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>()
  const rowNumber = data?.rowNumber !== undefined ? data.rowNumber + 1 : ''

  let label = 'Row'

  // Handle single link
  if (data?.data?.type === 'link' && data?.data?.link?.link?.label) {
    label = `Nav item ${rowNumber}: ${data.data.link.link.label}`
  }

  // Handle dropdown menu
  if (data?.data?.type === 'dropdown' && data?.data?.dropdown?.label) {
    label = `Dropdown ${rowNumber}: ${data.data.dropdown.label}`
  }

  // Fallback to old structure for backward compatibility
  if (!data?.data?.type && data?.data?.link?.label) {
    label = `Nav item ${rowNumber}: ${data.data.link.label}`
  }

  return <div>{label}</div>
}
