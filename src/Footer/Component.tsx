import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Footer } from '@/payload-types'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  return (
    <footer className="mt-auto border-t border-border bg-primary dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-row md:flex-row md:justify-between">
        <div className={'text-center'}>{footerData.caption}</div>
      </div>
    </footer>
  )
}
