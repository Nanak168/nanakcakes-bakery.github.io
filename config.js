// Base per-kg rates (AU$)
export const PRICE_CATEGORIES = {
  standard38: 38,   // Pineapple, Mango, Butterscotch, Black Forest
  chocolate43: 43,  // Chocolate
  premium55: 55     // Mixed Fruit, Rasmalai
};

// Flavours map to categories
export const FLAVOURS = [
  { name: "Pineapple",    category: "standard38" },
  { name: "Black Forest", category: "standard38" },
  { name: "Mango",        category: "standard38" },
  { name: "Butterscotch", category: "standard38" },
  { name: "Chocolate",    category: "chocolate43" },
  { name: "Mixed Fruit",  category: "premium55" },
  { name: "Rasmalai",     category: "premium55" }
];

// Sizes offered
export const SIZES_KG = [1, 1.5, 2, 3, 4, 5];

// Locations / WhatsApp
export const LOCATIONS = [
  { label: "Cranbourne", phone: "61433512231" },
  { label: "Officer",    phone: "61430524526" },
  { label: "Dandenong",  phone: "61425888856" }
];

// Brand / policy
export const BRAND = {
  name: "Nanak Eggless Cakes & Bakery",
  abn: "ABN 00 000 000 000",
  email: "orders@nanakcakes.com",
  policyHTML: `
    <p><strong>Bookings:</strong> WhatsApp us the cake image, size (kg), flavour, pickup date & time, and name on cake.</p>
    <p>For 1kg: order <strong>1–2 days</strong> ahead. For 2kg–4kg+: <strong>2–3 days</strong>.</p>
    <h3>Cancellation policy</h3>
    <p>Minimum 2 days’ notice for changes/cancel. Depending on circumstances we may offer a credit or reschedule rather than a refund. Final results may vary slightly from photos.</p>
  `
};
