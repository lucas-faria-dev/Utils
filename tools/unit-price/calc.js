// Unit Price — calculation rules (build spec sections 5.1 to 5.8).
// Pure functions only. No access to the page, to storage or to the network.
// Loaded as a classic script (not a module) so the page also works when opened
// straight from disk; everything is exposed on one global, UnitPriceCalc.

const UnitPriceCalc = (() => {

  // 5.1 Units. Factors are exact: 1 oz = 453.59237 g / 16, 1 US fl oz = 3785.411784 ml / 128.
  const OZ_IN_G = 28.349523125;
  const FL_OZ_IN_ML = 29.5735295625;

  const UNITS = {
    'g': { kind: 'weight', factor: 1 },
    'oz': { kind: 'weight', factor: OZ_IN_G },
    'ml': { kind: 'volume', factor: 1 },
    'fl oz': { kind: 'volume', factor: FL_OZ_IN_ML },
    'pieces': { kind: 'count', factor: 1 }
  };

  const UNIT_ORDER = ['g', 'oz', 'ml', 'fl oz', 'pieces'];

  const SYSTEMS = ['metric', 'imperial'];

  // 6.3 Exact text used by the calculation results.
  const TEXT = {
    emptyPrice: 'Enter a price',
    emptyQuantity: 'Enter a quantity',
    notANumber: 'Use numbers only, like 4.99',
    notMoreThanZero: 'Must be more than 0',
    notWholePieces: 'Use a whole number of pieces',
    oneComplete: 'Add another item to compare.',
    noneComplete: 'Enter a price and quantity for at least two items.',
    mixedKinds: 'Compare one kind at a time: weight (g, oz), volume (ml, fl oz) or pieces.',
    badgeCheapest: 'Cheapest',
    badgeTie: 'Tie'
  };

  // 5.5 Display multipliers and labels.
  const DISPLAY = {
    metric: {
      weight: { multiplier: 100, label: 'per 100 g' },
      volume: { multiplier: 100, label: 'per 100 ml' },
      count: { multiplier: 1, label: 'per piece' }
    },
    imperial: {
      weight: { multiplier: OZ_IN_G, label: 'per oz' },
      volume: { multiplier: FL_OZ_IN_ML, label: 'per fl oz' },
      count: { multiplier: 1, label: 'per piece' }
    }
  };

  const NUMBER_PATTERN = /^(\d+([.,]\d*)?|[.,]\d+)$/;

  // 5.2 Reading a typed number. Returns { status: 'empty' | 'invalid' | 'ok', value }.
  function parseNumber(text) {
    const trimmed = String(text ?? '').trim();
    if (trimmed === '') return { status: 'empty', value: null };
    if (!NUMBER_PATTERN.test(trimmed)) return { status: 'invalid', value: null };
    return { status: 'ok', value: Number(trimmed.replace(',', '.')) };
  }

  // 5.2 steps 1 to 6 for one field. Returns { value } or { error }.
  function checkField(text, emptyMessage, mustBeWhole) {
    const parsed = parseNumber(text);
    if (parsed.status === 'empty') return { error: emptyMessage };
    if (parsed.status === 'invalid') return { error: TEXT.notANumber };
    if (!(parsed.value > 0)) return { error: TEXT.notMoreThanZero };
    if (mustBeWhole && !Number.isInteger(parsed.value)) return { error: TEXT.notWholePieces };
    return { value: parsed.value };
  }

  // 5.3 A row is started as soon as its name, price or quantity holds any text.
  function isStarted(row) {
    return [row.name, row.price, row.quantity].some((v) => String(v ?? '') !== '');
  }

  // 6.3 A row's label: its name if one is typed, otherwise "Item N" (N starts at 1).
  function rowLabel(row, index) {
    const name = String(row.name ?? '').trim();
    return name !== '' ? name : `Item ${index + 1}`;
  }

  // 5.6 Equality of base prices with a relative tolerance.
  function pricesEqual(a, b) {
    return Math.abs(a - b) <= 1e-9 * Math.max(a, b);
  }

  // 5.7 Round half up after removing binary floating-point noise.
  function formatNumber(value, d) {
    const scale = 10 ** d;
    const rounded = Math.round(Number((value * scale).toPrecision(12))) / scale;
    return rounded.toFixed(d);
  }

  function joinLabels(labels) {
    if (labels.length <= 1) return labels.join('');
    return `${labels.slice(0, -1).join(', ')} and ${labels[labels.length - 1]}`;
  }

  // 5.8 steps 1 to 5, independent of the Metric or Imperial choice.
  // rows: [{ name, price, quantity, unit }]
  // Returns {
  //   fieldErrors: [{ price: string|null, quantity: string|null }] (one per row),
  //   outcome: 'none' | 'mixed' | 'one' | 'compared',
  //   kind, complete: [{ index, basePrice }], cheapest: [index], leftOut: number
  // }
  function analyse(rows) {
    const fieldErrors = rows.map(() => ({ price: null, quantity: null }));
    const complete = [];
    let leftOut = 0;

    rows.forEach((row, index) => {
      if (!isStarted(row)) return;
      const unit = UNITS[row.unit] ? row.unit : 'g';
      const price = checkField(row.price, TEXT.emptyPrice, false);
      const quantity = checkField(row.quantity, TEXT.emptyQuantity, UNITS[unit].kind === 'count');
      if (price.error) fieldErrors[index].price = price.error;
      if (quantity.error) fieldErrors[index].quantity = quantity.error;
      if (price.error || quantity.error) {
        leftOut += 1;
        return;
      }
      complete.push({
        index,
        kind: UNITS[unit].kind,
        basePrice: price.value / (quantity.value * UNITS[unit].factor)
      });
    });

    if (complete.length === 0) {
      return { fieldErrors, outcome: 'none', kind: null, complete: [], cheapest: [], leftOut: 0 };
    }
    const kind = complete[0].kind;
    if (complete.some((c) => c.kind !== kind)) {
      return { fieldErrors, outcome: 'mixed', kind: null, complete: [], cheapest: [], leftOut: 0 };
    }
    if (complete.length === 1) {
      return { fieldErrors, outcome: 'one', kind, complete, cheapest: [], leftOut };
    }
    const lowest = Math.min(...complete.map((c) => c.basePrice));
    const cheapest = complete.filter((c) => pricesEqual(c.basePrice, lowest)).map((c) => c.index);
    return { fieldErrors, outcome: 'compared', kind, complete, cheapest, leftOut };
  }

  // 5.7 Choose the number of decimals once per result: 2, then 3, then 4.
  function chooseDecimals(values) {
    for (let d = 2; d < 4; d += 1) {
      const texts = values.map((v) => formatNumber(v, d));
      let clash = false;
      for (let i = 0; i < values.length && !clash; i += 1) {
        for (let j = i + 1; j < values.length && !clash; j += 1) {
          if (texts[i] === texts[j] && !pricesEqual(values[i], values[j])) clash = true;
        }
      }
      if (!clash) return d;
    }
    return 4;
  }

  // Turn an analysis into the texts to show, for one system ('metric' or 'imperial').
  // Returns {
  //   rows: [{ unitPrice: string|null, badge: string|null }] (one per row),
  //   summary: string, note: string|null, decimals: number|null
  // }
  function present(analysis, rows, system) {
    const out = rows.map(() => ({ unitPrice: null, badge: null }));
    if (analysis.outcome === 'none') {
      return { rows: out, summary: TEXT.noneComplete, note: null, decimals: null };
    }
    if (analysis.outcome === 'mixed') {
      return { rows: out, summary: TEXT.mixedKinds, note: null, decimals: null };
    }

    const display = DISPLAY[system === 'imperial' ? 'imperial' : 'metric'][analysis.kind];
    const values = analysis.complete.map((c) => c.basePrice * display.multiplier);
    const decimals = chooseDecimals(values);
    analysis.complete.forEach((c, k) => {
      out[c.index].unitPrice = `$${formatNumber(values[k], decimals)} ${display.label}`;
    });

    let summary;
    if (analysis.outcome === 'one') {
      summary = TEXT.oneComplete;
    } else {
      const isTie = analysis.cheapest.length > 1;
      analysis.cheapest.forEach((index) => {
        out[index].badge = isTie ? TEXT.badgeTie : TEXT.badgeCheapest;
      });
      const labels = analysis.cheapest.map((index) => rowLabel(rows[index], index));
      const price = out[analysis.cheapest[0]].unitPrice;
      summary = isTie
        ? `Tie for cheapest: ${joinLabels(labels)} at ${price}.`
        : `Cheapest: ${labels[0]} at ${price}.`;
    }

    let note = null;
    if (analysis.leftOut === 1) note = '1 item left out. Check the highlighted fields.';
    else if (analysis.leftOut > 1) note = `${analysis.leftOut} items left out. Check the highlighted fields.`;

    return { rows: out, summary, note, decimals };
  }

  return {
    OZ_IN_G, FL_OZ_IN_ML, UNITS, UNIT_ORDER, SYSTEMS, TEXT,
    parseNumber, isStarted, rowLabel, pricesEqual, formatNumber, analyse, present
  };
})();
