import React from 'react'

import type { Page } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({ media, richText }) => {
  return (
    <div className="">
      {/*<div className="container mb-8">
        {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
      </div>*/}
      {media && typeof media === 'object' && (
        <div>
          <Media className="" imgClassName="w-full" priority resource={media} />
          {media?.caption && (
            <div className="mt-3">
              <RichText data={media.caption} enableGutter={false} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
