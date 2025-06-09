'use client'
import React from 'react'

import type { Page } from '@/payload-types'
import { CarouselBlock } from '@/blocks/Carousel/Component'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ richText, carousel }) => {
  return (
    <div className="flex items-center justify-center text-white">
      <div className="select-none w-full relative">
        {carousel && (
          <CarouselBlock
            items={carousel.items}
            autoSlide={carousel.autoSlide}
            slideTime={carousel.slideTime}
            disableInnerContainer
            blockType={'carousel'}
          />
        )}
        <div className="absolute top-0 w-full h-full z-10 flex items-center justify-center">
          {richText && <RichText data={richText} enableGutter={false} />}
        </div>
      </div>
    </div>
  )
}
