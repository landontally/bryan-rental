import {defineField, defineType} from 'sanity'

const currentYear = new Date().getFullYear();

const yearOptions = [
  { title: 'Immediate / Now', value: 'Now' },
  { title: `${currentYear} - ${currentYear + 1}`, value: `${currentYear}-${currentYear + 1}` },
  { title: `${currentYear + 1} - ${currentYear + 2}`, value: `${currentYear + 1}-${currentYear + 2}` },
  { title: `${currentYear + 2} - ${currentYear + 3}`, value: `${currentYear + 2}-${currentYear + 3}` },
  { title: `${currentYear + 3} - ${currentYear + 4}`, value: `${currentYear + 3}-${currentYear + 4}` },
];

export default defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Property Title',
      type: 'string',
      description: 'E.g., "430 E Kirkwood Ave #2"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Show on Website',
      type: 'boolean',
      description: 'Turn this off to hide the property from the website without deleting the data.',
      initialValue: true,
    }),
    
    // --- AVAILABILITY SECTION ---
    defineField({
      name: 'availableYear',
      title: 'Next Available School Year',
      type: 'string',
      options: {
        list: yearOptions,
      },
    }),

    // RE-ADDED FIELD HERE:
    defineField({
      name: 'dateAvailable',
      title: 'Specific Date Available',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      description: 'Optional: Use this for exact dates (e.g., January 1st) if the school year dropdown isn\'t specific enough.',
    }),
    // -----------------------------

    defineField({
      name: 'featured',
      title: 'Feature on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        layout: 'grid'
      },
    }),
    defineField({
      name: 'price',
      title: 'Monthly Rent',
      type: 'number',
    }),
    defineField({
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number',
    }),
    defineField({
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array', 
      of: [{type: 'block'}], 
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Air Conditioning', value: 'ac'},
          {title: 'Heating', value: 'heating'},
          {title: 'Refrigerator', value: 'refrigerator'},
          {title: 'Oven/Stove', value: 'oven_stove'},
          {title: 'Dishwasher', value: 'dishwasher'},
          {title: 'Garbage Disposal', value: 'garbage_disposal'},
          {title: 'Washer/Dryer', value: 'washer_dryer'},
          {title: 'Pets Allowed', value: 'pets_allowed'},
          {title: 'Gas Included', value: 'gas_included'},
          {title: 'Water Included', value: 'water_included'},
          {title: 'Trash Included', value: 'trash_included'},
          {title: 'One Off-Street Parking Spot', value: 'one_off_street_parking_spot'},
          {title: 'Two Off-Street Parking Spots', value: 'two_off_street_parking_spots'},
          {title: 'Parking', value: 'parking'},
          {title: 'Garage', value: 'garage'},
          {title: 'Balcony/Patio', value: 'balcony_patio'},
          {title: 'Fenced Yard', value: 'fenced_yard'},
          {title: 'Ceiling Fans', value: 'ceiling_fans'},
          {title: 'Fireplace', value: 'fireplace'},
          {title: 'Walk-in Closet', value: 'walk_in_closet'},
          {title: 'Hardwood Floors', value: 'hardwood_floors'},
          {title: 'Carpeted Floors', value: 'carpeted_floors'},
        ],
      },
    }),
    defineField({
      name: 'location',
      title: 'Map Location',
      type: 'geopoint', 
    }),
    defineField({
      name: 'communityHighlights',
      title: 'Community Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'value', type: 'string', title: 'Value'},
          ]
        }
      ]
    }),
  ],
})