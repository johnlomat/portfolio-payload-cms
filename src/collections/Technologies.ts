import { CollectionConfig } from 'payload/types'

const Technologies: CollectionConfig = {
  slug: 'technologies',
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
      name: 'image_details',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        className: 'label-font-medium',
      },
    },
  ],
}

export default Technologies
