import React, { useEffect, useState } from 'react';
import Home from './pages/Customer/Home/Home';
import Home1 from './pages/Customer/Home1/Home1';
import ProductDesign2 from './pages/Customer/ProductDesign2/ProductDesign2';
import ProductRedesign1 from './pages/Customer/ProductRedesign1/ProductRedesign1';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App crashed while rendering:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, fontFamily: 'monospace', color: '#cc1023' }}>
          <h2>Something broke while rendering this page</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

/* Reads the current route + optional ?id= query param used by the
   product overview page. Home1 (and the related-products rail on the
   overview page) navigate here with window.history.pushState + a
   manual 'popstate' dispatch, so no router library is needed. */
function getRoute() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  if (path === '/product') return { page: 'product', productId };
  if (path === '/product-design2') return { page: 'product-design2', productId: null };
  if (path === '/home-old') return { page: 'home', productId: null }; // original Home
  return { page: 'home1', productId: null }; // "/" and "/home1" -> new Home1
}

function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const handlePopState = () => setRoute(getRoute());

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const goHome = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <ErrorBoundary>
      {route.page === 'product' && <ProductRedesign1 productId={route.productId} onBack={goHome} />}
      {route.page === 'product-design2' && <ProductDesign2 />}
      {route.page === 'home1' && <Home1 />}
      {route.page === 'home' && <Home />}
    </ErrorBoundary>
  );
}

export default App;