/* ══════════════════════════════════════════════════════
   PREZENSA — prezensa.js  (full rewrite)
   ══════════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────
   PRODUCT DATA
───────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    name: 'Noir Absolu',
    collection: 'Noir Prestige',
    price: 680,
    ml: '50 ml · Parfum',
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
    img: 'https://images.unsplash.com/photo-1561069934-eee225952461?w=700&q=85',
    desc_pt: 'Veludo invisível sobre a pele. Uma fragrância que envolve como um abraço quente e inesperado.',
    desc_en: 'Invisible velvet on the skin. A fragrance that wraps like a warm, unexpected embrace.',
    top: ['Bergamota', 'Mandarina'],
    heart: ['Jasmim', 'Ylang-Ylang'],
    base: ['Almíscar Branco', 'Baunilha', 'Sândalo']
  }
];

/* ─────────────────────────────────────────────────────
   SHARED STATE
───────────────────────────────────────────────────── */
let cart        = [];
let currentMode = 'gent';
let currentLang = 'pt';
const html      = document.documentElement;

/* ═══════════════════════════════════════════════════════
   SPLASH
═══════════════════════════════════════════════════════ */
const splash      = document.getElementById('splash');
const splashEnter = document.getElementById('splashEnter');

splash.querySelectorAll('.splash__lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    splash.querySelectorAll('.splash__lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    setLang(btn.dataset.lang);
  });
});

function dismissSplash() {
  splash.classList.add('gone');
  setTimeout(() => { splash.style.display = 'none'; }, 900);
  initHero();
}

splashEnter.addEventListener('click', dismissSplash);
setTimeout(dismissSplash, 5000);

/* ═══════════════════════════════════════════════════════
   HERO ENTRANCE
   Uses gsap.set() to establish the "from" state only when
   called, then gsap.to() to animate to the natural state.
   This way no element is hidden until dismissSplash fires.
═══════════════════════════════════════════════════════ */
function initHero() {
  // Set the start states right now, just before animating
  gsap.set(['.hero__label', '.hero__title', '.hero__sub', '.hero__cta-btn'], {
    opacity: 0,
    y: 24,
  });

  const tl = gsap.timeline({ delay: 0.15 });
  tl.to('.hero__label',   { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' })
    .to('.hero__title',   { opacity: 1, y: 0, duration: 0.95, ease: 'power3.out' }, '-=0.35')
    .to('.hero__sub',     { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }, '-=0.55')
    .to('.hero__cta-btn', { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '-=0.4');

  // Parallax — only on the hero image, safe to run anytime
  gsap.to('.hero__img', {
    yPercent: 18,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    },
  });
}

/* ═══════════════════════════════════════════════════════
   SCROLL-REVEAL HELPER
   Uses gsap.fromTo() + immediateRender:false so the "from"
   state is never applied until the trigger actually fires.
   Elements stay fully visible in their CSS default state
   until that moment — no premature hiding.
═══════════════════════════════════════════════════════ */
function scrollReveal(targets, fromVars, toVars, triggerEl, startPos = 'top 84%') {
  const elements = typeof targets === 'string'
    ? document.querySelectorAll(targets)
    : [targets];

  if (!elements.length) return;

  // Decide trigger: use passed element, or first matched element
  const trigger = triggerEl || elements[0];

  gsap.fromTo(
    elements,
    { ...fromVars, immediateRender: false },
    {
      ...toVars,
      scrollTrigger: {
        trigger,
        start: startPos,
        once: true,
      },
    }
  );
}

/* ─────────────────────────────────────────────────────
   SECTION SCROLL ANIMATIONS
   All registered after DOM is ready. Each call is explicit
   about its own trigger so nothing bleeds into another.
───────────────────────────────────────────────────── */
function initScrollAnimations() {

  // ── FEATURED ──────────────────────────────────────
  scrollReveal(
    '.featured__visual',
    { opacity: 0, x: -50 },
    { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
    '.featured__layout', 'top 80%'
  );

  document.querySelectorAll('.featured__info > *').forEach((el, i) => {
    scrollReveal(
      el,
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.6, delay: i * 0.09, ease: 'power2.out' },
      '.featured__info', 'top 82%'
    );
  });

  // ── ARTE ──────────────────────────────────────────
  document.querySelectorAll('.arte__content > *:not(.arte__pillars)').forEach((el, i) => {
    scrollReveal(
      el,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power2.out' },
      '.arte__content', 'top 82%'
    );
  });

  document.querySelectorAll('.arte__pillar').forEach((el, i) => {
    scrollReveal(
      el,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.65, delay: i * 0.13, ease: 'power2.out' },
      '.arte__pillars', 'top 84%'
    );
  });

  // ── CONTACT ───────────────────────────────────────
  document.querySelectorAll('.contato__info > *').forEach((el, i) => {
    scrollReveal(
      el,
      { opacity: 0, x: -28 },
      { opacity: 1, x: 0, duration: 0.6, delay: i * 0.1, ease: 'power2.out' },
      '.contato__info', 'top 82%'
    );
  });

  document.querySelectorAll('.contato__form .form-field, .contato__form .btn-lux').forEach((el, i) => {
    scrollReveal(
      el,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.5, delay: i * 0.08, ease: 'power2.out' },
      '.contato__form', 'top 82%'
    );
  });

  // ── FOOTER ────────────────────────────────────────
  scrollReveal(
    '.footer__top',
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
    '.footer__top', 'top 90%'
  );
}

/* ─────────────────────────────────────────────────────
   PRODUCT CARD ANIMATIONS
   Completely separate from ScrollTrigger so filters never
   break them. animateCards() is called:
   1. Once on initial page load (after a short delay so the
      section has rendered and is in a stable state)
   2. Every time a filter changes (only on visible cards)
───────────────────────────────────────────────────── */
function animateCards(visibleCards) {
  // Kill any in-progress tweens on these cards first
  visibleCards.forEach(card => gsap.killTweensOf(card));

  gsap.fromTo(
    visibleCards,
    { opacity: 0, y: 32, scale: 0.97 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.55,
      stagger: 0.07,
      ease: 'power2.out',
      immediateRender: false,
      clearProps: 'transform', // clean up after so hover tilt works
    }
  );
}

function initProductCards() {
  // Use a small timeout so all layout/CSS is fully painted
  setTimeout(() => {
    const visible = Array.from(document.querySelectorAll('.prod-card:not(.hidden)'));
    if (visible.length) animateCards(visible);
  }, 120);
}

/* ═══════════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════════ */
const nav = document.getElementById('nav');

ScrollTrigger.create({
  start: '80px top',
  onEnter:     () => nav.classList.add('scrolled'),
  onLeaveBack: () => nav.classList.remove('scrolled'),
});

const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

navMenu.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ═══════════════════════════════════════════════════════
   MODE TOGGLE
═══════════════════════════════════════════════════════ */
const veil = document.createElement('div');
veil.className = 'mode-transition-veil';
document.body.appendChild(veil);

function setMode(mode) {
  if (mode === currentMode) return;
  currentMode = mode;

  veil.classList.add('flash');
  setTimeout(() => {
    html.setAttribute('data-mode', mode);
    syncFeaturedVisibility(mode);
    applyFilters(); // re-filter and re-animate cards for new mode
    veil.classList.remove('flash');
  }, 270);

  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
}

document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => setMode(btn.dataset.mode));
});

function syncFeaturedVisibility(mode) {
  // Swap featured section content
  document.querySelectorAll('[class*="--gent"]').forEach(el => {
    el.style.display = mode === 'gent' ? '' : 'none';
  });
  document.querySelectorAll('[class*="--lady"]').forEach(el => {
    el.style.display = mode === 'lady' ? '' : 'none';
  });

  const featuredImg = document.getElementById('featuredImg');
  if (featuredImg) {
    featuredImg.src = mode === 'gent'
      ? 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=900&q=85'
      : 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=900&q=85';
  }
}

/* ═══════════════════════════════════════════════════════
   LANGUAGE TOGGLE
═══════════════════════════════════════════════════════ */
const langToggle = document.getElementById('langToggle');
const langLabel  = document.getElementById('langLabel');

function setLang(lang) {
  currentLang = lang;
  html.setAttribute('data-lang', lang);
  langLabel.textContent = lang.toUpperCase();

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

/* ═══════════════════════════════════════════════════════
   FILTERS
═══════════════════════════════════════════════════════ */
let activeFilters = { familia: 'all', ocasiao: 'all', intensidade: 'all' };

document.querySelectorAll('.filter-pills').forEach(group => {
  group.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
      group.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilters[group.dataset.group] = pill.dataset.val;
      applyFilters();
    });
  });
});

function applyFilters() {
  const { familia, ocasiao, intensidade } = activeFilters;
  const allCards = document.querySelectorAll('.prod-card');
  const toShow   = [];
  const toHide   = [];

  allCards.forEach(card => {
    const genderMatch = card.dataset.gender === currentMode;
    const famMatch    = familia    === 'all' || (card.dataset.familia    || '').includes(familia);
    const ocaMatch    = ocasiao    === 'all' || (card.dataset.ocasiao    || '').includes(ocasiao);
    const intMatch    = intensidade === 'all' || (card.dataset.intensidade || '').includes(intensidade);

    if (genderMatch && famMatch && ocaMatch && intMatch) {
      toShow.push(card);
    } else {
      toHide.push(card);
    }
  });

  // Instantly hide non-matching cards
  toHide.forEach(card => {
    gsap.killTweensOf(card);
    gsap.set(card, { opacity: 0 });
    card.classList.add('hidden');
  });

  // Reveal matching cards with staggered entrance
  toShow.forEach(card => card.classList.remove('hidden'));
  if (toShow.length) animateCards(toShow);
}

/* ═══════════════════════════════════════════════════════
   CART
═══════════════════════════════════════════════════════ */
const cartTrigger = document.getElementById('cartTrigger');
const cartOverlay = document.getElementById('cartOverlay');
const sideCart    = document.getElementById('sideCart');
const cartClose   = document.getElementById('cartClose');
const cartItems   = document.getElementById('cartItems');
const cartEmpty   = document.getElementById('cartEmpty');
const cartFooter  = document.getElementById('cartFooter');
const cartCountEl = document.getElementById('cartCount');
const cartTotalEl = document.getElementById('cartTotal');

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

  // Bounce the cart icon
  gsap.fromTo(cartTrigger,
    { scale: 1 },
    { scale: 1.28, duration: 0.14, yoyo: true, repeat: 1, ease: 'power1.out' }
  );
}

function removeFromCart(name) {
  cart = cart.filter(i => i.name !== name);
  renderCart();
}

function renderCart() {
  // Clear previous items (keep the empty-state element)
  cartItems.querySelectorAll('.cart-item').forEach(el => el.remove());

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  cartEmpty.style.display = cart.length === 0 ? 'flex' : 'none';
  cartFooter.style.display = cart.length === 0 ? 'none' : 'flex';

  cartCountEl.textContent = count;
  cartCountEl.classList.toggle('visible', count > 0);

  cart.forEach(item => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <div>
        <div class="cart-item__name">${item.name}</div>
        <div class="cart-item__price">R$ ${item.price.toLocaleString('pt-BR')}${item.qty > 1 ? ' × ' + item.qty : ''}</div>
      </div>
      <button class="cart-item__remove" data-name="${item.name}">
        <span class="txt-pt">Remover</span>
        <span class="txt-en">Remove</span>
      </button>
    `;
    el.querySelector('.cart-item__remove').addEventListener('click', () => removeFromCart(item.name));
    cartItems.appendChild(el);
    gsap.fromTo(el,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out', immediateRender: false }
    );
  });

  cartTotalEl.textContent = 'R$ ' + total.toLocaleString('pt-BR');
}

// Grid add buttons
document.querySelectorAll('.add-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    addToCart(btn.dataset.name, btn.dataset.price);
    btn.classList.add('added');
    setTimeout(() => btn.classList.remove('added'), 1200);
  });
});

// Featured add button
document.getElementById('featuredAdd')?.addEventListener('click', () => {
  const btn   = document.getElementById('featuredAdd');
  const name  = currentMode === 'gent' ? btn.dataset.nameGent  : btn.dataset.nameLady;
  const price = currentMode === 'gent' ? btn.dataset.priceGent : btn.dataset.priceLady;
  addToCart(name, price);
});

// WhatsApp checkout
document.getElementById('whatsappCheckout')?.addEventListener('click', () => {
  if (!cart.length) return;
  const lines = cart.map(i =>
    `• ${i.name} (${i.qty}×) — R$ ${(i.price * i.qty).toLocaleString('pt-BR')}`
  ).join('\n');
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const msg = currentLang === 'pt'
    ? `Olá! Gostaria de encomendar os seguintes itens da vitrine Prezensa:\n\n${lines}\n\n*Total: R$ ${total.toLocaleString('pt-BR')}*\n\nPoderia me orientar sobre a entrega e disponibilidade?`
    : `Hello! I'd like to order the following items from the Prezensa showcase:\n\n${lines}\n\n*Total: R$ ${total.toLocaleString('pt-BR')}*\n\nCould you advise me on delivery and availability?`;

  window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(msg)}`, '_blank');
});

/* ═══════════════════════════════════════════════════════
   OLFACTORY PYRAMID MODAL
═══════════════════════════════════════════════════════ */
const pyramidOverlay = document.getElementById('pyramidOverlay');
const pyramidClose   = document.getElementById('pyramidClose');

function openPyramid(index) {
  const p = PRODUCTS[index];
  if (!p) return;

  document.getElementById('pyramidImg').src              = p.img;
  document.getElementById('pyramidImg').alt              = p.name;
  document.getElementById('pyramidLabel').textContent    = p.collection;
  document.getElementById('pyramidName').textContent     = p.name;
  document.getElementById('pyramidDesc').textContent     = currentLang === 'pt' ? p.desc_pt : p.desc_en;
  document.getElementById('pyramidPrice').textContent    = `R$ ${p.price.toLocaleString('pt-BR')}`;

  ['pyramidTop', 'pyramidHeart', 'pyramidBase'].forEach((id, i) => {
    document.getElementById(id).innerHTML =
      [p.top, p.heart, p.base][i].map(n => `<span>${n}</span>`).join('');
  });

  document.getElementById('pyramidAddBtn').onclick = () => {
    addToCart(p.name, p.price);
    closePyramid();
  };

  pyramidOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Animate tiers into view — safe inside a timeout so the
  // modal is visible before GSAP reads their positions
  setTimeout(() => {
    gsap.fromTo('.pyramid-tier',
      { opacity: 0, x: -18, immediateRender: false },
      { opacity: 1, x: 0, stagger: 0.11, duration: 0.4, ease: 'power2.out' }
    );
  }, 280);
}

function closePyramid() {
  pyramidOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

pyramidClose.addEventListener('click', closePyramid);
pyramidOverlay.addEventListener('click', e => {
  if (e.target === pyramidOverlay) closePyramid();
});

document.querySelectorAll('.prod-card__detail-btn').forEach(btn => {
  btn.addEventListener('click', () => openPyramid(parseInt(btn.dataset.product)));
});

/* ═══════════════════════════════════════════════════════
   MICRO-INTERACTIONS — 3D tilt on cards
═══════════════════════════════════════════════════════ */
document.querySelectorAll('.prod-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    gsap.to(card, {
      rotateY: x * 6,
      rotateX: -y * 4,
      transformPerspective: 800,
      duration: 0.45,
      ease: 'power1.out',
      overwrite: 'auto',
    });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.55,
      ease: 'elastic.out(1, 0.6)',
      overwrite: 'auto',
    });
  });
});

// Featured image tilt
const featVisual = document.querySelector('.featured__visual');
if (featVisual) {
  featVisual.addEventListener('mousemove', e => {
    const r = featVisual.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    gsap.to(featVisual, { rotateY: x * 4, rotateX: -y * 3, transformPerspective: 1000, duration: 0.55, ease: 'power1.out', overwrite: 'auto' });
  });
  featVisual.addEventListener('mouseleave', () => {
    gsap.to(featVisual, { rotateY: 0, rotateX: 0, duration: 0.65, ease: 'elastic.out(1, 0.6)', overwrite: 'auto' });
  });
}

/* ═══════════════════════════════════════════════════════
   SMOOTH SCROLL (nav offset aware)
═══════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - (nav.offsetHeight + 20);
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ═══════════════════════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════════════════════ */
document.getElementById('contatoForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const nome  = document.getElementById('cNome').value;
  const email = document.getElementById('cEmail').value;
  const msg   = document.getElementById('cMsg').value;

  const text = currentLang === 'pt'
    ? `Olá! Sou *${nome}* (${email}).\n\n${msg}`
    : `Hello! I'm *${nome}* (${email}).\n\n${msg}`;

  window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(text)}`, '_blank');

  const btn  = e.target.querySelector('.btn-lux');
  const orig = btn.innerHTML;
  btn.innerHTML = currentLang === 'pt' ? '✓ Mensagem enviada!' : '✓ Message sent!';
  setTimeout(() => { btn.innerHTML = orig; }, 3000);
});

/* ═══════════════════════════════════════════════════════
   INIT — run everything in the right order
═══════════════════════════════════════════════════════ */
syncFeaturedVisibility('gent');   // show gent content by default
applyFilters();                   // show correct cards for initial mode
initProductCards();               // animate them in after a paint tick
initScrollAnimations();           // register all scroll-triggered reveals
renderCart();                     // initialise cart UI