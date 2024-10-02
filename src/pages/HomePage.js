import React from 'react';
import Overlay from '../components/OverLay/Overlay';
import Header from '../components/Header/Header';

function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* <Header /> */}
            <Overlay />
        </div>
    );
}

export default HomePage;
