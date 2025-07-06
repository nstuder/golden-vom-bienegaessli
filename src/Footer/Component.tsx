import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Footer } from '@/payload-types'
import { Media } from '@/components/Media'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  return (
    <footer className="mt-auto border-t border-border bg-primary text-black p-4 conatiner">
      <div className="py-8 md:gap-8 flex flex-row md:flex-row justify-around">
        {footerData?.clubs?.map((club) => (
          <a href={club.link} key={club.id}>
            <Media className="" imgClassName="w-full max-h-28" priority resource={club.logo} />
          </a>
        ))}
      </div>
      <div className={'text-center'}>{footerData.caption}</div>
    </footer>
  )
}
