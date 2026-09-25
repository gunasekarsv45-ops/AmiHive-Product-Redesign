import { StaticPage } from '../Shared/StaticPage';

const STEPS = [
  { title: 'Start your return', text: 'Go to My Account → My Orders, open the order and select "Return or exchange" — available for 7 days after delivery.' },
  { title: 'Pick a reason', text: 'Tell us why you are returning the item so we can improve, and choose refund or exchange.' },
  { title: 'Pack it up', text: 'Pack the item in its original packaging with all tags and accessories included.' },
  { title: 'Hand it to the courier', text: 'Our courier partner will pick up the item from your address free of charge, or you can drop it at a nearby hub.' },
  { title: 'Get your refund', text: 'Once the item passes inspection, refunds are processed within 5–7 business days to your original payment method.' },
];

function ReturnRefundPolicy() {
  return (
    <StaticPage
      active="returns"
      title="Return & Refund Policy"
      subtitle="7-day, no-questions-asked returns on every eligible order."
    >
      <div className="sp-section">
        <h2>Eligibility</h2>
        <ul>
          <li>Items can be returned or exchanged within 7 days of delivery.</li>
          <li>The item must be unworn, unused, and in its original packaging with all tags attached.</li>
          <li>A valid order ID and proof of purchase are required.</li>
        </ul>
      </div>

      <div className="sp-section">
        <h2>Non-returnable items</h2>
        <ul>
          <li>Made-to-order or custom "Build your own" configurations.</li>
          <li>Gift cards and store credit.</li>
          <li>Items marked "Final Sale" at checkout.</li>
        </ul>
      </div>

      <div className="sp-section">
        <h2>How to return an item</h2>
      </div>

      <div className="sp-steps">
        {STEPS.map((s, i) => (
          <div className="sp-step" key={s.title}>
            <span className="sp-step__num">{i + 1}</span>
            <div>
              <strong>{s.title}</strong>
              <p>{s.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="sp-section">
        <h2>Refund timeline</h2>
        <p>Refunds are issued to your original payment method within 5–7 business days of us receiving and inspecting the returned item. Cash on Delivery orders are refunded via bank transfer or store credit.</p>
      </div>

      <div className="sp-section">
        <h2>Damaged or defective items</h2>
        <p>If an item arrives damaged or defective, contact us within 48 hours of delivery with photos of the issue, and we will arrange a free replacement or full refund — no return shipping cost to you.</p>
      </div>

      <div className="sp-section">
        <h2>Need help with a return?</h2>
        <p>Reach out through our Contact Us page and our concierge team will guide you through it.</p>
      </div>
    </StaticPage>
  );
}

export default ReturnRefundPolicy;