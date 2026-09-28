import { useMemo } from 'react';
import '../Account/Account.css';
import { TopTicker, SiteHeader, SiteFooter, navigate, Ico, useToast } from '../Shared/SiteChrome';
import { formatPrice } from '../Home1/Home1';
import { img, SmartImage } from '../Home1/ProductGallery';

const STEPS = ['Ordered', 'Packed', 'Shipped', 'Out for delivery', 'Delivered'];

const MOCK_ORDER = {
  id: 'AMH-238914',
  placedOn: '18 Sep 2026',
  status: 3, // index into STEPS, 0-based, steps <= status are "done"
  eta: '30 Sep 2026',
  courier: 'BlueDart Express · AWB 8842910034',
  payment: 'UPI · Paid',
  address: {
    name: 'Priya Sharma',
    line: '14, Lakeview Residency, 2nd Cross, Indiranagar',
    city: 'Bengaluru, Karnataka 560038',
    phone: '+91 98450 12233',
  },
  items: [
    { id: 'f1', name: 'Aster No.04', subtitle: 'Automatic blue dial · 40 mm', qty: 1, price: 18990, image: 'wristBlack' },
  ],
  billing: [
    { label: 'Delivery', value: 0, free: true },
    { label: 'Discount', value: -2000, off: true },
  ],
};

function TrackOrder({ orderId }) {
  const [toastNode, showToast] = useToast();
  const order = { ...MOCK_ORDER, id: orderId || MOCK_ORDER.id };

  const itemTotal = order.items.reduce((s, i) => s + i.price * i.qty, 0);
  const total = useMemo(
    () => order.billing.reduce((sum, row) => sum + row.value, itemTotal),
    [order, itemTotal]
  );

  const handleCancel = () => showToast('Cancellation request sent for this order.');
  const handleInvoice = () => showToast('Invoice download started.');

  return (
    <div className="sx-root ac-root">
      <TopTicker />
      <SiteHeader active="account" onToast={showToast} />

      <div className="sx-wrap">
        <nav className="sx-crumb" aria-label="Breadcrumb">
          <button type="button" onClick={() => navigate('/')}>Home</button>
          <span>/</span>
          <button type="button" onClick={() => navigate('/account?tab=orders')}>My orders</button>
          <span>/</span>
          <strong>{order.id}</strong>
        </nav>

        <div className="ac-panel" style={{ paddingBottom: 'var(--section-y)' }}>
          <div className="ac-panelhead">
            <h1>Track order</h1>
            <p>Order {order.id} · Placed on {order.placedOn}</p>
          </div>

          <div className="ac-order">
            <div className="ac-order__head">
              <div><span>Order ID</span><strong>{order.id}</strong></div>
              <div><span>Placed on</span><strong>{order.placedOn}</strong></div>
              <div><span>Arriving by</span><strong>{order.eta}</strong></div>
              <div className="ac-order__id"><span className="ac-badge ac-badge--transit">In transit</span></div>
            </div>

            <div className="ac-orderinfo">
              <div>
                <span>Delivery address</span>
                <p>
                  {order.address.name}<br />
                  {order.address.line}<br />
                  {order.address.city}<br />
                  {order.address.phone}
                </p>
              </div>
              <div>
                <span>Payment</span>
                <p>{order.payment}</p>
              </div>
              <div>
                <span>Courier</span>
                <p>{order.courier}</p>
              </div>
            </div>

            <div className="ac-order__body">
              <div className="ac-order__status">
                <Ico name="truck" size={18} />
                <strong>{STEPS[order.status]}</strong>
              </div>

              <ul className="ac-track">
                {STEPS.map((step, i) => (
                  <li key={step} className={i <= order.status ? 'is-done' : ''}>
                    <i />
                    {step}
                  </li>
                ))}
              </ul>

              {order.items.map((item) => (
                <div className="ac-item" key={item.id}>
                  <SmartImage className="ac-item__img" src={img(item.image, 240)} alt={item.name} />
                  <div className="ac-item__copy">
                    <button type="button" className="ac-item__name" onClick={() => navigate(`/product?id=${item.id}`)}>
                      {item.name}
                    </button>
                    <span>{item.subtitle}</span>
                    <span>Qty: {item.qty}</span>
                  </div>
                  <div className="ac-item__actions">
                    <button type="button" className="sx-btn sx-btn--ghost sx-btn--sm" onClick={handleInvoice}>
                      Download invoice
                    </button>
                    <button type="button" className="sx-btn sx-btn--ghost sx-btn--sm ac-danger__btn" onClick={handleCancel}>
                      Cancel order
                    </button>
                  </div>
                </div>
              ))}

              <div className="ac-billing">
                <div className="ac-billing__row">
                  <span>Item total</span>
                  <span>₹{formatPrice(itemTotal)}</span>
                </div>
                {order.billing.map((row) => (
                  <div className={`ac-billing__row ${row.off ? 'ac-billing__row--off' : ''}`} key={row.label}>
                    <span>{row.label}</span>
                    <span>{row.free ? 'Free' : `${row.value < 0 ? '-' : ''}₹${formatPrice(Math.abs(row.value))}`}</span>
                  </div>
                ))}
                <div className="ac-billing__row ac-billing__row--total">
                  <span>Total paid</span>
                  <span>₹{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <div className="ac-order__foot">
              <button type="button" className="sx-btn sx-btn--line sx-btn--sm" onClick={() => navigate('/help')}>
                Need help with this order?
              </button>
              <button type="button" className="sx-btn sx-btn--ghost sx-btn--sm" onClick={() => navigate('/account?tab=orders')}>
                Back to orders
              </button>
            </div>
          </div>
        </div>
      </div>

      {toastNode}
      <SiteFooter onToast={showToast} />
    </div>
  );
}

export default TrackOrder;