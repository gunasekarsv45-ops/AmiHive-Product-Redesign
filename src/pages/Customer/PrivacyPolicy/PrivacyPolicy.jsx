import { StaticPage } from '../Shared/StaticPage';

function PrivacyPolicy() {
  return (
    <StaticPage active="privacy" title="Privacy Policy" subtitle="How we collect, use and protect your information.">
      <span className="sp-updated">Last updated: 1 September 2026</span>

      <div className="sp-section">
        <h2>1. Information we collect</h2>
        <p>
          We collect information you give us directly — name, email, phone number, shipping addresses and payment
          details — along with order history, wishlist activity, and basic device/browser information when you use
          our site.
        </p>
      </div>

      <div className="sp-section">
        <h2>2. How we use your information</h2>
        <ul>
          <li>To process and deliver your orders, and to send order and shipping updates.</li>
          <li>To provide customer support and respond to warranty or return requests.</li>
          <li>To personalise recommendations and send offers, if you have opted in.</li>
          <li>To detect and prevent fraud and keep our platform secure.</li>
        </ul>
      </div>

      <div className="sp-section">
        <h2>3. Cookies</h2>
        <p>
          We use cookies to keep you signed in, remember your cart and wishlist, and understand how the site is
          used so we can improve it. You can disable cookies in your browser settings, though some features may
          not work correctly.
        </p>
      </div>

      <div className="sp-section">
        <h2>4. Sharing your information</h2>
        <p>
          We share information only with courier partners (for delivery), payment processors (for transactions),
          and service providers who help us run the platform. We never sell your personal information to third
          parties.
        </p>
      </div>

      <div className="sp-section">
        <h2>5. Your rights</h2>
        <p>
          You can access, correct or delete your personal information at any time from Account → Login and
          security, or by writing to us via the Contact Us page. You can also unsubscribe from marketing emails at
          any time.
        </p>
      </div>

      <div className="sp-section">
        <h2>6. Data security</h2>
        <p>
          Payment details are processed through PCI-DSS compliant gateways and card numbers are never stored on
          our servers in full. All checkout traffic is encrypted with 256-bit SSL.
        </p>
      </div>

      <div className="sp-section">
        <h2>7. Children's privacy</h2>
        <p>Amihive is not directed at children under 18, and we do not knowingly collect information from them.</p>
      </div>

      <div className="sp-section">
        <h2>8. Changes to this policy</h2>
        <p>
          We may update this policy from time to time. Material changes will be notified on this page with an
          updated "last updated" date.
        </p>
      </div>

      <div className="sp-section">
        <h2>9. Contact us</h2>
        <p>Questions about this policy can be sent to support@amihive.com or via our Contact Us page.</p>
      </div>
    </StaticPage>
  );
}

export default PrivacyPolicy;