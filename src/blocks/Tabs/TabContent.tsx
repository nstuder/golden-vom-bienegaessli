import React, { Fragment } from 'react'

import type { TabsBlock } from '@/payload-types'

import { ContentBlock as ContentComponent } from '@/blocks/Content/Component'
import { CarouselBlock } from '@/blocks/Carousel/Component'
import { GallerieBlock } from '@/blocks/Gallerie/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { PedigreeBlock } from '@/blocks/Pedigree/Component'
import { NewsBlock } from '@/blocks/News/Component'

const blockComponents = {
  content: ContentComponent,
  carousel: CarouselBlock,
  gallerie: GallerieBlock,
  news: NewsBlock,
  mediaBlock: MediaBlock,
  pedigree: PedigreeBlock,
}

export const TabContent: React.FC<{
  blocks: NonNullable<TabsBlock['tabs']>[number]['content']
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error the props of the block union can't be narrowed to the selected component */}
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
