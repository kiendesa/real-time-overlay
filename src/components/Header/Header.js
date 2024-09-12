import React from 'react';
import './Header.css';

function Header() {
    return (
        <header className="header-frame text-blue py-4 fixed top-0 w-full border-b border-gray-600">
            <nav className="flex justify-between px-4">
                <ul className="flex space-x-4">
                    <li>バーチャル名刺背景ジェネレーター</li>
                    <li>v0.4.0</li>
                    <li>ジェネレーター</li>
                </ul>
                <div>このジェネレーターは電算が作りました。</div>
            </nav>
        </header>
    );
}

export default Header;
