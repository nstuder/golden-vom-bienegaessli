import type { Block } from 'payload'
import { Content } from '@/blocks/Content/config'
import { Carousel } from '@/blocks/Carousel/config'
import { Gallerie } from '@/blocks/Gallerie/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { Pedigree } from '@/blocks/Pedigree/config'
import { News } from '@/blocks/News/config'

export const Tabs: Block = {
  slug: 'tabs',
  labels: {
    singular: 'Tabs',
    plural: 'Tabs',
  },
  interfaceName: 'TabsBlock',
  fields: [
    {
      name: 'tabs',
      label: 'Tabs',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'name',
          label: 'Tab Name',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          label: 'Content',
          type: 'blocks',
          blocks: [Carousel, Content, Gallerie, MediaBlock, Pedigree, News],
          required: true,
          admin: {
            initCollapsed: true,
          },
        },
      ],
    },
  ],
}
