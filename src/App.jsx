import { useState } from 'react';
import { ArrowDown, ArrowUpRight, AudioLines, Camera, Clapperboard, Drone, MapPin, Menu, MessageCircle, Monitor, Phone, Radio, SlidersHorizontal, X } from 'lucide-react';
import { posters, services, studio } from './content.js';
import Dialog from './components/Dialog.jsx';
import Enquiry from './components/Enquiry.jsx';
import EventExplorer from './components/EventExplorer.jsx';

const links = [['services', 'Services'], ['events', 'Events'], ['studio', 'Studio'], ['contact', 'Contact']];
const icons = { camera: Camera, film: Clapperboard, drone: Drone, screen: Monitor, sound: AudioLines, broadcast: Radio, mix: SlidersHorizontal };

function Brand() {
  return <a className="brand" href="#top" aria-label="Suresh Live Medias home">
    <img src="/media/icon.webp" alt="" width="40" height="40" />
    <span>Suresh <small>Live Medias</small></span>
  </a>;
}

function Header({ onBook }) {
  const [open, setOpen] = useState(false);

  function closeOnEscape(event) {
    if (event.key === 'Escape' && open) {
      setOpen(false);
      event.currentTarget.querySelector('.menu-toggle').focus();
    }
  }

  return <header className="header" onKeyDown={closeOnEscape}>
    <div className="container header-inner">
      <Brand />
      <button className="icon-button menu-toggle" type="button" aria-controls="navigation" aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav id="navigation" className={open ? 'navigation is-open' : 'navigation'} aria-label="Main navigation">
        {links.map(([id, label]) => <a href={`#${id}`} key={id} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
      <button className="button button-dark header-action" type="button" onClick={() => onBook()}>Plan your event <ArrowUpRight aria-hidden="true" size={16} /></button>
    </div>
  </header>;
}

function Hero({ onBook }) {
  return <section className="hero container" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="eyebrow"><span className="signal" aria-hidden="true" /> Studio &amp; event production</p>
      <h1 id="hero-title">Built for the<br />big moment<span>.</span></h1>
      <p className="hero-description">Photography, films and live production for events in Bhimavaram. From the first frame to the final cue.</p>
      <div className="hero-actions">
        <button className="button button-primary" type="button" onClick={() => onBook()}>Plan your event <ArrowUpRight aria-hidden="true" size={18} /></button>
        <a className="explore" href="#services">Explore services <ArrowDown aria-hidden="true" size={16} /></a>
      </div>
    </div>
    <figure className="hero-media">
      <img src="/media/production.webp" fetchPriority="high" alt="Illustrative photograph of a camera operator filming a live stage" width="1536" height="1024" />
      <span className="frame-corner corner-top" aria-hidden="true" />
      <span className="frame-corner corner-bottom" aria-hidden="true" />
      <figcaption><MapPin size={16} aria-hidden="true" /> Bhimavaram, Andhra Pradesh</figcaption>
    </figure>
  </section>;
}

function Services({ onBook }) {
  return <section className="section container" id="services" aria-labelledby="services-title">
    <div className="section-heading">
      <div><p className="eyebrow">Services</p><h2 id="services-title">From camera to crowd.</h2></div>
      <p>Book individual services or bring your camera crew, screens, sound and broadcast together with one team.</p>
    </div>
    <div className="services-grid">
      {services.map(({ id, icon, name, description }) => {
        const Icon = icons[icon];
        return <article className="service-card" key={id}>
          <div className="service-top"><span className="service-icon"><Icon size={24} aria-hidden="true" /></span><button className="icon-button" type="button" aria-label={`Enquire about ${name}`} onClick={() => onBook('', [id])}><ArrowUpRight size={19} aria-hidden="true" /></button></div>
          <h3>{name}</h3><p>{description}</p>
        </article>;
      })}
      <article className="service-card service-cta">
        <span className="service-icon"><MessageCircle size={24} aria-hidden="true" /></span>
        <h3>Need a custom setup?</h3>
        <button className="inline-button" type="button" onClick={() => onBook()}>Tell us what you’re planning <ArrowUpRight size={17} aria-hidden="true" /></button>
      </article>
    </div>
  </section>;
}

function Studio({ onPoster }) {
  return <section className="section container studio" id="studio" aria-labelledby="studio-title">
    <div className="studio-copy">
      <p className="eyebrow">The studio</p>
      <h2 id="studio-title">Come talk it through.</h2>
      <p>Visit us in Bhimavaram to discuss your shoot, venue and production setup.</p>
      <address><MapPin size={22} aria-hidden="true" /><span>{studio.address[0]}<br />{studio.address[1]}</span></address>
      <a className="button button-outline" href={studio.directions} target="_blank" rel="noreferrer">Find the nearby landmark <ArrowUpRight size={16} aria-hidden="true" /></a>
    </div>
    <div className="posters">
      {posters.map((poster) => <button className="poster" type="button" key={poster.title} onClick={() => onPoster(poster)}>
        <span className="poster-image"><img src={poster.image} alt="" loading="lazy" /></span>
        <span>{poster.title}<ArrowUpRight size={16} aria-hidden="true" /></span>
      </button>)}
    </div>
  </section>;
}

function Contact({ onBook }) {
  return <section className="contact" id="contact" aria-labelledby="contact-title">
    <div className="container contact-inner">
      <div><p className="eyebrow">Bookings</p><h2 id="contact-title">Let’s get your<br />event on the calendar.</h2></div>
      <div className="contact-actions">
        <button className="button button-dark" type="button" onClick={() => onBook()}><MessageCircle size={19} aria-hidden="true" /> Build a WhatsApp enquiry</button>
        <div className="phone-links">{studio.phones.map(({ href, label }) => <a href={href} key={href}><Phone size={15} aria-hidden="true" />{label}</a>)}</div>
      </div>
    </div>
  </section>;
}

export default function App() {
  const [enquiry, setEnquiry] = useState(null);
  const [poster, setPoster] = useState(null);
  const openEnquiry = (type = '', selected = []) => setEnquiry({ type, services: selected });

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div id="top" />
    <Header onBook={openEnquiry} />
    <main id="main">
      <Hero onBook={openEnquiry} />
      <Services onBook={openEnquiry} />
      <section className="section events" id="events" aria-labelledby="events-title">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow">Event coverage</p><h2 id="events-title">Every event has a setup.</h2></div>
            <p>Select your event to see a suggested combination of studio and production services.</p>
          </div>
          <EventExplorer onBook={openEnquiry} />
        </div>
      </section>
      <Studio onPoster={setPoster} />
      <Contact onBook={openEnquiry} />
    </main>
    <footer className="container footer"><Brand /><span>{studio.location}</span><a href="#top">Back to top <ArrowUpRight size={16} aria-hidden="true" /></a></footer>
    {enquiry && <Enquiry initial={enquiry} onClose={() => setEnquiry(null)} />}
    {poster && <Dialog title={poster.title} className="poster-dialog" onClose={() => setPoster(null)}><img src={poster.image} alt={`${poster.title} service poster`} /></Dialog>}
  </>;
}
