import { SiteHeader, SiteFooter, TopTicker, Ico, navigate, useToast } from '../Shared/SiteChrome';
import '../Shared/StaticPage.css';

function NotFound() {
  const [toastNode, showToast] = useToast();

  return (
    <div className="sx-root">
      <TopTicker />
      <SiteHeader active="" wishCount={0} cartCount={0} onToast={showToast} />

      <main className="sx-wrap">
        <div className="sp-404">
          <span className="sp-404__num">404</span>

          <span className="sp-404__icon">
            <Ico name="box" size={26} />
          </span>

          <h1>This page has wandered off</h1>
          <p>
            The page you're looking for doesn't exist, may have moved, or the link might be broken. Let's get you
            back on track.
          </p>

          <div className="sp-404__actions">
            <button type="button" className="sx-btn sx-btn--signal" onClick={() => navigate('/')}>
              Back to home
            </button>
            <button type="button" className="sx-btn sx-btn--ghost" onClick={() => navigate('/categories')}>
              Browse categories
            </button>
          </div>

          <div className="sp-404__links">
            <button type="button" onClick={() => navigate('/help')}>Help &amp; FAQ</button>
            <button type="button" onClick={() => navigate('/contact')}>Contact Us</button>
            <button type="button" onClick={() => navigate('/account')}>My Account</button>
          </div>
        </div>
      </main>

      <SiteFooter onToast={showToast} />
      {toastNode}
    </div>
  );
}

export default NotFound;