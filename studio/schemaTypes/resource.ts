import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'resource',
  title: 'Tenant Handbook Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'E.g., "Trash & Recycling", "Emergency Contacts", "Move-Out Rules"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (Anchor Link)',
      type: 'slug',
      description: 'Click Generate. This creates the link for the sidebar (e.g. #trash-recycling).',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      description: 'Use numbers to order the sidebar (1 = Top, 2 = Second, etc).',
      initialValue: 10,
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array', 
      of: [{type: 'block'}], // Rich text editor for the Wiki content
      description: 'Write the rules, guides, or info here.',
    }),
    {
      name: 'imageTop',
      title: 'Top Image',
      type: 'image',
      description: 'Optional image to display ABOVE the text content.',
      options: {
        hotspot: true, // Enables the cropping tool
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for accessibility and SEO.',
        }
      ]
    },
    {
      name: 'imageBottom',
      title: 'Bottom Image',
      type: 'image',
      description: 'Optional image to display BELOW the text content but ABOVE the downloads.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    },
    defineField({
      name: 'attachments',
      title: 'Downloadable Files',
      type: 'array',
      description: 'Optional: Upload PDFs or forms related to this section.',
      of: [
        {
          type: 'file',
          options: {accept: '.pdf,.doc,.docx'},
          fields: [
            {
              name: 'description',
              type: 'string',
              title: 'Button Text (e.g. "Download Trash Map")'
            }
          ]
        }
      ]
    }),
  ],
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrderAsc',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'order',
    },
    prepare({title, subtitle}) {
      return {
        title: title,
        subtitle: `Order: ${subtitle}`
      }
    }
  },
})