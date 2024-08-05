import { CollectionConfig } from 'payload/types'
import { RowLabelArgs } from 'payload/dist/admin/components/forms/RowLabel/types'
import { useState, useEffect } from 'react'
import { isLoggedIn } from '../access/isLoggedIn'

const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'website_type', 'updatedAt', 'createdAt'],
  },
  access: {
    read: () => true,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
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
      name: 'featured_image',
      label: 'Featured Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        position: 'sidebar',
        className: 'label-font-medium',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Project Overview',
          fields: [
            {
              name: 'project_overview',
              label: 'Description',
              type: 'richText',
            },
            {
              name: 'website_type',
              label: 'Website Type',
              type: 'text',
            },
            {
              name: 'key_features',
              label: 'Key Features',
              type: 'richText',
            },
            {
              name: 'demo_link',
              label: 'Demo Link',
              type: 'text',
            },
            {
              name: 'screenshot_link',
              label: 'Screenshot Link',
              type: 'text',
            },
          ],
        },
        {
          label: 'Tech Stacks',
          fields: [
            {
              name: 'tech_stacks',
              label: ' ',
              type: 'array',
              labels: {
                singular: 'Tech Stack',
                plural: 'Tech Stacks',
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
        },
      ],
    },
  ],
}

export default Projects
