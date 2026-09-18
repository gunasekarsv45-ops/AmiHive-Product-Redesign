import { useState } from 'react';
import CustomerHeader from '../../../components/Customer/CustomerHeader';
import CustomerFooter from '../../../components/Customer/CustomerFooter';
import ProductGallery from '../../../components/Customer/ProductGallery';
import './ProductRedesign1.css';

const DIAL_OPTIONS = [
  {
    id: 'blue',
    name: 'Sunburst Midnight Blue',
    color: '#0d274c',
  },
  {
    id: 'black',
    name: 'Classic Matte Obsidian',
    color: '#1b1b1b',
  },
  {
    id: 'silver',
    name: 'Sunray Brushed Silver',
    color: '#d5d7dc',
  },
  {
    id: 'green',
    name: 'Deep Forest Green',
    color: '#1c352d',
  },
];

const STRAP_OPTIONS = [
  {
    id: 'cognac',
    name: 'Cognac Leather',
    fullName: 'Cognac Italian Leather',
    color: '#7B3F11',
  },
  {
    id: 'obsidian',
    name: 'Obsidian Black',
    fullName: 'Obsidian Black Leather',
    color: '#1f1f1f',
  },
  {
    id: 'steel',
    name: 'Steel Jubilee Link',
    fullName: 'Steel Jubilee 5-Link Bracelet',
    color: '#a8acb6',
  },
];

const CASE_SIZES = [
  {
    size: '38mm',
    label: 'Subtle',
    desc: 'Fits wrists 5.5" - 6.75"',
  },
  {
    size: '40mm',
    label: 'Standard',
    desc: 'Balanced fit for most wrists 6.25" - 7.5"',
  },
  {
    size: '42mm',
    label: 'Presence',
    desc: 'Commanding stance for 7.0"+ wrists',
  },
];

const PRODUCT = {
  name: 'Aster No.04 Automatic Blue Dial Watch',
  price: 18990,
  originalPrice: 21990,
  discount: 14,
  rating: 4.7,
  ratings: 284,
  verifiedReviews: 96,
  sku: 'AMH-AST-04B',
  series: 'AMIHIVE TIMEPIECES · ARTISAN SERIES',
  description:
    'A considered everyday mechanical watch built around a deep midnight-blue dial, sapphire crystal and vegetable-tanned Italian leather. Designed to feel refined without becoming precious.',
};

function ProductRedesign() {
  const [selectedDial, setSelectedDial] = useState('blue');
  const [selectedStrap, setSelectedStrap] = useState('cognac');
  const [selectedCaseSize, setSelectedCaseSize] = useState('40mm');

  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('560001');
  const [deliveryMessage, setDeliveryMessage] = useState('');

  const [openSection, setOpenSection] = useState('highlights');
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const [cartMessage, setCartMessage] = useState('');

  const selectedDialData = DIAL_OPTIONS.find(
    (item) => item.id === selectedDial
  );

  const selectedStrapData = STRAP_OPTIONS.find(
    (item) => item.id === selectedStrap
  );

  const selectedSizeData = CASE_SIZES.find(
    (item) => item.size === selectedCaseSize
  );

  const formatPrice = (value) =>
    new Intl.NumberFormat('en-IN').format(value);

  const checkDelivery = () => {
    if (!/^\d{6}$/.test(pincode)) {
      setDeliveryMessage('Please enter a valid 6-digit pincode.');
      return;
    }

    setDeliveryMessage(
      `Delivery available to ${pincode}. Estimated arrival in 3–5 business days.`
    );
  };

  const addToCart = () => {
    setCartMessage('Added to your bag.');
    setTimeout(() => setCartMessage(''), 2800);
  };

  const buyNow = () => {
    setCartMessage('Proceeding to checkout...');
    setTimeout(() => setCartMessage(''), 2800);
  };

  const changeQuantity = (value) => {
    setQuantity((current) => Math.max(1, current + value));
  };

  const toggleSection = (section) => {
    setOpenSection((current) =>
      current === section ? '' : section
    );
  };

  return (
    <div className="product-page">
      <CustomerHeader />

      <main>
        <div className="page-container">
          <div className="breadcrumb">
            <span>Home</span>
            <span>/</span>
            <span>Timepieces</span>
            <span>/</span>
            <strong>Aster No.04</strong>
          </div>

          <section className="product-hero" id="collection">
            <div className="hero-gallery">
              <ProductGallery />
            </div>

            <div className="product-information">
              <div className="product-eyebrow">
                {PRODUCT.series}
              </div>

              <h1>{PRODUCT.name}</h1>

              <div className="rating-row">
                <div className="rating-stars">
                  ★★★★★
                </div>

                <strong>{PRODUCT.rating}</strong>

                <span>
                  {PRODUCT.ratings} ratings
                </span>

                <span className="rating-divider">|</span>

                <span>
                  {PRODUCT.verifiedReviews} verified reviews
                </span>
              </div>

              <p className="product-description">
                {PRODUCT.description}
              </p>

              <div className="product-price-area">
                <div className="current-price">
                  ₹{formatPrice(PRODUCT.price)}
                </div>

                <div className="original-price">
                  ₹{formatPrice(PRODUCT.originalPrice)}
                </div>

                <div className="discount-tag">
                  {PRODUCT.discount}% OFF
                </div>
              </div>

              <div className="saving-line">
                You save ₹{formatPrice(
                  PRODUCT.originalPrice - PRODUCT.price
                )}
              </div>

              <div className="product-meta">
                <div>
                  <span>SKU</span>
                  <strong>{PRODUCT.sku}</strong>
                </div>

                <div>
                  <span>Movement</span>
                  <strong>Automatic</strong>
                </div>

                <div>
                  <span>Availability</span>
                  <strong className="stock-status">
                    <i /> In Stock
                  </strong>
                </div>
              </div>

              <div className="offer-strip">
                <div className="offer-icon">%</div>

                <div>
                  <strong>Exclusive launch offer</strong>
                  <span>
                    Free insured shipping + complimentary first service.
                  </span>
                </div>

                <button>View</button>
              </div>

              <div className="configuration-area">
                <div className="configuration-heading">
                  <div>
                    <span>01</span>
                    <h3>Choose your dial</h3>
                  </div>

                  <strong>{selectedDialData?.name}</strong>
                </div>

                <div className="dial-options">
                  {DIAL_OPTIONS.map((dial) => (
                    <button
                      key={dial.id}
                      className={`dial-option ${
                        selectedDial === dial.id ? 'selected' : ''
                      }`}
                      onClick={() => setSelectedDial(dial.id)}
                      title={dial.name}
                    >
                      <span
                        style={{
                          background: dial.color,
                        }}
                      />
                        <small>{dial.name}</small>
                    </button>
                  ))}
                </div>

                <div className="configuration-heading second">
                  <div>
                    <span>02</span>
                    <h3>Choose your strap</h3>
                  </div>

                  <strong>{selectedStrapData?.fullName}</strong>
                </div>

                <div className="strap-options">
                  {STRAP_OPTIONS.map((strap) => (
                    <button
                      key={strap.id}
                      className={`strap-option ${
                        selectedStrap === strap.id ? 'selected' : ''
                      }`}
                      onClick={() => setSelectedStrap(strap.id)}
                    >
                      <span
                        style={{
                          background: strap.color,
                        }}
                      />

                      <div>
                        <strong>{strap.name}</strong>
                        <small>{strap.fullName}</small>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="configuration-heading second">
                  <div>
                    <span>03</span>
                    <h3>Choose case size</h3>
                  </div>

                  <button
                    className="size-guide-button"
                    onClick={() => setSizeGuideOpen(true)}
                  >
                    Size guide ↗
                  </button>
                </div>

                <div className="case-options">
                  {CASE_SIZES.map((item) => (
                    <button
                      key={item.size}
                      className={`case-option ${
                        selectedCaseSize === item.size
                          ? 'selected'
                          : ''
                      }`}
                      onClick={() =>
                        setSelectedCaseSize(item.size)
                      }
                    >
                      <strong>{item.size}</strong>
                      <span>{item.label}</span>
                      <small>{item.desc}</small>
                    </button>
                  ))}
                </div>
              </div>

              <div className="delivery-card" id="delivery">
                <div className="delivery-header">
                  <div>
                    <span className="delivery-icon">⌖</span>
                    <div>
                      <strong>Check delivery</strong>
                      <small>
                        Enter your pincode for an estimated delivery date.
                      </small>
                    </div>
                  </div>
                </div>

                <div className="pincode-row">
                  <input
                    value={pincode}
                    onChange={(event) =>
                      setPincode(event.target.value.replace(/\D/g, '').slice(0, 6))
                    }
                    placeholder="Enter pincode"
                  />

                  <button onClick={checkDelivery}>
                    Check
                  </button>
                </div>

                {deliveryMessage && (
                  <div className="delivery-result">
                    ✓ {deliveryMessage}
                  </div>
                )}

                <div className="delivery-benefits">
                  <span>✓ Free shipping</span>
                  <span>✓ Insured courier</span>
                  <span>✓ GST invoice</span>
                </div>
              </div>

              <div className="purchase-area">
                <div className="quantity-control">
                  <button onClick={() => changeQuantity(-1)}>
                    −
                  </button>

                  <span>{quantity}</span>

                  <button onClick={() => changeQuantity(1)}>
                    +
                  </button>
                </div>

                <button
                  className="add-cart-button"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>

                <button
                  className="buy-button"
                  onClick={buyNow}
                >
                  Buy Now
                  <span>→</span>
                </button>
              </div>

              <div className="stock-message">
                <span className="pulse-dot" />
                Only 18 pieces from this batch remain
              </div>

              <div className="trust-row">
                <div>
                  <span>▣</span>
                  <strong>SSL Secure</strong>
                </div>

                <div>
                  <span>✓</span>
                  <strong>Certified Original</strong>
                </div>

                <div>
                  <span>◈</span>
                  <strong>2 Year Warranty</strong>
                </div>

                <div>
                  <span>↩</span>
                  <strong>7 Day Returns</strong>
                </div>
              </div>
            </div>
          </section>

          <section className="details-section" id="details">
            <div className="section-intro">
              <div>
                <span className="section-number">02 / THE DETAILS</span>
                <h2>Everything behind the timepiece.</h2>
              </div>

              <p>
                From the movement inside to the leather on your wrist,
                every component has been selected with the same purpose:
                make something you'll want to keep wearing.
              </p>
            </div>

            <div className="details-accordion">
              <article
                className={`detail-panel ${
                  openSection === 'highlights' ? 'open' : ''
                }`}
              >
                <button
                  className="detail-heading"
                  onClick={() => toggleSection('highlights')}
                >
                  <div>
                    <span>01</span>
                    <h3>Highlights</h3>
                  </div>

                  <span className="accordion-symbol">
                    {openSection === 'highlights' ? '−' : '+'}
                  </span>
                </button>

                {openSection === 'highlights' && (
                  <div className="detail-content highlight-grid">
                    <div>
                      <span className="highlight-icon">⚙</span>
                      <span className="highlight-index">01</span>
                      <h4>9015 Automatic Movement</h4>
                      <p>
                        A dependable mechanical calibre designed for
                        everyday wear with a smooth automatic winding system.
                      </p>
                    </div>

                    <div>
                      <span className="highlight-icon">◆</span>
                      <span className="highlight-index">02</span>
                      <h4>Double-Domed Sapphire</h4>
                      <p>
                        Scratch-resistant sapphire crystal gives the dial
                        clarity while creating a subtle vintage profile.
                      </p>
                    </div>

                    <div>
                      <span className="highlight-icon">⬡</span>
                      <span className="highlight-index">03</span>
                      <h4>Italian Leather</h4>
                      <p>
                        Vegetable-tanned leather develops character
                        naturally as it ages.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              <article
                className={`detail-panel ${
                  openSection === 'story' ? 'open' : ''
                }`}
              >
                <button
                  className="detail-heading"
                  onClick={() => toggleSection('story')}
                >
                  <div>
                    <span>02</span>
                    <h3>Artisan Story</h3>
                  </div>

                  <span className="accordion-symbol">
                    {openSection === 'story' ? '−' : '+'}
                  </span>
                </button>

                {openSection === 'story' && (
                  <div className="detail-content story-content">
                    <div className="story-image">
                      <img
                        src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=900&q=85"
                        alt="Watchmaker assembling an AmiHive timepiece"
                      />
                    </div>

                    <div>
                      <span className="story-label">
                        THE ASTER SERIES
                      </span>

                      <h4>
                        Designed to become part of your everyday.
                      </h4>

                      <p>
                        The Aster series takes inspiration from objects
                        that become better with use. Rather than chasing
                        short-lived trends, we focused on proportion,
                        material and quiet details.
                      </p>

                      <p>
                        Each watch is assembled, checked and packed as
                        an individual piece before leaving our workshop.
                      </p>
                    </div>
                  </div>
                )}
              </article>

              <article
                className={`detail-panel ${
                  openSection === 'specs' ? 'open' : ''
                }`}
              >
                <button
                  className="detail-heading"
                  onClick={() => toggleSection('specs')}
                >
                  <div>
                    <span>03</span>
                    <h3>Technical Specifications</h3>
                  </div>

                  <span className="accordion-symbol">
                    {openSection === 'specs' ? '−' : '+'}
                  </span>
                </button>

                {openSection === 'specs' && (
                  <div className="detail-content specs-grid">
                    <div>
                      <span>Movement</span>
                      <strong>Miyota 9015 Automatic</strong>
                    </div>

                    <div>
                      <span>Case Material</span>
                      <strong>316L Stainless Steel</strong>
                    </div>

                    <div>
                      <span>Crystal</span>
                      <strong>Double-Domed Sapphire</strong>
                    </div>

                    <div>
                      <span>Water Resistance</span>
                      <strong>10 ATM / 100m</strong>
                    </div>

                    <div>
                      <span>Case Diameter</span>
                      <strong>{selectedCaseSize}</strong>
                    </div>

                    <div>
                      <span>Power Reserve</span>
                      <strong>Approx. 42 hours</strong>
                    </div>

                    <div>
                      <span>Strap</span>
                      <strong>{selectedStrapData?.fullName}</strong>
                    </div>

                    <div>
                      <span>Warranty</span>
                      <strong>2 Years</strong>
                    </div>
                  </div>
                )}
              </article>

              <article
                className={`detail-panel ${
                  openSection === 'reviews' ? 'open' : ''
                }`}
                id="reviews"
              >
                <button
                  className="detail-heading"
                  onClick={() => toggleSection('reviews')}
                >
                  <div>
                    <span>04</span>
                    <h3>Reviews</h3>
                  </div>

                  <span className="accordion-symbol">
                    {openSection === 'reviews' ? '−' : '+'}
                  </span>
                </button>

                {openSection === 'reviews' && (
                  <div className="detail-content reviews-content">
                    <div className="review-summary">
                      <div className="review-score">
                        <strong>4.7</strong>
                        <div>★★★★★</div>
                        <span>284 ratings</span>
                      </div>

                      <div className="review-bars">
                        <div>
                          <span>5</span>
                          <div><i style={{ width: '86%' }} /></div>
                        </div>

                        <div>
                          <span>4</span>
                          <div><i style={{ width: '10%' }} /></div>
                        </div>

                        <div>
                          <span>3</span>
                          <div><i style={{ width: '3%' }} /></div>
                        </div>

                        <div>
                          <span>2</span>
                          <div><i style={{ width: '1%' }} /></div>
                        </div>
                      </div>
                    </div>

                    <div className="review-list">
                      <div className="review-list-header">
                        <h5>Customer Reviews</h5>
                        <button className="review-sort">Most Recent ▾</button>
                      </div>

                      <div className="review-card">
                        <div className="review-card-top">
                          <div className="reviewer-info">
                            <span className="reviewer-avatar">AK</span>
                            <div>
                              <strong>Arjun K.</strong>
                              <span className="review-verified">Verified purchase</span>
                            </div>
                          </div>

                          <span className="review-date">2 weeks ago</span>
                        </div>

                        <div className="review-stars">
                          ★★★★★
                        </div>

                        <p>
                          The blue dial looks significantly better in
                          person. The proportions are exactly what I wanted.
                        </p>
                      </div>

                      <div className="review-card">
                        <div className="review-card-top">
                          <div className="reviewer-info">
                            <span className="reviewer-avatar">RM</span>
                            <div>
                              <strong>Rahul M.</strong>
                              <span className="review-verified">Verified purchase</span>
                            </div>
                          </div>

                          <span className="review-date">1 month ago</span>
                        </div>

                        <div className="review-stars">
                          ★★★★★
                        </div>

                        <p>
                          Leather feels premium and the watch has a
                          really balanced wrist presence.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            </div>
          </section>

          <section className="final-purchase-banner">
            <div>
              <span>ASTER NO.04</span>
              <h2>Ready when you are.</h2>
              <p>
                Your configuration: {selectedDialData?.name},&nbsp;
                {selectedStrapData?.name}, {selectedSizeData?.size}.
              </p>
            </div>

            <button onClick={buyNow}>
              Buy this timepiece
              <span>→</span>
            </button>
          </section>
        </div>
      </main>

      <CustomerFooter />

      {cartMessage && (
        <div className="toast-message">
          <span>✓</span>
          {cartMessage}
        </div>
      )}

      {sizeGuideOpen && (
        <div
          className="modal-backdrop"
          onClick={() => setSizeGuideOpen(false)}
        >
          <div
            className="size-guide-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSizeGuideOpen(false)}
            >
              ×
            </button>

            <span className="section-number">CASE SIZE GUIDE</span>

            <h2>Find your fit.</h2>

            <p>
              Measure around your wrist and use the guide below as a
              starting point.
            </p>

            <div className="size-guide-table">
              {CASE_SIZES.map((size) => (
                <div key={size.size}>
                  <strong>{size.size}</strong>
                  <span>{size.label}</span>
                  <small>{size.desc}</small>
                </div>
              ))}
            </div>

            <button
              className="modal-select"
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

export default ProductRedesign;