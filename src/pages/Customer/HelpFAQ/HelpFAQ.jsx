import { StaticPage } from '../Shared/StaticPage';

const GROUPS = [
  {
    title: 'Orders & Shipping',
    items: [
      { q: 'How long does delivery take?', a: 'Orders ship within 2 business days and arrive in 3–6 days across India, fully insured at no extra cost.' },
      { q: 'Can I track my order?', a: 'Yes — go to My Account → My Orders and open any order to see live courier tracking and the AWB number.' },
      { q: 'Do you ship internationally?', a: 'Not yet. We currently deliver only within India, to any pincode our courier partners service.' },
    ],
  },
  {
    title: 'Returns & Refunds',
    items: [
      { q: 'What is your return window?', a: 'You have 7 days from delivery to return or exchange an item, as long as it is unworn and in its original packaging.' },
      { q: 'How long do refunds take?', a: 'Once we receive and inspect the returned item, refunds are processed within 5–7 business days to your original payment method.' },
    ],
  },
  {
    title: 'Payments',
    items: [
      { q: 'Which payment methods do you accept?', a: 'Cards, UPI, net banking and Cash on Delivery on eligible orders. You can also pay later via our Pay Later partner.' },
      { q: 'Is it safe to save my card?', a: 'Card numbers are always masked and processed through a PCI-DSS compliant payment gateway — we never store full card numbers.' },
    ],
  },
  {
    title: 'Product & Authenticity',
    items: [
      { q: 'How accurate is the automatic movement?', a: 'Our automatic movements are regulated to within -20/+40 seconds a day, in line with standard mechanical watch tolerances.' },
      { q: 'What is covered under the warranty?', a: 'The 2-year warranty covers manufacturing defects in the movement and case, not accidental damage or normal strap wear.' },
    ],
  },
];

function HelpFAQ() {
  return (
    <StaticPage
      active="help"
      title="Help & FAQ"
      subtitle="Answers to the questions we hear most often. Can't find yours? Reach out on the Contact Us page."
    >
      <div className="sp-faq">
        {GROUPS.map((g) => (
          <div className="sp-faq__group" key={g.title}>
            <h2>{g.title}</h2>
            {g.items.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p className="sp-faq__a">{item.a}</p>
              </details>
            ))}
          </div>
        ))}
      </div>
    </StaticPage>
  );
}

export default HelpFAQ;