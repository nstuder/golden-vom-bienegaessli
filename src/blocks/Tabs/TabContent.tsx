import React, { Fragment } from 'react'

import { ContentBlock as ContentComponent } from '@/blocks/Content/Component'
import { CarouselBlock } from '@/blocks/Carousel/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { PedigreeBlock } from '@/blocks/Pedigree/Component'

const blockComponents = {
  content: ContentComponent,
  carousel: CarouselBlock,
  mediaBlock: MediaBlock,
  pedigree: PedigreeBlock,
}

export const TabContent: React.FC<{
  blocks: any[]
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
