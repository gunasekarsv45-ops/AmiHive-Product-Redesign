import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './Home1.css';
import ProductGallery, { SmartImage, img } from './ProductGallery';

/* ------------------------------------------------------------------
   CONSTANTS
------------------------------------------------------------------- */
const SLIDE_MS = 6500; // time each hero slide stays on screen
const QUOTE_MS = 7000; // time each review stays on screen
const TICKS = 24; // tick marks in each carousel progress track
const BASE_PRICE = 16990;

export const ICONS = {
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4.2-4.2',
  heart: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 20a7 7 0 0 1 14 0',
  bag: 'M5 8h14l-1 12H6L5 8zM9 8V7a3 3 0 0 1 6 0v1',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  left: 'M15 5l-7 7 7 7',
  right: 'M9 5l7 7-7 7',
  arrow: 'M6 12h12M13 7l5 5-5 5',
  check: 'M5 12l5 5 9-10',
  truck:
    'M3 7h11v9H3zM14 10h4l3 3v3h-7M8.5 18.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM18.5 18.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z',
  shield: 'M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3zM9 12l2 2 4-4',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  returns: 'M4 12a8 8 0 0 1 14-5l2 2M20 4v5h-5M20 12a8 8 0 0 1-14 5l-2-2M4 20v-5h5',
  plus: 'M12 5v14M5 12h14',
};

const NAV = [
  { label: 'Collection', href: '#categories' },
  { label: 'Deals', href: '#deals' },
  { label: 'Build your own', href: '#build' },
  { label: 'Bestsellers', href: '#featured' },
  { label: 'Reviews', href: '#reviews' },
];

const ADS = [
  'Free insured shipping on every order',
  'Extra 5% off on prepaid orders',
  'New arrivals every Friday',
  '2-year international warranty',
];

const BANNERS = [
  {
    id: 'b1',
    tab: 'Aster collection',
    tag: 'New drop',
    title: 'Automatic, and made for every day.',
    text: 'Sapphire crystal and self-winding movements, built to be worn daily.',
    cta: 'Shop Aster',
    price: 'From ₹16,990',
    image: 'aster',
    href: '#featured',
  },
  {
    id: 'b2',
    tab: 'Steel case offers',
    tag: 'Limited time',
    title: 'Up to 20% off steel cases.',
    text: 'Selected Meridian and Heritage pieces, this week only.',
    cta: 'View offers',
    price: 'From ₹16,990',
    image: 'blackDial',
    href: '#deals',
  },
  {
    id: 'b3',
    tab: 'Jubilee straps',
    tag: 'Just launched',
    title: 'Swap the strap, change the watch.',
    text: 'Steel bracelets that fit every case in the lineup.',
    cta: 'Explore straps',
    price: 'From ₹2,990',
    image: 'jubilee',
    href: '#featured',
  },
];

export const ASSURANCES = [
  { icon: 'truck', title: 'Insured shipping', text: 'Free on every order' },
  { icon: 'shield', title: 'Certified original', text: 'Every piece verified' },
  { icon: 'clock', title: '2 year warranty', text: 'On all movements' },
  { icon: 'returns', title: '7 day returns', text: 'No questions asked' },
];

const CATEGORIES = [
  { name: 'Automatic watches', note: 'Self-winding, sapphire crystal', image: 'tanWrist', lead: true },
  { name: 'Chronographs', note: 'Timing built in', image: 'studio' },
  { name: 'Leather straps', note: 'Italian leather', image: 'strap' },
  { name: 'Steel bracelets', note: 'Jubilee and link styles', image: 'jubilee' },
  { name: 'Accessories and gifts', note: 'Rolls, cases, gift sets', image: 'desk' },
];

export const DEALS = [
  { id: 'd1', name: 'Aster No.04', subtitle: 'Automatic blue dial', price: 18990, originalPrice: 21990, discount: 14, rating: 4.7, image: 'aster' },
  { id: 'd2', name: 'Aster No.02', subtitle: 'Chronograph', price: 22990, originalPrice: 27990, discount: 18, rating: 4.6, image: 'goldWrist' },
  { id: 'd3', name: 'Meridian Steel', subtitle: 'Jubilee bracelet', price: 24990, originalPrice: 28990, discount: 13, rating: 4.8, image: 'steelLine' },
  { id: 'd4', name: 'Heritage No.01', subtitle: 'Classic leather', price: 16990, originalPrice: 19990, discount: 15, rating: 4.5, image: 'darkFace' },
  { id: 'd5', name: 'Urban No.03', subtitle: 'Everyday field watch', price: 14990, originalPrice: 17990, discount: 17, rating: 4.4, image: 'blackDial' },
];

export const PRODUCTS = [
  { id: 'f1', type: 'watch', name: 'Aster No.04', subtitle: 'Automatic blue dial watch', price: 18990, originalPrice: 21990, rating: 4.7, ratings: 284, image: 'wristBlack' },
  { id: 'f2', type: 'strap', name: 'Signature Clasp', subtitle: 'Steel jubilee strap', price: 3490, originalPrice: 3990, rating: 4.6, ratings: 96, image: 'jubilee' },
  { id: 'f3', type: 'watch', name: 'Aster No.01', subtitle: 'Classic everyday', price: 16990, originalPrice: 19990, rating: 4.8, ratings: 412, image: 'goldClose' },
  { id: 'f4', type: 'accessory', name: 'Travel Case', subtitle: 'Leather watch roll', price: 2290, originalPrice: 2790, rating: 4.5, ratings: 63, image: 'desk' },
  { id: 'f5', type: 'watch', name: 'Meridian No.02', subtitle: 'Steel chronograph', price: 24990, originalPrice: 28990, rating: 4.6, ratings: 178, image: 'studio' },
  { id: 'f6', type: 'strap', name: 'Cognac Strap', subtitle: 'Italian leather', price: 2990, originalPrice: 3490, rating: 4.7, ratings: 141, image: 'strap' },
  { id: 'f7', type: 'watch', name: 'Urban No.03', subtitle: 'Everyday field watch', price: 14990, originalPrice: 17990, rating: 4.4, ratings: 87, image: 'night' },
  { id: 'f8', type: 'watch', name: 'Heritage No.01', subtitle: 'Classic leather', price: 16990, originalPrice: 19990, rating: 4.5, ratings: 205, image: 'tanWrist' },
];

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'watch', label: 'Watches' },
  { id: 'strap', label: 'Straps' },
  { id: 'accessory', label: 'Accessories' },
];

export const TESTIMONIALS = [
  { initials: 'AK', name: 'Arjun K.', date: '2 weeks ago', rating: 5, text: 'The blue dial looks significantly better in person. Proportions are exactly what I wanted.' },
  { initials: 'RM', name: 'Rahul M.', date: '1 month ago', rating: 5, text: 'Leather feels premium and the watch sits with a really balanced presence on the wrist.' },
  { initials: 'SN', name: 'Sneha N.', date: '1 month ago', rating: 4, text: 'Great everyday watch, packaging and delivery were both excellent.' },
];

/* Build-your-own options.
   `photo` is a key from PHOTO in ProductGallery.jsx. Swap these keys
   (or the Unsplash ids there) for your real product photos. */
export const DIALS = [
  { id: 'blue', name: 'Sunburst blue', color: '#1d4c8c', photo: 'aster' },
  { id: 'slate', name: 'Slate grey', color: '#46525a', photo: 'blackDial' },
  { id: 'forest', name: 'Forest green', color: '#1c5a44', photo: 'darkFace' },
];

export const STRAPS = [
  { id: 'leather', name: 'Cognac leather', extra: 0, photo: 'strap' },
  { id: 'steel', name: 'Steel jubilee', extra: 3490, photo: 'jubilee' },
];

export const SIZES = [38, 40, 42];

/* ---- new content: press mentions, brand story stats, FAQ ---- */
export const PRESS_MENTIONS = ['Vogue India', 'GQ', 'Rolling Stone', 'The Established', "Man's World"];

export const STORY_STATS = [
  { value: '2018', label: 'Founded' },
  { value: '40k+', label: 'Watches shipped' },
  { value: '4.7★', label: 'Average rating' },
];

export const FAQS = [
  {
    q: 'How accurate is the automatic movement?',
    a: 'Our automatic movements are regulated to within -20/+40 seconds a day, in line with standard mechanical watch tolerances. No battery is needed — normal daily wear keeps it wound.',
  },
  {
    q: 'Can I swim or shower with my watch on?',
    a: 'Every watch is rated to at least 5 ATM, which covers rain, hand-washing and swimming. It is not built for diving or high-pressure water sports.',
  },
  {
    q: 'What is covered under the 2-year warranty?',
    a: 'The warranty covers manufacturing defects in the movement and case. It does not cover accidental damage, water damage from unrated use, or normal wear on straps.',
  },
  {
    q: 'How long does shipping take?',
    a: 'Orders ship within 2 business days and arrive in 3-6 days across India, fully insured at no extra cost.',
  },
  {
    q: 'Can I return or exchange my order?',
    a: 'Yes — you have 7 days from delivery to exchange or return your watch, no questions asked, as long as it is unworn and in its original packaging.',
  },
];

/* ------------------------------------------------------------------
   HELPERS
------------------------------------------------------------------- */
export const formatPrice = (value) => new Intl.NumberFormat('en-IN').format(value);

/* Client-side "navigation" with no router library: push the URL and
   fire a manual popstate so App.jsx's listener picks it up. Used by
   the Bestseller/Deal cards here, and by the related-products rail
   on ProductRedesign1. */
export function goToProductPage(id) {
  window.history.pushState({}, '', `/product?id=${id}`);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function msUntilMidnight() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(24, 0, 0, 0);
  return end - now;
}

function useCountdown() {
  const [ms, setMs] = useState(msUntilMidnight);

  useEffect(() => {
    const timer = setInterval(() => setMs(msUntilMidnight()), 1000);
    return () => clearInterval(timer);
  }, []);

  const total = Math.max(0, Math.floor(ms / 1000));
  const pad = (n) => String(n).padStart(2, '0');
  return [pad(Math.floor(total / 3600)), pad(Math.floor(total / 60) % 60), pad(total % 60)];
}

/* Adds a "seen" flag once the element scrolls into view (scroll reveal). */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      setSeen(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, seen];
}

export function Icon({ name, size = 20 }) {
  return (
    <svg
      className="ah-icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

export function Stars({ value }) {
  const filled = Math.round(value);
  return (
    <span className="ah-stars" role="img" aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < filled ? 'is-on' : ''}>
          ★
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------
   BUILD YOUR OWN (real photography, crossfades on every change)
------------------------------------------------------------------- */
function Configurator({ onAdd }) {
  const [dial, setDial] = useState(DIALS[0]);
  const [strap, setStrap] = useState(STRAPS[0]);
  const [size, setSize] = useState(40);
  const total = BASE_PRICE + strap.extra;

  const handleAdd = () => {
    onAdd(`Aster · ${dial.name}, ${strap.name}, ${size} mm`);
  };

  return (
    <section className="ah-build ah-section" id="build">
      <div className="ah-wrap ah-build__grid">
        <div className="ah-build__stage">
          <SmartImage
            key={dial.id}
            className="ah-build__photo"
            src={img(dial.photo, 1100)}
            alt={`${dial.name} dial watch`}
          />
          <div className="ah-build__shade" />

          <span className="ah-build__chip">
            {dial.name} dial · {size} mm case
          </span>

          <figure className="ah-build__inset" key={strap.id}>
            <SmartImage className="ah-build__inset-img" src={img(strap.photo, 360)} alt={`${strap.name} strap`} />
            <figcaption>{strap.name}</figcaption>
          </figure>
        </div>

        <div className="ah-build__panel">
          <h2>Build your own timepiece</h2>
          <p className="ah-build__lead">
            Choose your dial, strap and case size. It is made up and delivered exactly the way you set it here.
          </p>

          <fieldset className="ah-opt">
            <legend>
              Dial <span>{dial.name}</span>
            </legend>
            <div className="ah-opt__row">
              {DIALS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  className={`ah-swatch ${dial.id === d.id ? 'is-on' : ''}`}
                  style={{ '--c': d.color }}
                  aria-pressed={dial.id === d.id}
                  aria-label={d.name}
                  onClick={() => setDial(d)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="ah-opt">
            <legend>
              Strap <span>{strap.extra ? `+₹${formatPrice(strap.extra)}` : 'Included'}</span>
            </legend>
            <div className="ah-opt__row">
              {STRAPS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`ah-seg ${strap.id === s.id ? 'is-on' : ''}`}
                  aria-pressed={strap.id === s.id}
                  onClick={() => setStrap(s)}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="ah-opt">
            <legend>
              Case size <span>{size} mm</span>
            </legend>
            <div className="ah-opt__row">
              {SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`ah-seg ${size === s ? 'is-on' : ''}`}
                  aria-pressed={size === s}
                  onClick={() => setSize(s)}
                >
                  {s} mm
                </button>
              ))}
            </div>
          </fieldset>

          <div className="ah-build__buy">
            <div>
              <span className="ah-build__label">Your build</span>
              <strong className="ah-build__price" key={total}>
                ₹{formatPrice(total)}
              </strong>
            </div>
            <button type="button" className="ah-btn ah-btn--signal" onClick={handleAdd}>
              Add build to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   PAGE
------------------------------------------------------------------- */
function Home1() {
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [resume, setResume] = useState(0);

  const [wishlist, setWishlist] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState('');
  const [filter, setFilter] = useState('all');
  const [quote, setQuote] = useState(0);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const railRef = useRef(null);
  const toastTimer = useRef(null);
  const [bentoRef, bentoIn] = useInView(0.15);
  const [hh, mm, ss] = useCountdown();

  /* sticky header shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* hero auto-advance */
  useEffect(() => {
    if (paused) return undefined;
    const timer = setTimeout(() => setActive((i) => (i + 1) % BANNERS.length), SLIDE_MS);
    return () => clearTimeout(timer);
  }, [active, paused, resume]);

  /* review auto-advance */
  useEffect(() => {
    const timer = setTimeout(() => setQuote((i) => (i + 1) % TESTIMONIALS.length), QUOTE_MS);
    return () => clearTimeout(timer);
  }, [quote]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const go = (index) => setActive((index + BANNERS.length) % BANNERS.length);

  const holdHero = () => setPaused(true);
  const releaseHero = () => {
    setPaused(false);
    setResume((n) => n + 1);
  };

  const showToast = useCallback((message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2600);
  }, []);

  const addToCart = (name) => {
    setCartCount((n) => n + 1);
    showToast(`Added "${name}" to your cart.`);
  };

  const toggleWishlist = (id) => setWishlist((current) => ({ ...current, [id]: !current[id] }));
  const wishCount = Object.values(wishlist).filter(Boolean).length;

  const handleSearch = (e) => {
    e.preventDefault();
    setFilter('all');
    const target = document.getElementById('featured');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  const scrollRail = (dir) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector('.ah-deal');
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 20;
    const step = card ? card.getBoundingClientRect().width + gap : 300;
    rail.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        (filter === 'all' || p.type === filter) &&
        (!q || `${p.name} ${p.subtitle}`.toLowerCase().includes(q))
    );
  }, [filter, query]);

  const review = TESTIMONIALS[quote];

  /* ---- navigation / card-click handlers, kept as plain named
     functions so nothing inline-block-bodied sits inside JSX ---- */
  const handleCardOpen = (id) => () => {
    goToProductPage(id);
  };

  const handleCardKeyDown = (id) => (e) => {
    if (e.key === 'Enter') {
      goToProductPage(id);
    }
  };

  const handleAddToCartClick = (name) => (e) => {
    e.stopPropagation();
    addToCart(name);
  };

  const handleWishlistClick = (id) => (e) => {
    e.stopPropagation();
    toggleWishlist(id);
  };

  const handleCategoryClick = () => {
    const target = document.getElementById('featured');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryKeyDown = (e) => {
    if (e.key === 'Enter') handleCategoryClick();
  };

  const handleProfileClick = () => showToast('Profile page coming soon.');

  const toggleFaq = (i) => () => setOpenFaq((cur) => (cur === i ? null : i));

  return (
    <div className="ah-root">
      {/* ---------- announcement ticker ---------- */}
      <div className="ah-ticker" aria-label="Current offers">
        <div className="ah-ticker__track">
          {[...ADS, ...ADS].map((text, i) => (
            <span className="ah-ticker__item" key={i} aria-hidden={i >= ADS.length}>
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* ---------- header ---------- */}
      <header className={`ah-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="ah-wrap ah-header__row">
          <button
            type="button"
            className="ah-iconbtn ah-burger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>

          <a className="ah-logo" href="/" aria-label="amihive home">
            amihive<i className="ah-logo__hand" />
          </a>

          <nav className={`ah-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>

          <form className="ah-search" onSubmit={handleSearch} role="search">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search watches, straps and more"
              aria-label="Search products"
            />
            <button type="submit" aria-label="Search">
              <Icon name="search" size={18} />
            </button>
          </form>

          <div className="ah-actions">
            <button type="button" className="ah-iconbtn" aria-label={`Wishlist, ${wishCount} saved`}>
              <Icon name="heart" />
              {wishCount > 0 && (
                <span className="ah-count" key={wishCount}>
                  {wishCount}
                </span>
              )}
            </button>

            <button type="button" className="ah-iconbtn" aria-label={`Cart, ${cartCount} items`}>
              <Icon name="bag" />
              {cartCount > 0 && (
                <span className="ah-count" key={cartCount}>
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              className="ah-iconbtn ah-iconbtn--account"
              aria-label="Profile"
              onClick={handleProfileClick}
            >
              <Icon name="user" />
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* ---------- hero carousel ---------- */}
        <section
          className={`ah-hero ${paused ? 'is-paused' : ''}`}
          aria-roledescription="carousel"
          aria-label="Featured collections"
          onMouseEnter={holdHero}
          onMouseLeave={releaseHero}
        >
          {BANNERS.map((b, i) => (
            <article
              key={b.id}
              className={`ah-slide ${i === active ? 'is-active' : ''}`}
              aria-hidden={i !== active}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${BANNERS.length}`}
            >
              <SmartImage className="ah-slide__img" src={img(b.image, 1920)} alt="" eager={i === 0} />
              <div className="ah-slide__shade" />
              <div className="ah-wrap ah-slide__inner">
                <div className="ah-slide__copy">
                  <span className="ah-slide__tag ah-rise" style={{ '--d': 0 }}>
                    {b.tag}
                  </span>

                  <h1 className="ah-slide__title ah-rise" style={{ '--d': 1 }}>
                    {b.title}
                  </h1>

                  <p className="ah-slide__text ah-rise" style={{ '--d': 2 }}>
                    {b.text}
                  </p>

                  <div className="ah-slide__actions ah-rise" style={{ '--d': 3 }}>
                    <a className="ah-btn ah-btn--signal" href={b.href} tabIndex={i === active ? 0 : -1}>
                      {b.cta}
                    </a>
                    <span className="ah-slide__price">{b.price}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}

          <div className="ah-hero__bar">
            <div className="ah-wrap ah-hero__barinner">
              <div className="ah-tabs" role="tablist" aria-label="Choose slide">
                {BANNERS.map((b, i) => (
                  <button
                    key={b.id}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    className={`ah-tab ${i === active ? 'is-active' : ''}`}
                    onClick={() => go(i)}
                  >
                    <span className="ah-tab__name">{b.tab}</span>

                    <span
                      className="ah-ticks"
                      style={{ '--step': `${SLIDE_MS / TICKS}ms` }}
                      key={i === active ? `on-${resume}` : 'off'}
                      aria-hidden="true"
                    >
                      {Array.from({ length: TICKS }).map((_, n) => (
                        <i className="ah-tick" style={{ '--i': n }} key={n} />
                      ))}
                    </span>
                  </button>
                ))}
              </div>

              <div className="ah-hero__arrows">
                <button type="button" className="ah-round" onClick={() => go(active - 1)} aria-label="Previous slide">
                  <Icon name="left" />
                </button>

                <button type="button" className="ah-round" onClick={() => go(active + 1)} aria-label="Next slide">
                  <Icon name="right" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- assurances ---------- */}
        <section className="ah-assure" aria-label="Our promises">
          <div className="ah-wrap ah-assure__grid">
            {ASSURANCES.map((item) => (
              <div className="ah-assure__item" key={item.title}>
                <span className="ah-assure__icon">
                  <Icon name={item.icon} size={22} />
                </span>

                <span>
                  <strong>{item.title}</strong>
                  <em>{item.text}</em>
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- press / as featured in ---------- */}
        <section className="ah-press" aria-label="As featured in">
          <div className="ah-wrap ah-press__row">
            <span className="ah-press__label">As featured in</span>
            <div className="ah-press__logos">
              {PRESS_MENTIONS.map((name) => (
                <span className="ah-press__logo" key={name}>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- categories ---------- */}
        <section className="ah-section" id="categories">
          <div className="ah-wrap">
            <div className="ah-head">
              <h2>Shop by category</h2>
              <p>Five ways into the lineup, from self-winding watches to the details that finish them.</p>
            </div>

            <div className={`ah-bento ${bentoIn ? 'is-in' : ''}`} ref={bentoRef}>
              {CATEGORIES.map((c, i) => (
                <div
                  key={c.name}
                  className={`ah-tile ${c.lead ? 'ah-tile--lead' : ''}`}
                  style={{ '--i': i, cursor: 'pointer' }}
                  role="link"
                  tabIndex={0}
                  onClick={handleCategoryClick}
                  onKeyDown={handleCategoryKeyDown}
                >
                  <SmartImage className="ah-tile__img" src={img(c.image, c.lead ? 1000 : 700)} alt="" />

                  <span className="ah-tile__label">
                    <strong>{c.name}</strong>
                    <em>{c.note}</em>
                  </span>

                  <span className="ah-tile__go">
                    <Icon name="arrow" size={18} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- deals rail ---------- */}
        <section className="ah-deals ah-section" id="deals">
          <div className="ah-wrap">
            <div className="ah-head ah-head--deals">
              <div>
                <h2>Deals of the day</h2>

                <div className="ah-countdown">
                  <span>Ends tonight in</span>

                  <span className="ah-clock" aria-live="off">
                    <b>{hh}</b>
                    <b>{mm}</b>
                    <b>{ss}</b>
                  </span>
                </div>
              </div>

              <div className="ah-rail-nav">
                <button
                  type="button"
                  className="ah-round ah-round--dark"
                  onClick={() => scrollRail(-1)}
                  aria-label="Scroll deals left"
                >
                  <Icon name="left" />
                </button>

                <button
                  type="button"
                  className="ah-round ah-round--dark"
                  onClick={() => scrollRail(1)}
                  aria-label="Scroll deals right"
                >
                  <Icon name="right" />
                </button>
              </div>
            </div>

            <div className="ah-rail" ref={railRef}>
              {DEALS.map((deal) => (
                <article
                  className="ah-deal"
                  key={deal.id}
                  role="link"
                  tabIndex={0}
                  style={{ cursor: 'pointer' }}
                  onClick={handleCardOpen(deal.id)}
                  onKeyDown={handleCardKeyDown(deal.id)}
                >
                  <div className="ah-deal__media">
                    <SmartImage className="ah-deal__img" src={img(deal.image, 700)} alt={deal.name} />
                    <span className="ah-deal__badge">{deal.discount}% off</span>
                  </div>

                  <div className="ah-deal__body">
                    <strong>{deal.name}</strong>
                    <span className="ah-muted">{deal.subtitle}</span>

                    <span className="ah-rating">
                      <Stars value={deal.rating} /> {deal.rating}
                    </span>

                    <div className="ah-price">
                      <strong>₹{formatPrice(deal.price)}</strong>
                      <s>₹{formatPrice(deal.originalPrice)}</s>
                    </div>

                    <span className="ah-save">
                      You save ₹{formatPrice(deal.originalPrice - deal.price)}
                    </span>

                    <button
                      type="button"
                      className="ah-btn ah-btn--line ah-btn--sm ah-btn--block"
                      onClick={handleAddToCartClick(deal.name)}
                    >
                      Add to cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- build your own ---------- */}
        <Configurator onAdd={addToCart} />

        {/* ---------- bestsellers ---------- */}
        <section className="ah-section" id="featured">
          <div className="ah-wrap">
            <div className="ah-head ah-head--filters">
              <div>
                <h2>Bestsellers</h2>

                {query.trim() && (
                  <p className="ah-searchnote">
                    Showing results for “{query.trim()}”{' '}
                    <button type="button" onClick={() => setQuery('')}>
                      Clear
                    </button>
                  </p>
                )}
              </div>

              <div className="ah-chips" role="tablist" aria-label="Filter products">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    role="tab"
                    aria-selected={filter === f.id}
                    className={`ah-chip ${filter === f.id ? 'is-on' : ''}`}
                    onClick={() => setFilter(f.id)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {visible.length === 0 ? (
              <p className="ah-empty">
                Nothing matches that search. Clear it or pick another filter to see the full lineup.
              </p>
            ) : (
              <div className="ah-grid" key={`${filter}-${query}`}>
                {visible.map((p, i) => (
                  <article
                    className="ah-card"
                    style={{ '--i': i, cursor: 'pointer' }}
                    key={p.id}
                    role="link"
                    tabIndex={0}
                    onClick={handleCardOpen(p.id)}
                    onKeyDown={handleCardKeyDown(p.id)}
                  >
                    <div className="ah-card__media">
                      <SmartImage className="ah-card__img" src={img(p.image, 700)} alt={p.name} />

                      <button
                        type="button"
                        className={`ah-wish ${wishlist[p.id] ? 'is-on' : ''}`}
                        onClick={handleWishlistClick(p.id)}
                        aria-pressed={!!wishlist[p.id]}
                        aria-label={`Save ${p.name} to wishlist`}
                      >
                        <Icon name="heart" size={18} />
                      </button>
                    </div>

                    <div className="ah-card__body">
                      <strong>{p.name}</strong>
                      <span className="ah-muted">{p.subtitle}</span>

                      <span className="ah-rating">
                        <Stars value={p.rating} /> ({p.ratings})
                      </span>

                      <div className="ah-price">
                        <strong>₹{formatPrice(p.price)}</strong>
                        <s>₹{formatPrice(p.originalPrice)}</s>
                      </div>

                      <button
                        type="button"
                        className="ah-btn ah-btn--ink ah-btn--sm ah-btn--block"
                        onClick={handleAddToCartClick(p.name)}
                      >
                        Add to cart
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ---------- gallery ---------- */}
        <ProductGallery />

        {/* ---------- reviews ---------- */}
        <section className="ah-section ah-voices" id="reviews">
          <div className="ah-wrap ah-voices__grid">
            <div className="ah-voices__main" key={quote}>
              <Stars value={review.rating} />

              <blockquote>{review.text}</blockquote>

              <p>
                <strong>{review.name}</strong>
                <em>Verified purchase, {review.date}</em>
              </p>
            </div>

            <div className="ah-voices__list" role="tablist" aria-label="Choose review">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  role="tab"
                  aria-selected={i === quote}
                  className={`ah-voice ${i === quote ? 'is-active' : ''}`}
                  onClick={() => setQuote(i)}
                >
                  <span className="ah-voice__avatar">{t.initials}</span>

                  <span className="ah-voice__who">
                    <strong>{t.name}</strong>
                    <em>{t.date}</em>
                  </span>

                  <i className="ah-voice__bar" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- our story ---------- */}
        <section className="ah-section ah-story" id="story">
          <div className="ah-wrap ah-story__grid">
            <div className="ah-story__media">
              <SmartImage className="ah-story__img" src={img('studio', 1000)} alt="Amihive watchmaking studio" />
              <div className="ah-story__badge">
                <strong>Since 2018</strong>
                <span>Independent watchmaking</span>
              </div>
            </div>

            <div className="ah-story__copy">
              <h2>Built by people who wear what they make</h2>
              <p>
                Amihive started in a small workshop with one idea: a mechanical watch worth wearing every single
                day, not saving for occasions. Every case is machined, assembled and tested by the same small team
                before it ships.
              </p>
              <p>
                We keep the lineup small on purpose, so every piece gets the attention it deserves, from the first
                sketch to the watch on your wrist.
              </p>

              <div className="ah-story__stats">
                {STORY_STATS.map((s) => (
                  <div className="ah-story__stat" key={s.label}>
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>

              <a className="ah-btn ah-btn--ink" href="#featured">
                Shop the collection
              </a>
            </div>
          </div>
        </section>

        {/* ---------- faq ---------- */}
        <section className="ah-section ah-faq" id="faq">
          <div className="ah-wrap ah-faq__wrap">
            <div className="ah-head">
              <h2>Frequently asked questions</h2>
              <p>Everything you need to know before your first Amihive watch arrives.</p>
            </div>

            <div className="ah-faq__list">
              {FAQS.map((item, i) => (
                <div className={`ah-faq__item ${openFaq === i ? 'is-open' : ''}`} key={item.q}>
                  <button
                    type="button"
                    className="ah-faq__q"
                    aria-expanded={openFaq === i}
                    onClick={toggleFaq(i)}
                  >
                    {item.q}
                    <span className="ah-faq__icon">
                      <Icon name="plus" size={16} />
                    </span>
                  </button>

                  <div className="ah-faq__a" style={{ maxHeight: openFaq === i ? '300px' : '0px' }}>
                    <p>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- newsletter ---------- */}
        <section className="ah-news">
          <div className="ah-wrap ah-news__inner">
            <div>
              <h2>Stay ahead of new drops</h2>
              <p>Join our list for early access to new collections and member-only offers.</p>
            </div>

            <form className="ah-news__form" onSubmit={handleSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                aria-label="Email address"
                required
              />

              <button type="submit" className="ah-btn ah-btn--ink">
                Subscribe
              </button>

              {subscribed && (
                <p className="ah-news__ok" role="status">
                  <Icon name="check" size={16} /> You&apos;re subscribed. Welcome to amihive.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      {/* ---------- footer ---------- */}
      <footer className="ah-footer" id="care">
        <div className="ah-wrap ah-footer__grid">
          <div className="ah-footer__brand">
            <strong>amihive</strong>
            <p>Mechanical watches, made to be worn every day and kept for a long time.</p>
          </div>

          <div className="ah-footer__col">
            <h4>Shop</h4>
            <a href="#featured">All watches</a>
            <a href="#featured">Straps</a>
            <a href="#featured">Gift cards</a>
          </div>

          <div className="ah-footer__col">
            <h4>Support</h4>
            <a href="#care">Sizing guide</a>
            <a href="#care">Warranty</a>
            <a href="#care">Contact us</a>
          </div>

          <div className="ah-footer__col">
            <h4>Company</h4>
            <a href="#care">Our story</a>
            <a href="#care">Workshop</a>
          </div>
        </div>

        <div className="ah-wrap ah-footer__bottom">
          <span>© {new Date().getFullYear()} Amihive Timepieces</span>
          <span>Privacy and terms</span>
        </div>

        <div className="ah-footer__mark" aria-hidden="true">
          amihive
        </div>
      </footer>

      {toast && (
        <div className="ah-toast" role="status" key={toast}>
          <Icon name="check" size={16} /> {toast}
        </div>
      )}
    </div>
  );
}

export default Home1;