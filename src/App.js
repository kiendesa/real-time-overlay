import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { OverlayProvider } from './context/OverlayContext'; // Import context provider
import Overlay from './components/OverLay/Overlay';
function App() {
  return (
    <OverlayProvider>
      <div>
        {/* <Overlay /> */}
        <AppRoutes />
      </div>
    </OverlayProvider>
  );
}

export default App;
