import { useEffect, useMemo, useRef, useState } from 'react';
import './Categories.css';
import { SmartImage, img } from '../Home1/ProductGallery';
import { DIALS, formatPrice, goToProductPage } from '../Home1/Home1';
import { LISTING_PRODUCTS } from '../Shared/catalog';
import { SiteHeader, SiteFooter, Ico, navigate, useToast } from '../Shared/SiteChrome';

const PAGE_SIZE = 8;

const TYPE_LABEL = { watch: 'Watches', strap: 'Straps', accessory: 'Accessories' };

const QUICK = [
  { id: 'all', label: 'All products', image: 'studio' },
  { id: 'watch', label: 'Watches', image: 'tanWrist' },
  { id: 'strap', label: 'Straps', image: 'strap' },
  { id: 'accessory', label: 'Accessories', image: 'desk' },
  { id: 'deals', label: 'Top deals', image: 'steelLine' },
  { id: 'new', label: 'New arrivals', image: 'aster' },
];

const COLLECTION_TILES = [
  { name: 'Aster', note: 'Everyday automatics', image: 'aster' },
  { name: 'Meridian', note: 'Steel chronographs', image: 'steelLine' },
  { name: 'Heritage', note: 'Classic leather', image: 'darkFace' },
  { name: 'Urban', note: 'Field watches', image: 'night' },
];

const COLLECTION_NAMES = ['Aster', 'Meridian', 'Heritage', 'Urban', 'Essentials'];

const RANGES = [
  { id: 'r1', label: 'Under ₹5,000', min: 0, max: 5000 },
  { id: 'r2', label: '₹5,000 – ₹15,000', min: 5000, max: 15000 },
  { id: 'r3', label: '₹15,000 – ₹20,000', min: 15000, max: 20000 },
  { id: 'r4', label: 'Above ₹20,000', min: 20000, max: Infinity },
];

const RATINGS = [4.5, 4, 3];
const DISCOUNTS = [10, 15, 20];

const SORTS = [
  { id: 'relevance', label: 'Relevance' },
  { id: 'popular', label: 'Most rated' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'rating', label: 'Customer rating' },
  { id: 'discount', label: 'Biggest discount' },
];

const POINTS = {
  watch: ['Automatic, self-winding movement', 'Sapphire crystal, 5 ATM', '2 year international warranty'],
  strap: ['Quick-release spring bars', 'Fits 20 mm lug width', '6 month strap warranty'],
  accessory: ['Premium vegan leather build', 'Soft anti-scratch lining', 'Travel-friendly footprint'],
};

const POPULAR = ['Automatic', 'Chronograph', 'Blue dial', 'Steel', 'Leather', 'Field watch', 'Travel case', 'Gift set', 'Jubilee'];

const BENEFITS = [
  { icon: 'truck', title: 'Insured shipping', text: 'Free on every order' },
  { icon: 'shield', title: 'Certified original', text: 'Every piece verified' },
  { icon: 'clock', title: '2 year warranty', text: 'On all movements' },
  { icon: 'returns', title: '7 day returns', text: 'No questions asked' },
];

const pct = (p) =>
  p.originalPrice > p.price ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;

const toggleIn = (setter, value) =>
  setter((list) => (list.includes(value) ? list.filter((x) => x !== value) : [...list, value]));

function readInitialType() {
  const cat = new URLSearchParams(window.location.search).get('cat');
  return cat && TYPE_LABEL[cat] ? [cat] : [];
}

function Categories() {
  const [toastNode, showToast] = useToast();

  const [types, setTypes] = useState(readInitialType);
  const [collections, setCollections] = useState([]);
  const [ranges, setRanges] = useState([]);
  const [dials, setDials] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [minDiscount, setMinDiscount] = useState(0);
  const [onlyNew, setOnlyNew] = useState(false);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('relevance');
  const [view, setView] = useState('grid');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [drawer, setDrawer] = useState(false);

  const [wish, setWish] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [added, setAdded] = useState({});
  const timers = useRef({});

  useEffect(() => {
    window.scrollTo(0, 0);
    const list = timers.current;
    return () => Object.values(list).forEach(clearTimeout);
  }, []);

  /* lock body scroll while the mobile filter drawer is open */
  useEffect(() => {
    if (!drawer) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [drawer]);

  /* ---------- counts shown next to each filter option ---------- */
  const counts = useMemo(() => {
    const type = {};
    const collection = {};

    LISTING_PRODUCTS.forEach((p) => {
      type[p.type] = (type[p.type] || 0) + 1;
      collection[p.collection] = (collection[p.collection] || 0) + 1;
    });

    return { type, collection };
  }, []);

  /* ---------- filtering + sorting ---------- */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const list = LISTING_PRODUCTS.filter((p) => {
      if (types.length && !types.includes(p.type)) return false;
      if (collections.length && !collections.includes(p.collection)) return false;

      if (ranges.length) {
        const hit = ranges.some((id) => {
          const r = RANGES.find((x) => x.id === id);
          return p.price >= r.min && p.price < r.max;
        });
        if (!hit) return false;
      }

      if (dials.length && !dials.includes(p.dial)) return false;
      if (minRating && p.rating < minRating) return false;
      if (minDiscount && pct(p) < minDiscount) return false;
      if (onlyNew && !p.isNew) return false;

      if (q) {
        const hay = `${p.name} ${p.subtitle} ${p.collection} ${TYPE_LABEL[p.type]}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      return true;
    });

    const sorted = [...list];

    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating);
    if (sort === 'popular') sorted.sort((a, b) => b.ratings - a.ratings);
    if (sort === 'discount') sorted.sort((a, b) => pct(b) - pct(a));

    return sorted;
  }, [types, collections, ranges, dials, minRating, minDiscount, onlyNew, query, sort]);

  /* go back to the first page of results whenever filters change */
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [types, collections, ranges, dials, minRating, minDiscount, onlyNew, query, sort]);

  const shown = filtered.slice(0, visibleCount);

  /* ---------- active filter chips ---------- */
  const chips = [];

  types.forEach((t) => chips.push({ key: `t-${t}`, label: TYPE_LABEL[t], clear: () => toggleIn(setTypes, t) }));
  collections.forEach((c) => chips.push({ key: `c-${c}`, label: c, clear: () => toggleIn(setCollections, c) }));
  ranges.forEach((r) =>
    chips.push({ key: `r-${r}`, label: RANGES.find((x) => x.id === r).label, clear: () => toggleIn(setRanges, r) })
  );
  dials.forEach((d) =>
    chips.push({ key: `d-${d}`, label: `${DIALS.find((x) => x.id === d).name} dial`, clear: () => toggleIn(setDials, d) })
  );
  if (minRating) chips.push({ key: 'rating', label: `${minRating}★ & up`, clear: () => setMinRating(0) });
  if (minDiscount) chips.push({ key: 'disc', label: `${minDiscount}% off or more`, clear: () => setMinDiscount(0) });
  if (onlyNew) chips.push({ key: 'new', label: 'New arrivals', clear: () => setOnlyNew(false) });
  if (query.trim()) chips.push({ key: 'q', label: `“${query.trim()}”`, clear: () => setQuery('') });

  const clearAll = () => {
    setTypes([]);
    setCollections([]);
    setRanges([]);
    setDials([]);
    setMinRating(0);
    setMinDiscount(0);
    setOnlyNew(false);
    setQuery('');
  };

  const scrollToListing = () => {
    setTimeout(() => {
      const el = document.getElementById('listing');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const pickQuick = (id) => {
    setQuery('');
    setCollections([]);

    if (id === 'all') {
      clearAll();
    } else if (id === 'deals') {
      setTypes([]);
      setOnlyNew(false);
      setMinDiscount(15);
    } else if (id === 'new') {
      setTypes([]);
      setMinDiscount(0);
      setOnlyNew(true);
    } else {
      setTypes([id]);
      setMinDiscount(0);
      setOnlyNew(false);
    }

    scrollToListing();
  };

  const quickActive = (id) => {
    if (id === 'all') return chips.length === 0;
    if (id === 'deals') return minDiscount === 15 && !types.length;
    if (id === 'new') return onlyNew && !types.length;
    return types.length === 1 && types[0] === id;
  };

  const pickCollection = (name) => () => {
    setCollections([name]);
    scrollToListing();
  };

  const handleHeroSearch = (e) => {
    e.preventDefault();
    scrollToListing();
  };

  /* ---------- card actions ---------- */
  const wishCount = Object.values(wish).filter(Boolean).length;

  const handleWish = (p) => (e) => {
    e.stopPropagation();
    setWish((w) => ({ ...w, [p.id]: !w[p.id] }));
  };

  const handleAdd = (p) => (e) => {
    e.stopPropagation();
    setCartCount((n) => n + 1);
    showToast(`Added "${p.name}" to your cart.`);
    setAdded((a) => ({ ...a, [p.id]: true }));

    clearTimeout(timers.current[p.id]);
    timers.current[p.id] = setTimeout(() => setAdded((a) => ({ ...a, [p.id]: false })), 1500);
  };

  /* ---------- filter panel (used in sidebar and in mobile drawer) ---------- */
  const renderFilters = (prefix) => (
    <div className="cx-filters">
      <div className="cx-filters__head">
        <h2>Filters</h2>
        {chips.length > 0 && (
          <button type="button" className="sx-linkbtn" onClick={clearAll}>
            Clear all
          </button>
        )}
      </div>

      <details className="cx-fgroup" open>
        <summary>
          Category <Ico name="down" size={16} />
        </summary>
        {Object.keys(TYPE_LABEL).map((id) => (
          <label className="cx-opt" key={id}>
            <input type="checkbox" checked={types.includes(id)} onChange={() => toggleIn(setTypes, id)} />
            <span>{TYPE_LABEL[id]}</span>
            <em>{counts.type[id] || 0}</em>
          </label>
        ))}
      </details>

      <details className="cx-fgroup" open>
        <summary>
          Collection <Ico name="down" size={16} />
        </summary>
        {COLLECTION_NAMES.map((name) => (
          <label className="cx-opt" key={name}>
            <input
              type="checkbox"
              checked={collections.includes(name)}
              onChange={() => toggleIn(setCollections, name)}
            />
            <span>{name}</span>
            <em>{counts.collection[name] || 0}</em>
          </label>
        ))}
      </details>

      <details className="cx-fgroup" open>
        <summary>
          Price <Ico name="down" size={16} />
        </summary>
        {RANGES.map((r) => (
          <label className="cx-opt" key={r.id}>
            <input type="checkbox" checked={ranges.includes(r.id)} onChange={() => toggleIn(setRanges, r.id)} />
            <span>{r.label}</span>
          </label>
        ))}
      </details>

      <details className="cx-fgroup" open>
        <summary>
          Customer rating <Ico name="down" size={16} />
        </summary>
        {RATINGS.map((r) => (
          <label className="cx-opt" key={r}>
            <input
              type="radio"
              name={`${prefix}-rating`}
              checked={minRating === r}
              onChange={() => setMinRating(r)}
            />
            <span>
              {r}★ &amp; up
            </span>
          </label>
        ))}
      </details>

      <details className="cx-fgroup" open>
        <summary>
          Discount <Ico name="down" size={16} />
        </summary>
        {DISCOUNTS.map((d) => (
          <label className="cx-opt" key={d}>
            <input
              type="radio"
              name={`${prefix}-discount`}
              checked={minDiscount === d}
              onChange={() => setMinDiscount(d)}
            />
            <span>{d}% off or more</span>
          </label>
        ))}
      </details>

      <details className="cx-fgroup" open>
        <summary>
          Dial colour <Ico name="down" size={16} />
        </summary>
        <div className="cx-dials">
          {DIALS.map((d) => (
            <button
              key={d.id}
              type="button"
              className={`cx-dial ${dials.includes(d.id) ? 'is-on' : ''}`}
              style={{ '--c': d.color }}
              aria-pressed={dials.includes(d.id)}
              aria-label={d.name}
              title={d.name}
              onClick={() => toggleIn(setDials, d.id)}
            />
          ))}
        </div>
      </details>

      <details className="cx-fgroup" open>
        <summary>
          Availability <Ico name="down" size={16} />
        </summary>
        <label className="cx-opt">
          <input type="checkbox" checked={onlyNew} onChange={() => setOnlyNew((v) => !v)} />
          <span>New arrivals only</span>
        </label>
      </details>
    </div>
  );

  /* ---------- product card ---------- */
  const renderCard = (p, i) => {
    const off = pct(p);

    return (
      <article
        className={`cx-card ${view === 'list' ? 'cx-card--list' : ''}`}
        style={{ '--i': i % PAGE_SIZE }}
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
            className={`cx-wish ${wish[p.id] ? 'is-on' : ''}`}
            onClick={handleWish(p)}
            aria-pressed={!!wish[p.id]}
            aria-label={wish[p.id] ? `Remove ${p.name} from wishlist` : `Save ${p.name} to wishlist`}
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
              {p.rating} <Ico name="star" size={11} filled />
            </span>
            <span>({p.ratings} ratings)</span>
          </div>

          <ul className="cx-card__points">
            {POINTS[p.type].map((t) => (
              <li key={t}>
                <Ico name="check" size={14} /> {t}
              </li>
            ))}
          </ul>

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
            className={`sx-btn sx-btn--ink sx-btn--sm sx-btn--block cx-card__btn ${added[p.id] ? 'is-added' : ''}`}
            onClick={handleAdd(p)}
          >
            {added[p.id] ? (
              <>
                <Ico name="check" size={15} /> Added
              </>
            ) : (
              <>
                <Ico name="bag" size={15} /> Add to cart
              </>
            )}
          </button>
        </div>
      </article>
    );
  };

  return (
    <div className="sx-root cx-root">
      <SiteHeader active="categories" wishCount={wishCount} cartCount={cartCount} onToast={showToast} />

      <nav className="sx-crumb sx-wrap" aria-label="Breadcrumb">
        <button type="button" onClick={() => navigate('/')}>
          Home
        </button>
        <span>/</span>
        <strong>All categories</strong>
      </nav>

      <main>
        {/* ---------- hero ---------- */}
        <section className="sx-wrap">
          <div className="cx-hero">
            <SmartImage className="cx-hero__img" src={img('studio', 1800)} alt="" eager />
            <div className="cx-hero__shade" />

            <div className="cx-hero__copy">
              <span className="cx-hero__tag">Shop by category</span>
              <h1>Every piece, one place.</h1>
              <p>Automatic watches, straps and the details that finish them. Filter, compare and pick yours.</p>

              <form className="cx-search" onSubmit={handleHeroSearch} role="search">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search watches, straps, accessories"
                  aria-label="Search products"
                />
                <button type="submit" aria-label="Search">
                  <Ico name="search" size={18} />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ---------- category circles (Flipkart style) ---------- */}
        <section className="sx-wrap cx-quicksec" aria-label="Quick categories">
          <div className="cx-quick">
            {QUICK.map((q) => (
              <button
                key={q.id}
                type="button"
                className={`cx-quick__item ${quickActive(q.id) ? 'is-on' : ''}`}
                onClick={() => pickQuick(q.id)}
                aria-pressed={quickActive(q.id)}
              >
                <span className="cx-quick__circle">
                  <SmartImage className="cx-quick__img" src={img(q.image, 240)} alt="" />
                </span>
                <span className="cx-quick__label">{q.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ---------- collections ---------- */}
        <section className="sx-wrap cx-collsec">
          <h2 className="sx-title">Shop by collection</h2>

          <div className="cx-colls">
            {COLLECTION_TILES.map((c) => (
              <button type="button" className="cx-coll" key={c.name} onClick={pickCollection(c.name)}>
                <SmartImage className="cx-coll__img" src={img(c.image, 700)} alt="" />

                <span className="cx-coll__label">
                  <strong>{c.name}</strong>
                  <em>{c.note}</em>
                </span>

                <span className="cx-coll__go">
                  <Ico name="arrow" size={18} />
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ---------- listing ---------- */}
        <section className="sx-wrap cx-listing" id="listing">
          <aside className="cx-sidebar" aria-label="Filters">
            {renderFilters('side')}
          </aside>

          <div className="cx-results">
            <div className="cx-toolbar">
              <div>
                <h2 className="cx-toolbar__title">
                  {types.length === 1 ? TYPE_LABEL[types[0]] : 'All products'}
                </h2>
                <p className="cx-toolbar__count">
                  {filtered.length} result{filtered.length === 1 ? '' : 's'}
                </p>
              </div>

              <div className="cx-toolbar__tools">
                <button type="button" className="sx-btn sx-btn--ghost sx-btn--sm cx-filterbtn" onClick={() => setDrawer(true)}>
                  <Ico name="filter" size={16} /> Filters{chips.length ? ` (${chips.length})` : ''}
                </button>

                <label className="cx-sort">
                  <span>Sort by</span>
                  <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    {SORTS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="cx-view" role="group" aria-label="Layout">
                  <button
                    type="button"
                    className={view === 'grid' ? 'is-on' : ''}
                    onClick={() => setView('grid')}
                    aria-pressed={view === 'grid'}
                    aria-label="Grid view"
                  >
                    <Ico name="grid" size={18} />
                  </button>

                  <button
                    type="button"
                    className={view === 'list' ? 'is-on' : ''}
                    onClick={() => setView('list')}
                    aria-pressed={view === 'list'}
                    aria-label="List view"
                  >
                    <Ico name="list" size={18} />
                  </button>
                </div>
              </div>
            </div>

            {chips.length > 0 && (
              <div className="cx-chips">
                {chips.map((c) => (
                  <button type="button" className="cx-chip" key={c.key} onClick={c.clear}>
                    {c.label} <Ico name="close" size={13} />
                  </button>
                ))}

                <button type="button" className="sx-linkbtn" onClick={clearAll}>
                  Clear all
                </button>
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="cx-empty">
                <Ico name="search" size={30} />
                <h3>No products match these filters</h3>
                <p>Try removing a filter or searching for something else.</p>
                <button type="button" className="sx-btn sx-btn--signal" onClick={clearAll}>
                  Reset filters
                </button>
              </div>
            ) : (
              <>
                <div className={`cx-grid ${view === 'list' ? 'cx-grid--list' : ''}`}>
                  {shown.map((p, i) => renderCard(p, i))}
                </div>

                <div className="cx-more">
                  <span>
                    Showing {shown.length} of {filtered.length}
                  </span>

                  {shown.length < filtered.length && (
                    <button
                      type="button"
                      className="sx-btn sx-btn--line"
                      onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                    >
                      Load more products
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </section>

        {/* ---------- benefits ---------- */}
        <section className="sx-wrap cx-benefits" aria-label="Our promises">
          {BENEFITS.map((b) => (
            <div className="cx-benefit" key={b.title}>
              <span className="cx-benefit__icon">
                <Ico name={b.icon} size={22} />
              </span>
              <span>
                <strong>{b.title}</strong>
                <em>{b.text}</em>
              </span>
            </div>
          ))}
        </section>

        {/* ---------- popular searches ---------- */}
        <section className="sx-wrap cx-popular">
          <h2 className="sx-title">Popular searches</h2>

          <div className="cx-popular__row">
            {POPULAR.map((term) => (
              <button
                type="button"
                className="cx-tag"
                key={term}
                onClick={() => {
                  setQuery(term);
                  scrollToListing();
                }}
              >
                {term}
              </button>
            ))}
          </div>
        </section>

        {/* ---------- info text ---------- */}
        <section className="sx-wrap cx-seo">
          <div>
            <h2>Buy automatic watches online at Amihive</h2>
            <p>
              Amihive makes mechanical watches for everyday wear. Every piece uses a self-winding movement, a
              sapphire crystal and a stainless steel case, so it keeps time without a battery and holds up to daily
              use.
            </p>
          </div>

          <div>
            <h2>Straps and accessories that fit</h2>
            <p>
              Swap a leather strap for a steel jubilee in seconds with quick-release spring bars. Every strap fits
              the standard 20 mm lug width across the lineup, and watch rolls, winders and gift sets keep the
              collection safe.
            </p>
          </div>

          <div>
            <h2>Shop with confidence</h2>
            <p>
              Free insured shipping, a 2 year international warranty on all movements and 7 day returns come with
              every order. Pay by card, UPI, net banking or cash on delivery.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter onToast={showToast} />

      {/* ---------- mobile filter drawer ---------- */}
      {drawer && (
        <div className="cx-drawer" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="cx-drawer__scrim" onClick={() => setDrawer(false)} />

          <div className="cx-drawer__panel">
            <div className="cx-drawer__head">
              <strong>Filters</strong>
              <button type="button" className="sx-iconbtn" onClick={() => setDrawer(false)} aria-label="Close filters">
                <Ico name="close" size={20} />
              </button>
            </div>

            <div className="cx-drawer__body">{renderFilters('drawer')}</div>

            <div className="cx-drawer__foot">
              <button type="button" className="sx-btn sx-btn--ghost sx-btn--sm" onClick={clearAll}>
                Clear all
              </button>

              <button type="button" className="sx-btn sx-btn--signal sx-btn--sm" onClick={() => setDrawer(false)}>
                Show {filtered.length} results
              </button>
            </div>
          </div>
        </div>
      )}

      {toastNode}
    </div>
  );
}

export default Categories;