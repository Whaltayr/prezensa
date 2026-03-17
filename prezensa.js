/* ══════════════════════════════════════════════════════
   PREZENSA — prezensa.js
   All interactions, animations, cart, filters
   ══════════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

/* ── PRODUCT DATA ──────────────────────────────────── */
const PRODUCTS = [
  {
    name: 'Noir Absolu',
    collection: 'Noir Prestige',
    price: 680,
    ml: '50 ml · Parfum',
    tags: 'Amadeirado · Oriental · Parfum',
    img: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=700&q=85',
    desc_pt: 'Um opaco e misterioso véu de madeiras raras, projetado para o homem que deixa marcas indeléveis — nas salas e nas memórias.',
    desc_en: 'An opaque and mysterious veil of rare woods, designed for the man who leaves indelible marks — in rooms and in memories.',
    top: ['Pimenta Negra', 'Coentro'],
    heart: ['Sândalo', 'Âmbar', 'Tabaco'],
    base: ['Musgo de Carvalho', 'Vetiver', 'Benjoim']
  },
  {
    name: 'Tempest Oak',
    collection: 'Noir Prestige',
    price: 620,
    ml: '50 ml · EDP',
    tags: 'Amadeirado · EDP',
    img: 'https://images.unsplash.com/photo-1541232086319-abe799e6a2c9?w=700&q=85',
    desc_pt: 'A tempestade que antecede a calmaria. Cedro e incenso em camadas que revelam complexidade sem pressa.',
    desc_en: 'The storm before the calm. Cedar and incense in layers that reveal complexity without hurry.',
    top: ['Bergamota', 'Cardamomo'],
    heart: ['Cedro', 'Patchouli', 'Incenso'],
    base: ['Âmbar', 'Baunilha Defumada']
  },
  {
    name: 'Armure Bleue',
    collection: 'Azul Atlântico',
    price: 540,
    ml: '50 ml · EDT',
    tags: 'Aquático · Amadeirado · EDT',
    img: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=700&q=85',
    desc_pt: 'O horizonte infinito captado em vidro. Fresco, elegante e surpreendentemente profundo.',
    desc_en: 'The infinite horizon captured in glass. Fresh, elegant and surprisingly deep.',
    top: ['Neroli', 'Água de Mar'],
    heart: ['Madeira Cinza', 'Íris'],
    base: ['Âmbar', 'Musgo Branco']
  },
  {
    name: 'Bronze Atlas',
    collection: 'Noir Prestige',
    price: 750,
    ml: '50 ml · Parfum',
    tags: 'Oriental · Parfum',
    img: 'https://images.unsplash.com/photo-1547897885-3f1c3b0b1d07?w=700&q=85',
    desc_pt: 'As rotas antigas do oriente em uma única fragrância. Opulento, raro, intransigente.',
    desc_en: 'The ancient routes of the Orient in a single fragrance. Opulent, rare, uncompromising.',
    top: ['Açafrão', 'Rosa'],
    heart: ['Oud', 'Cânfora'],
    base: ['Sândalo', 'Couro', 'Benjoim']
  },
  {
    name: 'Lumière de Soie',
    collection: 'Lumière',
    price: 520,
    ml: '50 ml · EDT',
    tags: 'Floral · Chipré · EDT',
    img: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=700&q=85',
    desc_pt: 'Uma dança etérea de seda e luz matinal. Feminilidade que não precisa se anunciar.',
    desc_en: 'An ethereal dance of silk and morning light. Femininity that needs no announcement.',
    top: ['Bergamota', 'Framboesa'],
    heart: ['Rosa de Maio', 'Pêonia'],
    base: ['Musgo Branco', 'Cedro']
  },
  {
    name: 'Rose Noire',
    collection: 'Lumière Nuit',
    price: 640,
    ml: '50 ml · EDP',
    tags: 'Floral · Oriental · EDP',
    img: 'https://images.unsplash.com/photo-1588776814546-1ffbb090d424?w=700&q=85',
    desc_pt: 'A rosa que floresce depois do por do sol. Intensa, sedutora e completamente inesquecível.',
    desc_en: 'The rose that blooms after sunset. Intense, seductive and completely unforgettable.',
    top: ['Rosa Turca', 'Pimenta Rosa'],
    heart: ['Oud Rosa', 'Sândalo'],
    base: ['Âmbar', 'Patchouli']
  },
  {
    name: "Pétale d'Or",
    collection: 'Lumière',
    price: 480,
    ml: '50 ml · EDT',
    tags: 'Floral · Frutal · EDT',
    img: 'https://images.unsplash.com/photo-1571781565036-d3f759be73e5?w=700&q=85',
    desc_pt: 'Um jardim de verão em movimento. Frescor que persiste delicadamente ao longo do dia.',
    desc_en: 'A summer garden in motion. Freshness that lingers delicately throughout the day.',
    top: ['Pera', 'Néroli'],
    heart: ['Freesia', 'Lily', 'Íris'],
    base: ['Almíscar', 'Cedro']
  },
  {
    name: 'Velours Blanc',
    collection: 'Lumière',
    price: 560,
    ml: '50 ml · EDP',
    tags: 'Floral · Almiscarado · EDP',
    img: 'https://images.unsplash.com/photo-1561069934-eee225952461?w=700&q=85',
    desc_pt: 'Veludo invisível sobre a pele. Uma fragrância que envolve como um abraço quente e inesperado.',
    desc_en: 'Invisible velvet on the skin. A fragrance that wraps like a warm, unexpected embrace.',
    top: ['Bergamota', 'Mandarina'],
    heart: ['Jasmim', 'Ylang-Ylang'],
    base: ['Almíscar Branco', 'Baunilha', 'Sândalo']
  }
];

/* ── STATE ─────────────────────────────────────────── */
let cart = [];
let currentMode = 'gent';
let currentLang = 'pt';
const html = document.documentElement;

/* ══════════════════════════════════════════════════════
   SPLASH
   ══════════════════════════════════════════════════════ */
const splash = document.getElementById('splash');
const splashEnter = document.getElementById('splashEnter');

// Language selection in splash
splash.querySelectorAll('.splash__lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    splash.querySelectorAll('.splash__lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    setLang(btn.dataset.lang);
  });
});

function dismissSplash() {
  splash.classList.add('gone');
  setTimeout(() => { splash.style.display = 'none'; }, 1000);
  startHeroAnimation();
}

splashEnter.addEventListener('click', dismissSplash);

// Auto-dismiss after 5 seconds
setTimeout(dismissSplash, 5000);

/* ══════════════════════════════════════════════════════
   HERO GSAP ENTRANCE
   ══════════════════════════════════════════════════════ */
function startHeroAnimation() {
  const tl = gsap.timeline({ delay: 0.2 });
  tl.to('.hero__label',  { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0 })
    .to('.hero__title',  { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.3')
    .to('.hero__sub',    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.6')
    .to('.btn-lux',      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');

  // Parallax
  gsap.to('.hero__img', {
    yPercent: 15,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
  });
}

/* ══════════════════════════════════════════════════════
   NAV
   ══════════════════════════════════════════════════════ */
const nav = document.getElementById('nav');
ScrollTrigger.create({
  start: '80px top',
  onEnter:    () => nav.classList.add('scrolled'),
  onLeaveBack: () => nav.classList.remove('scrolled')
});

// Mobile nav
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');
navToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
navMenu.querySelectorAll('.nav__link').forEach(l => l.addEventListener('click', () => {
  navMenu.classList.remove('open');
  navToggle.classList.remove('open');
  document.body.style.overflow = '';
}));

/* ══════════════════════════════════════════════════════
   MODE TOGGLE
   ══════════════════════════════════════════════════════ */
// Create veil element
const veil = document.createElement('div');
veil.className = 'mode-transition-veil';
document.body.appendChild(veil);

function setMode(mode) {
  if (mode === currentMode) return;
  currentMode = mode;

  // Flash veil
  veil.classList.add('flash');
  setTimeout(() => {
    html.setAttribute('data-mode', mode);
    updateFeaturedForMode(mode);
    filterProducts();
    veil.classList.remove('flash');
  }, 280);

  // Update toggle buttons
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
}

document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => setMode(btn.dataset.mode));
});

function updateFeaturedForMode(mode) {
  const gEntEls = document.querySelectorAll('[class*="--gent"]');
  const ladyEls = document.querySelectorAll('[class*="--lady"]');
  gEntEls.forEach(el => el.style.display = mode === 'gent' ? '' : 'none');
  ladyEls.forEach(el => el.style.display = mode === 'lady' ? '' : 'none');

  const featuredImg = document.getElementById('featuredImg');
  if (featuredImg) {
    featuredImg.src = mode === 'gent'
      ? 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=900&q=85'
      : 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=900&q=85';
  }
}

/* ══════════════════════════════════════════════════════
   LANGUAGE TOGGLE
   ══════════════════════════════════════════════════════ */
const langToggle  = document.getElementById('langToggle');
const langLabel   = document.getElementById('langLabel');

function setLang(lang) {
  currentLang = lang;
  html.setAttribute('data-lang', lang);
  langLabel.textContent = lang.toUpperCase();

  // Sync footer lang buttons
  document.querySelectorAll('.footer__lang-btn').forEach(btn => {
    btn.style.color = btn.dataset.lang === lang ? 'var(--accent)' : '';
  });
}

langToggle.addEventListener('click', () => {
  setLang(currentLang === 'pt' ? 'en' : 'pt');
});

document.querySelectorAll('.footer__lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

/* ══════════════════════════════════════════════════════
   FILTERS
   ══════════════════════════════════════════════════════ */
let activeFilters = { familia: 'all', ocasiao: 'all', intensidade: 'all' };

document.querySelectorAll('.filter-pills').forEach(group => {
  group.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
      group.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const g = group.dataset.group;
      activeFilters[g] = pill.dataset.val;
      filterProducts();
    });
  });
});

function filterProducts() {
  const items = document.querySelectorAll('.prod-card');
  const { familia, ocasiao, intensidade } = activeFilters;

  items.forEach((item, i) => {
    const itemGender     = item.dataset.gender || 'all';
    const itemFamilia    = item.dataset.familia || '';
    const itemOcasiao    = item.dataset.ocasiao || '';
    const itemIntens     = item.dataset.intensidade || '';

    const modeOk    = currentMode === 'all' || itemGender === currentMode;
    const famOk     = familia === 'all' || itemFamilia.includes(familia);
    const ocaOk     = ocasiao === 'all' || itemOcasiao.includes(ocasiao);
    const intOk     = intensidade === 'all' || itemIntens.includes(intensidade);

    const visible = modeOk && famOk && ocaOk && intOk;

    if (visible) {
      item.classList.remove('hidden');
      gsap.fromTo(item,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, delay: i * 0.04, ease: 'power2.out' }
      );
    } else {
      gsap.to(item, { opacity: 0, y: -8, duration: 0.2, ease: 'power1.in',
        onComplete: () => item.classList.add('hidden') });
    }
  });
}

// Initial filter to show only current mode's products
filterProducts();

/* ══════════════════════════════════════════════════════
   CART
   ══════════════════════════════════════════════════════ */
const cartTrigger  = document.getElementById('cartTrigger');
const cartOverlay  = document.getElementById('cartOverlay');
const sideCart     = document.getElementById('sideCart');
const cartClose    = document.getElementById('cartClose');
const cartItems    = document.getElementById('cartItems');
const cartEmpty    = document.getElementById('cartEmpty');
const cartFooter   = document.getElementById('cartFooter');
const cartCountEl  = document.getElementById('cartCount');
const cartTotalEl  = document.getElementById('cartTotal');

function openCart() {
  sideCart.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  sideCart.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

cartTrigger.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

function addToCart(name, price) {
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price: parseInt(price), qty: 1 });
  }
  renderCart();
  openCart();

  // Bounce cart icon
  gsap.to(cartTrigger, { scale: 1.25, duration: 0.15, yoyo: true, repeat: 1, ease: 'power1.out' });
}

function removeFromCart(name) {
  cart = cart.filter(i => i.name !== name);
  renderCart();
}

function renderCart() {
  // Remove old items (not empty message)
  cartItems.querySelectorAll('.cart-item').forEach(el => el.remove());

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  cartEmpty.style.display = cart.length === 0 ? 'flex' : 'none';
  cartFooter.style.display = cart.length === 0 ? 'none' : 'flex';

  // Count badge
  cartCountEl.textContent = count;
  cartCountEl.classList.toggle('visible', count > 0);

  // Render items
  cart.forEach(item => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <div>
        <div class="cart-item__name">${item.name}</div>
        <div class="cart-item__price">R$ ${item.price.toLocaleString('pt-BR')} ${item.qty > 1 ? '× ' + item.qty : ''}</div>
      </div>
      <button class="cart-item__remove" data-name="${item.name}">
        <span class="txt-pt">Remover</span>
        <span class="txt-en">Remove</span>
      </button>
    `;
    el.querySelector('.cart-item__remove').addEventListener('click', () => removeFromCart(item.name));
    cartItems.appendChild(el);
    gsap.from(el, { opacity: 0, x: 20, duration: 0.3, ease: 'power2.out' });
  });

  cartTotalEl.textContent = 'R$ ' + total.toLocaleString('pt-BR');
}

// Add to cart buttons in grid
document.querySelectorAll('.add-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    addToCart(btn.dataset.name, btn.dataset.price);
    btn.classList.add('added');
    setTimeout(() => btn.classList.remove('added'), 1200);
  });
});

// Featured add button
document.getElementById('featuredAdd')?.addEventListener('click', () => {
  const btn = document.getElementById('featuredAdd');
  const name  = currentMode === 'gent' ? btn.dataset.nameGent  : btn.dataset.nameLady;
  const price = currentMode === 'gent' ? btn.dataset.priceGent : btn.dataset.priceLady;
  addToCart(name, price);
});

/* ── WhatsApp Checkout ───────────────────────────── */
document.getElementById('whatsappCheckout')?.addEventListener('click', () => {
  if (cart.length === 0) return;
  const lang = currentLang;
  const items = cart.map(i => `• ${i.name} (${i.qty}×) — R$ ${(i.price * i.qty).toLocaleString('pt-BR')}`).join('\n');
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const msgPt = `Olá! Gostaria de encomendar os seguintes itens da vitrine Prezensa:\n\n${items}\n\n*Total: R$ ${total.toLocaleString('pt-BR')}*\n\nPoderia me orientar sobre a entrega e disponibilidade?`;
  const msgEn = `Hello! I'd like to order the following items from the Prezensa showcase:\n\n${items}\n\n*Total: R$ ${total.toLocaleString('pt-BR')}*\n\nCould you advise me on delivery and availability?`;

  const msg = lang === 'pt' ? msgPt : msgEn;
  window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(msg)}`, '_blank');
});

/* ══════════════════════════════════════════════════════
   OLFACTORY PYRAMID MODAL
   ══════════════════════════════════════════════════════ */
const pyramidOverlay = document.getElementById('pyramidOverlay');
const pyramidClose   = document.getElementById('pyramidClose');

function openPyramid(index) {
  const p = PRODUCTS[index];
  if (!p) return;

  const lang = currentLang;
  document.getElementById('pyramidImg').src   = p.img;
  document.getElementById('pyramidImg').alt   = p.name;
  document.getElementById('pyramidLabel').textContent = p.collection;
  document.getElementById('pyramidName').textContent  = p.name;
  document.getElementById('pyramidDesc').textContent  = lang === 'pt' ? p.desc_pt : p.desc_en;
  document.getElementById('pyramidPrice').textContent = `R$ ${p.price.toLocaleString('pt-BR')}`;

  // Fill note spans
  ['pyramidTop', 'pyramidHeart', 'pyramidBase'].forEach((id, ti) => {
    const notes = [p.top, p.heart, p.base][ti];
    const el = document.getElementById(id);
    el.innerHTML = notes.map(n => `<span>${n}</span>`).join('');
  });

  // Add button
  const addBtn = document.getElementById('pyramidAddBtn');
  addBtn.onclick = () => {
    addToCart(p.name, p.price);
    closePyramid();
  };

  // Animate tiers
  pyramidOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    gsap.from('.pyramid-tier', { opacity: 0, x: -20, stagger: 0.12, duration: 0.45, ease: 'power2.out' });
  }, 300);
}

function closePyramid() {
  pyramidOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

pyramidClose.addEventListener('click', closePyramid);
pyramidOverlay.addEventListener('click', e => { if (e.target === pyramidOverlay) closePyramid(); });

document.querySelectorAll('.prod-card__detail-btn').forEach(btn => {
  btn.addEventListener('click', () => openPyramid(parseInt(btn.dataset.product)));
});

/* ══════════════════════════════════════════════════════
   SCROLL ANIMATIONS
   ══════════════════════════════════════════════════════ */
function reveal(selector, opts = {}) {
  const defaults = { opacity: 0, y: 30, duration: 0.75, ease: 'power2.out' };
  document.querySelectorAll(selector).forEach((el, i) => {
    gsap.from(el, {
      ...defaults,
      ...opts,
      delay: (opts.staggerDelay || 0) * i,
      scrollTrigger: { trigger: el, start: 'top 86%', once: true }
    });
  });
}

// Featured section
gsap.from('.featured__visual', {
  opacity: 0, x: -60, duration: 1, ease: 'power3.out',
  scrollTrigger: { trigger: '.featured__layout', start: 'top 78%', once: true }
});
gsap.from('.featured__info > *', {
  opacity: 0, y: 24, stagger: 0.1, duration: 0.65, ease: 'power2.out',
  scrollTrigger: { trigger: '.featured__info', start: 'top 80%', once: true }
});

// Product cards
gsap.from('.prod-card', {
  opacity: 0, y: 40, stagger: 0.08, duration: 0.6, ease: 'power2.out',
  scrollTrigger: { trigger: '.products-grid', start: 'top 82%', once: true }
});

// Arte pillars
gsap.from('.arte__pillar', {
  opacity: 0, y: 30, stagger: 0.15, duration: 0.65, ease: 'power2.out',
  scrollTrigger: { trigger: '.arte__pillars', start: 'top 83%', once: true }
});
gsap.from('.arte__content > *:not(.arte__pillars)', {
  opacity: 0, y: 20, stagger: 0.1, duration: 0.65, ease: 'power2.out',
  scrollTrigger: { trigger: '.arte__content', start: 'top 80%', once: true }
});

// Contact
gsap.from('.contato__info > *', {
  opacity: 0, x: -30, stagger: 0.1, duration: 0.65, ease: 'power2.out',
  scrollTrigger: { trigger: '.contato__info', start: 'top 80%', once: true }
});
gsap.from('.contato__form > *', {
  opacity: 0, y: 20, stagger: 0.08, duration: 0.55, ease: 'power2.out',
  scrollTrigger: { trigger: '.contato__form', start: 'top 80%', once: true }
});

/* ══════════════════════════════════════════════════════
   MICRO-INTERACTIONS
   ══════════════════════════════════════════════════════ */
// Bottle hover 3D tilt
document.querySelectorAll('.prod-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    gsap.to(card, { rotateY: x * 6, rotateX: -y * 4, transformPerspective: 800, duration: 0.5, ease: 'power1.out' });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'elastic.out(1,0.7)' });
  });
});

// Featured image cursor scale
const featImg = document.querySelector('.featured__visual');
if (featImg) {
  featImg.addEventListener('mousemove', e => {
    const r = featImg.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    gsap.to(featImg, { rotateY: x * 4, rotateX: -y * 3, transformPerspective: 1000, duration: 0.6, ease: 'power1.out' });
  });
  featImg.addEventListener('mouseleave', () => {
    gsap.to(featImg, { rotateY: 0, rotateX: 0, duration: 0.7, ease: 'elastic.out(1,0.6)' });
  });
}

/* ══════════════════════════════════════════════════════
   SMOOTH SCROLL + NAV OFFSET
   ══════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = nav.offsetHeight + 20;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ══════════════════════════════════════════════════════
   CONTACT FORM
   ══════════════════════════════════════════════════════ */
document.getElementById('contatoForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const nome  = document.getElementById('cNome').value;
  const email = document.getElementById('cEmail').value;
  const msg   = document.getElementById('cMsg').value;

  const wMsg = currentLang === 'pt'
    ? `Olá! Sou *${nome}* (${email}).\n\n${msg}`
    : `Hello! I'm *${nome}* (${email}).\n\n${msg}`;

  window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(wMsg)}`, '_blank');

  const btn = e.target.querySelector('.btn-lux');
  const orig = btn.innerHTML;
  btn.innerHTML = currentLang === 'pt' ? '✓ Mensagem enviada!' : '✓ Message sent!';
  setTimeout(() => { btn.innerHTML = orig; }, 3000);
});

/* ══════════════════════════════════════════════════════
   FOOTER ACCENT LINE ANIMATION
   ══════════════════════════════════════════════════════ */
gsap.from('.footer__top', {
  opacity: 0, y: 30, duration: 0.85, ease: 'power2.out',
  scrollTrigger: { trigger: '.footer__top', start: 'top 88%', once: true }
});

/* ── Initial setup ──────────────────────────────── */
// Set default mode visibility (gent shows, lady hidden)
updateFeaturedForMode('gent');
renderCart();
