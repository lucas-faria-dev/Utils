# Unit Price

A phone-first page that tells a supermarket customer which of two or more items is the cheapest. The customer types each item's price and quantity, picks its unit (g, oz, ml, fl oz or pieces) and taps Compare; the page shows each item's price for the same standard amount (per 100 g, per 100 ml, per oz, per fl oz or per piece) and marks the cheapest. It remembers what was typed, works with no internet after the first load, and can be added to the phone's home screen.

Plain HTML, CSS and JavaScript, no libraries, no build step. Everything typed stays on the device.

## Files

| File | Purpose |
|---|---|
| index.html | The page |
| style.css | Page styles (on top of `../../assets/css/base.css`) |
| calc.js | The calculation rules, as pure functions on the `UnitPriceCalc` global |
| script.js | The screen, storage and service worker registration |
| sw.js | The service worker (offline copy) |
| manifest.webmanifest | Home-screen settings |
| icons/ | App icons (192 px, 512 px and 180 px for iPhone) |
| Test.md | Manual test cases |

## Run it locally

Opening `index.html` straight from disk works for comparing prices. Offline support and home-screen install need a service worker, which needs HTTPS or `http://localhost`. To test those, serve the **whole Utils folder** (the page loads the shared `base.css` from two levels up), for example from the Utils root:

```
npx http-server -p 8000
```

and open http://localhost:8000/tools/unit-price/index.html.

## Release an update

When any file the service worker caches changes, **including `assets/css/base.css`**, change the cache name at the top of sw.js before publishing:

```
const CACHE_NAME = CACHE_PREFIX + 'v1';   // change to 'v2', then 'v3', and so on
```

Without a new cache name, phones keep serving the old files from their offline copy. With it, the new service worker saves the new files and deletes only this tool's old caches (those starting with `unit-price-`), leaving any other tool's caches on the same site alone.

## iPhone notes

- In Safari on iPhone, a site's stored data, including its service worker and offline copy, can be deleted after seven days of Safari use in which the customer did not interact with the site. Web apps added to the home screen are exempt (WebKit, "Full Third-Party Cookie Blocking and More": https://webkit.org/?p=10218).
- A home-screen app keeps its data separate from Safari. After adding the app to the home screen, the customer must open it once from the icon while online (WebKit, "CNAME Cloaking and Bounce Tracking Defense": https://webkit.org/blog/11338/cname-cloaking-and-web-privacy/).
- WebKit published these rules in 2020. Check that they still apply before relying on them.

## Differences from the stand-alone version

1. **Look.** Uses the toolbox's dark theme and design tokens from `base.css` instead of the original white and green. Error text and the cheapest-row highlight use the new `--danger` and `--mark-soft` tokens. Layout, sizes (44 px controls, 16 px input text, 480 px column) and all text are unchanged. The home-screen icons are the original green ones.
2. **Back link.** The shared "Back to toolbox" link sits in the page flow above the heading, rather than fixed in the corner, so it never covers a card when scrolling.
3. **Scripts.** `calc.js` and `script.js` are classic scripts instead of ES modules, so the page works from `file://`. The calculation code itself is unchanged.
4. **Service worker.** Also caches `../../assets/css/base.css`, and on activation deletes only `unit-price-*` caches, because every tool shares one origin.
5. **Manifest.** `start_url` is `./index.html` (the toolbox links to files, not folders), and the theme and background colours match the toolbox.

## Assumptions carried over from the original build

1. **Accessible names.** Each field keeps its visible label ("Price ($)" and so on) and gets an aria-label that adds the row label, for example "Price ($), Item 2" and "Remove Item 2". Each card is a group named after its row label.
2. **Metric or Imperial control.** Two radio buttons ("Show results in" is the group's legend), styled as a two-part switch. Each option is 44 px high.
3. **A name of only spaces.** The row counts as started, but its label falls back to "Item N". Names are trimmed when used as labels.
4. **Field messages after other edits.** A field message only disappears when its own field is edited, so for example "Use a whole number of pieces" stays if only the unit is changed. The next Compare checks every row again.
5. **Remove with two rows** keeps the row's unit; only name, price and quantity are emptied.
6. **Focus after Remove** moves to the next row's Remove button (three or more rows) or to the emptied row's name field (two rows).
7. **Saved data.** If the saved data has the wrong shape or an unknown unit, the page starts in the first-visit state. Fewer than two rows are padded with empty rows (copying the unit above). Saved text longer than the field limits is cut to the limit.
8. **Tie summary price.** The summary shows the unit price text of the first tied row.
9. **Manifest icons** are marked `"purpose": "any maskable"`.
10. **Navigation fallback.** For a page navigation that is not in the cache, the service worker answers with the cached index.html before trying the network.
