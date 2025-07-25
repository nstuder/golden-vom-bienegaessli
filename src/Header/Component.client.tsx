'use client'
import React from 'react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  return (
    <header className="relative z-50 bg-primary">
      <div className="py-6 px-3 flex justify-between items-center">
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
