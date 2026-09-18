import { useState } from 'react';
import './HomePage.css';

const BANNERS = [
  {
    id: 'b1',
    tag: 'New drop',
    title: 'The Aster Collection',
    subtitle: 'Automatic movements. Sapphire crystal. Built to be worn daily.',
    cta: 'Shop the collection',
    image:
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1600&q=85',
  },
  {
    id: 'b2',
    tag: 'Limited time',
    title: 'Up to 20% off Steel Cases',
    subtitle: 'On selected Meridian and Heritage pieces, this week only.',
    cta: 'View offers',
    image:
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1600&q=85',
  },
  {
    id: 'b3',
    tag: 'Just launched',
    title: 'Steel Jubilee Straps',
    subtitle: 'Swap-ready bracelets for every case in the lineup.',
    cta: 'Explore straps',
    image:
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1600&q=85',
  },
];

const CATEGORIES = [
  { name: 'Automatic Watches', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=500&q=80' },
  { name: 'Chronographs', image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=500&q=80' },
  { name: 'Leather Straps', image: 'https://images.unsplash.com/photo-1495857000853-fe46c8aefc30?auto=format&fit=crop&w=500&q=80' },
  { name: 'Steel Bracelets', image: 'https://images.unsplash.com/photo-1534441420982-a7a1dad35c1e?auto=format&fit=crop&w=500&q=80' },
  { name: 'Accessories', image: 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&w=500&q=80' },
  { name: 'Gift Sets', image: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=500&q=80' },
];

const DEALS = [
  { id: 'd1', name: 'Aster No.04', subtitle: 'Automatic Blue Dial', price: 18990, originalPrice: 21990, discount: 14, rating: 4.7, image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=600&q=85' },
  { id: 'd2', name: 'Aster No.02', subtitle: 'Chronograph', price: 22990, originalPrice: 27990, discount: 18, rating: 4.6, image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=600&q=85' },
  { id: 'd3', name: 'Meridian Steel', subtitle: 'Jubilee Bracelet', price: 24990, originalPrice: 28990, discount: 13, rating: 4.8, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=85' },
  { id: 'd4', name: 'Heritage No.01', subtitle: 'Classic Leather', price: 16990, originalPrice: 19990, discount: 15, rating: 4.5, image: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=600&q=85' },
  { id: 'd5', name: 'Urban No.03', subtitle: 'Everyday Field Watch', price: 14990, originalPrice: 17990, discount: 17, rating: 4.4, image: 'https://images.unsplash.com/photo-1495857000853-fe46c8aefc30?auto=format&fit=crop&w=600&q=85' },
];

const FEATURED_PRODUCTS = [
  { id: 'f1', name: 'Aster No.04', subtitle: 'Automatic Blue Dial Watch', price: 18990, originalPrice: 21990, rating: 4.7, ratings: 284, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=85' },
  { id: 'f2', name: 'Signature Clasp', subtitle: 'Steel Jubilee Strap', price: 3490, originalPrice: 3990, rating: 4.6, ratings: 96, image: 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&w=600&q=85' },
  { id: 'f3', name: 'Aster No.01', subtitle: 'Classic Everyday', price: 16990, originalPrice: 19990, rating: 4.8, ratings: 412, image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=600&q=85' },
  { id: 'f4', name: 'Travel Case', subtitle: 'Leather Watch Roll', price: 2290, originalPrice: 2790, rating: 4.5, ratings: 63, image: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=600&q=85' },
  { id: 'f5', name: 'Meridian No.02', subtitle: 'Steel Chronograph', price: 24990, originalPrice: 28990, rating: 4.6, ratings: 178, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=85' },
  { id: 'f6', name: 'Cognac Strap', subtitle: 'Italian Leather', price: 2990, originalPrice: 3490, rating: 4.7, ratings: 141, image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=600&q=85' },
  { id: 'f7', name: 'Urban No.03', subtitle: 'Everyday Field Watch', price: 14990, originalPrice: 17990, rating: 4.4, ratings: 87, image: 'https://images.unsplash.com/photo-1495857000853-fe46c8aefc30?auto=format&fit=crop&w=600&q=85' },
  { id: 'f8', name: 'Heritage No.01', subtitle: 'Classic Leather', price: 16990, originalPrice: 19990, rating: 4.5, ratings: 205, image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=600&q=85' },
];

const USP_STRIP = [
  { title: 'Insured Shipping', text: 'Free on every order' },
  { title: 'Certified Original', text: 'Every piece verified' },
  { title: '2 Year Warranty', text: 'On all movements' },
  { title: '7 Day Returns', text: 'No questions asked' },
];

const TESTIMONIALS = [
  { initials: 'AK', name: 'Arjun K.', date: '2 weeks ago', rating: 5, text: 'The blue dial looks significantly better in person. Proportions are exactly what I wanted.' },
  { initials: 'RM', name: 'Rahul M.', date: '1 month ago', rating: 5, text: 'Leather feels premium and the watch sits with a really balanced presence on the wrist.' },
  { initials: 'SN', name: 'Sneha N.', date: '1 month ago', rating: 4, text: 'Great everyday watch, packaging and delivery were both excellent.' },
];

const ADS = [
  'Free insured shipping on every order',
  'Extra 5% off on prepaid orders',
  'New arrivals every Friday',
  '2-year international warranty',
];

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBanner, setActiveBanner] = useState(0);
  const [wishlist, setWishlist] = useState({});
  const [cartMessage, setCartMessage] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const formatPrice = (value) => new Intl.NumberFormat('en-IN').format(value);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const toggleWishlist = (id) => {
    setWishlist((current) => ({ ...current, [id]: !current[id] }));
  };

  const addToCart = (name) => {
    setCartMessage(`Added "${name}" to your cart.`);
    setTimeout(() => setCartMessage(''), 2600);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  const renderStars = (rating) => '★★★★★'.slice(0, Math.round(rating));

  return (
    <div className="home-page">
      <div className="home-topbar">
        {ADS.map((ad) => (
          <span key={ad}>{ad}</span>
        ))}
      </div>

      <header className="home-header">
        <div className="home-header-inner">
          <span className="home-wordmark">amihive</span>

          <form className="home-search" onSubmit={handleSearch}>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search watches, straps and more"
            />
            <button type="submit">Search</button>
          </form>

          <div className="home-header-icons">
            <button>Wishlist</button>
            <button>Account</button>
            <button>Cart (0)</button>
          </div>
        </div>

        <nav className="home-nav">
          <a href="#categories">Collection</a>
          <a href="#deals">Deals</a>
          <a href="#featured">Bestsellers</a>
          <a href="#reviews">Reviews</a>
          <a href="#care">Care</a>
        </nav>
      </header>

      <main className="home-main">
        <section className="home-hero">
          <div className="home-hero-frame">
            <img src={BANNERS[activeBanner].image} alt={BANNERS[activeBanner].title} />
            <div className="home-hero-copy">
              <span className="home-hero-tag">{BANNERS[activeBanner].tag}</span>
              <h1>{BANNERS[activeBanner].title}</h1>
              <p>{BANNERS[activeBanner].subtitle}</p>
              <button className="home-hero-cta">{BANNERS[activeBanner].cta}</button>
            </div>
          </div>

          <div className="home-hero-dots">
            {BANNERS.map((banner, index) => (
              <button
                key={banner.id}
                className={`home-hero-dot ${activeBanner === index ? 'is-active' : ''}`}
                onClick={() => setActiveBanner(index)}
                aria-label={`Show banner ${index + 1}`}
              />
            ))}
          </div>
        </section>

        <section className="home-usp-strip">
          {USP_STRIP.map((item) => (
            <div className="home-usp-item" key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </div>
          ))}
        </section>

        <section className="home-categories" id="categories">
          <div className="home-section-head">
            <h2>Shop by category</h2>
          </div>

          <div className="home-category-grid">
            {CATEGORIES.map((category) => (
              <button className="home-category-card" key={category.name}>
                <div className="home-category-image">
                  <img src={category.image} alt={category.name} />
                </div>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="home-deals" id="deals">
          <div className="home-section-head">
            <h2>Today's deals</h2>
            <a href="#deals">View all</a>
          </div>

          <div className="home-deals-row">
            {DEALS.map((deal) => (
              <div className="home-deal-card" key={deal.id}>
                <span className="home-deal-badge">{deal.discount}% off</span>
                <div className="home-deal-image">
                  <img src={deal.image} alt={deal.name} />
                </div>
                <strong>{deal.name}</strong>
                <span className="home-deal-subtitle">{deal.subtitle}</span>
                <div className="home-deal-rating">
                  <span className="home-deal-stars">{renderStars(deal.rating)}</span>
                  <span>{deal.rating}</span>
                </div>
                <div className="home-deal-price">
                  <strong>₹{formatPrice(deal.price)}</strong>
                  <s>₹{formatPrice(deal.originalPrice)}</s>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="home-banner-strip">
          <div>
            <h2>Build your own timepiece</h2>
            <p>Choose your dial, strap and case size — delivered exactly the way you want it.</p>
          </div>
          <button>Start customizing</button>
        </section>

        <section className="home-featured" id="featured">
          <div className="home-section-head">
            <h2>Bestsellers</h2>
            <a href="#featured">View all</a>
          </div>

          <div className="home-featured-grid">
            {FEATURED_PRODUCTS.map((product) => (
              <div className="home-product-card" key={product.id}>
                <div className="home-product-image">
                  <img src={product.image} alt={product.name} />
                  <button
                    className={`home-product-wish ${wishlist[product.id] ? 'is-active' : ''}`}
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Save to wishlist"
                  >
                    {wishlist[product.id] ? '♥' : '♡'}
                  </button>
                </div>

                <div className="home-product-body">
                  <strong>{product.name}</strong>
                  <span className="home-product-subtitle">{product.subtitle}</span>

                  <div className="home-product-rating">
                    <span className="home-product-stars">{renderStars(product.rating)}</span>
                    <span>({product.ratings})</span>
                  </div>

                  <div className="home-product-price">
                    <strong>₹{formatPrice(product.price)}</strong>
                    <s>₹{formatPrice(product.originalPrice)}</s>
                  </div>

                  <button className="home-product-add" onClick={() => addToCart(product.name)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="home-testimonials" id="reviews">
          <div className="home-section-head">
            <h2>What customers say</h2>
          </div>

          <div className="home-testimonial-row">
            {TESTIMONIALS.map((review) => (
              <div className="home-testimonial-card" key={review.name}>
                <div className="home-testimonial-top">
                  <span className="home-testimonial-avatar">{review.initials}</span>
                  <div>
                    <strong>{review.name}</strong>
                    <em>Verified purchase · {review.date}</em>
                  </div>
                </div>
                <div className="home-testimonial-stars">{renderStars(review.rating)}</div>
                <p>{review.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="home-newsletter">
          <div>
            <h2>Stay ahead of new drops</h2>
            <p>Join our list for early access to new collections and member-only offers.</p>
          </div>

          <form className="home-newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <button type="submit">Subscribe</button>
          </form>

          {subscribed && <p className="home-newsletter-success">You're subscribed. Welcome to amihive.</p>}
        </section>
      </main>

      <footer className="home-footer" id="care">
        <div className="home-footer-inner">
          <div className="home-footer-brand">
            <span>amihive</span>
            <p>Mechanical watches, made to be worn every day and kept for a long time.</p>
          </div>

          <div className="home-footer-col">
            <h4>Shop</h4>
            <a href="#">All watches</a>
            <a href="#">Straps</a>
            <a href="#">Gift cards</a>
          </div>

          <div className="home-footer-col">
            <h4>Support</h4>
            <a href="#">Sizing guide</a>
            <a href="#">Warranty</a>
            <a href="#">Contact us</a>
          </div>

          <div className="home-footer-col">
            <h4>Company</h4>
            <a href="#">Our story</a>
            <a href="#">Workshop</a>
          </div>
        </div>

        <div className="home-footer-bottom">
          <span>© {new Date().getFullYear()} Amihive Timepieces</span>
          <span>Privacy · Terms</span>
        </div>
      </footer>

      {cartMessage && <div className="home-toast">{cartMessage}</div>}
    </div>
  );
}

export default HomePage;