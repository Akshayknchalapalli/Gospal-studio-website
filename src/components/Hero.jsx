import { useState } from 'react';
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';

const scenes = [
  { id: 'live', label: 'Live production', image: '/media/production.webp', alt: 'Illustration of a live stage being filmed at an evening event' },
  { id: 'wedding', label: 'Weddings', image: '/media/wedding.webp', alt: 'Illustration of a South Indian wedding reception' },
  { id: 'studio', label: 'Studio', image: '/media/studio.webp', alt: 'Illustration of a professional camera on a studio set' },
];

export default function Hero({ onBook }) {
  const [active, setActive] = useState(scenes[0].id);
  const [visited, setVisited] = useState([scenes[0].id]);

  function showScene(id) {
    setActive(id);
    if (!visited.includes(id)) setVisited([...visited, id]);
  }

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-media" id="showcase-frame">
        {scenes.filter(({ id }) => visited.includes(id)).map(({ id, image, alt }) => (
          <img key={id} className={id === active ? 'current-scene' : undefined}
            src={image} alt={alt} aria-hidden={id !== active} fetchPriority={id === 'live' ? 'high' : undefined}
            width="1536" height="1024" />
        ))}
      </div>
      <div className="container hero-layout">
        <div className="hero-copy">
          <p className="eyebrow hero-location"><MapPin size={15} aria-hidden="true" /> Media studio in Bhimavaram</p>
          <h1 id="hero-title"><span>Live events.</span> <em>Captured well.</em></h1>
          <p className="hero-description">Films, photography, streaming, LED screens and JBL sound for weddings, stage shows and gatherings.</p>
          <div className="hero-actions">
            <button className="button button-primary" type="button" onClick={() => onBook()}>Plan your event <ArrowUpRight aria-hidden="true" size={19} /></button>
            <a className="button hero-explore" href="#events">Explore event coverage <ArrowDown aria-hidden="true" size={17} /></a>
          </div>
        </div>
        <div className="hero-reel">
          <div className="showcase-scenes" role="group" aria-label="Preview event and studio coverage">
            {scenes.map(({ id, label }) => (
              <button key={id} type="button" aria-pressed={id === active} aria-controls="showcase-frame" onClick={() => showScene(id)}>{label}</button>
            ))}
          </div>
          <span className="image-credit">Illustrative imagery</span>
        </div>
      </div>
    </section>
  );
}
