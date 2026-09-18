import { useState } from 'react';
import './ProductDesign2.css';

const WATCH_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=85',
    alt: 'Aster No.04 front view',
  },
  {
    src: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85',
    alt: 'Aster No.04 close-up',
  },
  {
    src: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1200&q=85',
    alt: 'Aster No.04 side view',
  },
  {
    src: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1200&q=85',
    alt: 'Aster No.04 on wrist',
  },
];

const DIAL_OPTIONS = [
  { id: 'blue', name: 'Midnight Blue', color: '#0d274c' },
  { id: 'black', name: 'Matte Obsidian', color: '#1b1b1b' },
  { id: 'silver', name: 'Brushed Silver', color: '#d5d7dc' },
  { id: 'green', name: 'Forest Green', color: '#1c352d' },
];

const STRAP_OPTIONS = [
  { id: 'cognac', name: 'Cognac Leather', fullName: 'Cognac Italian Leather', color: '#7b3f11' },
  { id: 'obsidian', name: 'Obsidian Black', fullName: 'Obsidian Black Leather', color: '#1f1f1f' },
  { id: 'steel', name: 'Steel Jubilee', fullName: 'Steel Jubilee 5-Link Bracelet', color: '#a8acb6' },
];

const CASE_SIZES = [
  { size: '38mm', label: 'Subtle', desc: 'Fits wrists 5.5"–6.75"' },
  { size: '40mm', label: 'Standard', desc: 'Balanced fit for 6.25"–7.5"' },
  { size: '42mm', label: 'Presence', desc: 'Commanding stance, 7.0"+ wrists' },
];

const HIGHLIGHTS = [
  {
    title: '9015 automatic movement',
    text: 'A dependable mechanical calibre built for everyday wear, with a smooth automatic winding system.',
  },
  {
    title: 'Double-domed sapphire',
    text: 'Scratch-resistant sapphire crystal keeps the dial clear while giving it a subtle vintage profile.',
  },
  {
    title: 'Vegetable-tanned leather',
    text: 'Italian leather that develops its own character the more you wear it.',
  },
];

const SPECS = [
  ['Movement', 'Miyota 9015 automatic'],
  ['Case material', '316L stainless steel'],
  ['Crystal', 'Double-domed sapphire'],
  ['Water resistance', '10 ATM / 100m'],
  ['Power reserve', 'Approx. 42 hours'],
  ['Warranty', '2 years'],
];

const REVIEWS = [
  {
    initials: 'AK',
    name: 'Arjun K.',
    date: '2 weeks ago',
    rating: 5,
    text: 'The blue dial looks significantly better in person. The proportions are exactly what I wanted.',
  },
  {
    initials: 'RM',
    name: 'Rahul M.',
    date: '1 month ago',
    rating: 5,
    text: 'Leather feels premium and the watch sits with a really balanced presence on the wrist.',
  },
];

const OFFERS = [
  { tag: 'Bank Offer', text: '10% instant discount up to ₹1,500 on HDFC Bank Credit Cards' },
  { tag: 'No Cost EMI', text: 'From ₹1,583/month for 12 months. View plans' },
  { tag: 'Partner Offer', text: 'Get a GST invoice and save up to 18% on business purchases' },
];

const RELATED_PRODUCTS = [
  {
    name: 'Aster No.02 Chronograph',
    price: 22990,
    image:
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Steel Jubilee Strap',
    price: 3490,
    image:
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Aster No.01 Classic',
    price: 16990,
    image:
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Leather Travel Case',
    price: 2290,
    image:
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=500&q=80',
  },
];

const ADS = [
  'Free insured shipping on every order',
  'Extra 5% off on prepaid orders',
  'New arrivals every Friday',
  '2-year international warranty',
];

const PRODUCT = {
  name: 'Aster No.04',
  subtitle: 'Automatic Blue Dial Watch',
  price: 18990,
  originalPrice: 21990,
  discount: 14,
  rating: 4.7,
  ratings: 284,
  verifiedReviews: 96,
  sku: 'AMH-AST-04B',
  description:
    'A considered everyday mechanical watch, built around a deep midnight-blue dial, sapphire crystal and vegetable-tanned Italian leather — designed to feel refined without becoming precious.',
};

const TABS = [
  { id: 'highlights', label: 'Highlights' },
  { id: 'story', label: 'The making of it' },
  { id: 'specs', label: 'Specification' },
  { id: 'reviews', label: 'Reviews' },
];

function ProductDesign2() {
  const [activeImage, setActiveImage] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  const [selectedDial, setSelectedDial] = useState('blue');
  const [selectedStrap, setSelectedStrap] = useState('cognac');
  const [selectedCaseSize, setSelectedCaseSize] = useState('40mm');

  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('560001');
  const [addressOpen, setAddressOpen] = useState(false);
  const [deliveryMessage, setDeliveryMessage] = useState('Usually delivered in 3–5 business days.');

  const [activeTab, setActiveTab] = useState('highlights');
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [cartMessage, setCartMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedDialData = DIAL_OPTIONS.find((d) => d.id === selectedDial);
  const selectedStrapData = STRAP_OPTIONS.find((s) => s.id === selectedStrap);

  const formatPrice = (value) => new Intl.NumberFormat('en-IN').format(value);

  const checkDelivery = () => {
    if (!/^\d{6}$/.test(pincode)) {
      setDeliveryMessage('Enter a valid 6-digit pincode.');
      return;
    }
    setDeliveryMessage(`Delivery by 3–5 business days to ${pincode}.`);
    setAddressOpen(false);
  };

  const changeQuantity = (delta) => {
    setQuantity((current) => Math.max(1, current + delta));
  };

  const addToCart = () => {
    setCartMessage('Added to your cart.');
    setTimeout(() => setCartMessage(''), 2600);
  };

  const buyNow = () => {
    setCartMessage('Taking you to checkout…');
    setTimeout(() => setCartMessage(''), 2600);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="pd2-page">
      <div className="pd2-topbar">
        {ADS.map((ad) => (
          <span key={ad}>{ad}</span>
        ))}
      </div>

      <header className="pd2-header">
        <div className="pd2-header-inner">
          <span className="pd2-wordmark">amihive</span>

          <form className="pd2-search" onSubmit={handleSearch}>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search watches, straps and more"
            />
            <button type="submit">Search</button>
          </form>

          <div className="pd2-header-icons">
            <button
              className={wishlist ? 'is-active' : ''}
              onClick={() => setWishlist(!wishlist)}
            >
              Wishlist{wishlist ? ' (1)' : ''}
            </button>
            <button>Account</button>
            <button>Cart (0)</button>
          </div>
        </div>

        <nav className="pd2-nav">
          <a href="#collection">Collection</a>
          <a href="#details">Details</a>
          <a href="#reviews">Reviews</a>
          <a href="#related">Related</a>
          <a href="#care">Care</a>
        </nav>
      </header>

      <main className="pd2-main">
        <div className="pd2-trail">
          <span>Home</span>
          <span className="pd2-trail-sep">/</span>
          <span>Timepieces</span>
          <span className="pd2-trail-sep">/</span>
          <span className="pd2-trail-current">{PRODUCT.name}</span>
        </div>

        <section className="pd2-hero" id="collection">
          <div className="pd2-gallery">
            <div className="pd2-gallery-frame" onClick={() => setLightbox(true)}>
              <img src={WATCH_IMAGES[activeImage].src} alt={WATCH_IMAGES[activeImage].alt} />

              <button
                className={`pd2-wish ${wishlist ? 'is-active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setWishlist(!wishlist);
                }}
                aria-label="Save to wishlist"
              >
                {wishlist ? '♥ Saved' : '♡ Save'}
              </button>

              <span className="pd2-frame-tag">Certified original</span>
            </div>

            <div className="pd2-filmstrip">
              {WATCH_IMAGES.map((image, index) => (
                <button
                  key={image.src}
                  className={`pd2-film-thumb ${activeImage === index ? 'is-active' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={image.src} alt={image.alt} />
                </button>
              ))}
            </div>
          </div>

          <div className="pd2-info">
            <h1>
              {PRODUCT.name}
              <span>{PRODUCT.subtitle}</span>
            </h1>

            <div className="pd2-rating">
              <span className="pd2-rating-value">{PRODUCT.rating}</span>
              <span className="pd2-rating-stars">★★★★★</span>
              <a href="#reviews" className="pd2-rating-count">
                {PRODUCT.ratings} ratings · {PRODUCT.verifiedReviews} verified reviews
              </a>
            </div>

            <p className="pd2-description">{PRODUCT.description}</p>

            <div className="pd2-price">
              <strong>₹{formatPrice(PRODUCT.price)}</strong>
              <s>₹{formatPrice(PRODUCT.originalPrice)}</s>
              <em>{PRODUCT.discount}% off</em>
              <small>SKU {PRODUCT.sku}</small>
            </div>

            <div className="pd2-offers">
              <h3>Available offers</h3>
              <ul>
                {OFFERS.map((offer) => (
                  <li key={offer.tag}>
                    <strong>{offer.tag}:</strong> {offer.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pd2-config">
              <div className="pd2-config-row">
                <div className="pd2-config-label">
                  <span>Dial</span>
                  <em>{selectedDialData?.name}</em>
                </div>

                <div className="pd2-swatches">
                  {DIAL_OPTIONS.map((dial) => (
                    <button
                      key={dial.id}
                      className={`pd2-swatch ${selectedDial === dial.id ? 'is-active' : ''}`}
                      style={{ background: dial.color }}
                      onClick={() => setSelectedDial(dial.id)}
                      title={dial.name}
                      aria-label={dial.name}
                    />
                  ))}
                </div>
              </div>

              <div className="pd2-config-row">
                <div className="pd2-config-label">
                  <span>Strap</span>
                  <em>{selectedStrapData?.fullName}</em>
                </div>

                <div className="pd2-strap-list">
                  {STRAP_OPTIONS.map((strap) => (
                    <button
                      key={strap.id}
                      className={`pd2-strap ${selectedStrap === strap.id ? 'is-active' : ''}`}
                      onClick={() => setSelectedStrap(strap.id)}
                    >
                      <i style={{ background: strap.color }} />
                      {strap.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pd2-config-row">
                <div className="pd2-config-label">
                  <span>Case size</span>
                  <button className="pd2-size-link" onClick={() => setSizeGuideOpen(true)}>
                    Sizing guide
                  </button>
                </div>

                <div className="pd2-size-list">
                  {CASE_SIZES.map((item) => (
                    <button
                      key={item.size}
                      className={`pd2-size ${selectedCaseSize === item.size ? 'is-active' : ''}`}
                      onClick={() => setSelectedCaseSize(item.size)}
                    >
                      <strong>{item.size}</strong>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pd2-address">
              <div className="pd2-address-row">
                <div>
                  <span>Deliver to</span>
                  <strong>{pincode}</strong>
                </div>
                <button onClick={() => setAddressOpen(!addressOpen)}>Change</button>
              </div>

              {addressOpen && (
                <div className="pd2-address-edit">
                  <input
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter pincode"
                  />
                  <button onClick={checkDelivery}>Apply</button>
                </div>
              )}

              <p className="pd2-delivery-result">{deliveryMessage}</p>
            </div>

            <div className="pd2-purchase">
              <div className="pd2-qty">
                <button onClick={() => changeQuantity(-1)} aria-label="Decrease quantity">−</button>
                <span>{quantity}</span>
                <button onClick={() => changeQuantity(1)} aria-label="Increase quantity">+</button>
              </div>

              <button className="pd2-add" onClick={addToCart}>Add to Cart</button>
              <button className="pd2-buy" onClick={buyNow}>Buy Now</button>
            </div>

            <p className="pd2-stock">Only 18 pieces left from this batch.</p>

            <div className="pd2-trust">
              <span>Insured shipping</span>
              <span>Certified original</span>
              <span>2 year warranty</span>
              <span>7 day returns</span>
            </div>
          </div>
        </section>

        <section className="pd2-details" id="details">
          <div className="pd2-details-head">
            <h2>Everything behind the timepiece</h2>
            <p>
              From the movement inside to the leather on your wrist, every part of the
              Aster No.04 was chosen for the same reason: to be worn, not admired from a drawer.
            </p>
          </div>

          <div className="pd2-tabs" role="tablist">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`pd2-tab ${activeTab === tab.id ? 'is-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'highlights' && (
            <div className="pd2-highlights">
              {HIGHLIGHTS.map((item) => (
                <div className="pd2-highlight-row" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'story' && (
            <div className="pd2-story">
              <div className="pd2-story-image">
                <img
                  src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=900&q=85"
                  alt="Watchmaker assembling an Amihive timepiece"
                />
              </div>

              <div className="pd2-story-copy">
                <p className="pd2-pull-quote">
                  "Designed to become part of your everyday, not an object you protect from it."
                </p>
                <p>
                  The Aster series takes its cue from objects that improve with use. Rather than
                  chase a passing trend, we spent our attention on proportion, material and the
                  quiet details — the weight of the crown, the taper of the lugs, the way the
                  leather softens over the first few weeks.
                </p>
                <p>
                  Every watch is assembled, checked and packed as a single piece before it
                  leaves our workshop — never in batches, never rushed.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <dl className="pd2-specs">
              {SPECS.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
              <div>
                <dt>Case diameter</dt>
                <dd>{selectedCaseSize}</dd>
              </div>
              <div>
                <dt>Strap</dt>
                <dd>{selectedStrapData?.fullName}</dd>
              </div>
            </dl>
          )}

          {activeTab === 'reviews' && (
            <div className="pd2-reviews" id="reviews">
              <div className="pd2-review-summary">
                <strong>{PRODUCT.rating}</strong>
                <span>out of 5, from {PRODUCT.ratings} ratings</span>
              </div>

              <div className="pd2-review-list">
                {REVIEWS.map((review) => (
                  <div className="pd2-review" key={review.name}>
                    <div className="pd2-review-top">
                      <span className="pd2-review-avatar">{review.initials}</span>
                      <div>
                        <strong>{review.name}</strong>
                        <em>Verified purchase · {review.date}</em>
                      </div>
                    </div>
                    <div className="pd2-review-stars">
                      {'★★★★★'.slice(0, review.rating)}
                    </div>
                    <p>{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="pd2-related" id="related">
          <h2>You may also like</h2>

          <div className="pd2-related-grid">
            {RELATED_PRODUCTS.map((item) => (
              <div className="pd2-related-card" key={item.name}>
                <div className="pd2-related-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <strong>{item.name}</strong>
                <span>₹{formatPrice(item.price)}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="pd2-banner">
          <div>
            <h2>Ready when you are.</h2>
            <p>
              Your build: {selectedDialData?.name}, {selectedStrapData?.name}, {selectedCaseSize}.
            </p>
          </div>
          <button onClick={buyNow}>Buy this timepiece</button>
        </section>
      </main>

      <footer className="pd2-footer" id="care">
        <div className="pd2-footer-inner">
          <div className="pd2-footer-brand">
            <span>amihive</span>
            <p>Mechanical watches, made to be worn every day and kept for a long time.</p>
          </div>

          <div className="pd2-footer-col">
            <h4>Shop</h4>
            <a href="#">All watches</a>
            <a href="#">Straps</a>
            <a href="#">Gift cards</a>
          </div>

          <div className="pd2-footer-col">
            <h4>Support</h4>
            <a href="#">Sizing guide</a>
            <a href="#">Warranty</a>
            <a href="#">Contact us</a>
          </div>

          <div className="pd2-footer-col">
            <h4>Company</h4>
            <a href="#">Our story</a>
            <a href="#">Workshop</a>
          </div>
        </div>

        <div className="pd2-footer-bottom">
          <span>© {new Date().getFullYear()} Amihive Timepieces</span>
          <span>Privacy · Terms</span>
        </div>
      </footer>

      {cartMessage && <div className="pd2-toast">{cartMessage}</div>}

      {lightbox && (
        <div className="pd2-lightbox" onClick={() => setLightbox(false)}>
          <button className="pd2-lightbox-close" onClick={() => setLightbox(false)} aria-label="Close">
            Close
          </button>
          <img
            src={WATCH_IMAGES[activeImage].src}
            alt={WATCH_IMAGES[activeImage].alt}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {sizeGuideOpen && (
        <div className="pd2-modal-backdrop" onClick={() => setSizeGuideOpen(false)}>
          <div className="pd2-modal" onClick={(e) => e.stopPropagation()}>
            <button className="pd2-modal-close" onClick={() => setSizeGuideOpen(false)} aria-label="Close">
              Close
            </button>

            <h2>Find your fit</h2>
            <p>Measure around your wrist and use this as a starting point.</p>

            <div className="pd2-size-table">
              {CASE_SIZES.map((size) => (
                <div key={size.size}>
                  <strong>{size.size}</strong>
                  <span>{size.label}</span>
                  <small>{size.desc}</small>
                </div>
              ))}
            </div>

            <button
              className="pd2-modal-select"
              onClick={() => setSizeGuideOpen(false)}
            >
              Continue with {selectedCaseSize}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDesign2;