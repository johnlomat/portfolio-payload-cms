import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'
import cloudinaryPlugin from 'payload-cloudinary-plugin/dist/plugins'

import Users from './collections/Users'
import Projects from './collections/Projects'
import Skills from './collections/Skills'
import Technologies from './collections/Technologies'
import { Media } from './collections/Media'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    css: path.resolve(__dirname, 'styles/custom-style-admin.scss'),
  },
  editor: slateEditor({}),
  collections: [Users, Projects, Skills, Technologies, Media],
  cors: ['http://localhost:3000', process.env.NEXT_PUBLIC_SITE_URL],
  csrf: ['http://localhost:3000', process.env.NEXT_PUBLIC_SITE_URL],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud(), cloudinaryPlugin()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
})
