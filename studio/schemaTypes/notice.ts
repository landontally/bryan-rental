import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'notice',
  title: 'Website Alert / Notice',
  type: 'document',
  fields: [
    defineField({
      name: 'active',
      title: 'Active?',
      type: 'boolean',
      description: 'Toggle this ON to show the banner on the website.',
      initialValue: false
    }),
    defineField({
      name: 'type',
      title: 'Alert Type',
      type: 'string',
      options: {
        list: [
          {title: 'General Info (Blue)', value: 'info'},
          {title: 'Warning / Closure (Yellow)', value: 'warning'},
          {title: 'Emergency (Red)', value: 'critical'}
        ],
        layout: 'radio'
      },
      initialValue: 'info'
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'link',
      title: 'Link (Optional)',
      type: 'url',
      description: 'Does this alert need to link somewhere? (e.g. to the Tenants page)'
    })
  ],
  preview: {
    select: {
      title: 'message',
      active: 'active'
    },
    prepare({title, active}) {
      return {
        title: title,
        subtitle: active ? '✅ ACTIVE' : '❌ Inactive'
      }
    }
  }
})