import type { Block } from 'payload'

export const Gallerie: Block = {
  slug: 'gallerie',
  interfaceName: 'GallerieBlock',
  fields: [
    {
      name: 'usePrimaryBackground',
      label: 'Primärfarbe als Hintergrund verwenden',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'images',
      label: 'Bilder',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'image',
          label: 'Bild',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          label: 'Bildunterschrift',
          type: 'richText',
        },
      ],
    },
  ],
}
