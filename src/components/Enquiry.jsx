import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { events, services, studio } from '../content.js';
import Dialog from './Dialog.jsx';

function makeDraft(form, selected) {
  const fields = new FormData(form);
  const date = fields.get('date');
  const venue = fields.get('venue').trim();
  const details = fields.get('details').trim();
  const selectedNames = services.filter(({ id }) => selected.includes(id)).map(({ name }) => name);
  const lines = [
    'Hello Suresh Live Medias, I’d like to enquire about a booking.',
    '',
    `Name: ${fields.get('name').trim()}`,
    `Event: ${fields.get('type')}`,
    ...(date ? [`Date: ${date}`] : []),
    ...(venue ? [`Venue or town: ${venue}`] : []),
    ...(selectedNames.length ? [`Services: ${selectedNames.join(', ')}`] : []),
    ...(details ? [`Details: ${details}`] : []),
  ];
  const url = new URL(studio.whatsapp);
  url.searchParams.set('text', lines.join('\n'));
  return url.href;
}

export default function Enquiry({ initial, onClose }) {
  const [selected, setSelected] = useState(initial.services);

  function toggle(id) {
    setSelected((previous) => previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]);
  }

  function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.namedItem('name');
    if (!name.value.trim()) {
      name.setCustomValidity('Enter your name to continue.');
      name.reportValidity();
      return;
    }
    window.location.assign(makeDraft(form, selected));
  }

  return (
    <Dialog title="Plan your event" onClose={onClose}>
      <form className="enquiry" onSubmit={submit}>
        <div className="form-grid">
          <label>Your name<input name="name" autoComplete="name" required maxLength={80} onInput={(event) => event.currentTarget.setCustomValidity('')} /></label>
          <label>Event type<select name="type" defaultValue={initial.type} required>
            <option value="">Select an event</option>
            {events.map(({ id, type }) => <option key={id}>{type}</option>)}
            <option>Other event</option>
          </select></label>
          <label>Event date <span>(optional)</span><input type="date" name="date" /></label>
          <label>Venue or town <span>(optional)</span><input name="venue" maxLength={100} /></label>
        </div>
        <fieldset>
          <legend>Services <span>(optional)</span></legend>
          <div className="service-options">
            {services.map(({ id, name }) => (
              <label className="option" key={id}><input type="checkbox" checked={selected.includes(id)} onChange={() => toggle(id)} /><span>{name}</span></label>
            ))}
          </div>
        </fieldset>
        <label>Anything else? <span>(optional)</span><textarea name="details" rows={3} maxLength={1000} /></label>
        <button className="button button-primary" type="submit"><MessageCircle size={18} aria-hidden="true" /> Continue on WhatsApp</button>
        <p className="form-note">Review your draft in WhatsApp before sending it.</p>
      </form>
    </Dialog>
  );
}
