
function CustomerFooter() {
  return (
    <footer className="customer-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-logo">AMIHIVE</div>
          <p>
            Thoughtfully designed timepieces made for people who appreciate
            detail, material and craftsmanship.
          </p>
        </div>

        <div className="footer-column">
          <h4>SHOP</h4>
          <a href="#collection">Collections</a>
          <a href="#details">Product Details</a>
          <a href="#reviews">Reviews</a>
        </div>

        <div className="footer-column">
          <h4>SUPPORT</h4>
          <a href="#delivery">Delivery</a>
          <a href="#details">Warranty</a>
          <a href="#details">Returns</a>
        </div>

        <div className="footer-column">
          <h4>CONTACT</h4>
          <span>support@amihive.com</span>
          <span>Mon – Sat, 9 AM – 6 PM</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 AmiHive. All rights reserved.</span>
        <span>Designed with intention.</span>
      </div>
    </footer>
  );
}

export default CustomerFooter;
