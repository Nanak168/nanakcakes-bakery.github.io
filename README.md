# Cake Pricing + WhatsApp Orders (Static Site)

A single‑page site that auto‑calculates cake prices by flavour category and size, with optional design surcharge. Customers submit orders via WhatsApp (no online payments).

## Deploy (GitHub Pages)
1. Create a public repo named `<your-username>.github.io`.
2. Upload all files in this folder (keep `index.html` at the repo root).
3. Visit `https://<your-username>.github.io`.

## Customise
- Edit `assets/config.js` to change:
  - flavour list and categories
  - per‑kg rates (`PRICE_CATEGORIES`)
  - sizes (`SIZES_KG`)
  - design surcharge (`DESIGN_SURCHARGE`): choose 'flat' or 'per_kg'
  - WhatsApp location numbers (`LOCATIONS`) — use E.164 format (`614...` for +61 AU without leading zero)
  - brand name + policy text

## Notes
- Price = (per‑kg rate × weight) + (design surcharge per cake or per kg).
- WhatsApp message is prefilled with all details and the quoted price.
