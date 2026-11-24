import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Camera, Clapperboard, MapPin, Radio } from 'lucide-react';

const scenes = [
  { id: 'live', label: 'Live production', image: '/media/production.webp', alt: 'Illustrative photograph of a camera operator filming a live stage', Icon: Radio },
  { id: 'weddings', label: 'Weddings', image: '/media/wedding.webp', alt: 'Illustrative photograph of a South Indian wedding reception', Icon: Clapperboard },
  { id: 'studio', label: 'Studio sessions', image: '/media/studio.webp', alt: 'Illustrative photograph of a camera on a studio set', Icon: Camera },
];

export default function Hero({ onBook }) {
  const [active, setActive] = useState(scenes[0].id);
  const [hasChanged, setHasChanged] = useState(false);

  function showScene(id) {
    if (id === active) return;
    setActive(id);
    setHasChanged(true);
  }

  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow"><span className="signal" aria-hidden="true" /> Studio &amp; event production</p>
        <h1 id="hero-title">
          <span className="hero-title-line"><span>Built for the</span></span>{' '}
          <span className="hero-title-line"><span>big moment<span className="hero-period">.</span></span></span>
        </h1>
        <p className="hero-description">Photography, films and live production for events in Bhimavaram. From the first frame to the final cue.</p>
        <div className="hero-actions">
          <button className="button button-primary" type="button" onClick={() => onBook()}>Plan your event <ArrowUpRight aria-hidden="true" size={18} /></button>
          <a className="explore" href="#services">Explore services <ArrowDown aria-hidden="true" size={16} /></a>
        </div>
      </div>
      <div className="hero-showcase">
        <figure className="hero-media" id="showcase-frame">
          {scenes.map(({ id, image, alt }, index) => (
            <img key={id} className={id === active ? 'current-scene' : undefined}
              src={index === 0 || hasChanged ? image : undefined}
              alt={alt} aria-hidden={id !== active} fetchPriority={index === 0 ? 'high' : undefined}
              width="1536" height="1024" />
          ))}
          <span className="frame-corner corner-top" aria-hidden="true" />
          <span className="frame-corner corner-bottom" aria-hidden="true" />
          <figcaption><MapPin size={16} aria-hidden="true" /> Bhimavaram, Andhra Pradesh</figcaption>
        </figure>
        <div className="showcase-scenes" role="group" aria-label="Preview event and studio coverage">
          {scenes.map(({ id, label, Icon }) => (
            <button key={id} type="button" aria-pressed={id === active} aria-controls="showcase-frame" onClick={() => showScene(id)}>
              <Icon size={17} aria-hidden="true" /> <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
