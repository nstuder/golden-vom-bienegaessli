import type { Block } from 'payload'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { Carousel } from '@/blocks/Carousel/config'

export const News: Block = {
  slug: 'news',
  labels: {
    singular: 'News',
    plural: 'News',
  },
  interfaceName: 'NewsBlock',
  fields: [
    {
      name: 'newsItems',
      label: 'News Einträge',
      labels: { plural: 'News Einträge', singular: 'News Eintrag' },
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'date',
          label: 'Datum',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
            },
          },
        },
        {
          name: 'title',
          label: 'Titel',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          label: 'Inhalt',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures, BlocksFeature({ blocks: [MediaBlock, Carousel] })]
            },
          }),
          required: true,
        },
      ],
    },
  ],
}
