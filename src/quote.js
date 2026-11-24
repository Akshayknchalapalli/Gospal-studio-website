import { services, studio } from './content.js';

export function makeQuoteUrl(fields, selected) {
  const selectedNames = services.filter(({ id }) => selected.includes(id)).map(({ name }) => name);
  const date = fields.get('date');
  const venue = fields.get('venue').trim();
  const lines = [
    'Hello Suresh Live Medias, I’d like to check availability and get a quote.',
    '',
    `Event: ${fields.get('type')}`,
    `Date: ${date || 'To be confirmed'}`,
    `Venue or town: ${venue || 'To be confirmed'}`,
    `Services: ${selectedNames.length ? selectedNames.join(', ') : 'Please suggest options'}`,
  ];
  const url = new URL(studio.whatsapp);
  url.searchParams.set('text', lines.join('\n'));
  return url.href;
}
