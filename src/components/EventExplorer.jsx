import { lazy, Suspense, useState } from 'react';
import { ArrowUpRight, ChevronDown, Church, Clapperboard, Heart, Monitor, Play } from 'lucide-react';
import { events, films, quoteNotes, services, studio } from '../content.js';

const ProductionChart = lazy(() => import('./ProductionChart.jsx'));
const icons = { wedding: Heart, stage: Monitor, gospel: Church, studio: Clapperboard };

export default function EventExplorer({ onBook }) {
  const [index, setIndex] = useState(0);
  const [showSetup, setShowSetup] = useState(false);
  const event = events[index];
  const film = films.find(({ event: eventId }) => eventId === event.id);

  function select(index) {
    setIndex(index);
    setShowSetup(false);
  }

  function navigate(keyEvent) {
    const previous = (index + events.length - 1) % events.length;
    const next = (index + 1) % events.length;
    const nextIndex = { ArrowLeft: previous, ArrowUp: previous, ArrowRight: next, ArrowDown: next, Home: 0, End: events.length - 1 }[keyEvent.key];

    if (nextIndex === undefined) return;
    keyEvent.preventDefault();
    select(nextIndex);
    keyEvent.currentTarget.querySelectorAll('[role="tab"]')[nextIndex].focus();
  }

  return (
    <div className="event-explorer">
      <div className="event-tabs" role="tablist" aria-label="Event types" onKeyDown={navigate}>
        {events.map((option, optionIndex) => {
          const Icon = icons[option.id];
          return <button type="button" key={option.id} role="tab" id={`tab-${option.id}`}
            aria-selected={optionIndex === index} aria-controls="event-panel" tabIndex={optionIndex === index ? 0 : -1}
            onClick={() => select(optionIndex)}><Icon size={20} aria-hidden="true" /><span>{option.tab}</span><ArrowUpRight size={16} aria-hidden="true" /></button>;
        })}
      </div>
      <div className="event-panel" id="event-panel" role="tabpanel" aria-labelledby={`tab-${event.id}`} tabIndex={0}>
        <figure className="event-image" key={event.id}>
          <img className="event-backdrop" src={event.image} alt={event.alt} loading="lazy" width="1000" height="750" />
          {event.logo && <img className="event-logo" src={event.logo.src} alt={event.logo.alt} width="600" height="600" />}
          <figcaption>Illustrative imagery</figcaption>
        </figure>
        <div className="event-details">
          <div className="event-copy" key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p className="event-quote-note"><strong>For your quote</strong> {quoteNotes[event.id]}</p>
            <ul className="event-services" aria-label="Suggested services">
              {services.filter(({ id }) => event.services.includes(id)).map(({ id, name }) => <li key={id}>{name}</li>)}
            </ul>
          </div>
          <div className="event-actions">
            <button className="button button-primary" type="button" onClick={() => onBook(event.type, event.services)}>
              {studio.quoteAction} <ArrowUpRight size={17} aria-hidden="true" />
            </button>
            <button className="button event-setup-button" type="button" aria-expanded={showSetup} aria-controls="event-setup" onClick={() => setShowSetup(!showSetup)}>
              Production breakdown <ChevronDown size={17} aria-hidden="true" />
            </button>
          </div>
          {film && <a className="event-film-link" href={film.url} target="_blank" rel="noreferrer"><Play size={16} aria-hidden="true" /> Watch {film.title} on YouTube</a>}
          <div className="event-setup" id="event-setup" hidden={!showSetup}>
            {showSetup && <Suspense fallback={<p role="status">Loading production breakdown…</p>}><ProductionChart event={event} /></Suspense>}
          </div>
        </div>
      </div>
    </div>
  );
}
