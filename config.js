// config.js
export const PRICE_CATEGORIES = {
  standard38: 38,
  chocolate43: 43,
  premium55: 55
};

export const FLAVOURS = [
  { name: "Pineapple",    category: "standard38" },
  { name: "Black Forest", category: "standard38" },
  { name: "Mango",        category: "standard38" },
  { name: "Butterscotch", category: "standard38" },
  { name: "Chocolate",    category: "chocolate43" },
  { name: "Mixed Fruit",  category: "premium55" },
  { name: "Rasmalai",     category: "premium55" }
];

export const SIZES_KG = [1, 1.5, 2, 3, 4, 5];

export const DESIGN_SURCHARGE = { enabled: true, type: 'flat', amount: 10 };

export const LOCATIONS = [
  { label: "Cranbourne", phone: "61433512231" },
  { label: "Officer",    phone: "61430524526" },
  { label: "Dandenong",  phone: "61425888856" }
];

export const BRAND = {
  name: "Nanak Eggless Cakes & Bakery",
  abn: "ABN 00 000 000 000",
  email: "orders@nanakcakes.com",
  policyHTML: `
    <p><strong>Bookings:</strong> WhatsApp us the cake image, size (kg), flavour, pickup date/time, and name on cake.</p>
    <p>1kg: order <strong>1–2 days</strong> ahead. 2kg–4kg+: <strong>2–3 days</strong>.</p>
    <h3>Cancellation policy</h3>
    <p>Min 2 days’ notice for changes/cancel. <em>Final results may vary slightly.</em></p>
  `
};
