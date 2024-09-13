import React from 'react';
import './Footer.css';
import { OverlayContext } from '../../context/OverlayContext';

function Footer() {

    return (
        <footer className="footer-frame py-2 fixed bottom-0 w-full">
            {/* <div className="flex justify-center">
                <button id="download-btn"
                    className="btn-footer px-4 py-2" onClick={handleDownload}>バーチャル名刺背景生成</button>
            </div> */}
        </footer>
    );
}

export default Footer;
