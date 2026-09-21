import { useCallback, useEffect, useRef, useState } from 'react';
import './ProductGallery.css';

/* ------------------------------------------------------------------
   IMAGE LIBRARY
   Every photo used on the Home1 page lives here. To swap a photo,
   replace the Unsplash id (the "photo-..." part) or paste a full URL
   in `img()` below. If any image fails to load, SmartImage shows a
   drawn watch-dial placeholder so the layout never breaks.
------------------------------------------------------------------- */
export const PHOTO = {
  aster: 'photo-1524592094714-0f0654e20314',
  wristBlack: 'photo-1547996160-81dfa63595aa',
  goldWrist: 'photo-1539874754764-5a96559165b0',
  goldClose: 'photo-1542496658-e33a6d0d50f6',
  darkFace: 'photo-1594534475808-b18fc33b045e',
  steelLine: 'photo-1526045431048-f857369baa09',
  night: 'photo-1509048191080-d2984bad6ae5',
  blackDial: 'photo-1524805444758-089113d48a6d',
  tanWrist: 'photo-1523170335258-f5ed11844a49',
  studio: 'photo-1523275335684-37898b6baf30',
  closeup: 'photo-1508057198894-247b23fe5ade',
  desk: 'photo-1434056886845-dac89ffe9b56',
  strap: 'photo-1495857000853-fe46c8aefc30',
  jubilee: 'photo-1533139502658-0198f920d8e8',
};

export const img = (key, width = 800) =>
  `https://images.unsplash.com/${PHOTO[key]}?auto=format&fit=crop&w=${width}&q=80`;

const FALLBACK = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#dfe6e7"/><circle cx="200" cy="200" r="112" fill="#0b3a40"/><circle cx="200" cy="200" r="98" fill="none" stroke="#9fb4b8" stroke-width="3" stroke-dasharray="2 11"/><path d="M200 200v-70M200 200l46 28" stroke="#f4f7f7" stroke-width="6" stroke-linecap="round"/><path d="M200 214l-30-62" stroke="#f2542d" stroke-width="3" stroke-linecap="round"/></svg>'
)}`;

export function SmartImage({ src, alt, className, eager = false }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <img
      className={className}
      src={failed ? FALLBACK : src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

/* ------------------------------------------------------------------
   GALLERY DATA  (9 tiles = a clean 4 x 3 mosaic on desktop)
------------------------------------------------------------------- */
export const GALLERY_IMAGES = [
  { id: 'g1', key: 'goldWrist', title: 'Aster No.01', note: 'Classic everyday', layout: 'tall' },
  { id: 'g2', key: 'aster', title: 'Aster No.04', note: 'Automatic blue dial', layout: 'wide' },
  { id: 'g3', key: 'blackDial', title: 'Urban No.03', note: 'Everyday field watch' },
  { id: 'g4', key: 'closeup', title: 'Sapphire crystal', note: 'Scratch resistant' },
  { id: 'g5', key: 'steelLine', title: 'Meridian No.02', note: 'Steel chronograph' },
  { id: 'g6', key: 'darkFace', title: 'Heritage No.01', note: 'Classic leather' },
  { id: 'g7', key: 'strap', title: 'Cognac strap', note: 'Italian leather' },
  { id: 'g8', key: 'desk', title: 'Travel roll', note: 'Leather watch case', layout: 'wide' },
  { id: 'g9', key: 'jubilee', title: 'Jubilee bracelet', note: 'Swap-ready steel' },
];

const GLYPHS = {
  close: 'M6 6l12 12M18 6 6 18',
  left: 'M15 5l-7 7 7 7',
  right: 'M9 5l7 7-7 7',
  expand: 'M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7',
};

function Glyph({ name, size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={GLYPHS[name]} />
    </svg>
  );
}

export default function ProductGallery({ images = GALLERY_IMAGES }) {
  const [open, setOpen] = useState(null);
  const closeRef = useRef(null);
  const isOpen = open !== null;
  const count = images.length;

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir) => setOpen((i) => (i === null ? null : (i + dir + count) % count)),
    [count]
  );

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    if (closeRef.current) closeRef.current.focus();

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close, step]);

  const current = isOpen ? images[open] : null;

  return (
    <section className="pg" id="gallery">
      <div className="pg__inner">
        <div className="pg__head">
          <h2>Worn, not stored</h2>
          <p>A closer look at the lineup. Select any frame to see it larger.</p>
        </div>

        <div className="pg__grid">
          {images.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={`pg__tile ${item.layout ? `pg__tile--${item.layout}` : ''}`}
              style={{ '--i': i }}
              onClick={() => setOpen(i)}
              aria-label={`Open ${item.title}`}
            >
              <SmartImage
                className="pg__img"
                src={img(item.key, item.layout === 'wide' ? 1200 : 800)}
                alt={item.title}
              />
              <span className="pg__cap">
                <span>
                  <strong>{item.title}</strong>
                  <em>{item.note}</em>
                </span>
                <span className="pg__expand">
                  <Glyph name="expand" size={16} />
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {current && (
        <div
          className="pg-lb"
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          onClick={close}
        >
          <button
            type="button"
            ref={closeRef}
            className="pg-lb__close"
            onClick={close}
            aria-label="Close gallery"
          >
            <Glyph name="close" />
          </button>

          <button
            type="button"
            className="pg-lb__nav pg-lb__nav--prev"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous image"
          >
            <Glyph name="left" />
          </button>

          <figure
            className="pg-lb__figure"
            key={current.id}
            onClick={(e) => e.stopPropagation()}
          >
            <SmartImage className="pg-lb__img" src={img(current.key, 1600)} alt={current.title} eager />
            <figcaption>
              <span>
                <strong>{current.title}</strong>
                <em>{current.note}</em>
              </span>
              <span className="pg-lb__count">
                {open + 1} of {count}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            className="pg-lb__nav pg-lb__nav--next"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next image"
          >
            <Glyph name="right" />
          </button>
        </div>
      )}
    </section>
  );
}