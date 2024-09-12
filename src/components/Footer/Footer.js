import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer-frame py-4 fixed bottom-0 w-full border-t border-gray-600">
            <div className="flex justify-center">
                <button
                    className="btn-footer px-4 py-2">バーチャル名刺背景生成</button>
            </div>
        </footer>
    );
}

export default Footer;
