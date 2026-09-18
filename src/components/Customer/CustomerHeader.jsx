
import { useState } from 'react';

function CustomerHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="customer-header">
      <div className="header-top">
        <div className="header-container">
          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            ☰
          </button>

          <div className="brand-mark">
            <div className="brand-icon">A</div>
            <div>
              <div className="brand-name">AMIHIVE</div>
              <div className="brand-caption">CRAFTED FOR TIME</div>
            </div>
          </div>

          <nav className={`main-navigation ${menuOpen ? 'open' : ''}`}>
            <a href="#collection">Collections</a>
            <a href="#details">Our Story</a>
            <a href="#reviews">Reviews</a>
          </nav>

          <div className="header-actions">
            <button aria-label="Search">⌕</button>
            <button aria-label="Account">♙</button>
            <button aria-label="Shopping bag">Bag <span>0</span></button>
          </div>
        </div>
      </div>

      <div className="announcement-bar">
        <span>FREE INSURED SHIPPING</span>
        <span className="announcement-dot">•</span>
        <span>2 YEAR WARRANTY</span>
        <span className="announcement-dot">•</span>
        <span>7 DAY RETURNS</span>
      </div>
    </header>
  );
}

export default CustomerHeader;

