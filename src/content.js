export const studio = {
  name: 'Suresh Live Medias',
  location: 'Bhimavaram, Andhra Pradesh',
  address: ['Opposite Government Hospital', 'Near the footpath bridge, Bhimavaram'],
  phones: [
    { label: '+91 91537 77999', href: 'tel:+919153777999' },
    { label: '+91 98482 75382', href: 'tel:+919848275382' },
  ],
  whatsapp: 'https://wa.me/919153777999',
  directions: 'https://www.google.com/maps/search/?api=1&query=Government+Hospital+Bhimavaram+Andhra+Pradesh',
};

export const services = [
  { id: 'photo', icon: 'camera', group: 'capture', name: 'Photography', description: 'Portraits, candid moments and the details that tell the story of your day.' },
  { id: 'film', icon: 'film', group: 'capture', name: 'Videography', description: 'Event films for ceremonies, speeches and celebrations, from the first look to the last dance.' },
  { id: 'drone', icon: 'drone', group: 'capture', name: 'Drone coverage', description: 'Aerial views of your venue, subject to weather, location and permissions.' },
  { id: 'led', icon: 'screen', group: 'venue', name: 'LED screens', description: 'Large-format displays for stage visuals, presentations and live camera feeds.' },
  { id: 'sound', icon: 'sound', group: 'venue', name: 'JBL sound systems', description: 'Venue sound for speeches, music and live performances.' },
  { id: 'stream', icon: 'broadcast', group: 'broadcast', name: 'Live streaming', description: 'Bring in guests who can’t make it. Ask us about your preferred streaming platform.' },
  { id: 'mix', icon: 'mix', group: 'broadcast', name: 'Live video mixing', description: 'Real-time switching between camera angles for your screens or stream.' },
];

export const groups = [
  { id: 'capture', label: 'Capture', token: '--chart-capture' },
  { id: 'venue', label: 'At the venue', token: '--chart-venue' },
  { id: 'broadcast', label: 'Broadcast', token: '--chart-broadcast' },
];

export const events = [
  { id: 'wedding', tab: 'Weddings', type: 'Wedding or reception', title: 'Weddings & receptions', description: 'From the ceremony to the reception, keep the moments that matter and share them with family watching from afar.', image: '/media/wedding.webp', alt: 'Illustrative image of a South Indian wedding reception', services: ['photo', 'film', 'drone', 'sound', 'stream'] },
  { id: 'stage', tab: 'Stage events', type: 'Stage or community event', title: 'Stage & community events', description: 'Make the stage visible, the sound clear and the camera feed ready for the room and the people watching online.', image: '/media/stage.webp', alt: 'Illustrative image of a stage with lighting and an LED backdrop', services: ['film', 'led', 'sound', 'stream', 'mix'] },
  { id: 'gospel', tab: 'Church & gospel', type: 'Church or gospel event', title: 'Church & gospel events', description: 'Photography, films and live production for Christian weddings, church programmes and worship gatherings.', image: '/media/gospel.webp', alt: 'Illustrative image of a church gathering', services: ['photo', 'film', 'led', 'sound', 'stream', 'mix'] },
  { id: 'studio', tab: 'Studio sessions', type: 'Studio session', title: 'Studio sessions', description: 'Talk to us about a studio photography or video session in Bhimavaram.', image: '/media/studio.webp', alt: 'Illustrative image of a camera on a studio set', services: ['photo', 'film'] },
];

export const posters = [
  { title: 'Suresh Live Medias', image: '/media/studio-poster.webp' },
  { title: 'Gospel Media Service', image: '/media/gospel-poster.webp' },
];
