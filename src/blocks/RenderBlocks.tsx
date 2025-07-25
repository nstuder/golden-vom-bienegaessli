import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { CarouselBlock } from '@/blocks/Carousel/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { GallerieBlock } from '@/blocks/Gallerie/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { NewsBlock } from '@/blocks/News/Component'
import { PedigreeBlock } from '@/blocks/Pedigree/Component'
import { TabsBlock } from '@/blocks/Tabs/Component'

const blockComponents = {
  content: ContentBlock,
  carousel: CarouselBlock,
  gallerie: GallerieBlock,
  mediaBlock: MediaBlock,
  news: NewsBlock,
  pedigree: PedigreeBlock,
  tabs: TabsBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
