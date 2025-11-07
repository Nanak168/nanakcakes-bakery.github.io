// app.js
import { PRICE_CATEGORIES, FLAVOURS, SIZES_KG, DESIGN_SURCHARGE, LOCATIONS, BRAND } from './config.js';

const $ = (s)=>document.querySelector(s);
const $$ = (s)=>Array.from(document.querySelectorAll(s));
const money = n => new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',maximumFractionDigits:2}).format(n);

function compute(flavourName, kg, design){
  const f = FLAVOURS.find(x=>x.name===flavourName); if(!f) return 0;
  const perKg = PRICE_CATEGORIES[f.category]; let total = perKg * kg;
  if(DESIGN_SURCHARGE.enabled && design){
    total += DESIGN_SURCHARGE.type==='per_kg' ? DESIGN_SURCHARGE.amount*kg : DESIGN_SURCHARGE.amount;
  }
  return total;
}

function populate(){
  const flavourSel = $('#flavour');
  FLAVOURS.forEach(f=>{ const o=document.createElement('option'); o.value=f.name; o.textContent=f.name; flavourSel.appendChild(o); });

  const sizeSel = $('#size');
  SIZES_KG.forEach(s=>{ const o=document.createElement('option'); o.value=s; o.textContent=`${s} kg`; sizeSel.appendChild(o); });

  const locSel = $('#location');
  LOCATIONS.forEach(l=>{ const o=document.createElement('option'); o.value=l.phone; o.textContent=l.label; locSel.appendChild(o); });

  $('#brand').textContent = BRAND.name;
  $('#policy').innerHTML = BRAND.policyHTML;
  $('#footerBrand').textContent = BRAND.name;

  const tbody = document.querySelector('#rateTable tbody'); tbody.innerHTML='';
  FLAVOURS.forEach(f=>{
    const tr=document.createElement('tr');
    const perKg = PRICE_CATEGORIES[f.category];
    tr.innerHTML = `<td>${f.name}</td><td>${f.category}</td><td>$${perKg.toFixed(2)} per kg</td>`;
    tbody.appendChild(tr);
  });
}

function refresh(){
  const flavour = $('#flavour').value;
  const kg = parseFloat($('#size').value);
  const design = $('#design').checked;
  const total = compute(flavour, kg, design);
  $('#price').textContent = money(total);

  const f = FLAVOURS.find(x=>x.name===flavour);
  const perKg = PRICE_CATEGORIES[f.category];
  const designTxt = (DESIGN_SURCHARGE.enabled && design)
    ? (DESIGN_SURCHARGE.type==='per_kg' ? ` + design (${money(DESIGN_SURCHARGE.amount)} × ${kg}kg)` : ` + design (${money(DESIGN_SURCHARGE.amount)} flat)`)
    : '';
  $('#baseInfo').textContent = `${flavour}: ${money(perKg)} per kg × ${kg}kg${designTxt} = ${money(total)}`;
}

function waLink(){
  const flavour=$('#flavour').value, size=$('#size').value, design=$('#design').checked?'Yes':'No';
  const pickup=$('#pickup').value.trim(), name=$('#name').value.trim(), phone=$('#location').value, total=$('#price').textContent;
  const msg=`Hello! I'd like to order a cake:%0A• Flavour: ${flavour}%0A• Size: ${size} kg%0A• Design upgrade: ${design}%0A• Name on cake: ${name||'-'}%0A• Pickup: ${pickup||'-'}%0A• Quoted price: ${total}%0A%0ASent from ${BRAND.name} price page.`;
  return `https://wa.me/${phone}?text=${msg}`;
}

function bind(){
  $$('#flavour,#size,#design').forEach(el=>el.addEventListener('change',refresh));
  $$('#pickup,#name,#location').forEach(el=>el.addEventListener('input',refresh));
  $('#waBtn').addEventListener('click',e=>{ e.preventDefault(); window.open(waLink(),'_blank'); });
}

document.addEventListener('DOMContentLoaded', ()=>{ populate(); bind(); refresh(); });
