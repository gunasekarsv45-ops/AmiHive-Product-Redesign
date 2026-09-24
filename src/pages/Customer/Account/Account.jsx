import { useEffect, useState } from 'react';
import './Account.css';
import { SmartImage, img } from '../Home1/ProductGallery';
import { PRODUCTS, Stars, formatPrice, goToProductPage } from '../Home1/Home1';
import { SiteHeader, SiteFooter, Ico, navigate, useToast } from '../Shared/SiteChrome';

/* ------------------------------------------------------------------
   DEMO DATA — replace with your real logged-in user / API data
------------------------------------------------------------------- */
const USER = {
  first: 'Arjun',
  last: 'Kumar',
  email: 'arjun.kumar@example.com',
  mobile: '9876543210',
  gender: 'male',
  since: '2024',
};

const TABS = [
  { id: 'overview', label: 'Account overview', icon: 'grid' },
  { id: 'profile', label: 'Profile information', icon: 'user' },
  { id: 'orders', label: 'My orders', icon: 'box' },
  { id: 'addresses', label: 'Manage addresses', icon: 'pin' },
  { id: 'payments', label: 'Payments and wallet', icon: 'card' },
  { id: 'wishlist', label: 'My wishlist', icon: 'heart' },
  { id: 'coupons', label: 'Coupons and rewards', icon: 'tag' },
  { id: 'notifications', label: 'Notifications', icon: 'bell' },
  { id: 'security', label: 'Login and security', icon: 'lock' },
];

const STEPS = ['Ordered', 'Packed', 'Shipped', 'Out for delivery', 'Delivered'];

const ORDERS = [
  {
    id: 'AMH-260920-1042',
    date: '20 Sep 2026',
    status: 'transit',
    step: 2,
    eta: 'Arriving by 28 Sep',
    total: 21280,
    items: [
      { pid: 'f1', name: 'Aster No.04', sub: 'Automatic blue dial watch', image: 'wristBlack', price: 18990, qty: 1 },
      { pid: 'f4', name: 'Travel Case', sub: 'Leather watch roll', image: 'desk', price: 2290, qty: 1 },
    ],
  },
  {
    id: 'AMH-260802-0877',
    date: '2 Aug 2026',
    status: 'delivered',
    step: 4,
    eta: 'Delivered on 6 Aug 2026',
    total: 2990,
    items: [{ pid: 'f6', name: 'Cognac Strap', sub: 'Italian leather', image: 'strap', price: 2990, qty: 1 }],
  },
  {
    id: 'AMH-260614-0531',
    date: '14 Jun 2026',
    status: 'delivered',
    step: 4,
    eta: 'Delivered on 19 Jun 2026',
    total: 16990,
    items: [{ pid: 'f3', name: 'Aster No.01', sub: 'Classic everyday', image: 'goldClose', price: 16990, qty: 1 }],
  },
  {
    id: 'AMH-260403-0219',
    date: '3 Apr 2026',
    status: 'cancelled',
    step: 0,
    eta: 'Cancelled on 3 Apr 2026',
    total: 3490,
    items: [{ pid: 'f2', name: 'Signature Clasp', sub: 'Steel jubilee strap', image: 'jubilee', price: 3490, qty: 1 }],
  },
];

const STATUS_LABEL = { transit: 'In transit', delivered: 'Delivered', cancelled: 'Cancelled' };

const ADDRESSES_INITIAL = [
  {
    id: 'a1',
    type: 'Home',
    name: 'Arjun Kumar',
    phone: '9876543210',
    line: '12, Sample Street, Sample Nagar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600001',
    isDefault: true,
  },
  {
    id: 'a2',
    type: 'Work',
    name: 'Arjun Kumar',
    phone: '9876543210',
    line: '4th Floor, Example Tech Park, Main Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560001',
    isDefault: false,
  },
];

const CARDS_INITIAL = [
  { id: 'c1', brand: 'Visa', last4: '4417', name: 'Arjun Kumar', exp: '08/28' },
  { id: 'c2', brand: 'Mastercard', last4: '0921', name: 'Arjun Kumar', exp: '02/29' },
];

const COUPONS = [
  { code: 'AMI10', title: '10% off on bank cards', text: 'Up to ₹1,500 on select bank cards.', expiry: 'Valid till 31 Oct 2026' },
  { code: 'STRAP200', title: '₹200 off on straps', text: 'On strap orders above ₹2,000.', expiry: 'Valid till 15 Oct 2026' },
  { code: 'PREPAID5', title: 'Extra 5% on prepaid', text: 'Pay online and save on every order.', expiry: 'Valid till 30 Nov 2026' },
  { code: 'GIFTSET', title: '₹500 off gift sets', text: 'On the Gift Set Classic and travel cases.', expiry: 'Valid till 31 Dec 2026' },
];

const NOTIF_ROWS = [
  { id: 'orders', title: 'Order and delivery updates', text: 'Shipping, delivery and return status.' },
  { id: 'offers', title: 'Offers and deals', text: 'Deals of the day, coupons and sales.' },
  { id: 'drops', title: 'New collection drops', text: 'Early access to new Amihive releases.' },
  { id: 'price', title: 'Wishlist price drops', text: 'When a saved item goes on offer.' },
];

const NOTIF_CHANNELS = ['Email', 'SMS', 'WhatsApp'];

const SESSIONS_INITIAL = [
  { id: 's1', device: 'Chrome on Windows', note: 'This device · Active now', current: true },
  { id: 's2', device: 'Amihive app on Android', note: 'Last active 2 days ago', current: false },
  { id: 's3', device: 'Safari on iPhone', note: 'Last active 3 weeks ago', current: false },
];

const HELP_LINKS = ['Track a package', 'Return or exchange an item', 'Warranty claims', 'Contact support'];

const readTab = () => {
  const t = new URLSearchParams(window.location.search).get('tab');
  return TABS.some((x) => x.id === t) ? t : 'overview';
};

/* ------------------------------------------------------------------
   Small shared form pieces
------------------------------------------------------------------- */
function Field({ label, error, children }) {
  return (
    <label className="ac-field">
      <span>{label}</span>
      {children}
      {error && <em className="ac-field__err">{error}</em>}
    </label>
  );
}

function Switch({ checked, onChange, label }) {
  return (
    <label className="ac-switch">
      <input type="checkbox" checked={checked} onChange={onChange} aria-label={label} />
      <span />
    </label>
  );
}

function PanelHead({ title, text }) {
  return (
    <div className="ac-panelhead">
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------
   OVERVIEW
------------------------------------------------------------------- */
function Overview({ user, go, wishCount, toast }) {
  const tiles = [
    { tab: 'orders', icon: 'box', title: 'Your orders', text: 'Track, return or buy things again' },
    { tab: 'security', icon: 'lock', title: 'Login and security', text: 'Password and two-step verification' },
    { tab: 'addresses', icon: 'pin', title: 'Your addresses', text: 'Edit delivery addresses' },
    { tab: 'payments', icon: 'card', title: 'Payments and wallet', text: 'Cards, UPI and gift card balance' },
    { tab: 'wishlist', icon: 'heart', title: 'Your wishlist', text: 'Saved pieces and price drops' },
    { tab: 'coupons', icon: 'tag', title: 'Coupons and rewards', text: 'Offers and Amihive points' },
  ];

  const recent = ORDERS[0];

  return (
    <>
      <div className="ac-welcome">
        <div>
          <span className="ac-welcome__tag">Amihive member since {user.since}</span>
          <h1>Hello, {user.first}</h1>
          <p>Manage your orders, addresses, payments and preferences from one place.</p>
        </div>

        <div className="ac-stats">
          <div>
            <strong>{ORDERS.length}</strong>
            <span>Orders</span>
          </div>
          <div>
            <strong>{wishCount}</strong>
            <span>Wishlist</span>
          </div>
          <div>
            <strong>{COUPONS.length}</strong>
            <span>Coupons</span>
          </div>
          <div>
            <strong>1,250</strong>
            <span>Points</span>
          </div>
        </div>
      </div>

      <div className="ac-tiles">
        {tiles.map((t) => (
          <button type="button" className="ac-tile" key={t.tab} onClick={() => go(t.tab)}>
            <span className="ac-tile__icon">
              <Ico name={t.icon} size={22} />
            </span>

            <span className="ac-tile__copy">
              <strong>{t.title}</strong>
              <em>{t.text}</em>
            </span>

            <Ico name="right" size={18} />
          </button>
        ))}
      </div>

      <section className="ac-card">
        <header className="ac-card__head">
          <h3>Latest order</h3>
          <button type="button" className="sx-linkbtn" onClick={() => go('orders')}>
            View all orders
          </button>
        </header>

        <div className="ac-mini">
          <SmartImage className="ac-mini__img" src={img(recent.items[0].image, 200)} alt={recent.items[0].name} />

          <div className="ac-mini__copy">
            <strong>
              {recent.items[0].name}
              {recent.items.length > 1 ? ` + ${recent.items.length - 1} more` : ''}
            </strong>
            <span>
              Order {recent.id} · placed {recent.date}
            </span>
            <span className={`ac-badge ac-badge--${recent.status}`}>{STATUS_LABEL[recent.status]}</span>
          </div>

          <button type="button" className="sx-btn sx-btn--line sx-btn--sm" onClick={() => toast('Tracking page coming soon.')}>
            Track package
          </button>
        </div>
      </section>

      <section className="ac-card">
        <header className="ac-card__head">
          <h3>Recommended for you</h3>
        </header>

        <div className="ac-reco">
          {PRODUCTS.slice(4, 8).map((p) => (
            <button type="button" className="ac-reco__item" key={p.id} onClick={() => goToProductPage(p.id)}>
              <SmartImage className="ac-reco__img" src={img(p.image, 400)} alt={p.name} />
              <strong>{p.name}</strong>
              <span>₹{formatPrice(p.price)}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="ac-card">
        <header className="ac-card__head">
          <h3>Need help?</h3>
        </header>

        <div className="ac-helpgrid">
          {HELP_LINKS.map((label) => (
            <button type="button" className="ac-helplink" key={label} onClick={() => toast(`${label} page is coming soon.`)}>
              <Ico name="help" size={17} /> {label}
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------
   PROFILE  (Flipkart-style edit cards)
------------------------------------------------------------------- */
function EditCard({ title, note, fields, initial, onSaved }) {
  const [editing, setEditing] = useState(false);
  const [vals, setVals] = useState(initial);
  const [draft, setDraft] = useState(initial);
  const [errors, setErrors] = useState({});

  const start = () => {
    setDraft(vals);
    setErrors({});
    setEditing(true);
  };

  const save = () => {
    const next = {};

    fields.forEach((f) => {
      if (f.check && !f.check(draft[f.key])) next[f.key] = f.error;
    });

    setErrors(next);
    if (Object.keys(next).length) return;

    setVals(draft);
    setEditing(false);
    onSaved(title, draft);
  };

  const source = editing ? draft : vals;

  return (
    <section className="ac-card">
      <header className="ac-card__head">
        <h3>{title}</h3>

        {!editing && (
          <button type="button" className="sx-linkbtn" onClick={start}>
            <Ico name="edit" size={15} /> Edit
          </button>
        )}
      </header>

      <div className="ac-formgrid">
        {fields.map((f) => (
          <Field key={f.key} label={f.label} error={errors[f.key]}>
            {f.type === 'radio' ? (
              <div className="ac-radios">
                {f.options.map((o) => (
                  <label key={o.value} className="ac-radio">
                    <input
                      type="radio"
                      name={`${title}-${f.key}`}
                      disabled={!editing}
                      checked={source[f.key] === o.value}
                      onChange={() => setDraft((d) => ({ ...d, [f.key]: o.value }))}
                    />
                    <span>{o.label}</span>
                  </label>
                ))}
              </div>
            ) : (
              <input
                className="ac-input"
                type={f.type || 'text'}
                inputMode={f.inputMode}
                disabled={!editing}
                value={source[f.key]}
                placeholder={f.placeholder}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, [f.key]: f.format ? f.format(e.target.value) : e.target.value }))
                }
              />
            )}
          </Field>
        ))}
      </div>

      {editing && (
        <div className="ac-actions">
          <button type="button" className="sx-btn sx-btn--signal sx-btn--sm" onClick={save}>
            Save changes
          </button>

          <button type="button" className="sx-btn sx-btn--ghost sx-btn--sm" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </div>
      )}

      {note && <p className="ac-note">{note}</p>}
    </section>
  );
}

function Profile({ user, onSaved }) {
  const digits = (max) => (v) => v.replace(/\D/g, '').slice(0, max);

  return (
    <>
      <PanelHead title="Profile information" text="Keep your personal details up to date. They are used on invoices and delivery." />

      <EditCard
        title="Personal information"
        initial={{ first: user.first, last: user.last, gender: user.gender }}
        onSaved={onSaved}
        fields={[
          { key: 'first', label: 'First name', check: (v) => v.trim().length > 0, error: 'Enter your first name.' },
          { key: 'last', label: 'Last name', check: (v) => v.trim().length > 0, error: 'Enter your last name.' },
          {
            key: 'gender',
            label: 'Your gender',
            type: 'radio',
            options: [
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Prefer not to say' },
            ],
          },
        ]}
      />

      <EditCard
        title="Email address"
        note="We send order confirmations and invoices to this address."
        initial={{ email: user.email }}
        onSaved={onSaved}
        fields={[
          {
            key: 'email',
            label: 'Email address',
            type: 'email',
            check: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
            error: 'Enter a valid email address.',
          },
        ]}
      />

      <EditCard
        title="Mobile number"
        note="Used for delivery updates and to verify your account."
        initial={{ mobile: user.mobile }}
        onSaved={onSaved}
        fields={[
          {
            key: 'mobile',
            label: 'Mobile number',
            inputMode: 'numeric',
            format: digits(10),
            check: (v) => /^\d{10}$/.test(v),
            error: 'Enter a 10 digit mobile number.',
          },
        ]}
      />

      <section className="ac-card ac-faq">
        <header className="ac-card__head">
          <h3>Frequently asked questions</h3>
        </header>

        <details>
          <summary>What happens when I update my email or mobile number?</summary>
          <p>Your account stays the same. Order updates and invoices simply go to the new contact details.</p>
        </details>

        <details>
          <summary>Does my name have to match my payment card?</summary>
          <p>No, but a matching name on the delivery address helps couriers hand over insured shipments faster.</p>
        </details>

        <details>
          <summary>How do I delete my account?</summary>
          <p>Open Login and security and use the Delete account section at the bottom of that page.</p>
        </details>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------
   ORDERS
------------------------------------------------------------------- */
function Orders({ toast }) {
  const [filter, setFilter] = useState('all');

  const list = ORDERS.filter((o) => filter === 'all' || o.status === filter);

  const filters = [
    { id: 'all', label: 'All orders' },
    { id: 'transit', label: 'In transit' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <>
      <PanelHead title="My orders" text="Track packages, download invoices, return items or buy them again." />

      <div className="ac-tabs" role="tablist" aria-label="Filter orders">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            className={`ac-tabs__btn ${filter === f.id ? 'is-on' : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {list.length === 0 && (
        <div className="ac-empty">
          <Ico name="box" size={30} />
          <h3>No orders in this list</h3>
          <p>Orders you place will appear here.</p>
        </div>
      )}

      {list.map((o) => (
        <article className="ac-order" key={o.id}>
          <header className="ac-order__head">
            <div>
              <span>Order placed</span>
              <strong>{o.date}</strong>
            </div>

            <div>
              <span>Total</span>
              <strong>₹{formatPrice(o.total)}</strong>
            </div>

            <div>
              <span>Ship to</span>
              <strong>Arjun Kumar</strong>
            </div>

            <div className="ac-order__id">
              <span>Order</span>
              <strong>#{o.id}</strong>
            </div>
          </header>

          <div className="ac-order__body">
            <div className="ac-order__status">
              <span className={`ac-badge ac-badge--${o.status}`}>{STATUS_LABEL[o.status]}</span>
              <strong>{o.eta}</strong>
            </div>

            {o.status === 'transit' && (
              <ol className="ac-track" aria-label="Delivery progress">
                {STEPS.map((s, i) => (
                  <li key={s} className={i <= o.step ? 'is-done' : ''}>
                    <i />
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            )}

            {o.items.map((it) => (
              <div className="ac-item" key={it.pid}>
                <SmartImage className="ac-item__img" src={img(it.image, 240)} alt={it.name} />

                <div className="ac-item__copy">
                  <button type="button" className="ac-item__name" onClick={() => goToProductPage(it.pid)}>
                    {it.name}
                  </button>
                  <span>{it.sub}</span>
                  <span>
                    Qty {it.qty} · ₹{formatPrice(it.price)}
                  </span>
                </div>

                <div className="ac-item__actions">
                  {o.status === 'transit' && (
                    <button type="button" className="sx-btn sx-btn--signal sx-btn--sm" onClick={() => toast('Tracking page coming soon.')}>
                      Track package
                    </button>
                  )}

                  {o.status === 'delivered' && (
                    <>
                      <button type="button" className="sx-btn sx-btn--ink sx-btn--sm" onClick={() => goToProductPage(it.pid)}>
                        Buy it again
                      </button>
                      <button type="button" className="sx-btn sx-btn--ghost sx-btn--sm" onClick={() => toast('Review form coming soon.')}>
                        Write a review
                      </button>
                    </>
                  )}

                  {o.status === 'cancelled' && (
                    <button type="button" className="sx-btn sx-btn--ink sx-btn--sm" onClick={() => goToProductPage(it.pid)}>
                      Buy it again
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <footer className="ac-order__foot">
            <button type="button" className="sx-linkbtn" onClick={() => toast('Invoice download coming soon.')}>
              Download invoice
            </button>

            {o.status === 'delivered' && (
              <button type="button" className="sx-linkbtn" onClick={() => toast('Return / exchange coming soon.')}>
                Return or exchange
              </button>
            )}

            {o.status === 'transit' && (
              <button type="button" className="sx-linkbtn" onClick={() => toast('Cancellation coming soon.')}>
                Cancel order
              </button>
            )}
          </footer>
        </article>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------
   ADDRESSES
------------------------------------------------------------------- */
const EMPTY_ADDR = { name: '', phone: '', pincode: '', line: '', city: '', state: '', type: 'Home' };

function AddressForm({ initial, onSave, onCancel }) {
  const [f, setF] = useState(initial);
  const [err, setErr] = useState({});

  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }));
  const setDigits = (k, max) => (e) => setF((v) => ({ ...v, [k]: e.target.value.replace(/\D/g, '').slice(0, max) }));

  const submit = () => {
    const next = {};

    if (!f.name.trim()) next.name = 'Enter the full name.';
    if (!/^\d{10}$/.test(f.phone)) next.phone = 'Enter a 10 digit mobile number.';
    if (!/^\d{6}$/.test(f.pincode)) next.pincode = 'Enter a 6 digit pincode.';
    if (!f.line.trim()) next.line = 'Enter the address.';
    if (!f.city.trim()) next.city = 'Enter the city.';
    if (!f.state.trim()) next.state = 'Enter the state.';

    setErr(next);
    if (Object.keys(next).length === 0) onSave(f);
  };

  return (
    <section className="ac-card ac-card--form">
      <header className="ac-card__head">
        <h3>{initial.id ? 'Edit address' : 'Add a new address'}</h3>
      </header>

      <div className="ac-formgrid">
        <Field label="Full name" error={err.name}>
          <input className="ac-input" value={f.name} onChange={set('name')} />
        </Field>

        <Field label="Mobile number" error={err.phone}>
          <input className="ac-input" inputMode="numeric" value={f.phone} onChange={setDigits('phone', 10)} />
        </Field>

        <Field label="Pincode" error={err.pincode}>
          <input className="ac-input" inputMode="numeric" value={f.pincode} onChange={setDigits('pincode', 6)} />
        </Field>

        <Field label="City" error={err.city}>
          <input className="ac-input" value={f.city} onChange={set('city')} />
        </Field>

        <Field label="State" error={err.state}>
          <input className="ac-input" value={f.state} onChange={set('state')} />
        </Field>

        <Field label="Address type">
          <div className="ac-radios">
            {['Home', 'Work'].map((t) => (
              <label className="ac-radio" key={t}>
                <input type="radio" name="addr-type" checked={f.type === t} onChange={() => setF((v) => ({ ...v, type: t }))} />
                <span>{t}</span>
              </label>
            ))}
          </div>
        </Field>

        <div className="ac-formgrid__full">
          <Field label="Address (house no., building, street, area)" error={err.line}>
            <textarea className="ac-input ac-input--area" rows={3} value={f.line} onChange={set('line')} />
          </Field>
        </div>
      </div>

      <div className="ac-actions">
        <button type="button" className="sx-btn sx-btn--signal sx-btn--sm" onClick={submit}>
          Save address
        </button>

        <button type="button" className="sx-btn sx-btn--ghost sx-btn--sm" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </section>
  );
}

function Addresses({ toast }) {
  const [list, setList] = useState(ADDRESSES_INITIAL);
  const [form, setForm] = useState(null); // null | address object

  const handleSave = (data) => {
    if (data.id) {
      setList((l) => l.map((a) => (a.id === data.id ? { ...a, ...data } : a)));
      toast('Address updated.');
    } else {
      setList((l) => [...l, { ...data, id: `a${Date.now()}`, isDefault: l.length === 0 }]);
      toast('New address added.');
    }
    setForm(null);
  };

  const remove = (id) => {
    setList((l) => {
      const next = l.filter((a) => a.id !== id);
      if (next.length && !next.some((a) => a.isDefault)) next[0] = { ...next[0], isDefault: true };
      return next;
    });
    toast('Address removed.');
  };

  const makeDefault = (id) => {
    setList((l) => l.map((a) => ({ ...a, isDefault: a.id === id })));
    toast('Default address changed.');
  };

  return (
    <>
      <PanelHead title="Manage addresses" text="Choose where your orders are delivered." />

      {form ? (
        <AddressForm initial={form} onSave={handleSave} onCancel={() => setForm(null)} />
      ) : (
        <button type="button" className="ac-addnew" onClick={() => setForm({ ...EMPTY_ADDR })}>
          <Ico name="plus" size={18} /> Add a new address
        </button>
      )}

      <div className="ac-addrgrid">
        {list.map((a) => (
          <article className={`ac-addr ${a.isDefault ? 'is-default' : ''}`} key={a.id}>
            <header>
              <span className="ac-badge ac-badge--type">{a.type}</span>
              {a.isDefault && <span className="ac-badge ac-badge--delivered">Default</span>}
            </header>

            <strong>{a.name}</strong>
            <p>
              {a.line}, {a.city}, {a.state} – {a.pincode}
            </p>
            <span>Mobile: {a.phone}</span>

            <footer>
              <button type="button" className="sx-linkbtn" onClick={() => setForm(a)}>
                <Ico name="edit" size={14} /> Edit
              </button>

              <button type="button" className="sx-linkbtn" onClick={() => remove(a.id)}>
                <Ico name="trash" size={14} /> Remove
              </button>

              {!a.isDefault && (
                <button type="button" className="sx-linkbtn" onClick={() => makeDefault(a.id)}>
                  Set as default
                </button>
              )}
            </footer>
          </article>
        ))}
      </div>

      {list.length === 0 && (
        <div className="ac-empty">
          <Ico name="pin" size={30} />
          <h3>No saved addresses</h3>
          <p>Add an address to check out faster.</p>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------
   PAYMENTS
------------------------------------------------------------------- */
function Payments({ toast }) {
  const [cards, setCards] = useState(CARDS_INITIAL);
  const [upis, setUpis] = useState(['arjun@okbank']);
  const [upi, setUpi] = useState('');
  const [upiErr, setUpiErr] = useState('');
  const [gift, setGift] = useState('');

  const addUpi = () => {
    if (!/^[\w.-]{2,}@[a-zA-Z]{2,}$/.test(upi.trim())) {
      setUpiErr('Enter a valid UPI ID, for example name@bank.');
      return;
    }

    setUpis((l) => [...l, upi.trim()]);
    setUpi('');
    setUpiErr('');
    toast('UPI ID saved.');
  };

  const redeem = () => {
    if (gift.replace(/\s/g, '').length < 12) {
      toast('Enter a valid gift card code.');
      return;
    }

    setGift('');
    toast('Gift card code submitted.');
  };

  return (
    <>
      <PanelHead title="Payments and wallet" text="Saved payment methods make checkout quicker. Card numbers are always masked." />

      <div className="ac-wallet">
        <div>
          <span>Gift card balance</span>
          <strong>₹2,500</strong>
        </div>

        <div className="ac-wallet__redeem">
          <input
            className="ac-input"
            placeholder="Enter gift card code"
            value={gift}
            onChange={(e) => setGift(e.target.value.toUpperCase())}
            aria-label="Gift card code"
          />

          <button type="button" className="sx-btn sx-btn--signal sx-btn--sm" onClick={redeem}>
            Redeem
          </button>
        </div>
      </div>

      <section className="ac-card">
        <header className="ac-card__head">
          <h3>Saved cards</h3>
        </header>

        <div className="ac-cardlist">
          {cards.map((c) => (
            <div className="ac-paycard" key={c.id}>
              <span className="ac-paycard__brand">{c.brand}</span>
              <strong>•••• •••• •••• {c.last4}</strong>
              <span>
                {c.name} · Expires {c.exp}
              </span>

              <button
                type="button"
                className="sx-linkbtn"
                onClick={() => {
                  setCards((l) => l.filter((x) => x.id !== c.id));
                  toast('Card removed.');
                }}
              >
                <Ico name="trash" size={14} /> Remove
              </button>
            </div>
          ))}

          {cards.length === 0 && <p className="ac-note">No saved cards.</p>}
        </div>

        <button type="button" className="sx-linkbtn" onClick={() => toast('Secure card form coming soon.')}>
          <Ico name="plus" size={14} /> Add a new card
        </button>
      </section>

      <section className="ac-card">
        <header className="ac-card__head">
          <h3>Saved UPI IDs</h3>
        </header>

        <ul className="ac-list">
          {upis.map((u) => (
            <li key={u}>
              <span>{u}</span>

              <button
                type="button"
                className="sx-linkbtn"
                onClick={() => {
                  setUpis((l) => l.filter((x) => x !== u));
                  toast('UPI ID removed.');
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <div className="ac-inline">
          <Field label="Add a UPI ID" error={upiErr}>
            <input
              className="ac-input"
              placeholder="name@bank"
              value={upi}
              onChange={(e) => setUpi(e.target.value)}
            />
          </Field>

          <button type="button" className="sx-btn sx-btn--ink sx-btn--sm" onClick={addUpi}>
            Save UPI ID
          </button>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------
   WISHLIST
------------------------------------------------------------------- */
function Wishlist({ ids, onRemove, onAddCart }) {
  const items = ids.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);

  return (
    <>
      <PanelHead title="My wishlist" text={`${items.length} saved item${items.length === 1 ? '' : 's'}`} />

      {items.length === 0 ? (
        <div className="ac-empty">
          <Ico name="heart" size={30} />
          <h3>Your wishlist is empty</h3>
          <p>Save pieces you like and find them here later.</p>
          <button type="button" className="sx-btn sx-btn--signal" onClick={() => navigate('/categories')}>
            Browse all categories
          </button>
        </div>
      ) : (
        <div className="ac-wishgrid">
          {items.map((p) => (
            <article className="ac-wish" key={p.id}>
              <button type="button" className="ac-wish__media" onClick={() => goToProductPage(p.id)}>
                <SmartImage className="ac-wish__img" src={img(p.image, 500)} alt={p.name} />
              </button>

              <div className="ac-wish__body">
                <strong>{p.name}</strong>
                <span>{p.subtitle}</span>

                <div className="ac-wish__rate">
                  <Stars value={p.rating} /> <span>({p.ratings})</span>
                </div>

                <div className="ac-wish__price">
                  <strong>₹{formatPrice(p.price)}</strong>
                  {p.originalPrice > p.price && <s>₹{formatPrice(p.originalPrice)}</s>}
                </div>

                <div className="ac-wish__actions">
                  <button type="button" className="sx-btn sx-btn--ink sx-btn--sm" onClick={() => onAddCart(p)}>
                    <Ico name="bag" size={15} /> Move to cart
                  </button>

                  <button type="button" className="ac-wish__rm" onClick={() => onRemove(p.id)} aria-label={`Remove ${p.name}`}>
                    <Ico name="trash" size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------
   COUPONS
------------------------------------------------------------------- */
function Coupons({ toast }) {
  const copy = (code) => async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (e) {
      /* clipboard can be blocked, the toast is still shown */
    }
    toast(`Code ${code} copied.`);
  };

  return (
    <>
      <PanelHead title="Coupons and rewards" text="Apply these codes at checkout." />

      <section className="ac-card ac-points">
        <div>
          <span>Amihive points</span>
          <strong>1,250</strong>
          <p>750 more points to reach Gold. Gold members get early access to every drop.</p>
        </div>

        <div className="ac-points__bar" aria-label="62% of the way to Gold">
          <i style={{ width: '62%' }} />
        </div>
      </section>

      <div className="ac-coupons">
        {COUPONS.map((c) => (
          <article className="ac-coupon" key={c.code}>
            <span className="ac-coupon__icon">
              <Ico name="percent" size={20} />
            </span>

            <div className="ac-coupon__copy">
              <strong>{c.title}</strong>
              <p>{c.text}</p>
              <em>{c.expiry}</em>
            </div>

            <button type="button" className="ac-coupon__code" onClick={copy(c.code)}>
              {c.code}
              <span>Tap to copy</span>
            </button>
          </article>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------
   NOTIFICATIONS
------------------------------------------------------------------- */
function Notifications({ toast }) {
  const [prefs, setPrefs] = useState({
    orders: { Email: true, SMS: true, WhatsApp: true },
    offers: { Email: true, SMS: false, WhatsApp: false },
    drops: { Email: true, SMS: false, WhatsApp: false },
    price: { Email: true, SMS: false, WhatsApp: true },
  });

  const flip = (row, ch) => () =>
    setPrefs((p) => ({ ...p, [row]: { ...p[row], [ch]: !p[row][ch] } }));

  return (
    <>
      <PanelHead title="Notifications" text="Choose what we send you and where." />

      <section className="ac-card">
        <div className="ac-notif ac-notif--head">
          <span />
          {NOTIF_CHANNELS.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>

        {NOTIF_ROWS.map((r) => (
          <div className="ac-notif" key={r.id}>
            <div>
              <strong>{r.title}</strong>
              <p>{r.text}</p>
            </div>

            {NOTIF_CHANNELS.map((c) => (
              <span className="ac-notif__cell" key={c}>
                <Switch checked={prefs[r.id][c]} onChange={flip(r.id, c)} label={`${r.title} by ${c}`} />
              </span>
            ))}
          </div>
        ))}

        <div className="ac-actions">
          <button type="button" className="sx-btn sx-btn--signal sx-btn--sm" onClick={() => toast('Notification preferences saved.')}>
            Save preferences
          </button>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------
   SECURITY
------------------------------------------------------------------- */
const STRENGTH_LABEL = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'];

function strengthOf(pw) {
  let s = 0;
  if (pw.length >= 8) s += 1;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s += 1;
  if (/\d/.test(pw)) s += 1;
  if (/[^A-Za-z0-9]/.test(pw)) s += 1;
  return s;
}

function Security({ toast }) {
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' });
  const [show, setShow] = useState(false);
  const [err, setErr] = useState({});
  const [twoStep, setTwoStep] = useState(false);
  const [sessions, setSessions] = useState(SESSIONS_INITIAL);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteText, setDeleteText] = useState('');

  const strength = strengthOf(pw.next);
  const set = (k) => (e) => setPw((v) => ({ ...v, [k]: e.target.value }));

  const submit = () => {
    const next = {};

    if (!pw.current) next.current = 'Enter your current password.';
    if (pw.next.length < 8) next.next = 'Use at least 8 characters.';
    else if (pw.next === pw.current) next.next = 'New password must be different.';
    if (pw.confirm !== pw.next) next.confirm = 'Passwords do not match.';

    setErr(next);
    if (Object.keys(next).length) return;

    setPw({ current: '', next: '', confirm: '' });
    toast('Password updated successfully.');
  };

  return (
    <>
      <PanelHead title="Login and security" text="Keep your account safe." />

      <section className="ac-card">
        <header className="ac-card__head">
          <h3>Change password</h3>

          <button type="button" className="sx-linkbtn" onClick={() => setShow((s) => !s)}>
            {show ? 'Hide passwords' : 'Show passwords'}
          </button>
        </header>

        <div className="ac-formgrid">
          <Field label="Current password" error={err.current}>
            <input className="ac-input" type={show ? 'text' : 'password'} value={pw.current} onChange={set('current')} autoComplete="current-password" />
          </Field>

          <span className="ac-formgrid__spacer" />

          <Field label="New password" error={err.next}>
            <input className="ac-input" type={show ? 'text' : 'password'} value={pw.next} onChange={set('next')} autoComplete="new-password" />
          </Field>

          <Field label="Confirm new password" error={err.confirm}>
            <input className="ac-input" type={show ? 'text' : 'password'} value={pw.confirm} onChange={set('confirm')} autoComplete="new-password" />
          </Field>
        </div>

        {pw.next && (
          <div className="ac-strength" data-level={strength}>
            <div className="ac-strength__bars">
              {[1, 2, 3, 4].map((n) => (
                <i key={n} className={n <= strength ? 'is-on' : ''} />
              ))}
            </div>
            <span>{STRENGTH_LABEL[strength]}</span>
          </div>
        )}

        <div className="ac-actions">
          <button type="button" className="sx-btn sx-btn--signal sx-btn--sm" onClick={submit}>
            Update password
          </button>
        </div>
      </section>

      <section className="ac-card ac-row">
        <div>
          <h3>Two-step verification</h3>
          <p>Ask for a one-time code when you sign in from a new device.</p>
        </div>

        <Switch
          checked={twoStep}
          label="Two-step verification"
          onChange={() => {
            setTwoStep((v) => !v);
            toast(twoStep ? 'Two-step verification turned off.' : 'Two-step verification turned on.');
          }}
        />
      </section>

      <section className="ac-card">
        <header className="ac-card__head">
          <h3>Where you are signed in</h3>
        </header>

        <ul className="ac-list">
          {sessions.map((s) => (
            <li key={s.id}>
              <div>
                <strong>{s.device}</strong>
                <p>{s.note}</p>
              </div>

              {!s.current && (
                <button
                  type="button"
                  className="sx-linkbtn"
                  onClick={() => {
                    setSessions((l) => l.filter((x) => x.id !== s.id));
                    toast('Signed out of that device.');
                  }}
                >
                  Sign out
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="ac-card ac-danger">
        <header className="ac-card__head">
          <h3>Delete account</h3>
        </header>

        <p>Deleting your account removes your orders history, saved addresses, wallet balance and points. This cannot be undone.</p>

        {!confirmDelete ? (
          <button type="button" className="sx-btn sx-btn--ghost sx-btn--sm ac-danger__btn" onClick={() => setConfirmDelete(true)}>
            Delete my account
          </button>
        ) : (
          <div className="ac-inline">
            <Field label="Type DELETE to confirm">
              <input className="ac-input" value={deleteText} onChange={(e) => setDeleteText(e.target.value)} />
            </Field>

            <button
              type="button"
              className="sx-btn sx-btn--sm ac-danger__confirm"
              disabled={deleteText !== 'DELETE'}
              onClick={() => toast('Account deletion request received.')}
            >
              Confirm delete
            </button>

            <button type="button" className="sx-btn sx-btn--ghost sx-btn--sm" onClick={() => setConfirmDelete(false)}>
              Cancel
            </button>
          </div>
        )}
      </section>
    </>
  );
}

/* ------------------------------------------------------------------
   PAGE
------------------------------------------------------------------- */
function Account() {
  const [toastNode, showToast] = useToast();
  const [tab, setTab] = useState(readTab);
  const [user, setUser] = useState(USER);
  const [wishIds, setWishIds] = useState(['f1', 'f3', 'f5', 'f6']);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const go = (id) => {
    setTab(id);
    window.history.replaceState({}, '', id === 'overview' ? '/account' : `/account?tab=${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProfileSaved = (title, vals) => {
    setUser((u) => ({ ...u, ...vals }));
    showToast(`${title} updated successfully.`);
  };

  const removeWish = (id) => {
    setWishIds((l) => l.filter((x) => x !== id));
    showToast('Removed from your wishlist.');
  };

  const moveToCart = (p) => {
    setWishIds((l) => l.filter((x) => x !== p.id));
    setCartCount((n) => n + 1);
    showToast(`Moved "${p.name}" to your cart.`);
  };

  const handleLogout = () => showToast('Signed out successfully. Connect your auth logic here.');

  const active = TABS.find((t) => t.id === tab);
  const initials = `${user.first[0] || ''}${user.last[0] || ''}`.toUpperCase();

  let content = null;

  if (tab === 'overview') content = <Overview user={user} go={go} wishCount={wishIds.length} toast={showToast} />;
  if (tab === 'profile') content = <Profile user={user} onSaved={handleProfileSaved} />;
  if (tab === 'orders') content = <Orders toast={showToast} />;
  if (tab === 'addresses') content = <Addresses toast={showToast} />;
  if (tab === 'payments') content = <Payments toast={showToast} />;
  if (tab === 'wishlist') content = <Wishlist ids={wishIds} onRemove={removeWish} onAddCart={moveToCart} />;
  if (tab === 'coupons') content = <Coupons toast={showToast} />;
  if (tab === 'notifications') content = <Notifications toast={showToast} />;
  if (tab === 'security') content = <Security toast={showToast} />;

  return (
    <div className="sx-root ac-root">
      <SiteHeader active="account" wishCount={wishIds.length} cartCount={cartCount} onToast={showToast} />

      <nav className="sx-crumb sx-wrap" aria-label="Breadcrumb">
        <button type="button" onClick={() => navigate('/')}>
          Home
        </button>
        <span>/</span>
        <button type="button" onClick={() => go('overview')}>
          My account
        </button>
        {tab !== 'overview' && (
          <>
            <span>/</span>
            <strong>{active.label}</strong>
          </>
        )}
      </nav>

      <main className="sx-wrap ac-layout">
        <aside className="ac-side">
          <div className="ac-user">
            <span className="ac-user__avatar">{initials}</span>

            <div>
              <span>Hello,</span>
              <strong>
                {user.first} {user.last}
              </strong>
            </div>
          </div>

          <nav className="ac-nav" aria-label="Account sections">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`ac-nav__btn ${tab === t.id ? 'is-on' : ''}`}
                aria-current={tab === t.id ? 'page' : undefined}
                onClick={() => go(t.id)}
              >
                <Ico name={t.icon} size={18} />
                <span>{t.label}</span>
              </button>
            ))}

            <button type="button" className="ac-nav__btn ac-nav__btn--logout" onClick={handleLogout}>
              <Ico name="logout" size={18} />
              <span>Logout</span>
            </button>
          </nav>
        </aside>

        <div className="ac-panel" key={tab}>
          {content}
        </div>
      </main>

      <SiteFooter onToast={showToast} />
      {toastNode}
    </div>
  );
}

export default Account;