import { useEffect, useState } from 'react';
import './Auth.css';
import { TopTicker, SiteHeader, SiteFooter, Ico, navigate, useToast } from '../Shared/SiteChrome';

/* ------------------------------------------------------------------
   Shared helpers for Login / Signup / ForgotPassword
------------------------------------------------------------------- */
export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
export const isMobile = (v) => /^\d{10}$/.test(v.trim());
export const isIdentifier = (v) => isEmail(v) || isMobile(v);

export const firstNameFrom = (identifier) => {
  if (isEmail(identifier)) {
    const name = identifier.trim().split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim().split(' ')[0];
    return name ? name[0].toUpperCase() + name.slice(1).toLowerCase() : 'Member';
  }
  return 'Member';
};

/* read ?next=/some/path (only same-site paths are allowed) */
export const getNext = () => {
  const next = new URLSearchParams(window.location.search).get('next');
  return next && next.startsWith('/') && !next.startsWith('//') ? next : '';
};

export const withNext = (path) => {
  const next = getNext();
  return next ? `${path}?next=${encodeURIComponent(next)}` : path;
};

export const STRENGTH_LABEL = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'];

export const strengthOf = (pw) => {
  let s = 0;
  if (pw.length >= 8) s += 1;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s += 1;
  if (/\d/.test(pw)) s += 1;
  if (/[^A-Za-z0-9]/.test(pw)) s += 1;
  return s;
};

/* ------------------------------------------------------------------
   Reusable form pieces
------------------------------------------------------------------- */
export function TextField({ label, icon, error, className = '', ...props }) {
  return (
    <label className="au-field">
      <span>{label}</span>
      <span className="au-inputwrap">
        {icon && <Ico name={icon} size={18} />}
        <input className={`au-input ${error ? 'has-error' : ''} ${className}`.trim()} {...props} />
      </span>
      {error && <em className="au-err">{error}</em>}
    </label>
  );
}

export function PasswordField({ label, error, action, ...props }) {
  const [show, setShow] = useState(false);

  return (
    <label className="au-field">
      <span className="au-field__top">
        <span>{label}</span>
        {action}
      </span>

      <span className="au-inputwrap">
        <Ico name="lock" size={18} />
        <input
          className={`au-input au-input--pw ${error ? 'has-error' : ''}`}
          type={show ? 'text' : 'password'}
          {...props}
        />
        <button
          type="button"
          className="au-eye"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          <Ico name={show ? 'eyeoff' : 'eye'} size={18} />
        </button>
      </span>

      {error && <em className="au-err">{error}</em>}
    </label>
  );
}

const PERKS = ['Track every order in one place', 'Save pieces to your wishlist', 'Faster, safer checkout'];

/* ------------------------------------------------------------------
   Page shell: same ticker / header / breadcrumb / footer as the rest
   of the site, with a split card in the middle.
   `children` can be a function that receives showToast.
------------------------------------------------------------------- */
export default function AuthShell({ active = 'login', crumb, title, text, children }) {
  const [toastNode, showToast] = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="sx-root au-root">
      <TopTicker />
      <SiteHeader active={active} onToast={showToast} />

      <nav className="sx-crumb sx-wrap" aria-label="Breadcrumb">
        <button type="button" onClick={() => navigate('/')}>
          Home
        </button>
        <span>/</span>
        <strong>{crumb}</strong>
      </nav>

      <main className="sx-wrap au-main">
        <div className="au-card">
          <aside className="au-side">
            <div>
              <h1>{title}</h1>
              <p>{text}</p>
            </div>

            <ul className="au-perks">
              {PERKS.map((p) => (
                <li key={p}>
                  <span>
                    <Ico name="check" size={14} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </aside>

          <section className="au-panel">{typeof children === 'function' ? children(showToast) : children}</section>
        </div>
      </main>

      <SiteFooter onToast={showToast} />
      {toastNode}
    </div>
  );
}