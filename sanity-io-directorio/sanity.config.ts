import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import { colorInput } from '@sanity/color-input'

export default defineConfig({
  name: 'default',
  title: 'sanity-io-directorio',

  projectId: 'xs7m1pzr',
  dataset: 'production',

  plugins: [deskTool(), visionTool(), colorInput()],

  schema: {
    types: schemaTypes,
  },
})
