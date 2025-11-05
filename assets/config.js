// Edit these to change prices/flavours/locations without touching HTML/JS.
// --- PRICING MODEL ---
// Per-kg base price by "category". Any flavour in a category inherits its per-kg price.
// Example: 'standard38' = $38 per kg.
export const PRICE_CATEGORIES = {
  standard38: 38,
  chocolate43: 43,
  premium55: 55
};

// Map each flavour to a category above.
export const FLAVOURS = [
  { name: "Pineapple", category: "standard38" },
  { name: "Black Forest", category: "standard38" },
  { name: "Mango", category: "standard38" },
  { name: "Butterscotch", category: "standard38" },
  { name: "Chocolate", category: "chocolate43" },
  { name: "Mixed Fruit", category: "premium55" },
  { name: "Rasmalai", category: "premium55" }
];

// Which cake sizes (in kg) are selectable.
export const SIZES_KG = [1, 1.5, 2, 3, 4, 5];

// Design surcharge settings
export const DESIGN_SURCHARGE = {
  enabled: true,
  // type = 'flat' (per cake) OR 'per_kg' (multiplied by kg)
  type: 'flat',
  amount: 10 // AUD
};

// WhatsApp shop locations
export const LOCATIONS = [
  { label: "Cranbourne", phone: "61433512231" }, // +61 without leading 0
  { label: "Officer", phone: "61430524526" },
  { label: "Dandenong", phone: "61425888856" }
];

// Brand + policy text
export const BRAND = {
  name: "Nanak Eggless Cakes & Bakery",
  abn: "ABN 00 000 000 000",
  email: "orders@nanakcakes.com",
  policyHTML: `
    <p><strong>Bookings:</strong> Please WhatsApp us with the cake image, size (kg), flavour, pickup date & time, and name on cake (if any).</p>
    <p>For 1 kg cakes, please order at least <strong>1–2 days</strong> in advance. For 2 kg, 3 kg, 4 kg+, please allow <strong>2–3 days</strong>.</p>
    <h3>Cancellation policy</h3>
    <p>We generally require a minimum of 2 days’ notice to cancel or change an order. If notice is under 2 days (or within 24 hours), cancellation may not be possible; depending on circumstances, we may offer a credit or reschedule rather than a refund.</p>
    <p>As everything is hand‑piped and made with love, <em>final results may vary slightly</em> from photos.</p>
  `
};
