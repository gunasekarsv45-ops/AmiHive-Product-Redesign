import React, { useEffect, useState } from 'react';
import Home from './pages/Customer/Home/Home';
import ProductDesign2 from './pages/Customer/ProductDesign2/ProductDesign2';

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

function App() {
  const getPage = () => {
    const path = window.location.pathname;

    if (path === '/product') {
      return 'product';
    }

    return 'home';
  };

  const [page, setPage] = useState(getPage);

  useEffect(() => {
    const handlePopState = () => {
      setPage(getPage());
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <ErrorBoundary>
      {page === 'product' ? <ProductDesign2 /> : <Home />}
    </ErrorBoundary>
  );
}

export default App;