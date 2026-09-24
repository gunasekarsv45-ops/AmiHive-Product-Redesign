import React, { useEffect, useState } from 'react';
import Home1 from './pages/Customer/Home1/Home1';
import ProductRedesign1 from './pages/Customer/ProductRedesign1/ProductRedesign1';
import Categories from './pages/Customer/Categories/Categories';
import Account from './pages/Customer/Account/Account';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App crashed while rendering:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: 40,
            fontFamily: 'monospace',
            color: '#cc1023',
          }}
        >
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

function getRoute() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const params = new URLSearchParams(window.location.search);

  if (path === '/product') {
    return {
      page: 'product',
      productId: params.get('id'),
      search: window.location.search,
    };
  }

  if (path === '/categories') {
    return { page: 'categories', productId: null, search: window.location.search };
  }

  if (path === '/account') {
    return { page: 'account', productId: null, search: window.location.search };
  }

  return { page: 'home', productId: null, search: '' };
}

function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getRoute());
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const goHome = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <ErrorBoundary>
      {route.page === 'product' && (
        <ProductRedesign1 productId={route.productId} onBack={goHome} />
      )}

      {/* key={route.search} so ?cat=strap or ?tab=orders re-reads the URL
          when you move between links on the same page */}
      {route.page === 'categories' && <Categories key={route.search} />}

      {route.page === 'account' && <Account key={route.search} />}

      {route.page === 'home' && <Home1 />}
    </ErrorBoundary>
  );
}

export default App;