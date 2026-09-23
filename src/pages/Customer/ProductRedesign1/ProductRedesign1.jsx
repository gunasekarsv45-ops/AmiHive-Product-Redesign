import { useMemo, useRef, useState, useEffect } from 'react';
import './ProductRedesign1.css';
import { SmartImage, img } from '../Home1/ProductGallery';
import {
  PRODUCTS,
  DEALS,
  DIALS,
  STRAPS,
  SIZES,
  ASSURANCES,
  TESTIMONIALS,
  formatPrice,
  Icon,
  ICONS,
  Stars,
  goToProductPage,
} from '../Home1/Home1';

/* ------------------------------------------------------------------
   Extra icon glyphs this page needs on top of Home1's ICONS.
   Merged into ALL_ICONS below so one <AnyIcon /> can render either
   set without guessing which map a name lives in.
------------------------------------------------------------------- */
const MINI_ICONS = {
  percent: 'M19 5 5 19M7.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM16.5 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  card: 'M3 7h18v10H3zM3 10h18M7 15h4',
  pin: 'M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21zM12 11a1.8 1.8 0 1 0 0-3.6A1.8 1.8 0 0 0 12 11z',
  chat: 'M4 5h16v10H8l-4 4V5z',
  gem: 'M6 3h12l4 6-10 12L2 9zM2 9h20M9 3l-3 6 6 12 6-12-3-6',
  ruler: 'M3 3h18v6H3zM7 3v6M11 3v6M15 3v6',
  drop: 'M12 3c4 5 7 8.5 7 12a7 7 0 1 1-14 0c0-3.5 3-7 7-12z',
  leaf: 'M20 4C10 4 4 10 4 20c10 0 16-6 16-16zM4 20l8-8',
  up: 'M12 19V5M5 12l7-7 7 7',
};

const ALL_ICONS = { ...ICONS, ...MINI_ICONS };

function AnyIcon({ name, size = 18 }) {
  return (
    <svg
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
      <path d={ALL_ICONS[name]} />
    </svg>
  );
}

/* ------------------------------------------------------------------
   Scroll-reveal — same idea as Home1's bento reveal, kept local so
   Home1.jsx doesn't need touching.
------------------------------------------------------------------- */
function useInView(threshold = 0.15) {
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

/* Merge the two catalogs from Home1 into one lookup table so any
   card clicked on the home page (Bestsellers or Deals) resolves here. */
function buildCatalog() {
  const merged = PRODUCTS.map((p) => ({ ...p }));

  DEALS.forEach((d) => {
    if (!merged.some((m) => m.id === d.id)) {
      merged.push({
        ...d,
        type: 'watch',
        ratings: Math.round(60 + d.rating * 40),
      });
    }
  });

  return merged;
}

const CATALOG = buildCatalog();

function getProduct(id) {
  return CATALOG.find((p) => p.id === id) || CATALOG[0];
}

function getHighlights(product) {
  if (product.type === 'strap') {
    return [
      'Genuine leather / steel jubilee construction',
      'Quick-release spring bars — no tools needed',
      'Fits standard 20 mm lug width cases',
      '6 month strap warranty against material defects',
    ];
  }

  if (product.type === 'accessory') {
    return [
      'Premium vegan leather exterior',
      'Soft anti-scratch microfiber lining',
      'Holds up to 3 watches securely',
      'Compact, travel-friendly footprint',
    ];
  }

  return [
    'Automatic, self-winding movement — no battery needed',
    'Scratch-resistant sapphire crystal glass',
    '5 ATM water resistance for rain and splashes',
    'Screw-down case back for a secure seal',
    '2 year international manufacturer warranty',
  ];
}

function getRatingBreakdown(rating) {
  if (rating >= 4.7) return [72, 18, 6, 2, 2];
  if (rating >= 4.5) return [62, 24, 8, 4, 2];
  return [50, 28, 12, 6, 4];
}

const OFFERS = [
  {
    icon: 'percent',
    title: 'Bank offer',
    text: '10% instant discount up to ₹1,500 on select bank cards',
  },
  {
    icon: 'card',
    title: 'No cost EMI',
    text: 'Available on orders above ₹3,000, starting from 3 months',
  },
  {
    icon: 'percent',
    title: 'Partner offer',
    text: 'Get a GST invoice and save up to 18% on business orders',
  },
  {
    icon: 'truck',
    title: 'Exchange offer',
    text: 'Up to ₹2,000 off when you exchange your old watch',
  },
];

const QNA = [
  {
    q: 'Is this water resistant enough to swim with?',
    a: 'Yes — rated to 5 ATM, which covers rain, hand-washing and swimming. It is not built for diving or high-pressure water sports.',
  },
  {
    q: 'Does it come with the warranty card and box?',
    a: 'Every unit ships in its original box with a 2-year international warranty card and a printed care guide.',
  },
  {
    q: 'Can I exchange the strap or case size after delivery?',
    a: 'Yes, a 7-day no-questions-asked exchange applies if the strap length or case size does not fit.',
  },
];

const MATERIALS = [
  {
    icon: 'gem',
    title: 'Sapphire crystal',
    text: 'A scratch-resistant sapphire lens keeps the dial clear through years of daily wear.',
  },
  {
    icon: 'shield',
    title: 'Stainless steel case',
    text: 'Solid 316L stainless steel, brushed and polished by hand for a lasting finish.',
  },
  {
    icon: 'leaf',
    title: 'Considered materials',
    text: 'Full-grain leather and steel bracelets, chosen to age well rather than wear out.',
  },
];

const SIZE_GUIDE = [
  {
    size: 38,
    wrist: '150–175 mm',
    note: 'A closer, compact fit — popular for slimmer wrists.',
  },
  {
    size: 40,
    wrist: '165–190 mm',
    note: 'The most versatile size, suits most wrist widths.',
  },
  {
    size: 42,
    wrist: '180–210 mm',
    note: 'A bolder presence on the wrist, for larger frames.',
  },
];

const CARE_TIPS = [
  'Wipe the case and crystal with a soft, dry cloth after each wear.',
  'Keep it away from perfumes, solvents and household chemicals.',
  'Avoid prolonged water exposure if you chose a leather strap.',
  'Service the movement every 3–5 years to keep it running accurately.',
];

function goHome() {
  window.history.pushState({}, '', '/');
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function ProductRedesign1({ productId }) {
  const product = useMemo(() => getProduct(productId), [productId]);

  const [dial, setDial] = useState(DIALS[0]);
  const [strap, setStrap] = useState(STRAPS[0]);
  const [size, setSize] = useState(SIZES[1]);
  const [qty, setQty] = useState(1);
  const [wish, setWish] = useState(false);
  const [toast, setToast] = useState('');
  const [activeShot, setActiveShot] = useState(0);
  const [shotDir, setShotDir] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryChecked, setDeliveryChecked] = useState(false);
  const [fbtSelected, setFbtSelected] = useState({
    0: true,
    1: true,
    2: true,
  });
  const [miniVisible, setMiniVisible] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [cardWish, setCardWish] = useState({});
  const [addedMain, setAddedMain] = useState(false);
  const [cardAdded, setCardAdded] = useState({});
  const toastTimer = useRef(null);
  const cardAddedTimers = useRef({});
  const buyRef = useRef(null);

  /* reveal-on-scroll for the content sections below the fold */
  const [offersRef, offersIn] = useInView();
  const [highlightsRef, highlightsIn] = useInView();
  const [aboutRef, aboutIn] = useInView();
  const [specRef, specIn] = useInView();
  const [materialsRef, materialsIn] = useInView();
  const [sizeRef, sizeIn] = useInView();
  const [careRef, careIn] = useInView();
  const [reviewRef, reviewIn] = useInView();
  const [qnaRef, qnaIn] = useInView();
  const [fbtRef, fbtIn] = useInView();
  const [relatedRef, relatedIn] = useInView();

  /* reset everything whenever a different product is opened */
  useEffect(() => {
    setDial(DIALS[0]);
    setStrap(STRAPS[0]);
    setSize(SIZES[1]);
    setQty(1);
    setActiveShot(0);
    setShotDir(1);
    setPincode('');
    setDeliveryChecked(false);
    setFbtSelected({ 0: true, 1: true, 2: true });
    setAddedMain(false);
    setCardAdded({});
    Object.values(cardAddedTimers.current).forEach(clearTimeout);
    cardAddedTimers.current = {};
    window.scrollTo(0, 0);
  }, [productId]);

  useEffect(
    () => () => {
      clearTimeout(toastTimer.current);
      Object.values(cardAddedTimers.current).forEach(clearTimeout);
    },
    []
  );

  /* sticky mini buy bar: shows once the main buy box scrolls out of view */
  useEffect(() => {
    const el = buyRef.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setMiniVisible(
          !entry.isIntersecting && entry.boundingClientRect.top < 0
        );
      },
      { threshold: 0, rootMargin: '-84px 0px 0px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [productId]);

  /* back-to-top button */
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const shots = useMemo(
    () => [
      img(product.image, 1100),
      img(dial.photo, 1100),
      img(strap.photo, 1100),
      img('closeup', 1100),
    ],
    [product, dial, strap]
  );

  const strapExtra = strap.extra || 0;
  const unitPrice = product.price + strapExtra;
  const total = unitPrice * qty;
  const savePerUnit = product.originalPrice
    ? product.originalPrice - product.price
    : 0;

  const discountPct = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const related = CATALOG.filter((p) => p.id !== product.id).slice(0, 8);

  const fbtItems = useMemo(
    () => [product, ...related.slice(0, 2)],
    [product, related]
  );

  const highlights = useMemo(() => getHighlights(product), [product]);

  const ratingBars = useMemo(
    () => getRatingBreakdown(product.rating),
    [product]
  );

  const specs = useMemo(
    () => [
      { icon: 'ruler', label: 'Case size', value: `${size} mm` },
      { icon: 'gem', label: 'Dial', value: dial.name },
      { icon: 'leaf', label: 'Strap', value: strap.name },
      {
        icon: 'clock',
        label: 'Movement',
        value: 'Automatic, self-winding',
      },
      { icon: 'drop', label: 'Water resistance', value: '5 ATM' },
      {
        icon: 'shield',
        label: 'Warranty',
        value: '2 years, international',
      },
      {
        icon: 'bag',
        label: 'In the box',
        value: 'Watch, box, warranty card',
      },
      {
        icon: 'check',
        label: 'Case back',
        value: 'Screw-down, sealed',
      },
    ],
    [size, dial, strap]
  );

  const fbtTotal = fbtItems.reduce(
    (sum, item, idx) => (fbtSelected[idx] ? sum + item.price : sum),
    0
  );

  const fbtCount = Object.values(fbtSelected).filter(Boolean).length;

  const showToast = (message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2600);
  };

  /* main buy-box Add to cart */
  const addToCart = () => {
    if (addedMain) {
      setAddedMain(false);
      showToast(`Removed "${product.name}" from your cart.`);
      return;
    }

    showToast(`Added "${product.name}" (x${qty}) to your cart.`);
    setAddedMain(true);
  };

  const addFbtToCart = () =>
    showToast(
      `Added ${fbtCount} item${fbtCount === 1 ? '' : 's'} to your cart.`
    );

  const handlePrevShot = () => {
    setShotDir(-1);
    setActiveShot((i) => (i - 1 + shots.length) % shots.length);
  };

  const handleNextShot = () => {
    setShotDir(1);
    setActiveShot((i) => (i + 1) % shots.length);
  };

  const handleThumbClick = (i) => () => {
    setShotDir(i > activeShot ? 1 : -1);
    setActiveShot(i);
  };

  const handleGalleryMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    e.currentTarget.style.setProperty('--zx', `${x}%`);
    e.currentTarget.style.setProperty('--zy', `${y}%`);
  };

  const handleGalleryLeave = (e) => {
    e.currentTarget.style.setProperty('--zx', '50%');
    e.currentTarget.style.setProperty('--zy', '50%');
  };

  const handlePincodeChange = (e) =>
    setPincode(e.target.value.replace(/\D/g, '').slice(0, 6));

  const handleCheckDelivery = () => {
    if (pincode.length === 6) setDeliveryChecked(true);
  };

  const handleFbtToggle = (idx) => () => {
    setFbtSelected((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleQtyDown = () => setQty((q) => Math.max(1, q - 1));
  const handleQtyUp = () => setQty((q) => Math.min(9, q + 1));
  const handleWishToggle = () => setWish((w) => !w);
  const handleSizePick = (s) => () => setSize(s);
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  /* related-product card handlers: wishlist heart + add-to-cart,
     matching Home1's ah-wish / ah-btn behaviour, with the same
     "Added" morph feedback as the main buy box */
  const handleCardWishClick = (id) => (e) => {
    e.stopPropagation();
    setCardWish((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleRelatedAddToCart = (p) => (e) => {
    e.stopPropagation();

    showToast(`Added "${p.name}" to your cart.`);

    setCardAdded((prev) => ({
      ...prev,
      [p.id]: true,
    }));

    clearTimeout(cardAddedTimers.current[p.id]);

    cardAddedTimers.current[p.id] = setTimeout(() => {
      setCardAdded((prev) => ({
        ...prev,
        [p.id]: false,
      }));
    }, 1500);
  };

  const categoryLabel =
    product.type === 'strap'
      ? 'Straps'
      : product.type === 'accessory'
      ? 'Accessories'
      : 'Watches';

  return (
    <div className="pr-root">
      {/* ---------- header ---------- */}
      <header className="pr-header">
        <div className="pr-wrap pr-header__row">
          <button
            type="button"
            className="pr-back"
            onClick={goHome}
          >
            <Icon name="left" size={18} /> Back to shop
          </button>

          <button
            type="button"
            className="pr-logo"
            onClick={goHome}
          >
            amihive<i className="pr-logo__hand" />
          </button>

          <div className="pr-header__actions">
            <button
              type="button"
              className={`pr-iconbtn ${wish ? 'is-on' : ''}`}
              onClick={handleWishToggle}
              aria-pressed={wish}
              aria-label="Wishlist"
            >
              <Icon name="heart" key={`h-${wish}`} />
            </button>

            <button
              type="button"
              className="pr-iconbtn"
              aria-label="Cart"
            >
              <Icon name="bag" />
            </button>
          </div>
        </div>
      </header>

      {/* ---------- breadcrumb ---------- */}
      <nav
        className="pr-crumb pr-wrap"
        aria-label="Breadcrumb"
      >
        <button type="button" onClick={goHome}>
          Home
        </button>

        <span>/</span>
        <span>{categoryLabel}</span>
        <span>/</span>
        <strong>{product.name}</strong>
      </nav>

      <main>
        {/* ---------- gallery + buy box ---------- */}
        <section className="pr-detail pr-wrap">
          <div className="pr-gallery">
            <div
              className="pr-carousel"
              data-dir={shotDir}
              onMouseMove={handleGalleryMove}
              onMouseLeave={handleGalleryLeave}
            >
              <SmartImage
                key={activeShot}
                className="pr-gallery__img"
                src={shots[activeShot]}
                alt={product.name}
                eager
              />

              {discountPct > 0 && (
                <span className="pr-gallery__badge">
                  {discountPct}% off
                </span>
              )}

              <button
                type="button"
                className="pr-carousel__arrow pr-carousel__arrow--prev"
                onClick={handlePrevShot}
                aria-label="Previous photo"
              >
                <Icon name="left" size={20} />
              </button>

              <button
                type="button"
                className="pr-carousel__arrow pr-carousel__arrow--next"
                onClick={handleNextShot}
                aria-label="Next photo"
              >
                <Icon name="right" size={20} />
              </button>

              <div
                className="pr-carousel__dots"
                role="tablist"
                aria-label="Choose photo"
              >
                {shots.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === activeShot}
                    className={`pr-carousel__dot ${
                      i === activeShot ? 'is-on' : ''
                    }`}
                    onClick={handleThumbClick(i)}
                    aria-label={`Photo ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="pr-gallery__thumbs">
              {shots.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  className={`pr-thumb ${
                    i === activeShot ? 'is-on' : ''
                  }`}
                  onClick={handleThumbClick(i)}
                  aria-label={`View photo ${i + 1}`}
                  aria-pressed={i === activeShot}
                >
                  <SmartImage
                    className="pr-thumb__img"
                    src={src}
                    alt=""
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="pr-info">
            <span className="pr-info__tag">
              {product.type === 'strap'
                ? 'Strap'
                : product.type === 'accessory'
                ? 'Accessory'
                : 'Automatic collection'}
            </span>

            <h1>{product.name}</h1>

            <p className="pr-info__subtitle">
              {product.subtitle}
            </p>

            <div className="pr-info__rating">
              <Stars value={product.rating} />
              <strong>{product.rating}</strong>
              <span>({product.ratings} ratings)</span>
            </div>

            {/* cancelled/original amount first, then the real price,
                then the discount badge */}
            <div className="pr-info__price">
              {product.originalPrice > 0 && (
                <s>
                  ₹
                  {formatPrice(
                    product.originalPrice + strapExtra
                  )}
                </s>
              )}

              <strong key={total}>
                ₹{formatPrice(unitPrice)}
              </strong>

              {discountPct > 0 && (
                <span className="pr-info__pct">
                  {discountPct}% off
                </span>
              )}
            </div>

            {savePerUnit > 0 && (
              <span className="pr-info__save">
                You save ₹{formatPrice(savePerUnit)} on this piece
              </span>
            )}

            <span className="pr-info__tax">
              Inclusive of all taxes
            </span>

            <fieldset className="pr-opt">
              <legend>
                Dial <span>{dial.name}</span>
              </legend>

              <div className="pr-opt__row">
                {DIALS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    className={`pr-swatch ${
                      dial.id === d.id ? 'is-on' : ''
                    }`}
                    style={{ '--c': d.color }}
                    aria-pressed={dial.id === d.id}
                    aria-label={d.name}
                    onClick={() => setDial(d)}
                  />
                ))}
              </div>
            </fieldset>

            {/* strap — shown as real photo swatches, not a plain text pill */}
            <fieldset className="pr-opt">
              <legend>
                Strap{' '}
                <span>
                  {strapExtra
                    ? `+₹${formatPrice(strapExtra)}`
                    : 'Included'}
                </span>
              </legend>

              <div className="pr-opt__row pr-opt__row--strap">
                {STRAPS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`pr-strapcard ${
                      strap.id === s.id ? 'is-on' : ''
                    }`}
                    aria-pressed={strap.id === s.id}
                    onClick={() => setStrap(s)}
                  >
                    <SmartImage
                      className="pr-strapcard__img"
                      src={img(s.photo, 200)}
                      alt={s.name}
                    />

                    <span className="pr-strapcard__name">
                      {s.name}
                    </span>

                    <em className="pr-strapcard__price">
                      {s.extra
                        ? `+₹${formatPrice(s.extra)}`
                        : 'Included'}
                    </em>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="pr-opt">
              <legend>
                Case size <span>{size} mm</span>
              </legend>

              <div className="pr-opt__row">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`pr-seg ${
                      size === s ? 'is-on' : ''
                    }`}
                    aria-pressed={size === s}
                    onClick={handleSizePick(s)}
                  >
                    {s} mm
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="pr-buy" ref={buyRef}>
              <div className="pr-qty">
                <button
                  type="button"
                  onClick={handleQtyDown}
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span key={qty}>{qty}</span>

                <button
                  type="button"
                  onClick={handleQtyUp}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className={`pr-btn pr-btn--signal ${
                  addedMain ? 'is-added' : ''
                }`}
                onClick={addToCart}
              >
                {addedMain ? (
                  <>
                    <Icon name="check" size={18} /> Added to Cart
                    (x{qty})
                  </>
                ) : (
                  <>
                    <Icon name="bag" size={16} /> Add to cart
                  </>
                )}
              </button>

              <button
                type="button"
                className={`pr-btn pr-btn--line pr-wishbtn ${
                  wish ? 'is-on' : ''
                }`}
                onClick={handleWishToggle}
                aria-pressed={wish}
              >
                <Icon
                  name="heart"
                  size={18}
                  key={`w-${wish}`}
                />{' '}
                {wish ? 'Saved' : 'Save'}
              </button>
            </div>

            {/* ---- delivery check ---- */}
            <div className="pr-delivery">
              <div className="pr-delivery__row">
                <AnyIcon name="pin" size={18} />

                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter pincode"
                  value={pincode}
                  onChange={handlePincodeChange}
                  aria-label="Delivery pincode"
                />

                <button
                  type="button"
                  onClick={handleCheckDelivery}
                  disabled={pincode.length !== 6}
                >
                  Check
                </button>
              </div>

              {deliveryChecked && (
                <p className="pr-delivery__result">
                  <Icon name="check" size={15} /> Delivery by{' '}
                  {new Date(
                    Date.now() + 4 * 86400000
                  ).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                  })}{' '}
                  to {pincode} — free shipping, cash on delivery
                  available.
                </p>
              )}
            </div>

            <div className="pr-assure">
              {ASSURANCES.map((a) => (
                <div
                  className="pr-assure__item"
                  key={a.title}
                >
                  <Icon name={a.icon} size={18} />
                  <span>{a.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- offers ---------- */}
        <section
          ref={offersRef}
          className={`pr-offers pr-wrap pr-reveal ${
            offersIn ? 'is-in' : ''
          }`}
        >
          <h2 className="pr-section-title">
            Available offers
          </h2>

          <div className="pr-offers__grid">
            {OFFERS.map((o, i) => (
              <div
                className="pr-offer"
                style={{ '--i': i }}
                key={o.title}
              >
                <span className="pr-offer__icon">
                  <AnyIcon name={o.icon} size={19} />
                </span>

                <div>
                  <strong>{o.title}</strong>
                  <p>{o.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- highlights ---------- */}
        <section
          ref={highlightsRef}
          className={`pr-highlights pr-wrap pr-reveal ${
            highlightsIn ? 'is-in' : ''
          }`}
        >
          <h2 className="pr-section-title">
            Highlights
          </h2>

          <div className="pr-highlights__grid">
            {highlights.map((h, i) => (
              <div
                className="pr-highlight"
                style={{ '--i': i }}
                key={h}
              >
                <span className="pr-highlight__icon">
                  <Icon name="check" size={16} />
                </span>

                <span>{h}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- about / description ---------- */}
        <section
          ref={aboutRef}
          className={`pr-about pr-wrap pr-reveal ${
            aboutIn ? 'is-in' : ''
          }`}
        >
          <div className="pr-about__grid">
            <div className="pr-about__media">
              <SmartImage
                className="pr-about__img"
                src={img(product.image, 900)}
                alt={product.name}
              />

              <div className="pr-about__stamp">
                <Icon name="shield" size={20} />
                <span>Built to last</span>
              </div>
            </div>

            <div className="pr-about__copy">
              <span className="pr-eyebrow">
                The details matter
              </span>

              <h2 className="pr-section-title">
                Made for everyday time
              </h2>

              <p>
                Designed with a focus on timeless proportions,
                reliable materials and details that become more
                enjoyable with every wear.
              </p>

              <p>
                From the movement inside to the finishing outside,
                every part is chosen to make the watch feel
                considered without becoming complicated.
              </p>

              <div className="pr-about__facts">
                <div>
                  <strong>5 ATM</strong>
                  <span>Water resistance</span>
                </div>

                <div>
                  <strong>2 yr</strong>
                  <span>International warranty</span>
                </div>

                <div>
                  <strong>316L</strong>
                  <span>Steel case</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- specifications ---------- */}
        <section
          ref={specRef}
          className={`pr-specgrid pr-wrap pr-reveal ${
            specIn ? 'is-in' : ''
          }`}
        >
          <h2 className="pr-section-title">
            Specifications
          </h2>

          <div className="pr-specgrid__grid">
            {specs.map((s) => (
              <div className="pr-spec" key={s.label}>
                <span className="pr-spec__icon">
                  <Icon name={s.icon} size={18} />
                </span>

                <div>
                  <span>{s.label}</span>
                  <strong>{s.value}</strong>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- materials ---------- */}
        <section
          ref={materialsRef}
          className={`pr-materials pr-wrap pr-reveal ${
            materialsIn ? 'is-in' : ''
          }`}
        >
          <h2 className="pr-section-title">
            Materials & craft
          </h2>

          <div className="pr-materials__grid">
            {MATERIALS.map((m) => (
              <article
                className="pr-material"
                key={m.title}
              >
                <span className="pr-material__icon">
                  <AnyIcon name={m.icon} size={22} />
                </span>

                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- size guide ---------- */}
        <section
          ref={sizeRef}
          className={`pr-sizeguide pr-wrap pr-reveal ${
            sizeIn ? 'is-in' : ''
          }`}
        >
          <div className="pr-sizeguide__head">
            <div>
              <h2 className="pr-section-title">
                Find your size
              </h2>

              <p>
                Use your wrist measurement as a starting point.
                The fit can be adjusted with the included strap
                options.
              </p>
            </div>

            <AnyIcon name="ruler" size={28} />
          </div>

          <div className="pr-sizeguide__table">
            <div className="pr-sizeguide__row pr-sizeguide__row--head">
              <span>Case</span>
              <span>Wrist</span>
              <span>Fit</span>
            </div>

            {SIZE_GUIDE.map((item) => (
              <div
                className={`pr-sizeguide__row ${
                  size === item.size ? 'is-selected' : ''
                }`}
                key={item.size}
              >
                <strong>{item.size} mm</strong>
                <span>{item.wrist}</span>
                <span>{item.note}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- care ---------- */}
        <section
          ref={careRef}
          className={`pr-care pr-wrap pr-reveal ${
            careIn ? 'is-in' : ''
          }`}
        >
          <div className="pr-care__grid">
            <div>
              <h2 className="pr-section-title">
                Care guide
              </h2>

              <p className="pr-care__intro">
                A little care keeps the finish looking sharp and
                the movement performing as intended.
              </p>
            </div>

            <ul className="pr-care__list">
              {CARE_TIPS.map((tip, i) => (
                <li key={tip}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <p>{tip}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- reviews ---------- */}
        <section
          ref={reviewRef}
          className={`pr-reviewsection pr-wrap pr-reveal ${
            reviewIn ? 'is-in' : ''
          }`}
        >
          <div className="pr-reviewsection__head">
            <div>
              <h2 className="pr-section-title">
                Customer reviews
              </h2>

              <div className="pr-reviewscore">
                <strong>{product.rating}</strong>

                <div>
                  <Stars value={product.rating} />
                  <span>
                    Based on {product.ratings} ratings
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="pr-btn pr-btn--line"
            >
              Write a review
            </button>
          </div>

          <div className="pr-reviewsection__body">
            <div className="pr-ratingbars">
              {ratingBars.map((value, i) => (
                <div className="pr-ratingbar" key={i}>
                  <span>{5 - i}</span>
                  <div>
                    <span style={{ width: `${value}%` }} />
                  </div>
                  <em>{value}%</em>
                </div>
              ))}
            </div>

            <div className="pr-testimonials">
              {TESTIMONIALS.slice(0, 3).map((t, i) => (
                <article
                  className="pr-testimonial"
                  key={t.name || i}
                >
                  <div className="pr-testimonial__top">
                    <strong>{t.name}</strong>
                    <Stars value={t.rating || 5} />
                  </div>

                  <p>{t.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Q&A ---------- */}
        <section
          ref={qnaRef}
          className={`pr-qna pr-wrap pr-reveal ${
            qnaIn ? 'is-in' : ''
          }`}
        >
          <h2 className="pr-section-title">
            Questions, answered
          </h2>

          <div className="pr-qna__grid">
            {QNA.map((item) => (
              <details
                className="pr-qna__item"
                key={item.q}
              >
                <summary>
                  <span>{item.q}</span>
                  <Icon name="plus" size={18} />
                </summary>

                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ---------- frequently bought together ---------- */}
        <section
          ref={fbtRef}
          className={`pr-fbt pr-wrap pr-reveal ${
            fbtIn ? 'is-in' : ''
          }`}
        >
          <div className="pr-fbt__head">
            <div>
              <h2 className="pr-section-title">
                Frequently bought together
              </h2>

              <p>
                Pair your watch with a few useful essentials.
              </p>
            </div>
          </div>

          <div className="pr-fbt__grid">
            <div className="pr-fbt__items">
              {fbtItems.map((item, idx) => (
                <div
                  className={`pr-fbt__item ${
                    fbtSelected[idx] ? 'is-selected' : ''
                  }`}
                  key={item.id}
                >
                  <button
                    type="button"
                    className="pr-fbt__check"
                    onClick={handleFbtToggle(idx)}
                    aria-pressed={!!fbtSelected[idx]}
                  >
                    {fbtSelected[idx] && (
                      <Icon name="check" size={14} />
                    )}
                  </button>

                  <SmartImage
                    className="pr-fbt__img"
                    src={img(item.image, 300)}
                    alt={item.name}
                  />

                  <div className="pr-fbt__copy">
                    <strong>{item.name}</strong>
                    <span>
                      ₹{formatPrice(item.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pr-fbt__summary">
              <span>
                {fbtCount} item{fbtCount === 1 ? '' : 's'} selected
              </span>

              <strong>
                ₹{formatPrice(fbtTotal)}
              </strong>

              <button
                type="button"
                className="pr-btn pr-btn--signal"
                onClick={addFbtToCart}
                disabled={!fbtCount}
              >
                <Icon name="bag" size={16} />
                Add selected
              </button>
            </div>
          </div>
        </section>

        {/* ---------- related ---------- */}
        <section
          ref={relatedRef}
          className={`pr-related pr-wrap pr-reveal ${
            relatedIn ? 'is-in' : ''
          }`}
        >
          <div className="pr-related__head">
            <div>
              <h2 className="pr-section-title">
                You may also like
              </h2>

              <p>
                More pieces from the same collection.
              </p>
            </div>
          </div>

          <div className="pr-related__grid">
            {related.map((p) => (
              <article
                className="pr-relatedcard"
                key={p.id}
                onClick={() => goToProductPage(p.id)}
              >
                <div className="pr-relatedcard__media">
                  <SmartImage
                    className="pr-relatedcard__img"
                    src={img(p.image, 500)}
                    alt={p.name}
                  />

                  <button
                    type="button"
                    className={`pr-relatedcard__wish ${
                      cardWish[p.id] ? 'is-on' : ''
                    }`}
                    onClick={handleCardWishClick(p.id)}
                    aria-label={
                      cardWish[p.id]
                        ? 'Remove from wishlist'
                        : 'Add to wishlist'
                    }
                    aria-pressed={!!cardWish[p.id]}
                  >
                    <Icon
                      name="heart"
                      size={18}
                    />
                  </button>

                  {p.originalPrice > p.price && (
                    <span className="pr-relatedcard__badge">
                      {Math.round(
                        ((p.originalPrice - p.price) /
                          p.originalPrice) *
                          100
                      )}
                      % off
                    </span>
                  )}
                </div>

                <div className="pr-relatedcard__body">
                  <span className="pr-relatedcard__type">
                    {p.type === 'strap'
                      ? 'Strap'
                      : p.type === 'accessory'
                      ? 'Accessory'
                      : 'Watch'}
                  </span>

                  <h3>{p.name}</h3>

                  <div className="pr-relatedcard__rating">
                    <Stars value={p.rating} />
                    <span>{p.rating}</span>
                  </div>

                  <div className="pr-relatedcard__price">
                    <strong>
                      ₹{formatPrice(p.price)}
                    </strong>

                    {p.originalPrice > p.price && (
                      <s>
                        ₹{formatPrice(p.originalPrice)}
                      </s>
                    )}
                  </div>

                  <button
                    type="button"
                    className={`pr-btn pr-btn--ink pr-btn--sm ${
                      cardAdded[p.id] ? 'is-added' : ''
                    }`}
                    onClick={handleRelatedAddToCart(p)}
                  >
                    {cardAdded[p.id] ? (
                      <>
                        <Icon name="check" size={15} />
                        Added
                      </>
                    ) : (
                      <>
                        <Icon name="bag" size={15} />
                        Add to cart
                      </>
                    )}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* ---------- sticky mini buy bar ---------- */}
      <div
        className={`pr-mini ${
          miniVisible ? 'is-visible' : ''
        }`}
      >
        <div className="pr-mini__inner pr-wrap">
          <div className="pr-mini__product">
            <SmartImage
              className="pr-mini__img"
              src={img(product.image, 120)}
              alt={product.name}
            />

            <div>
              <strong>{product.name}</strong>
              <span>
                ₹{formatPrice(unitPrice)}
              </span>
            </div>
          </div>

          <div className="pr-mini__actions">
            <button
              type="button"
              className={`pr-btn pr-btn--signal ${
                addedMain ? 'is-added' : ''
              }`}
              onClick={addToCart}
            >
              {addedMain ? (
                <>
                  <Icon name="check" size={17} />
                  Added to Cart (x{qty})
                </>
              ) : (
                <>
                  <Icon name="bag" size={16} />
                  Add to cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ---------- toast ---------- */}
      <div
        className={`pr-toast ${toast ? 'is-visible' : ''}`}
        role="status"
        aria-live="polite"
      >
        <Icon name="check" size={17} />
        <span>{toast}</span>
      </div>

      {/* ---------- back to top ---------- */}
      <button
        type="button"
        className={`pr-top ${showTop ? 'is-visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <AnyIcon name="up" size={18} />
      </button>
    </div>
  );
}

export default ProductRedesign1;