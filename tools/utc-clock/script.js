// UTC clock — renders the current UTC time once per second.

const el = {
  date:  document.getElementById('date'),
  hm:    document.getElementById('hm'),
  sec:   document.getElementById('sec'),
  iso:   document.getElementById('iso'),
  local: document.getElementById('local')
};

const pad = n => String(n).padStart(2, '0');

// Locale-aware date, forced into the UTC zone.
const dateFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'UTC',
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric'
});

function render() {
  const now = new Date();

  el.date.textContent = dateFormat.format(now);
  el.hm.textContent   = pad(now.getUTCHours()) + ':' + pad(now.getUTCMinutes());
  el.sec.textContent  = pad(now.getUTCSeconds());
  el.iso.textContent  = now.toISOString().slice(0, 19) + 'Z';

  // getTimezoneOffset() returns minutes to ADD to local time to reach UTC,
  // so the sign is inverted from how offsets are normally written.
  const offset = -now.getTimezoneOffset();
  const abs = Math.abs(offset);
  el.local.textContent =
    'This device is set to UTC' + (offset < 0 ? '−' : '+') +
    pad(Math.floor(abs / 60)) + ':' + pad(abs % 60);
}

// Self-correcting tick: schedules the next update on the next whole second
// instead of blindly every 1000ms, so it never drifts out of alignment.
function tick() {
  render();
  setTimeout(tick, 1000 - (Date.now() % 1000));
}

tick();
