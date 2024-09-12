import React from 'react';
import Overlay from '../components/OverLay/Overlay';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';


function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <Footer />
        </div>
    );
}

export default HomePage;
