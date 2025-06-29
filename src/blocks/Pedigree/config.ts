import type { Block } from 'payload'

export const Pedigree: Block = {
  slug: 'pedigree',
  labels: {
    singular: 'Ahnentafel',
    plural: 'Ahnentafel',
  },
  interfaceName: 'PedigreeBlock',
  fields: [
    {
      name: 'fatherName',
      label: 'Vater Name',
      type: 'text',
      required: true,
    },
    {
      name: 'fatherImage',
      label: 'Vater Bild',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'motherName',
      label: 'Mutter Name',
      type: 'text',
      required: true,
    },
    {
      name: 'motherImage',
      label: 'Mutter Bild',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'pedigreeData',
      label: 'Ahnentafel',
      type: 'group',
      fields: [
        {
          name: 'father',
          label: 'Vater',
          type: 'text',
        },
        {
          name: 'fathersFather',
          label: 'Großvater (väterlich)',
          type: 'text',
        },
        {
          name: 'fathersFathersFather',
          label: 'Urgroßvater (väterlich, väterlich)',
          type: 'text',
        },
        {
          name: 'fathersFathersMother',
          label: 'Urgroßmutter (väterlich, väterlich)',
          type: 'text',
        },
        {
          name: 'fathersMother',
          label: 'Großmutter (väterlich)',
          type: 'text',
        },
        {
          name: 'fathersMothersFather',
          label: 'Urgroßvater (väterlich, mütterlich)',
          type: 'text',
        },
        {
          name: 'fathersMothersMother',
          label: 'Urgroßmutter (väterlich, mütterlich)',
          type: 'text',
        },
        {
          name: 'mother',
          label: 'Mutter',
          type: 'text',
        },
        {
          name: 'mothersFather',
          label: 'Großvater (mütterlich)',
          type: 'text',
        },
        {
          name: 'mothersFathersFather',
          label: 'Urgroßvater (mütterlich, väterlich)',
          type: 'text',
        },
        {
          name: 'mothersFathersMother',
          label: 'Urgroßmutter (mütterlich, väterlich)',
          type: 'text',
        },
        {
          name: 'mothersMother',
          label: 'Großmutter (mütterlich)',
          type: 'text',
        },
        {
          name: 'mothersMothersFather',
          label: 'Urgroßvater (mütterlich, mütterlich)',
          type: 'text',
        },
        {
          name: 'mothersMothersMother',
          label: 'Urgroßmutter (mütterlich, mütterlich)',
          type: 'text',
        },
      ],
    },
  ],
}
