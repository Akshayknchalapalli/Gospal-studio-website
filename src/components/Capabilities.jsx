import { useState } from 'react';
import { ArrowUpRight, AudioLines, Camera, Clapperboard, Drone, Monitor, Radio, SlidersHorizontal } from 'lucide-react';
import { services } from '../content.js';

const categories = [
  { id: 'capture', title: 'Photography & film', description: 'From portraits and candid photography to event films and aerial coverage.', image: '/media/capture.webp', alt: 'Illustration of a bride arranging a jasmine garland at a South Indian wedding', Icon: Camera },
  { id: 'venue', title: 'Screens & sound', description: 'Give guests a clear view of the stage and let them hear every word.', image: '/media/stage.webp', alt: 'Illustration of an event stage with LED screens', Icon: AudioLines },
  { id: 'broadcast', title: 'Live broadcast', description: 'Switch between camera feeds and share the event with people watching remotely.', image: '/media/broadcast.webp', alt: 'Illustration of a production switcher and monitoring equipment', Icon: Radio },
];

const serviceIcons = { camera: Camera, film: Clapperboard, drone: Drone, screen: Monitor, sound: AudioLines, broadcast: Radio, mix: SlidersHorizontal };

export default function Capabilities({ onBook }) {
  const [active, setActive] = useState(categories[0].id);
  const selected = categories.find(({ id }) => id === active);

  return (
    <section className="section container" id="services" aria-labelledby="services-title">
      <div className="section-heading" data-scroll-reveal>
        <div><p className="eyebrow">Production services</p><h2 id="services-title">From camera to crowd.</h2></div>
        <p>Book a single service or bring photography, screens, sound and streaming together for your event.</p>
      </div>
      <div className="capabilities">
        <div className="capability-list">
          {categories.map(({ id, title, description, Icon }) => {
            const isActive = active === id;
            const categoryServices = services.filter(({ group }) => group === id);
            return (
              <article className={isActive ? 'capability is-active' : 'capability'} key={id}>
                <h3><button type="button" aria-expanded={isActive} aria-controls={`capability-${id}`} onClick={() => setActive(id)}>
                  <Icon size={24} aria-hidden="true" /><span>{title}</span><ArrowUpRight size={22} aria-hidden="true" />
                </button></h3>
                <div className="capability-details" id={`capability-${id}`} hidden={!isActive}>
                  <p>{description}</p>
                  <ul>{categoryServices.map(({ id: serviceId, name, icon, description: detail }) => {
                    const ServiceIcon = serviceIcons[icon];
                    return <li key={serviceId}><button type="button" onClick={() => onBook('', [serviceId])}>
                      <ServiceIcon size={18} aria-hidden="true" />
                      <span><strong>{name}</strong><small>{detail}</small></span>
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </button></li>;
                  })}</ul>
                </div>
              </article>
            );
          })}
        </div>
        <figure className="capability-visual" key={selected.id}>
          <img src={selected.image} alt={selected.alt} width="1000" height="750" loading="lazy" />
          <figcaption>{selected.title}<span>Illustrative imagery</span></figcaption>
        </figure>
      </div>
    </section>
  );
}
