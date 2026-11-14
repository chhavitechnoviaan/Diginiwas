# DigiNiwas Explore Property City Text Fix — 13 Nov 2026

Updated: `src/pages/ExploreProperties.jsx`

- `/explore-property` and `/explore-properties` are general discovery routes, not city slugs.
- Location chip and search input placeholder display the chosen/detected city or Ambala when unavailable.
- Result heading now displays e.g. `Buy properties in Ambala` instead of `Buy properties in explore property`.
- City-specific SEO routes still take precedence, e.g. `/jaipur/flats-for-sale`.
- Retained existing city suggestions and Buy/Rent/Residential filters.

This archive retains earlier Property Valuation, Rent Value and Area Converter UI edits.

Run `npm install && npm run build` in `web-frontend` before deployment.
