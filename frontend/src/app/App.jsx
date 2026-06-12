import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from '@routes';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Helmet>
          <title>VehicleSphere - Dashboard</title>
        </Helmet>
        
        <AppRoutes />

        <Toaster position="bottom-right" />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;

