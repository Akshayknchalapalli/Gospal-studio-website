import { useState } from 'react';
import { ArrowUpRight, CalendarDays, ClipboardList, FileImage, MapPin, Menu, MessageCircle, Moon, Phone, Play, SlidersHorizontal, Sun, X } from 'lucide-react';
import { films, posters, studio } from './content.js';
import Dialog from './components/Dialog.jsx';
import Enquiry from './components/Enquiry.jsx';
import EventExplorer from './components/EventExplorer.jsx';
import Hero from './components/Hero.jsx';
import Capabilities from './components/Capabilities.jsx';
import { useTheme } from './useTheme.js';
import { useScrollReveal } from './useScrollReveal.js';

const links = [['services', 'Services'], ['events', 'Events'], ['studio', 'Studio'], ['contact', 'Contact']];


function Brand() {
  return <a className="brand" href="#top" aria-label="Suresh Live Medias home">
    <img src="/media/icon.webp" alt="" width="40" height="40" />
    <span>Suresh <small>Live Medias</small></span>
  </a>;
}

function Header({ onBook, theme, toggleTheme }) {
  const isDark = theme === 'dark';
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
      <div className="header-tools">
        <button className="icon-button theme-toggle" type="button" aria-label="Dark mode" aria-pressed={isDark}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'} onClick={toggleTheme}>
          {isDark ? <Sun key="sun" size={19} aria-hidden="true" /> : <Moon key="moon" size={19} aria-hidden="true" />}
        </button>
        <button className="button button-primary header-action" type="button" onClick={() => onBook()}>{studio.quoteAction} <ArrowUpRight aria-hidden="true" size={16} /></button>
        <button className="icon-button menu-toggle" type="button" aria-controls="navigation" aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      <nav id="navigation" className={open ? 'navigation is-open' : 'navigation'} aria-label="Main navigation">
        {links.map(([id, label]) => <a href={`#${id}`} key={id} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
    </div>
  </header>;
}

const planningSteps = [
  { title: 'Share your event details', description: 'Tell us your date, location and what you’re planning.', Icon: CalendarDays },
  { title: 'Choose your coverage', description: 'Discuss which camera, screen, sound and streaming services fit your event.', Icon: SlidersHorizontal },
  { title: 'Confirm the setup', description: 'Agree on availability, costs and what’s included before booking.', Icon: ClipboardList },
];

function Planning() {
  return <section className="planning" aria-labelledby="planning-title">
    <div className="container planning-inner">
      <h2 id="planning-title" data-scroll-reveal>How booking works</h2>
      <ol>{planningSteps.map(({ title, description, Icon }) => <li key={title} data-scroll-reveal>
        <Icon size={25} aria-hidden="true" /><h3>{title}</h3><p>{description}</p>
      </li>)}</ol>
    </div>
  </section>;
}

function Studio({ onPoster }) {
  return <section className="section container studio" id="studio" aria-labelledby="studio-title">
    <figure className="studio-photo">
      <img src="/media/studio.webp" alt="Illustrative photograph of a professional camera on a studio set" width="1000" height="750" loading="lazy" />
      <figcaption>Illustrative imagery</figcaption>
    </figure>
    <div className="studio-copy" data-scroll-reveal>
      <p className="eyebrow">The studio</p>
      <h2 id="studio-title">Visit us in Bhimavaram.</h2>
      <p>Come by to discuss a studio session, show us your venue plans, or choose coverage for an upcoming event.</p>
      <address><MapPin size={22} aria-hidden="true" /><span>{studio.address[0]}<br />{studio.address[1]}<br />Andhra Pradesh</span></address>
      <a className="button button-outline" href={studio.phones[0].href}><Phone size={16} aria-hidden="true" /> Call for studio directions</a>
      <div className="posters" aria-label="Studio service posters">
        {posters.map((poster) => <button className="poster" type="button" key={poster.title} onClick={() => onPoster(poster)}>
          <FileImage size={17} aria-hidden="true" /><span>{poster.title} poster</span><ArrowUpRight size={16} aria-hidden="true" />
        </button>)}
      </div>
    </div>
  </section>;
}

function Films() {
  return <section className="films section container" id="films" aria-labelledby="films-title">
    <div className="section-heading" data-scroll-reveal>
      <div><p className="eyebrow">Published work</p><h2 id="films-title">Real event films</h2></div>
      <p>Watch examples from the Suresh Live Media’s YouTube channel.</p>
    </div>
    <ul className="film-list">
      {films.map(({ event, title, kind, description, url }) => (
        <li key={event} data-scroll-reveal>
          <a href={url} target="_blank" rel="noreferrer">
            <span className="film-icon"><Play size={20} aria-hidden="true" /></span>
            <span><small>{kind}</small><strong>{title}</strong><span className="film-description">{description}</span></span>
            <span className="film-platform">YouTube <ArrowUpRight size={16} aria-hidden="true" /></span>
          </a>
        </li>
      ))}
    </ul>
  </section>;
}

function Contact({ onBook }) {
  return <section className="contact" id="contact" aria-labelledby="contact-title">
    <div className="container contact-inner">
      <div><p className="eyebrow">Bookings</p><h2 id="contact-title">Tell us about<br />your event.</h2></div>
      <div className="contact-actions">
        <button className="button button-dark" type="button" onClick={() => onBook()}><MessageCircle size={19} aria-hidden="true" /> {studio.quoteAction}</button>
        <div className="phone-links">{studio.phones.map(({ href, label }) => <a href={href} key={href}><Phone size={15} aria-hidden="true" />{label}</a>)}</div>
      </div>
    </div>
  </section>;
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  useScrollReveal();
  const [enquiry, setEnquiry] = useState(null);
  const [poster, setPoster] = useState(null);
  const openEnquiry = (type = '', selected = []) => setEnquiry({ type, services: selected });

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div id="top" />
    <Header onBook={openEnquiry} theme={theme} toggleTheme={toggleTheme} />
    <main id="main">
      <Hero onBook={openEnquiry} />
      <Films />
      <Capabilities onBook={openEnquiry} />
      <section className="section events" id="events" aria-labelledby="events-title">
        <div className="container">
          <div className="section-heading" data-scroll-reveal>
            <div><p className="eyebrow">Event coverage</p><h2 id="events-title">Find your kind of coverage.</h2></div>
            <p>Choose an event to explore a suggested setup, then tell us what you need.</p>
          </div>
          <EventExplorer onBook={openEnquiry} />
        </div>
      </section>
      <Planning />
      <Studio onPoster={setPoster} />
      <Contact onBook={openEnquiry} />
    </main>
    <footer className="container footer"><Brand /><span>{studio.location}</span><a href="#top">Back to top <ArrowUpRight size={16} aria-hidden="true" /></a></footer>
    {enquiry && <Enquiry initial={enquiry} onClose={() => setEnquiry(null)} />}
    {poster && <Dialog title={poster.title} className="poster-dialog" onClose={() => setPoster(null)}><img src={poster.image} alt={`${poster.title} service poster`} /></Dialog>}
  </>;
}
