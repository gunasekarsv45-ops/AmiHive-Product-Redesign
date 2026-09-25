import './StaticPage.css';
import { SiteHeader, SiteFooter, TopTicker, navigate, useToast } from './SiteChrome';

/* Reusable shell for every simple content page: Help, Contact, About,
   Privacy, Terms, Returns. Guarantees identical header, footer,
   breadcrumb and title treatment across all of them. */
export function StaticPage({ active = '', title, subtitle, crumb, children }) {
  const [toastNode, showToast] = useToast();

  return (
    <div className="sx-root">
      <TopTicker />
      <SiteHeader active={active} wishCount={0} cartCount={0} onToast={showToast} />

      <nav className="sx-crumb sx-wrap" aria-label="Breadcrumb">
        <button type="button" onClick={() => navigate('/')}>
          Home
        </button>
        <span>/</span>
        <strong>{crumb || title}</strong>
      </nav>

      <main className="sx-wrap sp-main">
        <header className="sp-head">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </header>

        <div className="sp-body">{children}</div>
      </main>

      <SiteFooter onToast={showToast} />
      {toastNode}
    </div>
  );
}

export { navigate, useToast };