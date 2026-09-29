import { useEffect, useMemo, useState } from 'react';
import './Checkout.css';
import { SmartImage, img } from '../Home1/ProductGallery';
import { formatPrice } from '../Home1/Home1';
import { ALL_PRODUCTS } from '../Shared/catalog';
import { TopTicker, SiteHeader, SiteFooter, Ico, navigate, useToast, getUser } from '../Shared/SiteChrome';

const PAYMENTS = [
  { id: 'upi', title: 'UPI', text: 'Pay with GPay, PhonePe, Paytm or any UPI app.' },
  { id: 'card', title: 'Credit / Debit card', text: 'Visa, Mastercard and RuPay. Extra 10% off up to ₹1,500 with select banks.' },
  { id: 'netbanking', title: 'Net banking', text: 'All major Indian banks supported.' },
  { id: 'cod', title: 'Cash on delivery', text: 'Pay in cash when your order arrives.' },
];

const getProduct = (id) => ALL_PRODUCTS.find((p) => p.id === id) || ALL_PRODUCTS[0];

function Checkout({ search = '' }) {
  const [toastNode, showToast] = useToast();
  const user = getUser();

  const params = useMemo(() => new URLSearchParams(search), [search]);
  const product = useMemo(() => getProduct(params.get('id')), [params]);

  const colour = params.get('colour') || '';
  const strapName = params.get('strap') || '';
  const size = params.get('size') || '';
  const extra = Number(params.get('extra')) || 0;

  const fullName = user ? `${user.first || ''} ${user.last || ''}`.trim() || 'Amihive Member' : 'Arjun Kumar';

  const ADDRESSES = useMemo(
    () => [
      {
        id: 'a1',
        type: 'Home',
        text: `${fullName}, 12 Sample Street, Sample Nagar, Chennai, Tamil Nadu – 600001`,
        phone: '9876543210',
      },
      {
        id: 'a2',
        type: 'Work',
        text: `${fullName}, 4th Floor, Example Tech Park, Main Road, Bengaluru, Karnataka – 560001`,
        phone: '9876543210',
      },
    ],
    [fullName]
  );

  const [qty, setQty] = useState(1);
  const [addressId, setAddressId] = useState('a1');
  const [pay, setPay] = useState('upi');
  const [placed, setPlaced] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const unit = product.price + extra;
  const mrp = (product.originalPrice > product.price ? product.originalPrice : product.price) + extra;
  const total = unit * qty;
  const savings = (mrp - unit) * qty;
  const off = mrp > unit ? Math.round(((mrp - unit) / mrp) * 100) : 0;

  const variantLine = [colour && `Colour: ${colour}`, strapName && `Strap: ${strapName}`, size && `Case: ${size} mm`]
    .filter(Boolean)
    .join(' · ');

  const placeOrder = () => {
    setPlaced({ id: `AMH-${String(Date.now()).slice(-6)}` });
    window.scrollTo(0, 0);
  };

  const goLogin = () => navigate(`/login?next=${encodeURIComponent(`/checkout${search}`)}`);

  /* ---------- success view ---------- */
  if (placed) {
    return (
      <div className="sx-root">
        <TopTicker />
        <SiteHeader active="" onToast={showToast} />

        <main className="sx-wrap">
          <div className="co-done">
            <span className="co-done__icon">
              <Ico name="check" size={32} />
            </span>

            <h1>Order placed successfully</h1>
            <span className="co-done__id">Order #{placed.id}</span>

            <p>
              Thank you! {qty} × {product.name} will be dispatched within 48 hours, fully insured. We will keep you
              posted by email and SMS.
            </p>

            <div className="co-done__actions">
              <button type="button" className="sx-btn sx-btn--signal" onClick={() => navigate(`/track-order?id=${encodeURIComponent(placed.id)}`)}>
                Track order
              </button>

              <button type="button" className="sx-btn sx-btn--ghost" onClick={() => navigate('/categories')}>
                Continue shopping
              </button>
            </div>
          </div>
        </main>

        <SiteFooter onToast={showToast} />
        {toastNode}
      </div>
    );
  }

  return (
    <div className="sx-root">
      <TopTicker />
      <SiteHeader active="" cartCount={qty} onToast={showToast} />

      <nav className="sx-crumb sx-wrap" aria-label="Breadcrumb">
        <button type="button" onClick={() => navigate('/')}>
          Home
        </button>
        <span>/</span>
        <button type="button" onClick={() => navigate(`/product?id=${product.id}`)}>
          {product.name}
        </button>
        <span>/</span>
        <strong>Checkout</strong>
      </nav>

      <main className="sx-wrap">
        <div className="co-head">
          <h1>Checkout</h1>
          <p>Choose how many you need, confirm your address and pick a payment method.</p>
        </div>

        {!user && (
          <div className="co-login">
            <span>Have an account? Login for faster checkout with your saved addresses.</span>
            <button type="button" onClick={goLogin}>
              Login / Sign up
            </button>
          </div>
        )}

        <div className="co-layout">
          <div className="co-steps">
            {/* 1. items + quantity */}
            <section className="co-card">
              <header className="co-card__head">
                <span className="co-card__num">1</span>
                <h2>Order summary</h2>
              </header>

              <div className="co-card__body">
                <div className="co-item">
                  <SmartImage className="co-item__img" src={img(product.image, 300)} alt={product.name} />

                  <div className="co-item__copy">
                    <strong>{product.name}</strong>
                    <span>{product.subtitle}</span>
                    {variantLine && <span>{variantLine}</span>}

                    <div className="co-item__price">
                      <strong>₹{formatPrice(unit)}</strong>
                      {mrp > unit && <s>₹{formatPrice(mrp)}</s>}
                      {off > 0 && <em>{off}% off</em>}
                    </div>

                    <div className="co-item__row">
                      <div className="co-qty" role="group" aria-label="Quantity">
                        <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label="Decrease quantity">
                          −
                        </button>
                        <span>{qty}</span>
                        <button type="button" onClick={() => setQty((q) => Math.min(9, q + 1))} disabled={qty >= 9} aria-label="Increase quantity">
                          +
                        </button>
                      </div>

                      <button type="button" className="co-remove" onClick={() => navigate('/categories')}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. address */}
            <section className="co-card">
              <header className="co-card__head">
                <span className="co-card__num">2</span>
                <h2>Delivery address</h2>
              </header>

              <div className="co-card__body">
                {ADDRESSES.map((a) => (
                  <label className={`co-option ${addressId === a.id ? 'is-on' : ''}`} key={a.id}>
                    <input type="radio" name="address" checked={addressId === a.id} onChange={() => setAddressId(a.id)} />
                    <span>
                      <strong>
                        {fullName} <span className="co-tag">{a.type}</span>
                      </strong>
                      <p>{a.text}</p>
                      <p>Mobile: {a.phone}</p>
                    </span>
                  </label>
                ))}

                <button type="button" className="co-link" onClick={() => navigate('/account?tab=addresses')}>
                  + Add a new address
                </button>
              </div>
            </section>

            {/* 3. payment */}
            <section className="co-card">
              <header className="co-card__head">
                <span className="co-card__num">3</span>
                <h2>Payment method</h2>
              </header>

              <div className="co-card__body">
                {PAYMENTS.map((p) => (
                  <label className={`co-option ${pay === p.id ? 'is-on' : ''}`} key={p.id}>
                    <input type="radio" name="payment" checked={pay === p.id} onChange={() => setPay(p.id)} />
                    <span>
                      <strong>{p.title}</strong>
                      <p>{p.text}</p>
                    </span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* price details */}
          <aside className="co-summary" aria-label="Price details">
            <h2>Price details</h2>

            <div className="co-row">
              <span>
                Price ({qty} item{qty === 1 ? '' : 's'})
              </span>
              <span>₹{formatPrice(mrp * qty)}</span>
            </div>

            {savings > 0 && (
              <div className="co-row co-row--off">
                <span>Discount</span>
                <span>−₹{formatPrice(savings)}</span>
              </div>
            )}

            <div className="co-row co-row--off">
              <span>Delivery charges</span>
              <span>FREE</span>
            </div>

            <div className="co-row co-row--total">
              <span>Total amount</span>
              <span>₹{formatPrice(total)}</span>
            </div>

            {savings > 0 && <div className="co-save">You will save ₹{formatPrice(savings)} on this order</div>}

            <button type="button" className="sx-btn sx-btn--signal sx-btn--block" onClick={placeOrder}>
              Place order
            </button>

            <p className="co-safe">
              <Ico name="lock" size={15} /> Safe and secure payments. Easy 7 day returns.
            </p>
          </aside>
        </div>
      </main>

      <SiteFooter onToast={showToast} />
      {toastNode}
    </div>
  );
}

export default Checkout;