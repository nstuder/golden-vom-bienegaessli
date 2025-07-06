import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { linkGroup } from '@/fields/linkGroup'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation',
      fields: [
        {
          name: 'type',
          type: 'radio',
          defaultValue: 'link',
          admin: {
            layout: 'horizontal',
          },
          options: [
            {
              label: 'Einfacher Link',
              value: 'link',
            },
            {
              label: 'Dropdown Menü',
              value: 'dropdown',
            },
          ],
        },
        {
          name: 'link',
          type: 'group',
          label: false,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'link',
          },
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
        {
          name: 'dropdown',
          type: 'group',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'dropdown',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Dropdown Label',
            },
            linkGroup({
              appearances: false,
            }),
          ],
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
