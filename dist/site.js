const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const smallScreen = window.matchMedia('(max-width: 740px)');

function setMenu(open) {
  navigation.hidden = smallScreen.matches && !open;
  menuButton.setAttribute('aria-expanded', String(open));
}

function syncNavigation() {
  menuButton.hidden = !smallScreen.matches;
  setMenu(false);
}

menuButton.addEventListener('click', () => setMenu(navigation.hidden));
navigation.addEventListener('click', (event) => {
  if (smallScreen.matches && event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});
smallScreen.addEventListener('change', syncNavigation);
syncNavigation();

const posterDialog = document.querySelector('.poster-dialog');
if (typeof posterDialog.showModal === 'function') {
  const posterImage = posterDialog.querySelector('img');
  const posterTitle = posterDialog.querySelector('h2');
  document.querySelectorAll('[data-poster]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      posterTitle.textContent = link.dataset.title;
      posterImage.src = link.href;
      posterImage.alt = link.dataset.title;
      posterDialog.showModal();
    });
  });
}

const enquiry = document.querySelector('#enquiry');
enquiry.hidden = false;
document.querySelectorAll('[data-event]').forEach((link) => {
  link.addEventListener('click', () => {
    enquiry.elements.event.value = link.dataset.event;
  });
});

enquiry.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(enquiry);
  const message = [
    'Hello Suresh Live Medias, I would like to enquire about an event.',
    '',
    'Name: ' + data.get('name').trim(),
    'Event: ' + data.get('event'),
    data.get('date') && 'Date: ' + data.get('date'),
    data.get('venue').trim() && 'Venue: ' + data.get('venue').trim(),
    'Services and details: ' + data.get('details').trim(),
  ].filter((line, index) => index === 1 || Boolean(line));
  const destination = new URL(enquiry.action);
  destination.searchParams.set('text', message.join('\n'));
  window.location.assign(destination.href);
});

['name', 'details'].forEach((fieldName) => {
  const field = enquiry.elements[fieldName];
  field.addEventListener('input', () => {
    field.setCustomValidity(field.value && !field.value.trim() ? 'Please enter some text.' : '');
  });
});
