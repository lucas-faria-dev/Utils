# Utils

A toolbox of small, browser-based utilities: tools I needed at some point and had the time to publish.

Each tool is a static page made of plain HTML, CSS and JavaScript. There is nothing to install, build or configure, and no data leaves your browser.

## Getting started

Open [`index.html`](index.html) for the welcome page, which lists every tool with a short description and a link.

To use the tools locally, clone the repository and open `index.html` in a browser:

```bash
git clone https://github.com/lucas-faria-dev/Utils.git
cd Utils
# then open index.html in your browser
```

The repository can also be served as-is with GitHub Pages (Settings → Pages → deploy from the `main` branch, root folder).

## Tools

| Tool | Description | Folder |
| --- | --- | --- |
| UTC clock | Live clock showing the current time and date in UTC, the ISO 8601 timestamp, and your device's offset from UTC. | [`tools/utc-clock/`](tools/utc-clock/) |
| Unit Price | Compares items by price per standard amount (per 100 g, 100 ml, oz, fl oz or piece) and marks the cheapest. Works offline and installs to the home screen. | [`tools/unit-price/`](tools/unit-price/) |

## Project structure

```text
Utils/
├── index.html              Welcome page: intro and the list of tools
├── assets/
│   └── css/
│       ├── base.css        Shared: design tokens (colours, fonts), reset, shared components
│       └── home.css        Welcome page only
└── tools/
    ├── utc-clock/          One folder per tool
    │   ├── index.html      Markup
    │   ├── style.css       Tool-specific styles
    │   └── script.js       Tool logic
    └── unit-price/
        ├── index.html, style.css, script.js
        ├── calc.js         Pure calculation rules (no DOM)
        ├── sw.js           Service worker (offline copy)
        ├── manifest.webmanifest, icons/   Home-screen install
        ├── README.md       Tool notes: releasing updates, iPhone caveats
        └── Test.md         Manual test cases
```

### Conventions

- **One folder per tool** under `tools/<tool-name>/`, using lowercase kebab-case names. Each folder holds `index.html`, plus `style.css` and `script.js` when needed.
- **No inline CSS or JS.** Styles go in `.css` files, scripts in `.js` files.
- **Shared styles live in `assets/css/base.css`.** Every page loads it first, then its own stylesheet. Colours, fonts and radii are CSS variables in `:root`. Change them there, not in page files.
- **Classic scripts, not ES modules.** Load scripts with `<script src="..." defer>` so pages also work from `file://`, where browsers block modules.
- **Shared components** in `base.css`: `.back` (the "Back to toolbox" link) and `.button` (primary action).
- **Links point at files** (`.../index.html`, not `.../`), so navigation works both on GitHub Pages and when opening files straight from disk.

## Adding a new tool

1. Copy `tools/utc-clock/` to `tools/<tool-name>/` and replace its content.
2. In the new `index.html`, keep the `base.css` link and the back link:
   ```html
   <link rel="stylesheet" href="../../assets/css/base.css">
   <link rel="stylesheet" href="style.css">
   ...
   <a class="back" href="../../index.html">&larr; Back to toolbox</a>
   ```
3. Add a card for it in the **Tools** list in the root `index.html` (copy the existing `<li class="tool">`).
4. Add a row for it to the **Tools** table in this README.
