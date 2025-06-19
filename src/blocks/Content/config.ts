import type { Block, Field } from 'payload'

import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { Carousel } from '@/blocks/Carousel/config'

const columnFields: Field[] = [
  {
    name: 'size',
    label: 'Größe',
    type: 'select',
    defaultValue: 'full',
    options: [
      {
        label: '1/3',
        value: 'oneThird',
      },
      {
        label: '1/2',
        value: 'half',
      },
      {
        label: '2/3',
        value: 'twoThirds',
      },
      {
        label: 'Voll',
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [...rootFeatures, BlocksFeature({ blocks: [MediaBlock, Carousel] })]
      },
    }),
    label: false,
  },
]

export const Content: Block = {
  slug: 'content',
  labels: {
    singular: 'Inhalt',
    plural: 'Inhalte',
  },
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      label: 'Spalten',
      labels: { plural: 'Spalten', singular: 'Spalte' },
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
