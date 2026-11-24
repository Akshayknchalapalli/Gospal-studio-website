import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { events, services, studio } from '../content.js';
import Dialog from './Dialog.jsx';

import { makeQuoteUrl } from '../quote.js';

export default function Enquiry({ initial, onClose }) {
  const [selected, setSelected] = useState(initial.services);

  function toggle(id) {
    setSelected((previous) => previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]);
  }

  function submit(event) {
    event.preventDefault();
    window.location.assign(makeQuoteUrl(new FormData(event.currentTarget), selected));
  }

  return (
    <Dialog title={studio.quoteAction} onClose={onClose}>
      <form className="enquiry" onSubmit={submit}>
        <p className="form-intro">Send your event details to Suresh Live Medias on WhatsApp at <strong>{studio.phones[0].label}</strong>.</p>
        <div className="form-grid">
          <label>Event type<select name="type" defaultValue={initial.type} required>
            <option value="">Select an event</option>
            {events.map(({ id, type }) => <option key={id}>{type}</option>)}
            <option>Other event</option>
          </select></label>
          <label>Event date <span>(if known)</span><input type="date" name="date" /></label>
          <label>Venue or town <span>(if known)</span><input name="venue" maxLength={100} /></label>
        </div>
        <fieldset>
          <legend>Services needed <span>(if known)</span></legend>
          <div className="service-options">
            {services.map(({ id, name }) => (
              <label className="option" key={id}><input type="checkbox" checked={selected.includes(id)} onChange={() => toggle(id)} /><span>{name}</span></label>
            ))}
          </div>
        </fieldset>
        <button className="button button-primary" type="submit"><MessageCircle size={18} aria-hidden="true" /> Continue on WhatsApp</button>
        <p className="form-note">Review your draft in WhatsApp before sending it.</p>
      </form>
    </Dialog>
  );
}
