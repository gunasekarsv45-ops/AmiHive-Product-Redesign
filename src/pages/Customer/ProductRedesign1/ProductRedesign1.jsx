import { useEffect, useMemo, useRef, useState } from 'react';
import './ProductRedesign1.css';
import '../Categories/Categories.css';
import { SmartImage, img } from '../Home1/ProductGallery';
import { Stars, formatPrice, goToProductPage, TESTIMONIALS } from '../Home1/Home1';
import { ALL_PRODUCTS } from '../Shared/catalog';
import { TopTicker, SiteHeader, SiteFooter, Ico, navigate, useToast } from '../Shared/SiteChrome';

/* ------------------------------------------------------------------
   DATA
------------------------------------------------------------------- */
const TYPE_LABEL = { watch: 'Watches', strap: 'Straps', accessory: 'Accessories' };
const TYPE_SINGLE = { watch: 'Automatic watch', strap: 'Watch strap', accessory: 'Watch accessory' };
const COLOUR_LABEL = { watch: 'Dial colour', strap: 'Strap colour', accessory: 'Colour' };

/* Colour options for every product. `photo` is a key from PHOTO in
   ProductGallery.jsx, so choosing a colour also changes the main photo. */
const DIAL_COLOURS = [
  { id: 'blue', name: 'Sunburst blue', color: '#1d4c8c', photo: 'aster' },
  { id: 'slate', name: 'Slate grey', color: '#46525a', photo: 'blackDial' },
  { id: 'forest', name: 'Forest green', color: '#1c5a44', photo: 'darkFace' },
  { id: 'black', name: 'Midnight black', color: '#15181a', photo: 'night' },
  { id: 'champagne', name: 'Champagne', color: '#d9c39a', photo: 'goldClose' },
  { id: 'burgundy', name: 'Burgundy', color: '#6e1f2b', photo: 'wristBlack' },
];

const STRAP_COLOURS = [
  { id: 'cognac', name: 'Cognac', color: '#a8622f', photo: 'strap' },
  { id: 'black', name: 'Black', color: '#1b1b1b', photo: 'night' },
  { id: 'tan', name: 'Tan', color: '#c49a6c', photo: 'tanWrist' },
  { id: 'navy', name: 'Navy', color: '#1f3557', photo: 'blackDial' },
  { id: 'olive', name: 'Olive', color: '#5a6b3a', photo: 'darkFace' },
  { id: 'steel', name: 'Steel', color: '#b9bfc4', photo: 'jubilee' },
];

const ACCESSORY_COLOURS = [
  { id: 'tan', name: 'Tan leather', color: '#b07a45', photo: 'desk' },
  { id: 'black', name: 'Jet black', color: '#1b1b1b', photo: 'closeup' },
  { id: 'navy', name: 'Navy', color: '#1f3557', photo: 'studio' },
  { id: 'green', name: 'Forest green', color: '#1c5a44', photo: 'darkFace' },
  { id: 'burgundy', name: 'Burgundy', color: '#6e1f2b', photo: 'strap' },
];

const getColours = (p) =>
  p.type === 'strap' ? STRAP_COLOURS : p.type === 'accessory' ? ACCESSORY_COLOURS : DIAL_COLOURS;

const defaultColourId = (p) => {
  const list = getColours(p);
  return list.some((c) => c.id === p.dial) ? p.dial : list[0].id;
};

/* Strap choices for watches */
const STRAP_OPTIONS = [
  { id: 'leather', name: 'Cognac leather', extra: 0, photo: 'strap', color: '#a8622f' },
  { id: 'black', name: 'Black leather', extra: 0, photo: 'night', color: '#1b1b1b' },
  { id: 'steel', name: 'Steel jubilee', extra: 3490, photo: 'jubilee', color: '#b9bfc4' },
  { id: 'mesh', name: 'Milanese mesh', extra: 2790, photo: 'steelLine', color: '#9aa2a8' },
];

const SIZE_OPTIONS = [
  { size: 38, wrist: '150–175 mm', fit: 'Slim fit', best: 'Compact fit, popular for slimmer wrists.' },
  { size: 40, wrist: '165–190 mm', fit: 'Classic fit', best: 'The most versatile size for most wrists.' },
  { size: 42, wrist: '180–210 mm', fit: 'Bold fit', best: 'A stronger presence for larger frames.' },
];

const OFFERS = [
  { icon: 'percent', label: 'Bank offer', text: '10% instant discount up to ₹1,500 on select bank cards' },
  { icon: 'card', label: 'No cost EMI', text: 'Available above ₹3,000, starting from 3 months' },
  { icon: 'tag', label: 'Exchange', text: 'Up to ₹2,000 off when you exchange your old watch' },
];

const MATERIALS = [
  { icon: 'star', title: 'Sapphire crystal', text: 'A scratch-resistant sapphire lens keeps the dial clear through years of daily wear.' },
  { icon: 'shield', title: 'Stainless steel case', text: 'Solid 316L stainless steel, brushed and polished by hand for a lasting finish.' },
  { icon: 'gift', title: 'Considered materials', text: 'Full-grain leather and steel bracelets, chosen to age well rather than wear out.' },
];

const CARE_TIPS = [
  'Wipe the case and crystal with a soft, dry cloth after each wear.',
  'Keep it away from perfumes, solvents and household chemicals.',
  'Avoid prolonged water exposure if you chose a leather strap.',
  'Service the movement every 3–5 years to keep it running accurately.',
];

const QNA = [
  {
    q: 'Is this water resistant enough to swim with?',
    a: 'Yes. It is rated to 5 ATM, which covers rain, hand-washing and swimming. It is not built for diving or high-pressure water sports.',
  },
  {
    q: 'Does it come with the warranty card and box?',
    a: 'Every unit ships in its original box with a 2-year international warranty card and a printed care guide.',
  },
  {
    q: 'Can I exchange the strap or case size after delivery?',
    a: 'Yes, a 7-day no-questions-asked exchange applies if the strap length or case size does not fit.',
  },
  {
    q: 'Is Cash on Delivery available?',
    a: 'Cash on Delivery is available on most pincodes. Enter your pincode above to check delivery and COD for your area.',
  },
];

const EXTRA_REVIEWS = [
  { initials: 'KR', name: 'Karthik R.', date: '2 months ago', rating: 5, text: 'Quick-release bars made the strap swap effortless. Finish and feel are genuinely good.' },
  { initials: 'DS', name: 'Divya S.', date: '2 months ago', rating: 5, text: 'Keeps good time and arrived insured and well packed. Exactly as shown in the photos.' },
];

const getProduct = (id) => ALL_PRODUCTS.find((p) => p.id === id) || ALL_PRODUCTS[0];

function getHighlights(p) {
  if (p.type === 'strap') {
    return [
      'Genuine leather / steel jubilee construction',
      'Quick-release spring bars, no tools needed',
      'Fits standard 20 mm lug width cases',
      '6 month strap warranty against material defects',
    ];
  }

  if (p.type === 'accessory') {
    return [
      'Premium vegan leather exterior',
      'Soft anti-scratch microfiber lining',
      'Holds up to 3 watches securely',
      'Compact, travel-friendly footprint',
    ];
  }

  return [
    'Automatic, self-winding movement, no battery needed',
    'Scratch-resistant sapphire crystal glass',
    '5 ATM water resistance for rain and splashes',
    'Screw-down case back for a secure seal',
    '2 year international manufacturer warranty',
    'Free insured delivery and 7 day returns',
  ];
}

function getSpecGroups(p, colour, strap, size) {
  const general = [
    ['Brand', 'Amihive'],
    ['Model name', p.name],
    ['Collection', p.collection || 'Essentials'],
    ['Type', TYPE_SINGLE[p.type]],
    [COLOUR_LABEL[p.type], colour.name],
  ];

  if (p.type === 'strap') {
    return [
      { title: 'General', rows: general },
      {
        title: 'Material and fit',
        rows: [
          ['Material', 'Full-grain leather / 316L steel'],
          ['Lug width', '20 mm'],
          ['Release', 'Quick-release spring bars'],
          ['Length', 'Adjustable, 120 mm + 80 mm'],
        ],
      },
      {
        title: 'Warranty',
        rows: [
          ['Warranty', '6 months against material defects'],
          ['In the box', 'Strap, spring bars, care card'],
        ],
      },
    ];
  }

  if (p.type === 'accessory') {
    return [
      { title: 'General', rows: general },
      {
        title: 'Build',
        rows: [
          ['Exterior', 'Premium vegan leather'],
          ['Lining', 'Soft anti-scratch microfiber'],
          ['Capacity', 'Up to 3 watches'],
        ],
      },
      {
        title: 'Warranty',
        rows: [
          ['Warranty', '6 months against material defects'],
          ['In the box', 'Accessory, dust bag, care card'],
        ],
      },
    ];
  }

  return [
    { title: 'General', rows: general },
    {
      title: 'Dial and case',
      rows: [
        ['Display', 'Analog'],
        ['Crystal', 'Sapphire, scratch resistant'],
        ['Case size', `${size} mm`],
        ['Case material', '316L stainless steel'],
        ['Case back', 'Screw-down, sealed'],
        ['Strap', strap.name],
        ['Water resistance', '5 ATM'],
      ],
    },
    {
      title: 'Movement and warranty',
      rows: [
        ['Movement', 'Automatic, self-winding'],
        ['Accuracy', '-20 / +40 seconds a day'],
        ['Warranty', '2 years, international'],
        ['In the box', 'Watch, box, warranty card, care guide'],
      ],
    },
  ];
}

function getRatingBreakdown(rating) {
  if (rating >= 4.7) return [72, 18, 6, 2, 2];
  if (rating >= 4.5) return [62, 24, 8, 4, 2];
  return [50, 28, 12, 6, 4];
}

const pctOff = (p) =>
  p.originalPrice > p.price ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;

/* ------------------------------------------------------------------
   PAGE
------------------------------------------------------------------- */
function ProductRedesign1({ productId }) {
  const product = useMemo(() => getProduct(productId), [productId]);
  const isWatch = product.type === 'watch';
  const colours = getColours(product);

  const [toastNode, showToast] = useToast();
  const [colourId, setColourId] = useState(() => defaultColourId(product));
  const [strapId, setStrapId] = useState(STRAP_OPTIONS[0].id);
  const [size, setSize] = useState(40);
  const [wish, setWish] = useState(false);
  const [activeShot, setActiveShot] = useState(0);
  const [shotDir, setShotDir] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryChecked, setDeliveryChecked] = useState(false);
  const [fbtSelected, setFbtSelected] = useState({ 0: true, 1: true, 2: true });
  const [cardWish, setCardWish] = useState({});
  const [addedMain, setAddedMain] = useState(false);
  const [extraCart, setExtraCart] = useState(0);
  const [cardAdded, setCardAdded] = useState({});
  const cardTimers = useRef({});

  const colour = colours.find((c) => c.id === colourId) || colours[0];
  const strap = STRAP_OPTIONS.find((s) => s.id === strapId) || STRAP_OPTIONS[0];

  /* reset everything whenever a different product is opened */
  useEffect(() => {
    setColourId(defaultColourId(product));
    setStrapId(STRAP_OPTIONS[0].id);
    setSize(40);
    setWish(false);
    setActiveShot(0);
    setShotDir(1);
    setPincode('');
    setDeliveryChecked(false);
    setFbtSelected({ 0: true, 1: true, 2: true });
    setAddedMain(false);
    setCardAdded({});
    Object.values(cardTimers.current).forEach(clearTimeout);
    cardTimers.current = {};
    window.scrollTo(0, 0);
  }, [product]);

  useEffect(
    () => () => {
      Object.values(cardTimers.current).forEach(clearTimeout);
    },
    []
  );

  /* photos: main, chosen colour, chosen strap, then details */
  const shotKeys = useMemo(() => {
    const keys = [product.image, colour.photo];
    if (isWatch) keys.push(strap.photo);
    keys.push('closeup', 'studio');
    return keys.filter((k, i) => keys.indexOf(k) === i).slice(0, 5);
  }, [product, colour, strap, isWatch]);

  const shots = shotKeys.map((k) => img(k, 1100));
  const safeShot = Math.min(activeShot, shots.length - 1);

  const strapExtra = isWatch ? strap.extra : 0;
  const unitPrice = product.price + strapExtra;
  const discountPct = pctOff(product);
  const savePerUnit = product.originalPrice > product.price ? product.originalPrice - product.price : 0;

  const specGroups = useMemo(() => getSpecGroups(product, colour, strap, size), [product, colour, strap, size]);
  const highlights = useMemo(() => getHighlights(product), [product]);
  const ratingBars = useMemo(() => getRatingBreakdown(product.rating), [product]);

  const reviews = [...TESTIMONIALS, ...EXTRA_REVIEWS];

  const similar = useMemo(() => {
    const pool = ALL_PRODUCTS.filter((p, i, arr) => p.id !== product.id && arr.findIndex((q) => q.name === p.name) === i && p.name !== product.name);
    pool.sort((a, b) => (b.type === product.type ? 1 : 0) - (a.type === product.type ? 1 : 0));
    return pool.slice(0, 8);
  }, [product]);

  const fbtItems = useMemo(() => [product, ...similar.slice(0, 2)], [product, similar]);
  const fbtTotal = fbtItems.reduce((sum, item, idx) => (fbtSelected[idx] ? sum + item.price : sum), 0);
  const fbtCount = Object.values(fbtSelected).filter(Boolean).length;

  const wishTotal = (wish ? 1 : 0) + Object.values(cardWish).filter(Boolean).length;
  const cartCount = (addedMain ? 1 : 0) + extraCart;

  const categoryLabel = TYPE_LABEL[product.type] || 'Watches';

  /* ---------- handlers ---------- */
  const handleColour = (c) => () => {
    setColourId(c.id);
    const first = [product.image, c.photo].filter((k, i, a) => a.indexOf(k) === i);
    setShotDir(1);
    setActiveShot(first.length > 1 ? 1 : 0);
  };

  const handlePrev = () => {
    setShotDir(-1);
    setActiveShot((i) => (Math.min(i, shots.length - 1) - 1 + shots.length) % shots.length);
  };

  const handleNext = () => {
    setShotDir(1);
    setActiveShot((i) => (Math.min(i, shots.length - 1) + 1) % shots.length);
  };

  const handleThumb = (i) => () => {
    setShotDir(i > safeShot ? 1 : -1);
    setActiveShot(i);
  };

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--zx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    e.currentTarget.style.setProperty('--zy', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  const handleLeave = (e) => {
    e.currentTarget.style.setProperty('--zx', '50%');
    e.currentTarget.style.setProperty('--zy', '50%');
  };

  const toggleWish = () => {
    setWish((w) => !w);
    showToast(wish ? 'Removed from your wishlist.' : 'Saved to your wishlist.');
  };

  const addToCart = () => {
    if (addedMain) {
      setAddedMain(false);
      showToast(`Removed "${product.name}" from your cart.`);
      return;
    }

    setAddedMain(true);
    showToast(`Added "${product.name}" to your cart.`);
  };

  /* Buy now goes to the checkout page, where quantity is chosen */
  const buyNow = () => {
    const params = new URLSearchParams({
      id: product.id,
      colour: colour.name,
      strap: isWatch ? strap.name : '',
      extra: String(strapExtra),
      size: isWatch ? String(size) : '',
    });

    navigate(`/checkout?${params.toString()}`);
  };

  const handleCheckDelivery = () => {
    if (pincode.length === 6) setDeliveryChecked(true);
  };

  const addFbtToCart = () => {
    setExtraCart((n) => n + fbtCount);
    showToast(`Added ${fbtCount} item${fbtCount === 1 ? '' : 's'} to your cart.`);
  };

  const handleCardWish = (id) => (e) => {
    e.stopPropagation();
    setCardWish((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCardAdd = (p) => (e) => {
    e.stopPropagation();
    setExtraCart((n) => n + 1);
    showToast(`Added "${p.name}" to your cart.`);
    setCardAdded((prev) => ({ ...prev, [p.id]: true }));

    clearTimeout(cardTimers.current[p.id]);
    cardTimers.current[p.id] = setTimeout(() => {
      setCardAdded((prev) => ({ ...prev, [p.id]: false }));
    }, 1500);
  };

  const scrollToGuide = () => {
    const el = document.getElementById('size-guide');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const cartLabel = addedMain ? (
    <>
      <Ico name="check" size={16} /> Added to cart
    </>
  ) : (
    <>
      <Ico name="bag" size={16} /> Add to cart
    </>
  );

  return (
    <div className="sx-root pd-root">
      <TopTicker />
      <SiteHeader active="" wishCount={wishTotal} cartCount={cartCount} onToast={showToast} />

      <nav className="sx-crumb sx-wrap" aria-label="Breadcrumb">
        <button type="button" onClick={() => navigate('/')}>
          Home
        </button>
        <span>/</span>
        <button type="button" onClick={() => navigate(`/categories?cat=${product.type}`)}>
          {categoryLabel}
        </button>
        <span>/</span>
        <strong>{product.name}</strong>
      </nav>

      <main>
        {/* ---------- gallery + buy box ---------- */}
        <section className="sx-wrap pd-detail">
          <div className="pd-gallery">
            <div className="pd-stage" data-dir={shotDir} onMouseMove={handleMove} onMouseLeave={handleLeave}>
              <SmartImage
                key={`${safeShot}-${shots[safeShot]}`}
                className="pd-stage__img"
                src={shots[safeShot]}
                alt={product.name}
                eager
              />

              {discountPct > 0 && <span className="pd-stage__badge">{discountPct}% off</span>}

              <button
                type="button"
                className={`pd-heart ${wish ? 'is-on' : ''}`}
                onClick={toggleWish}
                aria-pressed={wish}
                aria-label={wish ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Ico name="heart" size={22} />
              </button>

              <button type="button" className="pd-stage__arrow pd-stage__arrow--prev" onClick={handlePrev} aria-label="Previous photo">
                <Ico name="left" size={20} />
              </button>

              <button type="button" className="pd-stage__arrow pd-stage__arrow--next" onClick={handleNext} aria-label="Next photo">
                <Ico name="right" size={20} />
              </button>

              <div className="pd-stage__dots" role="tablist" aria-label="Choose photo">
                {shots.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    role="tab"
                    aria-selected={i === safeShot}
                    className={`pd-stage__dot ${i === safeShot ? 'is-on' : ''}`}
                    onClick={handleThumb(i)}
                    aria-label={`Photo ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="pd-thumbs">
              {shots.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className={`pd-thumb ${i === safeShot ? 'is-on' : ''}`}
                  onClick={handleThumb(i)}
                  aria-label={`View photo ${i + 1}`}
                  aria-pressed={i === safeShot}
                >
                  <SmartImage className="pd-thumb__img" src={img(shotKeys[i], 240)} alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className="pd-info">
            <div className="pd-chips">
              <span className="pd-chip">{product.collection || 'Essentials'} collection</span>
              {product.isNew && <span className="pd-chip">New arrival</span>}
            </div>

            <h1>{product.name}</h1>
            <p className="pd-sub">{product.subtitle}</p>

            <div className="pd-ratingrow">
              <span className="pd-rate">
                {product.rating} <Ico name="star" size={12} filled />
              </span>
              <span>{product.ratings} ratings</span>
              <span className="pd-assured">
                <Ico name="shield" size={16} /> Amihive Assured
              </span>
            </div>

            <div className="pd-price">
              <strong key={unitPrice}>₹{formatPrice(unitPrice)}</strong>
              {product.originalPrice > product.price && <s>₹{formatPrice(product.originalPrice + strapExtra)}</s>}
              {discountPct > 0 && <em>{discountPct}% off</em>}
            </div>

            {savePerUnit > 0 && <span className="pd-save">You save ₹{formatPrice(savePerUnit)} on this piece</span>}
            <span className="pd-tax">Inclusive of all taxes</span>

            {/* offers */}
            <ul className="pd-offerlist" aria-label="Available offers">
              <h3>Available offers</h3>
              {OFFERS.map((o) => (
                <li key={o.label}>
                  <Ico name={o.icon} size={17} />
                  <span>
                    <b>{o.label}:</b> {o.text}
                  </span>
                </li>
              ))}
              <button type="button" onClick={() => navigate('/offers')}>
                View all offers
              </button>
            </ul>

            {/* colour */}
            <div className="pd-opt">
              <div className="pd-opt__head">
                <strong>
                  {COLOUR_LABEL[product.type]}
                  <span>{colour.name}</span>
                </strong>
              </div>

              <div className="pd-colours">
                {colours.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`pd-swatch ${colour.id === c.id ? 'is-on' : ''}`}
                    style={{ '--c': c.color }}
                    aria-pressed={colour.id === c.id}
                    aria-label={c.name}
                    onClick={handleColour(c)}
                  >
                    <span className="pd-swatch__dot" />
                    <span className="pd-swatch__name">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* strap (watches only) */}
            {isWatch && (
              <div className="pd-opt">
                <div className="pd-opt__head">
                  <strong>
                    Strap
                    <span>{strapExtra ? `+₹${formatPrice(strapExtra)}` : 'Included'}</span>
                  </strong>
                </div>

                <div className="pd-straps">
                  {STRAP_OPTIONS.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      className={`pd-strap ${strap.id === s.id ? 'is-on' : ''}`}
                      style={{ '--c': s.color }}
                      aria-pressed={strap.id === s.id}
                      onClick={() => setStrapId(s.id)}
                    >
                      <SmartImage className="pd-strap__img" src={img(s.photo, 200)} alt={s.name} />

                      <span className="pd-strap__copy">
                        <strong>{s.name}</strong>
                        <span>
                          <i />
                          {s.extra ? `+₹${formatPrice(s.extra)}` : 'Included'}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* case size (watches only) */}
            {isWatch && (
              <div className="pd-opt">
                <div className="pd-opt__head">
                  <strong>
                    Case size
                    <span>{size} mm</span>
                  </strong>
                  <button type="button" onClick={scrollToGuide}>
                    Size guide
                  </button>
                </div>

                <div className="pd-sizes">
                  {SIZE_OPTIONS.map((s) => (
                    <button
                      key={s.size}
                      type="button"
                      className={`pd-size ${size === s.size ? 'is-on' : ''}`}
                      aria-pressed={size === s.size}
                      onClick={() => setSize(s.size)}
                    >
                      <span className="pd-size__tick">
                        <Ico name="check" size={12} />
                      </span>
                      <strong>
                        {s.size}
                        <small>mm</small>
                      </strong>
                      <span>Wrist {s.wrist}</span>
                      <em>{s.fit}</em>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* delivery */}
            <div className="pd-delivery">
              <h3>Delivery</h3>

              <div className="pd-delivery__row">
                <Ico name="pin" size={18} />

                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter delivery pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  aria-label="Delivery pincode"
                />

                <button
                  type="button"
                  className="sx-btn sx-btn--ink sx-btn--sm"
                  onClick={handleCheckDelivery}
                  disabled={pincode.length !== 6}
                >
                  Check
                </button>
              </div>

              {deliveryChecked && (
                <p className="pd-delivery__result">
                  <Ico name="check" size={15} />
                  <span>
                    Delivery by{' '}
                    {new Date(Date.now() + 4 * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}{' '}
                    to {pincode}. Free shipping, cash on delivery available.
                  </span>
                </p>
              )}

              <div className="pd-services">
                <div className="pd-service">
                  <span>
                    <Ico name="truck" size={17} />
                  </span>
                  Free insured delivery
                </div>
                <div className="pd-service">
                  <span>
                    <Ico name="returns" size={17} />
                  </span>
                  7 day easy returns
                </div>
                <div className="pd-service">
                  <span>
                    <Ico name="clock" size={17} />
                  </span>
                  {isWatch ? '2 year warranty' : '6 month warranty'}
                </div>
                <div className="pd-service">
                  <span>
                    <Ico name="shield" size={17} />
                  </span>
                  Certified original
                </div>
              </div>
            </div>

            {/* actions (desktop) */}
            <div className="pd-actions">
              <button
                type="button"
                className={`sx-btn sx-btn--ink ${addedMain ? 'is-added' : ''}`}
                onClick={addToCart}
              >
                {cartLabel}
              </button>

              <button type="button" className="sx-btn sx-btn--signal" onClick={buyNow}>
                <Ico name="bag" size={16} /> Buy now
              </button>
            </div>

            <p className="pd-seller">
              Sold by <b>Amihive Timepieces</b> · 4.8★ seller rating · GST invoice available
            </p>
          </div>
        </section>

        {/* ---------- content blocks ---------- */}
        <div className="sx-wrap pd-blocks">
          <section className="pd-block">
            <h2 className="sx-title">Highlights</h2>

            <div className="pd-checks">
              {highlights.map((h) => (
                <div className="pd-check" key={h}>
                  <span>
                    <Ico name="check" size={15} />
                  </span>
                  {h}
                </div>
              ))}
            </div>
          </section>

          <section className="pd-block pd-desc">
            <h2 className="sx-title">Product description</h2>

            <p>
              {product.name} is {isWatch ? 'an automatic watch' : product.type === 'strap' ? 'a watch strap' : 'a watch accessory'}{' '}
              designed with a focus on timeless proportions, reliable materials and details that become more enjoyable
              with every wear. Available in {colours.length} colours, so you can pick the one that suits you.
            </p>

            <p>
              From the movement inside to the finishing outside, every part is chosen to make the piece feel considered
              without becoming complicated. Each unit is inspected before dispatch and ships fully insured with a
              certificate of authenticity.
            </p>

            <div className="pd-facts">
              <div>
                <strong>{colours.length}</strong>
                <span>Colours available</span>
              </div>
              <div>
                <strong>{isWatch ? '5 ATM' : '20 mm'}</strong>
                <span>{isWatch ? 'Water resistance' : 'Lug width'}</span>
              </div>
              <div>
                <strong>{isWatch ? '2 yr' : '6 mo'}</strong>
                <span>Warranty</span>
              </div>
              <div>
                <strong>7 day</strong>
                <span>Easy returns</span>
              </div>
            </div>
          </section>

          <section className="pd-block">
            <h2 className="sx-title">Specifications</h2>

            <div className="pd-spec">
              {specGroups.map((g) => (
                <div key={g.title}>
                  <h3>{g.title}</h3>
                  <dl>
                    {g.rows.map(([label, value]) => (
                      <div className="pd-spec__row" key={label}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </section>

          <section className="pd-block">
            <h2 className="sx-title">Materials and craft</h2>

            <div className="pd-materials">
              {MATERIALS.map((m) => (
                <article className="pd-material" key={m.title}>
                  <span className="pd-material__icon">
                    <Ico name={m.icon} size={22} />
                  </span>
                  <strong>{m.title}</strong>
                  <p>{m.text}</p>
                </article>
              ))}
            </div>
          </section>

          {isWatch && (
            <section className="pd-block" id="size-guide">
              <h2 className="sx-title">Find your size</h2>

              <div className="pd-tablewrap">
                <table className="pd-guide">
                  <thead>
                    <tr>
                      <th>Case size</th>
                      <th>Wrist size</th>
                      <th>Best for</th>
                      <th aria-label="Select" />
                    </tr>
                  </thead>

                  <tbody>
                    {SIZE_OPTIONS.map((s) => (
                      <tr key={s.size} className={size === s.size ? 'is-on' : ''}>
                        <td>{s.size} mm</td>
                        <td>{s.wrist}</td>
                        <td>{s.best}</td>
                        <td>
                          <button type="button" onClick={() => setSize(s.size)}>
                            {size === s.size ? 'Selected' : 'Select'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          <section className="pd-block">
            <h2 className="sx-title">Care guide</h2>

            <ul className="pd-care">
              {CARE_TIPS.map((tip) => (
                <li key={tip}>
                  <Ico name="check" size={16} />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="pd-block">
            <h2 className="sx-title">Ratings and reviews</h2>

            <div className="pd-reviews">
              <div className="pd-summary">
                <div className="pd-summary__score">
                  <strong>{product.rating}</strong>
                  <Stars value={product.rating} />
                  <p>Based on {product.ratings} ratings</p>
                </div>

                <div className="pd-bars">
                  {ratingBars.map((value, i) => (
                    <div className="pd-bar" key={i}>
                      <span>{5 - i} ★</span>
                      <span className="pd-bar__track">
                        <i className="pd-bar__fill" style={{ width: `${value}%` }} />
                      </span>
                      <em>{value}%</em>
                    </div>
                  ))}
                </div>

                <button type="button" className="sx-btn sx-btn--line sx-btn--block" onClick={() => showToast('Review form coming soon.')}>
                  Write a review
                </button>
              </div>

              <div className="pd-reviewlist">
                {reviews.map((t) => (
                  <article className="pd-review" key={t.name}>
                    <div className="pd-review__head">
                      <span className="pd-review__avatar">{t.initials}</span>

                      <div className="pd-review__who">
                        <strong>{t.name}</strong>
                        <em>Verified purchase · {t.date}</em>
                      </div>

                      <Stars value={t.rating} />
                    </div>

                    <p>{t.text}</p>
                  </article>
                ))}

                <button type="button" className="sx-btn sx-btn--ghost sx-btn--sm" onClick={() => navigate('/reviews')} style={{ alignSelf: 'flex-start' }}>
                  See all reviews
                </button>
              </div>
            </div>
          </section>

          <section className="pd-block">
            <h2 className="sx-title">Questions, answered</h2>

            <div className="pd-qna">
              {QNA.map((item) => (
                <details className="pd-qna__item" key={item.q}>
                  <summary className="pd-qna__q">
                    <span>{item.q}</span>
                    <Ico name="plus" size={18} />
                  </summary>

                  <p className="pd-qna__a">{item.a}</p>
                </details>
              ))}
            </div>

            <button type="button" className="sx-btn sx-btn--line sx-btn--sm pd-qna__ask" onClick={() => navigate('/help')}>
              More answers in Help &amp; FAQ
            </button>
          </section>

          <section className="pd-block">
            <h2 className="sx-title">Frequently bought together</h2>

            <div className="pd-fbt">
              {fbtItems.map((item, idx) => (
                <div className="pd-fbt__unit" key={item.id}>
                  {idx > 0 && <span className="pd-fbt__plus">+</span>}

                  <label className="pd-fbt__item">
                    <input
                      type="checkbox"
                      checked={!!fbtSelected[idx]}
                      onChange={() => setFbtSelected((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                    />

                    <SmartImage className="pd-fbt__img" src={img(item.image, 300)} alt={item.name} />

                    <span>{item.name}</span>
                    <strong>₹{formatPrice(item.price)}</strong>
                  </label>
                </div>
              ))}
            </div>

            <div className="pd-fbt__summary">
              <span>
                {fbtCount} item{fbtCount === 1 ? '' : 's'} selected
              </span>

              <strong>₹{formatPrice(fbtTotal)}</strong>

              <button type="button" className="sx-btn sx-btn--signal" onClick={addFbtToCart} disabled={!fbtCount}>
                <Ico name="bag" size={16} /> Add selected
              </button>
            </div>
          </section>

          <section className="pd-block pd-similar">
            <h2 className="sx-title">You may also like</h2>

            <div className="cx-grid">
              {similar.map((p, i) => {
                const off = pctOff(p);

                return (
                  <article
                    className="cx-card"
                    style={{ '--i': i }}
                    key={p.id}
                    role="link"
                    tabIndex={0}
                    onClick={() => goToProductPage(p.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') goToProductPage(p.id);
                    }}
                  >
                    <div className="cx-card__media">
                      <SmartImage className="cx-card__img" src={img(p.image, 700)} alt={p.name} />

                      {off > 0 && <span className="cx-card__badge">{off}% off</span>}
                      {p.isNew && <span className="cx-card__new">New</span>}

                      <button
                        type="button"
                        className={`cx-wish ${cardWish[p.id] ? 'is-on' : ''}`}
                        onClick={handleCardWish(p.id)}
                        aria-pressed={!!cardWish[p.id]}
                        aria-label={cardWish[p.id] ? `Remove ${p.name} from wishlist` : `Save ${p.name} to wishlist`}
                      >
                        <Ico name="heart" size={18} />
                      </button>
                    </div>

                    <div className="cx-card__body">
                      <span className="cx-card__coll">
                        {p.collection} · {TYPE_LABEL[p.type]}
                      </span>

                      <strong>{p.name}</strong>
                      <span className="cx-card__sub">{p.subtitle}</span>

                      <div className="cx-card__rate">
                        <span className="cx-pill">
                          <Ico name="star" size={12} filled /> {p.rating}
                        </span>
                        <span>({p.ratings} ratings)</span>
                      </div>

                      <div className="cx-price">
                        <strong>₹{formatPrice(p.price)}</strong>
                        {p.originalPrice > p.price && <s>₹{formatPrice(p.originalPrice)}</s>}
                        {off > 0 && <em>{off}% off</em>}
                      </div>

                      <span className="cx-card__ship">
                        <Ico name="truck" size={14} /> Free insured delivery
                      </span>

                      <button
                        type="button"
                        className={`sx-btn sx-btn--ink sx-btn--sm sx-btn--block cx-card__btn ${cardAdded[p.id] ? 'is-added' : ''}`}
                        onClick={handleCardAdd(p)}
                      >
                        {cardAdded[p.id] ? (
                          <>
                            <Ico name="check" size={15} /> Added
                          </>
                        ) : (
                          <>
                            <Ico name="bag" size={15} /> Add to bag
                          </>
                        )}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      <SiteFooter onToast={showToast} />

      {/* sticky action bar on phones */}
      <div className="pd-mbar">
        <button type="button" className={`sx-btn sx-btn--ink ${addedMain ? 'is-added' : ''}`} onClick={addToCart}>
          {cartLabel}
        </button>

        <button type="button" className="sx-btn sx-btn--signal" onClick={buyNow}>
          Buy now
        </button>
      </div>

      {toastNode}
    </div>
  );
}

export default ProductRedesign1;