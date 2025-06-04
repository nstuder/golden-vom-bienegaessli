import type { Block, Field } from 'payload'

export const carouselFields: Field[] = [
  {
    name: 'autoSlide',
    type: 'checkbox',
    label: 'Auto Slide',
    defaultValue: true,
  },
  {
    name: 'slideTime',
    type: 'number',
    label: 'Slide Switch Time (seconds)',
    defaultValue: 5,
    min: 1,
    max: 30,
    admin: {
      description: 'Time in seconds between slide transitions when auto slide is enabled',
    },
  },
  {
    name: 'items',
    type: 'array',
    label: 'Carousel Items',
    minRows: 2,
    required: true,
    fields: [
      {
        name: 'media',
        type: 'upload',
        relationTo: 'media',
        required: true,
        label: 'Image or Video',
      },
    ],
  },
]

export const Carousel: Block = {
  slug: 'carousel',
  interfaceName: 'CarouselBlock',
  fields: carouselFields,
}
