import React, { useEffect, useState } from 'react';
import Home1 from './pages/Customer/Home1/Home1';
import ProductRedesign1 from './pages/Customer/ProductRedesign1/ProductRedesign1';

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
  const path =
    window.location.pathname.replace(/\/+$/, '') || '/';

  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  if (path === '/product') {
    return {
      page: 'product',
      productId,
    };
  }

  return {
    page: 'home',
    productId: null,
  };
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
        <ProductRedesign1
          productId={route.productId}
          onBack={goHome}
        />
      )}

      {route.page === 'home' && <Home1 />}
    </ErrorBoundary>
  );
}

export default App;