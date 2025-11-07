import { PRICE_CATEGORIES, FLAVOURS, SIZES_KG, LOCATIONS, BRAND } from './config.js';

const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const money = n => new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',maximumFractionDigits:2}).format(n);

let DESIGNS = [];
let currentDesign = null;

async function loadDesigns(){
  const res = await fetch('data/designs.json', {cache:'no-store'});
  DESIGNS = await res.json();
}

function flavourCategory(flavour){
  return (FLAVOURS.find(f=>f.name===flavour)||{}).category;
}
function basePerKgFor(flavour){
  const cat = flavourCategory(flavour);
  return PRICE_CATEGORIES[cat] ?? 0;
}
function computePrice({flavour, kg, surcharge}){
  return basePerKgFor(flavour) * kg + (surcharge||0);
}

function populateSelectors(){
  // Design
  const designSel = $('#design'); designSel.innerHTML='';
  DESIGNS.forEach(d=>{
    const o=document.createElement('option'); o.value=d.slug; o.textContent=d.name; designSel.appendChild(o);
  });
  // keep design from URL if provided
  const wanted = new URLSearchParams(location.search).get('design');
  if (wanted && DESIGNS.some(d=>d.slug===wanted)) designSel.value=wanted;

  currentDesign = DESIGNS.find(d=>d.slug===designSel.value) || DESIGNS[0];

  // Flavour
  const flSel = $('#flavour'); flSel.innerHTML='';
  FLAVOURS.forEach(f=>{ const o=document.createElement('option'); o.value=f.name; o.textContent=f.name; flSel.appendChild(o); });

  // Size
  const sizeSel = $('#size'); sizeSel.innerHTML='';
  SIZES_KG.forEach(s=>{ const o=document.createElement('option'); o.value=s; o.textContent=`${s} kg`; sizeSel.appendChild(o); });

  // Locations
  const locSel = $('#location'); locSel.innerHTML='';
  LOCATIONS.forEach(l=>{ const o=document.createElement('option'); o.value=l.phone; o.textContent=l.label; locSel.appendChild(o); });

  // Brand/policy
  $('#brand').textContent = BRAND.name;
  $('#policy').innerHTML = BRAND.policyHTML;
  $('#footerBrand').textContent = BRAND.name;

  // Rates table
  rebuildRateTable();
  updateDesignInfo();
}

function rebuildRateTable(){
  const tb = $('#rateTable tbody'); tb.innerHTML='';
  FLAVOURS.forEach(f=>{
    const per = basePerKgFor(f.name);
    const tr=document.createElement('tr');
    tr.innerHTML = `<td>${f.name}</td><td>${f.category}</td><td>${money(per)} per kg</td>`;
    tb.appendChild(tr);
  });
}

function updateDesignInfo(){
  if(!currentDesign) return;
  $('#heroImg').src = currentDesign.image;
  $('#heroTitle').textContent = currentDesign.name;
  $('#heroDesc').textContent = currentDesign.description || '';
}

function refreshPrice(){
  const flavour = $('#flavour').value;
  const kg = parseFloat($('#size').value);
  const total = computePrice({flavour, kg, surcharge: currentDesign?.surcharge||0});
  $('#price').textContent = money(total);
  const per = basePerKgFor(flavour);
  $('#baseInfo').textContent = `${flavour}: ${money(per)} × ${kg}kg + design ${money(currentDesign?.surcharge||0)} = ${money(total)}`;
}

function waLink(){
  const flavour=$('#flavour').value, size=$('#size').value, pickup=$('#pickup').value.trim(), name=$('#name').value.trim();
  const phone=$('#location').value, total=$('#price').textContent;
  const msg=`Hello! I'd like to order a cake:
• Design: ${currentDesign?.name}
• Flavour: ${flavour}
• Size: ${size} kg
• Name on cake: ${name||'-'}
• Pickup: ${pickup||'-'}
• Quoted price: ${total}

Sent from ${BRAND.name} price page.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

function bind(){
  $('#design').addEventListener('change', ()=>{
    currentDesign = DESIGNS.find(d=>d.slug===$('#design').value) || DESIGNS[0];
    updateDesignInfo();
    refreshPrice();
    const u = new URL(location.href);
    u.searchParams.set('design', currentDesign.slug);
    history.replaceState({}, '', u);
  });
  $$('#flavour,#size').forEach(el=>el.addEventListener('change', refreshPrice));
  $$('#pickup,#name,#location').forEach(el=>el.addEventListener('input', refreshPrice));
  $('#waBtn').addEventListener('click', e=>{ e.preventDefault(); open(waLink(),'_blank'); });
}

(async function init(){
  await loadDesigns();
  populateSelectors();
  bind();
  refreshPrice();
})();
