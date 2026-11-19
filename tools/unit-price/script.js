// Unit Price — the screen, storage and service worker registration.
// Requires calc.js (loaded first, exposes UnitPriceCalc).

(() => {
  const { UNITS, analyse, present, rowLabel } = UnitPriceCalc;

  const STORAGE_KEY = 'unit-price:v1';
  const LIMITS = { name: 30, price: 9, quantity: 9 };

  const els = {
    items: document.getElementById('items'),
    add: document.getElementById('add'),
    compare: document.getElementById('compare'),
    clear: document.getElementById('clear'),
    summaryArea: document.getElementById('summary-area'),
    summary: document.getElementById('summary'),
    note: document.getElementById('note'),
    offline: document.getElementById('offline'),
    template: document.getElementById('row-template'),
    systemInputs: Array.from(document.querySelectorAll('input[name="system"]'))
  };

  let nextId = 1;

  const state = {
    system: 'metric',
    items: [],
    // Field messages, keyed by item id: { price: string|null, quantity: string|null }.
    errors: new Map(),
    // The last analysis (from a tap on Compare), or null when nothing is shown.
    analysis: null,
    // True while a summary is on screen (a result, or a summary without a result).
    showing: false
  };

  // ---------- State helpers ----------

  function defaultUnit() {
    return state.system === 'imperial' ? 'oz' : 'g';
  }

  function makeItem(unit, values = {}) {
    return {
      id: nextId++,
      name: values.name ?? '',
      price: values.price ?? '',
      quantity: values.quantity ?? '',
      unit
    };
  }

  function firstVisitItems() {
    return [makeItem(defaultUnit()), makeItem(defaultUnit())];
  }

  // ---------- Storage (section 6.5) ----------

  function save() {
    const data = {
      system: state.system,
      items: state.items.map(({ name, price, quantity, unit }) => ({ name, price, quantity, unit }))
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      // Storage is not available: the app works normally and simply does not remember.
    }
  }

  function load() {
    let raw = null;
    try {
      raw = window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      raw = null;
    }
    if (!raw) return false;

    let data;
    try {
      data = JSON.parse(raw);
    } catch (error) {
      return false;
    }
    if (!data || (data.system !== 'metric' && data.system !== 'imperial') || !Array.isArray(data.items)) {
      return false;
    }
    const isText = (v) => typeof v === 'string';
    const valid = data.items.every((it) => it && isText(it.name) && isText(it.price) &&
      isText(it.quantity) && isText(it.unit) && Object.prototype.hasOwnProperty.call(UNITS, it.unit));
    if (!valid) return false;

    state.system = data.system;
    state.items = data.items.map((it) => makeItem(it.unit, {
      name: it.name.slice(0, LIMITS.name),
      price: it.price.slice(0, LIMITS.price),
      quantity: it.quantity.slice(0, LIMITS.quantity)
    }));
    while (state.items.length < 2) {
      const above = state.items[state.items.length - 1];
      state.items.push(makeItem(above ? above.unit : defaultUnit()));
    }
    return true;
  }

  // ---------- Rendering ----------

  function rowCard(id) {
    return els.items.querySelector(`[data-id="${id}"]`);
  }

  function setFieldMessage(card, item, field) {
    const message = (state.errors.get(item.id) || {})[field] || null;
    const input = card.querySelector(`[data-field="${field}"]`);
    const messageEl = card.querySelector(`[data-message="${field}"]`);
    if (message) {
      messageEl.textContent = message;
      messageEl.hidden = false;
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', messageEl.id);
    } else {
      messageEl.textContent = '';
      messageEl.hidden = true;
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
    }
  }

  // Labels, placeholders and accessible names that depend on the row's position or name.
  function updateRowLabels(card, item, index) {
    const label = rowLabel(item, index);
    card.setAttribute('aria-label', label);
    // Accessible names keep the visible label and add the row label, e.g. "Price ($), Item 2".
    const names = { name: 'Name (optional)', price: 'Price ($)', quantity: 'Quantity', unit: 'Unit' };
    for (const [field, text] of Object.entries(names)) {
      card.querySelector(`[data-field="${field}"]`).setAttribute('aria-label', `${text}, ${label}`);
    }
    card.querySelector('[data-field="name"]').placeholder = `Item ${index + 1}`;
    card.querySelector('[data-action="remove"]').setAttribute('aria-label', `Remove ${label}`);
  }

  function buildCard(item, index) {
    const card = els.template.content.firstElementChild.cloneNode(true);
    card.dataset.id = String(item.id);

    for (const field of ['name', 'price', 'quantity', 'unit']) {
      const control = card.querySelector(`[data-field="${field}"]`);
      const controlId = `${field}-${item.id}`;
      control.id = controlId;
      control.value = item[field];
      card.querySelector(`[data-for="${field}"]`).htmlFor = controlId;
    }
    for (const field of ['price', 'quantity']) {
      card.querySelector(`[data-message="${field}"]`).id = `${field}-message-${item.id}`;
      setFieldMessage(card, item, field);
    }
    updateRowLabels(card, item, index);
    return card;
  }

  function renderList() {
    const fragment = document.createDocumentFragment();
    state.items.forEach((item, index) => fragment.appendChild(buildCard(item, index)));
    els.items.replaceChildren(fragment);
  }

  function renderSystem() {
    els.systemInputs.forEach((input) => {
      input.checked = input.value === state.system;
    });
  }

  function clearResultDisplay() {
    els.items.querySelectorAll('.card').forEach((card) => {
      card.classList.remove('is-cheapest');
      const result = card.querySelector('[data-result]');
      result.hidden = true;
      card.querySelector('[data-unit-price]').textContent = '';
      const badge = card.querySelector('[data-badge]');
      badge.textContent = '';
      badge.hidden = true;
    });
    els.summary.textContent = '';
    els.note.textContent = '';
  }

  function renderResult() {
    clearResultDisplay();
    if (!state.analysis) return;
    const shown = present(state.analysis, state.items, state.system);
    state.items.forEach((item, index) => {
      const card = rowCard(item.id);
      const row = shown.rows[index];
      if (!card || !row.unitPrice) return;
      card.querySelector('[data-unit-price]').textContent = row.unitPrice;
      card.querySelector('[data-result]').hidden = false;
      if (row.badge) {
        const badge = card.querySelector('[data-badge]');
        badge.textContent = row.badge;
        badge.hidden = false;
        card.classList.add('is-cheapest');
      }
    });
    els.summary.textContent = shown.summary;
    els.note.textContent = shown.note || '';
  }

  // Any edit after a result clears every unit price, badge, summary and note.
  function clearResult() {
    if (!state.showing) return;
    state.analysis = null;
    state.showing = false;
    clearResultDisplay();
  }

  // ---------- Actions ----------

  function findItem(id) {
    return state.items.find((item) => item.id === id);
  }

  function onFieldInput(event) {
    const control = event.target.closest('[data-field]');
    if (!control) return;
    const card = control.closest('.card');
    const id = Number(card.dataset.id);
    const item = findItem(id);
    if (!item) return;
    const field = control.dataset.field;

    item[field] = control.value;
    clearResult();

    if (field === 'price' || field === 'quantity') {
      const errors = state.errors.get(id);
      if (errors && errors[field]) {
        errors[field] = null;
        setFieldMessage(card, item, field);
      }
    }
    if (field === 'name') {
      updateRowLabels(card, item, state.items.indexOf(item));
    }
    save();
  }

  function addItem() {
    const above = state.items[state.items.length - 1];
    const item = makeItem(above ? above.unit : defaultUnit());
    state.items.push(item);
    clearResult();
    els.items.appendChild(buildCard(item, state.items.length - 1));
    save();
  }

  function removeItem(id) {
    const index = state.items.findIndex((item) => item.id === id);
    if (index === -1) return;
    clearResult();
    let focusTarget;
    if (state.items.length > 2) {
      state.items.splice(index, 1);
      state.errors.delete(id);
      renderList();
      const next = state.items[Math.min(index, state.items.length - 1)];
      focusTarget = rowCard(next.id).querySelector('[data-action="remove"]');
    } else {
      const item = state.items[index];
      item.name = '';
      item.price = '';
      item.quantity = '';
      state.errors.delete(id);
      renderList();
      focusTarget = rowCard(id).querySelector('[data-field="name"]');
    }
    save();
    if (focusTarget) focusTarget.focus();
  }

  function compare() {
    const analysis = analyse(state.items);
    state.errors.clear();
    state.items.forEach((item, index) => {
      const errors = analysis.fieldErrors[index];
      if (errors.price || errors.quantity) state.errors.set(item.id, { ...errors });
    });
    state.items.forEach((item) => {
      const card = rowCard(item.id);
      setFieldMessage(card, item, 'price');
      setFieldMessage(card, item, 'quantity');
    });

    state.analysis = analysis;
    state.showing = true;
    // Empty the live region first so the same summary is announced again.
    els.summary.textContent = '';
    els.note.textContent = '';
    renderResult();
    els.summaryArea.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function setSystem(system) {
    if (system !== 'metric' && system !== 'imperial') return;
    state.system = system;
    save();
    // Re-show the same result in the other system at once.
    if (state.showing) renderResult();
  }

  function clearAll() {
    state.items = firstVisitItems();
    state.errors.clear();
    state.analysis = null;
    state.showing = false;
    renderList();
    clearResultDisplay();
    save();
  }

  // ---------- Offline (section 7) ----------

  function registerServiceWorker() {
    // Service workers need HTTPS or localhost; opened from disk the page still works, just not offline.
    if (!('serviceWorker' in navigator) || location.protocol === 'file:') return;
    navigator.serviceWorker.register('./sw.js').catch((error) => {
      console.error('Service worker registration failed:', error);
    });
    navigator.serviceWorker.ready.then(() => {
      els.offline.hidden = false;
    });
  }

  // ---------- Start ----------

  function start() {
    if (!load()) {
      state.system = 'metric';
      state.items = firstVisitItems();
    }
    renderSystem();
    renderList();

    // Text inputs and selects both fire "input" in every supported browser.
    els.items.addEventListener('input', onFieldInput);
    els.items.addEventListener('click', (event) => {
      const button = event.target.closest('[data-action="remove"]');
      if (button) removeItem(Number(button.closest('.card').dataset.id));
    });
    els.add.addEventListener('click', addItem);
    els.compare.addEventListener('click', compare);
    els.clear.addEventListener('click', clearAll);
    els.systemInputs.forEach((input) => {
      input.addEventListener('change', () => {
        if (input.checked) setSystem(input.value);
      });
    });

    registerServiceWorker();
  }

  start();
})();
