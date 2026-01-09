import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { keepPreviousData, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { assertIsDefined } from '@bml/typescript-utils';
import './styles.css';
import React from 'react';
import { router } from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      placeholderData: keepPreviousData,
      retry: 1,
    },
  },
});

const rootElement = document.getElementById('bml-root');

assertIsDefined(rootElement);

if (!rootElement.innerHTML) {
  const reactRoot = ReactDOM.createRoot(rootElement);

  function App() {
    return (
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );
  }

  if (import.meta.env.DEV) {
    // Enable React Strict Mode in development
    reactRoot.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  } else {
    reactRoot.render(<App />);
  }
}
