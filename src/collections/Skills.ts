import { CollectionConfig } from 'payload/types'
import { RowLabelArgs } from 'payload/dist/admin/components/forms/RowLabel/types'
import { useState, useEffect } from 'react'

const Skills: CollectionConfig = {
  slug: 'skills',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt', 'createdAt'],
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      admin: {
        className: 'label-font-large',
      },
    },
    {
      name: 'techonologies',
      label: 'Technologies',
      type: 'array',
      labels: {
        singular: 'Technology',
        plural: 'Technologies',
      },
      fields: [
        {
          name: 'technology',
          label: 'Technology',
          type: 'relationship',
          relationTo: 'technologies',
        },
      ],
      admin: {
        components: {
          RowLabel: ({ data, index }: RowLabelArgs) => {
            const [label, setLabel] = useState('')

            useEffect(() => {
              if (data.technology) {
                fetch(
                  `/api/technologies/${data.technology}?locale=undefined&draft=false&depth=1`,
                ).then(async (res) => {
                  setLabel((await res.json()).title)
                })
              } else {
                setLabel(`Technology ${String(index).padStart(2, '0')}`)
              }
            }, [data.technology])

            return label
          },
        },
        initCollapsed: true,
      },
    },
  ],
}

export default Skills
