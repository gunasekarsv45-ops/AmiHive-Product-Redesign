import { StaticPage, navigate } from '../Shared/StaticPage';

const STATS = [
  { value: '4.7★', label: 'Average rating' },
  { value: '12,480', label: 'Verified reviews' },
  { value: '96%', label: 'Would recommend' },
  { value: '4.8★', label: 'Delivery experience' },
];

const BREAKDOWN = [
  { stars: 5, pct: 72 },
  { stars: 4, pct: 18 },
  { stars: 3, pct: 6 },
  { stars: 2, pct: 2 },
  { stars: 1, pct: 2 },
];

const REVIEWS = [
  { name: 'Arjun K.', product: 'Aster No.04', date: '2 weeks ago', rating: 5, text: 'The blue dial looks significantly better in person. Proportions are exactly what I wanted.' },
  { name: 'Rahul M.', product: 'Heritage No.01', date: '1 month ago', rating: 5, text: 'Leather feels premium and the watch sits with a really balanced presence on the wrist.' },
  { name: 'Sneha N.', product: 'Aster No.01', date: '1 month ago', rating: 4, text: 'Great everyday watch, packaging and delivery were both excellent.' },
  { name: 'Karthik R.', product: 'Cognac Strap', date: '2 months ago', rating: 5, text: 'Quick-release bars made the swap effortless. The leather smells and feels genuinely good.' },
  { name: 'Divya S.', product: 'Meridian No.02', date: '2 months ago', rating: 5, text: 'Steel finish is beautiful and keeps good time. Arrived insured and well packed.' },
  { name: 'Vikram P.', product: 'Travel Case', date: '3 months ago', rating: 4, text: 'Solid build and soft lining. Holds three watches without them touching.' },
];

const stars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

function ReviewsRatings() {
  return (
    <StaticPage
      active="reviews"
      title="Reviews & Ratings"
      subtitle="What verified customers say about their Amihive pieces."
    >
      <div className="sp-stats">
        {STATS.map((s) => (
          <div key={s.label}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="sp-section">
        <h2>Rating breakdown</h2>

        {BREAKDOWN.map((b) => (
          <div
            key={b.stars}
            style={{ display: 'grid', gridTemplateColumns: '40px 1fr 44px', alignItems: 'center', gap: 12, fontSize: 13 }}
          >
            <span>{b.stars} ★</span>
            <span style={{ height: 8, borderRadius: 999, background: 'var(--mist)', overflow: 'hidden' }}>
              <span style={{ display: 'block', height: '100%', width: `${b.pct}%`, background: 'var(--signal)' }} />
            </span>
            <span style={{ textAlign: 'right', fontWeight: 600 }}>{b.pct}%</span>
          </div>
        ))}
      </div>

      <div className="sp-section">
        <h2>Recent reviews</h2>
      </div>

      <div className="sp-grid">
        {REVIEWS.map((r) => (
          <div className="sp-card" key={`${r.name}-${r.product}`}>
            <span style={{ color: 'var(--signal-dark)', letterSpacing: 2 }} aria-label={`${r.rating} out of 5`}>
              {stars(r.rating)}
            </span>
            <p style={{ color: 'var(--ink)' }}>{r.text}</p>
            <strong style={{ fontSize: 14 }}>{r.name}</strong>
            <p style={{ fontSize: 12.5 }}>
              Verified purchase · {r.product} · {r.date}
            </p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <button type="button" className="sx-btn sx-btn--signal" onClick={() => navigate('/account?tab=orders')}>
          Rate a purchase
        </button>
        <button type="button" className="sx-btn sx-btn--ghost" onClick={() => navigate('/categories')}>
          Shop the collection
        </button>
      </div>
    </StaticPage>
  );
}

export default ReviewsRatings;
