import { PRICE_CATEGORIES, FLAVOURS, SIZES_KG, DESIGN_SURCHARGE, LOCATIONS, BRAND } from './config.js';

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function currency(n){
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 2 }).format(n);
}

function computePrice(flavourName, sizeKg, designSelected){
  const flavour = FLAVOURS.find(f => f.name === flavourName);
  if(!flavour) return 0;
  const perKg = PRICE_CATEGORIES[flavour.category];
  let subtotal = perKg * sizeKg;
  if(DESIGN_SURCHARGE.enabled && designSelected){
    if(DESIGN_SURCHARGE.type === 'per_kg'){
      subtotal += DESIGN_SURCHARGE.amount * sizeKg;
    } else {
      subtotal += DESIGN_SURCHARGE.amount;
    }
  }
  return subtotal;
}

function populateOptions(){
  const flavourSel = $('#flavour');
  FLAVOURS.forEach(f => {
    const opt = document.createElement('option');
    opt.value = f.name;
    opt.textContent = f.name;
    flavourSel.appendChild(opt);
  });

  const sizeSel = $('#size');
  SIZES_KG.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s;
    opt.textContent = `${s} kg`;
    sizeSel.appendChild(opt);
  });

  const locSel = $('#location');
  LOCATIONS.forEach(l => {
    const opt = document.createElement('option');
    opt.value = l.phone;
    opt.textContent = l.label;
    locSel.appendChild(opt);
  });

  $('#brand').textContent = BRAND.name;
  $('#policy').innerHTML = BRAND.policyHTML;
  $('#footerBrand').textContent = BRAND.name;

  // Rate table
  const tbody = document.querySelector('#rateTable tbody');
  tbody.innerHTML = '';
  FLAVOURS.forEach(f => {
    const tr = document.createElement('tr');
    const perKg = PRICE_CATEGORIES[f.category];
    tr.innerHTML = `<td>${f.name}</td><td>${f.category}</td><td>$${perKg.toFixed(2)} per kg</td>`;
    tbody.appendChild(tr);
  });
}

function refreshPrice(){
  const flavour = $('#flavour').value;
  const size = parseFloat($('#size').value);
  const design = $('#design').checked;
  const total = computePrice(flavour, size, design);
  $('#price').textContent = currency(total);
  $('#baseInfo').textContent = explainBase(flavour, size, design, total);
}

function explainBase(flavour, size, design, total){
  const f = FLAVOURS.find(x => x.name === flavour);
  const perKg = PRICE_CATEGORIES[f.category];
  const designTxt = (DESIGN_SURCHARGE.enabled && design) ? 
    (DESIGN_SURCHARGE.type === 'per_kg' ? ` + design (${currency(DESIGN_SURCHARGE.amount)} × ${size}kg)`
                                         : ` + design (${currency(DESIGN_SURCHARGE.amount)} flat)`)
    : '';
  return `${flavour}: ${currency(perKg)} per kg × ${size}kg${designTxt} = ${currency(total)}`;
}

function makeWhatsAppLink(){
  const flavour = $('#flavour').value;
  const size = $('#size').value;
  const design = $('#design').checked ? 'Yes' : 'No';
  const pickup = $('#pickup').value.trim();
  const nameOnCake = $('#name').value.trim();
  const phone = $('#location').value;

  const total = $('#price').textContent;
  const msg = `Hello! I'd like to order a cake:%0A• Flavour: ${flavour}%0A• Size: ${size} kg%0A• Design upgrade: ${design}%0A• Name on cake: ${nameOnCake || '-'}%0A• Pickup: ${pickup || '-'}%0A• Quoted price: ${total}%0A%0ASent from ${BRAND.name} price page.`;
  return `https://wa.me/${phone}?text=${msg}`;
}

function bind(){
  $$('#flavour, #size, #design').forEach(el => el.addEventListener('change', refreshPrice));
  $('#pickup').addEventListener('input', refreshPrice);
  $('#name').addEventListener('input', refreshPrice);
  $('#location').addEventListener('change', refreshPrice);

  $('#waBtn').addEventListener('click', (e) => {
    e.preventDefault();
    const url = makeWhatsAppLink();
    window.open(url, '_blank');
  });
}

function init(){
  populateOptions();
  bind();
  refreshPrice();
}
document.addEventListener('DOMContentLoaded', init);
