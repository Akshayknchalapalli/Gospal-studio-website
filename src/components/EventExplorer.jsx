import { lazy, Suspense, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { events, services } from '../content.js';

const ProductionChart = lazy(() => import('./ProductionChart.jsx'));

export default function EventExplorer({ onBook }) {
  const [index, setIndex] = useState(0);
  const event = events[index];

  function navigate(keyEvent) {
    const nextIndex = {
      ArrowLeft: (index + events.length - 1) % events.length,
      ArrowRight: (index + 1) % events.length,
      Home: 0,
      End: events.length - 1,
    }[keyEvent.key];

    if (nextIndex === undefined) return;
    keyEvent.preventDefault();
    setIndex(nextIndex);
    keyEvent.currentTarget.querySelectorAll('[role="tab"]')[nextIndex].focus();
  }

  return (
    <div className="event-explorer">
      <div className="event-tabs" role="tablist" aria-label="Event types" onKeyDown={navigate}>
        {events.map((option, optionIndex) => (
          <button type="button" key={option.id} role="tab" id={`tab-${option.id}`}
            aria-selected={optionIndex === index} aria-controls="event-panel" tabIndex={optionIndex === index ? 0 : -1}
            onClick={() => setIndex(optionIndex)}>{option.tab}</button>
        ))}
      </div>
      <div className="event-panel" id="event-panel" role="tabpanel" aria-labelledby={`tab-${event.id}`} tabIndex={0}>
        <figure className="event-image" key={event.id}>
          <img src={event.image} alt={event.alt} loading="lazy" width="1000" height="750" />
          <figcaption>Illustrative imagery</figcaption>
        </figure>
        <div className="event-details">
          <div className="event-copy" key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <ul className="event-services" aria-label="Suggested services">
              {services.filter(({ id }) => event.services.includes(id)).map(({ id, name }) => <li key={id}>{name}</li>)}
            </ul>
          </div>
          <Suspense fallback={<div className="chart-placeholder" />}>
            <ProductionChart event={event} />
          </Suspense>
          <button className="button button-primary" type="button" onClick={() => onBook(event.type, event.services)}>
            Enquire about this setup <ArrowUpRight size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
