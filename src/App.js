import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { OverlayProvider } from './context/OverlayContext'; // Import context provider
function App() {
  return (
    <OverlayProvider>
      <div>
        <AppRoutes />
      </div>
    </OverlayProvider>
  );
}

export default App;
