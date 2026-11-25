import { useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { events, studio } from '../content.js';

const wedding = events.find(({ id }) => id === 'wedding');
const gospel = events.find(({ id }) => id === 'gospel');
const scenes = [
  { id: 'stage', label: 'Stage events', image: '/media/production.webp', alt: 'Illustration of an audience facing an amber-lit event stage' },
  { ...wedding, label: 'Weddings' },
  { ...gospel, label: 'Church & Gospel' },
];

export default function Hero({ onBook }) {
  const [active, setActive] = useState(0);
  const [visited, setVisited] = useState([0]);

  function showScene(index) {
    setActive(index);
    setVisited((previous) => previous.includes(index) ? previous : [...previous, index]);
  }

  function stepScene(offset) {
    showScene((active + offset + scenes.length) % scenes.length);
  }

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-media" id="showcase-frame">
        {scenes.map(({ id, image, alt }, index) => visited.includes(index) && (
          <img key={id} className={index === active ? 'current-scene' : undefined}
            src={image} alt={alt} aria-hidden={index !== active} data-scene={id}
            fetchPriority={index === 0 ? 'high' : undefined} width="1536" height="1024" />
        ))}
      </div>
      <div className="container hero-copy">
        <p className="hero-location">Event production in Bhimavaram</p>
        <h1 id="hero-title">Wedding films. Live events.</h1>
        <p className="hero-description">Photography, livestreaming, LED screens and JBL sound for weddings, church gatherings and stage shows.</p>
        <div className="hero-actions">
          <button className="button button-primary" type="button" onClick={() => onBook()}>{studio.quoteAction}</button>
          <a className="button hero-explore" href="#films"><Play aria-hidden="true" size={17} /> Watch real event films</a>
        </div>
      </div>
      <div className="container hero-reel">
        <div className="showcase-controls" role="group" aria-label="Event imagery carousel">
          <button className="icon-button scene-previous" type="button" aria-label="Previous event image"
            aria-controls="showcase-frame" onClick={() => stepScene(-1)}><ChevronLeft aria-hidden="true" /></button>
          <div className="showcase-scenes" role="group" aria-label="Choose event imagery">
            {scenes.map(({ id, label }, index) => (
              <button key={id} type="button" aria-pressed={index === active} aria-controls="showcase-frame"
                onClick={() => showScene(index)}>{label}</button>
            ))}
          </div>
          <button className="icon-button scene-next" type="button" aria-label="Next event image"
            aria-controls="showcase-frame" onClick={() => stepScene(1)}><ChevronRight aria-hidden="true" /></button>
        </div>
        <span className="image-credit">Illustrative imagery</span>
        <span className="scene-announcement" role="status">{scenes[active].label}, image {active + 1} of {scenes.length}</span>
      </div>
    </section>
  );
}
