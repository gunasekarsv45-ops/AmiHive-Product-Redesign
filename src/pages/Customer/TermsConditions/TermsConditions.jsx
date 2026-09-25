import { StaticPage } from '../Shared/StaticPage';

function TermsConditions() {
  return (
    <StaticPage active="terms" title="Terms & Conditions" subtitle="The terms that govern your use of Amihive.">
      <span className="sp-updated">Last updated: 1 September 2026</span>

      <div className="sp-section">
        <h2>1. Acceptance of terms</h2>
        <p>
          By accessing or using amihive.com, you agree to be bound by these Terms & Conditions and our Privacy
          Policy. If you do not agree, please do not use the site.
        </p>
      </div>

      <div className="sp-section">
        <h2>2. Eligibility</h2>
        <p>You must be at least 18 years old, or using the site under the supervision of a parent or guardian, to place an order.</p>
      </div>

      <div className="sp-section">
        <h2>3. Orders & pricing</h2>
        <p>
          All prices are listed in Indian Rupees (₹) and are inclusive of applicable taxes unless stated otherwise.
          We reserve the right to correct pricing errors and to cancel orders placed at an incorrect price, with a
          full refund.
        </p>
      </div>

      <div className="sp-section">
        <h2>4. Payments</h2>
        <p>We accept the payment methods shown at checkout. Orders are confirmed only once payment is successfully processed.</p>
      </div>

      <div className="sp-section">
        <h2>5. Shipping</h2>
        <p>Estimated delivery timelines are shown at checkout and on the order confirmation. Amihive is not liable for delays caused by the courier partner or events outside our control.</p>
      </div>

      <div className="sp-section">
        <h2>6. Intellectual property</h2>
        <p>All content on this site — including product photography, text and the Amihive name and logo — is the property of Amihive and may not be reproduced without written permission.</p>
      </div>

      <div className="sp-section">
        <h2>7. User conduct</h2>
        <p>You agree not to misuse the site, attempt unauthorised access to our systems, or submit false or fraudulent orders.</p>
      </div>

      <div className="sp-section">
        <h2>8. Limitation of liability</h2>
        <p>Amihive's liability for any claim relating to an order is limited to the amount paid for that order.</p>
      </div>

      <div className="sp-section">
        <h2>9. Governing law</h2>
        <p>These terms are governed by the laws of India, and any disputes are subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu.</p>
      </div>

      <div className="sp-section">
        <h2>10. Changes to these terms</h2>
        <p>We may revise these terms at any time. Continued use of the site after changes are posted constitutes acceptance of the revised terms.</p>
      </div>

      <div className="sp-section">
        <h2>11. Contact us</h2>
        <p>For questions about these terms, write to support@amihive.com or use our Contact Us page.</p>
      </div>
    </StaticPage>
  );
}

export default TermsConditions;