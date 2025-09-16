import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Footer } from '@/payload-types'
import { Media } from '@/components/Media'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  return (
    <footer className="mt-auto border-t border-border bg-primary text-black p-4 conatiner">
      <div className="py-4 md:gap-8 flex flex-row flex-1 md:flex-row justify-around">
        {footerData?.clubs?.map((club) => (
          <a href={club.link} key={club.id} className="flex justify-center align-center">
            <Media
              pictureClassName="flex-shrink-0 md:w-28 md:h-28 w-16 h-16"
              imgClassName="object-contain h-full w-auto"
              priority
              resource={club.logo}
            />
          </a>
        ))}
      </div>
      <div className={'text-center'}>{footerData.caption}</div>
    </footer>
  )
}
