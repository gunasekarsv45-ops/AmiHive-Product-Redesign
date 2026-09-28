import { useState } from 'react';
import '../Account/Account.css';
import { TopTicker, SiteHeader, SiteFooter, navigate, Ico, useToast } from '../Shared/SiteChrome';
import { PRODUCTS, DEALS, formatPrice, Stars, goToProductPage } from '../Home1/Home1';
import { img, SmartImage } from '../Home1/ProductGallery';

const SEED_IDS = ['f1', 'f3', 'f5', 'd2'];
const CATALOG = [...PRODUCTS, ...DEALS.map((d) => ({ ...d, type: 'watch', ratings: 120 }))];

function Wishlist() {
  const [toastNode, showToast] = useToast();
  const [items, setItems] = useState(() => CATALOG.filter((p) => SEED_IDS.includes(p.id)));
  const [cartCount, setCartCount] = useState(0);

  const handleRemove = (id) => (e) => {
    e.stopPropagation();
    setItems((cur) => cur.filter((p) => p.id !== id));
    showToast('Removed from wishlist.');
  };

  const handleAddToCart = (name) => (e) => {
    e.stopPropagation();
    setCartCount((n) => n + 1);
    showToast(`Added "${name}" to your cart.`);
  };

  return (
    <div className="sx-root ac-root">
      <TopTicker />
      <SiteHeader active="account" wishCount={items.length} cartCount={cartCount} onToast={showToast} />

      <div className="sx-wrap">
        <nav className="sx-crumb" aria-label="Breadcrumb">
          <button type="button" onClick={() => navigate('/')}>Home</button>
          <span>/</span>
          <strong>Wishlist</strong>
        </nav>

        <div className="ac-panel" style={{ paddingBottom: 'var(--section-y)' }}>
          <div className="ac-panelhead">
            <h1>Your wishlist</h1>
            <p>{items.length} saved piece{items.length === 1 ? '' : 's'}</p>
          </div>

          {items.length === 0 ? (
            <div className="ac-empty">
              <Ico name="heart" size={30} />
              <h3>Your wishlist is empty</h3>
              <p>Save pieces you love and find them here anytime.</p>
              <button type="button" className="sx-btn sx-btn--signal" onClick={() => navigate('/categories')}>
                Browse the collection
              </button>
            </div>
          ) : (
            <div className="ac-wishgrid">
              {items.map((p) => (
                <article
                  className="ac-wish"
                  key={p.id}
                  role="link"
                  tabIndex={0}
                  style={{ cursor: 'pointer' }}
                  onClick={() => goToProductPage(p.id)}
                >
                  <div className="ac-wish__media">
                    <SmartImage className="ac-wish__img" src={img(p.image, 500)} alt={p.name} />
                  </div>

                  <div className="ac-wish__body">
                    <strong>{p.name}</strong>
                    <span>{p.subtitle}</span>

                    <span className="ac-wish__rate">
                      <Stars value={p.rating} /> ({p.ratings})
                    </span>

                    <div className="ac-wish__price">
                      <strong>₹{formatPrice(p.price)}</strong>
                      {p.originalPrice > p.price && <s>₹{formatPrice(p.originalPrice)}</s>}
                    </div>

                    <div className="ac-wish__actions">
                      <button type="button" className="sx-btn sx-btn--ink sx-btn--sm" onClick={handleAddToCart(p.name)}>
                        <Ico name="bag" size={15} /> Add to cart
                      </button>

                      <button
                        type="button"
                        className="ac-wish__rm"
                        onClick={handleRemove(p.id)}
                        aria-label={`Remove ${p.name} from wishlist`}
                      >
                        <Ico name="trash" size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      {toastNode}
      <SiteFooter onToast={showToast} />
    </div>
  );
}

export default Wishlist;