import { useCallback, useEffect, useRef, useState } from 'react';
import './SiteChrome.css';

/* ------------------------------------------------------------------
   Icons (self-contained so this file never imports Home1)
------------------------------------------------------------------- */
const PATHS = {
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4.2-4.2',
  heart: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 20a7 7 0 0 1 14 0',
  bag: 'M5 8h14l-1 12H6L5 8zM9 8V7a3 3 0 0 1 6 0v1',
  left: 'M15 5l-7 7 7 7',
  right: 'M9 5l7 7-7 7',
  down: 'M6 9l6 6 6-6',
  arrow: 'M6 12h12M13 7l5 5-5 5',
  check: 'M5 12l5 5 9-10',
  plus: 'M12 5v14M5 12h14',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  truck: 'M3 7h11v9H3zM14 10h4l3 3v3h-7M8.5 18.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM18.5 18.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z',
  shield: 'M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3zM9 12l2 2 4-4',
  returns: 'M4 12a8 8 0 0 1 14-5l2 2M20 4v5h-5M20 12a8 8 0 0 1-14 5l-2-2M4 20v-5h5',
  star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  list: 'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01',
  filter: 'M4 5h16l-6 8v6l-4-2v-4z',
  edit: 'M4 20h4L19 9l-4-4L4 16zM13 7l4 4',
  trash: 'M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13',
  pin: 'M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21zM12 11a1.8 1.8 0 1 0 0-3.6A1.8 1.8 0 0 0 12 11z',
  card: 'M3 7h18v10H3zM3 10h18M7 15h4',
  lock: 'M6 11h12v9H6zM8 11V8a4 4 0 0 1 8 0v3',
  bell: 'M6 17V11a6 6 0 0 1 12 0v6l2 2H4zM10 21h4',
  tag: 'M3 12V4h8l10 10-8 8zM7.5 8h.01',
  gift: 'M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7c-2 0-4-1-4-3s3-2 4 3zM12 7c2 0 4-1 4-3s-3-2-4 3z',
  box: 'M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10',
  logout: 'M10 5H5v14h5M15 8l4 4-4 4M19 12H9',
  help: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01',
  mail: 'M3 6h18v12H3zM3 7l9 7 9-7',
  phone: 'M5 4h3l2 5-2 2c1 3 3 5 6 6l2-2 5 2v3c0 1-1 2-2 2C10.5 22 2 13.5 2 6c0-1 1-2 2-2z',
  chat: 'M4 5h16v11H8l-4 4V5z',
  percent: 'M19 5 5 19M7.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM16.5 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  up: 'M12 19V5M5 12l7-7 7 7',
  facebook: 'M15 3h-2a4 4 0 0 0-4 4v3H6v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h2z',
  x: 'M4 4l16 16M20 4L4 20',
  youtube: 'M3 8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zM10 9l5 3-5 3z',
  instagram:
    'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM17.5 6.5h.01',
};

export function Ico({ name, size = 18, filled = false }) {
  return (
    <svg
      className="sx-ico"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}

/* ------------------------------------------------------------------
   Navigation helpers (same pushState + popstate approach as Home1)
------------------------------------------------------------------- */
export function navigate(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function goHomeSection(hash = '') {
  navigate('/');

  if (hash) {
    setTimeout(() => {
      const target = document.getElementById(hash.slice(1));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }, 250);
  }
}

/* Toast hook: const [toastNode, showToast] = useToast(); render {toastNode} */
export function useToast() {
  const [msg, setMsg] = useState('');
  const timer = useRef(null);

  const show = useCallback((message) => {
    setMsg(message);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(''), 2600);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  const node = msg ? (
    <div className="sx-toast" role="status" aria-live="polite" key={msg}>
      <Ico name="check" size={17} />
      <span>{msg}</span>
    </div>
  ) : null;

  return [node, show];
}

/* ------------------------------------------------------------------
   TOP TICKER — shared across every page (was duplicated per page)
------------------------------------------------------------------- */
const TICKER = [
  { icon: 'lock', text: 'Secure payments' },
  { icon: 'truck', text: 'Free delivery above ₹1,999' },
  { icon: 'returns', text: 'Easy 7-day returns' },
  { icon: 'check', text: 'Verified authentic craft' },
  { icon: 'shield', text: 'Atelier certified' },
  { icon: 'clock', text: '48h express dispatch' },
];

export function TopTicker() {
  return (
    <div className="sx-ticker" aria-hidden="true">
      <div className="sx-ticker__track">
        {[...TICKER, ...TICKER].map((t, i) => (
          <span className="sx-ticker__item" key={i}>
            <Ico name={t.icon} size={13} /> {t.text}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   HEADER  (dark petrol bar: hamburger + logo | search, wishlist,
   cart, profile — matches the reference screenshot exactly)
------------------------------------------------------------------- */
const MENU = [
  { key: 'home', label: 'Home', path: '/' },
  { key: 'categories', label: 'All categories', path: '/categories' },
  { key: 'deals', label: 'Deals of the day', path: '/', hash: '#deals' },
  { key: 'build', label: 'Build your own', path: '/', hash: '#build' },
  { key: 'featured', label: 'Bestsellers', path: '/', hash: '#featured' },
  { key: 'reviews', label: 'Reviews', path: '/', hash: '#reviews' },
  { key: 'help', label: 'Help & FAQ', path: '/help' },
  { key: 'contact', label: 'Contact Us', path: '/contact' },
  { key: 'about', label: 'About Us', path: '/about' },
  { key: 'account', label: 'My account', path: '/account' },
];

export function SiteHeader({ active = '', wishCount = 0, cartCount = 0, onToast }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleItem = (item) => () => {
    setOpen(false);
    if (item.hash) goHomeSection(item.hash);
    else navigate(item.path);
  };

  return (
    <>
      <header className="sx-header">
        <div className="sx-wrap sx-header__row">
          <div className="sx-header__left">
            <button
              type="button"
              className="sx-iconbtn"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <Ico name={open ? 'close' : 'menu'} size={20} />
            </button>

            <button type="button" className="sx-logo" onClick={() => navigate('/')}>
              amihive<i className="sx-logo__dot" />
            </button>
          </div>

          <div className="sx-header__actions">
            <button
              type="button"
              className="sx-iconbtn"
              aria-label="Search"
              onClick={() => navigate('/categories')}
            >
              <Ico name="search" size={19} />
            </button>

            <button
              type="button"
              className="sx-labelbtn"
              aria-label={`Wishlist, ${wishCount} saved`}
              onClick={() => navigate('/account?tab=wishlist')}
            >
              <Ico name="heart" size={18} />
              <span className="sx-labelbtn__text">Wishlist</span>
              <span className="sx-labelbtn__badge">{wishCount}</span>
            </button>

            <button
              type="button"
              className="sx-labelbtn"
              aria-label={`Cart, ${cartCount} items`}
              onClick={() => onToast && onToast('Cart page coming soon.')}
            >
              <Ico name="bag" size={18} />
              <span className="sx-labelbtn__text">Cart</span>
              <span className="sx-labelbtn__badge">{cartCount}</span>
            </button>

            <button
              type="button"
              className={`sx-iconbtn ${active === 'account' ? 'is-on' : ''}`}
              aria-label="Profile"
              onClick={() => navigate('/account')}
            >
              <Ico name="user" size={19} />
            </button>
          </div>
        </div>

        {open && (
          <nav className="sx-menu" aria-label="Main menu">
            <div className="sx-wrap sx-menu__inner">
              {MENU.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={`sx-menu__link ${active === item.key ? 'is-active' : ''}`}
                  onClick={handleItem(item)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </header>

      {open && <div className="sx-scrim" onClick={() => setOpen(false)} />}
    </>
  );
}

/* ------------------------------------------------------------------
   FOOTER  — matches the "AMIHIVE / Shop Curations / Discover Atelier
   / Customer Care / Integrity & Gazette" reference screenshot.
------------------------------------------------------------------- */
const FOOT_CURATIONS = [
  'Mechanical Timepieces',
  'Handmade Ceramics',
  'Full-Grain Leather goods',
  'Architectural Objects',
  'Limited Production Runs',
  'Heirloom Keepsakes',
];

const FOOT_ATELIER = [
  'Artisan Profiles',
  'Master Workshop Coordinates',
  'Craftsmanship Stories',
  'Materials & Provenance',
  'Commission Bespoke',
  'Sustainability Report',
];

const FOOT_CARE = [
  { label: 'Order Tracking', action: 'soon' },
  { label: 'Shipping & Logistics', action: 'soon' },
  { label: '7-Day Return Policy', action: 'nav', path: '/returns' },
  { label: 'Warranty & Service Centers', action: 'soon' },
  { label: 'Concierge Support', action: 'nav', path: '/contact' },
  { label: 'Authenticity Certificate FAQ', action: 'nav', path: '/help' },
];

const FOOT_BOTTOM = [
  { label: 'Terms of Service', path: '/terms' },
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Artisan Standard Compliance', path: null },
];

export function SiteFooter({ onToast, showBanner = true }) {
  const soon = (label) => () => onToast && onToast(`${label} page is coming soon.`);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    onToast && onToast('You are on the atelier invitation list.');
  };

  const careClick = (item) => () => {
    if (item.action === 'nav') navigate(item.path);
    else soon(item.label)();
  };

  return (
    <>
      {showBanner && (
        <section className="sx-paybanner sx-wrap" aria-label="Pay later">
          <div className="sx-paybanner__card">
            <div className="sx-paybanner__copy">
              <h2>
                Shop today, pay later
                <br />
                at no extra cost
              </h2>

              <button type="button" className="sx-paybanner__cta" onClick={soon('Pay Later')}>
                Activate now <Ico name="right" size={20} />
              </button>
            </div>

            <div className="sx-paybanner__art" aria-hidden="true">
              <span className="sx-paybanner__dial">
                <Ico name="clock" size={34} />
              </span>

              <span className="sx-paybanner__brand">
                amihive
                <b>PAY LATER</b>
              </span>
            </div>
          </div>
        </section>
      )}

      <footer className="sx-foot">
        <div className="sx-wrap sx-foot__grid">
          <div className="sx-foot__col sx-foot__brand">
            <button type="button" className="sx-foot__brandname" onClick={() => navigate('/about')}>
              <i className="sx-foot__branddot" /> AMIHIVE
            </button>

            <p>
              An artisanal emporium curated with horological precision. Celebrating heritage craft,
              master leatherwork, and bespoke creations from verified studios across India.
            </p>

            <span className="sx-foot__assure">
              <Ico name="shield" size={15} /> 100% Provenance Guaranteed
            </span>
          </div>

          <div className="sx-foot__col">
            <h4>Shop Curations</h4>
            {FOOT_CURATIONS.map((label) => (
              <button type="button" className="sx-foot__link" key={label} onClick={() => navigate('/categories')}>
                {label}
              </button>
            ))}
          </div>

          <div className="sx-foot__col">
            <h4>Discover Atelier</h4>
            {FOOT_ATELIER.map((label) => (
              <button type="button" className="sx-foot__link" key={label} onClick={soon(label)}>
                {label}
              </button>
            ))}
          </div>

          <div className="sx-foot__col">
            <h4>Customer Care</h4>
            {FOOT_CARE.map((item) => (
              <button type="button" className="sx-foot__link" key={item.label} onClick={careClick(item)}>
                {item.label}
              </button>
            ))}
          </div>

          <div className="sx-foot__col sx-foot__gazette">
            <h4>Integrity &amp; Gazette</h4>
            <p>Receive private invitations to private ateliers and rare limited allocations.</p>

            <form className="sx-foot__form" onSubmit={handleSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your atelier email"
                aria-label="Email address"
                required
              />
              <button type="submit" className="sx-btn sx-btn--signal sx-btn--sm sx-btn--block">
                Subscribe
              </button>
            </form>

            {subscribed && (
              <p className="sx-foot__ok" role="status">
                <Ico name="check" size={14} /> You&apos;re on the list.
              </p>
            )}

            <div className="sx-foot__currency">
              <span>Currency:</span>
              <b>₹ INR (₹)</b>
            </div>
          </div>
        </div>

        <div className="sx-wrap sx-foot__bar">
          <span className="sx-foot__copy">© {new Date().getFullYear()} AMIHIVE Luxury Craft Pvt Ltd. All rights reserved.</span>

          <div className="sx-foot__barlinks">
            {FOOT_BOTTOM.map((item) => (
              <button
                type="button"
                key={item.label}
                className="sx-foot__link"
                onClick={item.path ? () => navigate(item.path) : soon(item.label)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <span className="sx-foot__secure">
            <Ico name="lock" size={14} /> 256-Bit Encrypted Checkout
          </span>
        </div>
      </footer>
    </>
  );
}