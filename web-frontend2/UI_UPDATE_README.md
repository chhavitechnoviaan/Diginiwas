# DigiNiwas Web UI Update — 13 Nov 2026

## Updated pages
- `src/pages/ExploreProperties.jsx`: redesigned single primary search bar, removed its redundant city text input, India-wide prefix city suggestions using installed `country-state-city`, current/detected city label and Ambala fallback, polished header and sticky search area.
- `src/pages/PropertyValuation.jsx`: full responsive two-step property valuation form, DigiNiwas gradient hero, details, input-based calculation with transparent result. No invented market rates.
- `src/pages/RentValueCalculator.jsx`: full responsive rent-income estimator, maintenance and vacancy controls, gross/net annual income, yield and transparent assumptions.

## Notes
- The site's existing geolocation reverse lookup uses public Nominatim; use a rate-limited backend geocoder for heavy production traffic.
- City suggestions come from the `country-state-city` dependency already in package.json; they are not loaded from property inventory.
- Property valuation does not claim verified market prices without a verified market rate input; to offer live auto-valuations, integrate an actual pricing/comparable data API.
- Existing API routes were not changed.
- `*.env`, private credentials, and dependencies are excluded from this deliverable; keep your own deployment config.

## 13 November 2026 — Area Converter UI parity
- Redesigned `src/pages/AreaCalculator.jsx` to match Property Valuation and Rent Value Calculator's emerald/navy gradient hero, mint feature sidebar, white interactive form, and navy result card.
- Preserved existing area conversion factors, units, quick conversion presets, FAQs, copy-result and swap controls.
- Conversion result is instantaneous and the page route remains `/area-calculator`.
- Regional Bigha values are illustrative and must be verified against local standards before legal use.
