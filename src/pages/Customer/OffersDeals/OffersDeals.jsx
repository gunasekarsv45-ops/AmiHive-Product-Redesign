import { StaticPage, useToast, navigate } from '../Shared/StaticPage';
import { Ico, goHomeSection } from '../Shared/SiteChrome';

const OFFERS = [
  { code: 'AMI10', icon: 'percent', title: '10% off on bank cards', text: 'Up to ₹1,500 on select bank cards.', expiry: 'Valid till 31 Oct 2026' },
  { code: 'STRAP200', icon: 'tag', title: '₹200 off on straps', text: 'On strap orders above ₹2,000.', expiry: 'Valid till 15 Oct 2026' },
  { code: 'PREPAID5', icon: 'card', title: 'Extra 5% on prepaid', text: 'Pay online and save on every order.', expiry: 'Valid till 30 Nov 2026' },
  { code: 'GIFTSET', icon: 'gift', title: '₹500 off gift sets', text: 'On the Gift Set Classic and travel cases.', expiry: 'Valid till 31 Dec 2026' },
];

function OffersDeals() {
  const [toastNode, showToast] = useToast();

  const copy = (code) => async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (e) {
      /* clipboard can be blocked, the toast is still shown */
    }
    showToast(`Code ${code} copied.`);
  };

  return (
    <StaticPage
      active="offers"
      title="Offers & Deals"
      subtitle="Coupons, bank offers and daily deals. Copy a code and apply it at checkout."
    >
      <div className="sp-grid">
        {OFFERS.map((o) => (
          <div className="sp-card" key={o.code}>
            <span className="sp-card__icon">
              <Ico name={o.icon} size={20} />
            </span>
            <strong>{o.title}</strong>
            <p>{o.text}</p>
            <p style={{ color: 'var(--ok)', fontWeight: 600, fontSize: 12.5 }}>{o.expiry}</p>
            <button type="button" className="sp-card__link" onClick={copy(o.code)}>
              Copy code {o.code}
            </button>
          </div>
        ))}
      </div>

      <div className="sp-section">
        <h2>Looking for today&apos;s deals?</h2>
        <p>Deals of the day refresh every midnight. Browse them on the home page or explore the full range.</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <button type="button" className="sx-btn sx-btn--signal" onClick={() => goHomeSection('#deals')}>
          Shop deals of the day
        </button>
        <button type="button" className="sx-btn sx-btn--ghost" onClick={() => navigate('/categories')}>
          Browse all categories
        </button>
      </div>

      {toastNode}
    </StaticPage>
  );
}

export default OffersDeals;
