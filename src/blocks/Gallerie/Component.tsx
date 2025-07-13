import React from 'react'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

import type { GallerieBlock as GallerieBlockProps } from '@/payload-types'

type Props = GallerieBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const GallerieBlock: React.FC<Props> = (props) => {
  const { className, images, usePrimaryBackground, disableInnerContainer } = props

  if (!images || images.length === 0) return null

  return (
    <div
      className={cn(
        'md:p-8',
        {
          'bg-primary': usePrimaryBackground,
          'bg-white': !usePrimaryBackground,
          container: !disableInnerContainer,
        },
        className,
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((item, index) => (
          <div key={index} className="flex flex-col">
            {item.image && typeof item.image === 'object' && (
              <Media imgClassName="w-full shadow-md rounded-[0.5rem]" resource={item.image} />
            )}
            {item.caption && (
              <div className="mt-2">
                <RichText data={item.caption} enableGutter={false} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
