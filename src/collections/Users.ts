import { CollectionConfig } from 'payload/types'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'position', 'updatedAt', 'createdAt'],
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'information',
      label: 'Information',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'first_name',
              label: 'First Name',
              type: 'text',
              admin: {
                width: '50%',
              },
            },
            {
              name: 'last_name',
              label: 'Last Name',
              type: 'text',
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'position',
          label: 'Position',
          type: 'text',
        },
        {
          name: 'about_me',
          label: 'About Me',
          type: 'richText',
        },
      ],
    },
    {
      name: 'social_links',
      label: 'Social Links',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'linkedin',
          label: 'LinkedIn',
          type: 'text',
        },
        {
          name: 'github',
          label: 'GitHub',
          type: 'text',
        },
        {
          name: 'codepen',
          label: 'Codepen',
          type: 'text',
        },
      ],
    },
  ],
}

export default Users
