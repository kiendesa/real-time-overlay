import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import './Overlay.css';
import background from '../../assets/images/WEB会議用背景画像_背景のみ.png';

function Overlay() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [year, setYear] = useState('');

    const handleDownload = () => {
        setTimeout(() => {
            const captureArea = document.getElementById('capture-area');
            html2canvas(captureArea, { useCORS: true }).then((canvas) => {
                const image = canvas.toDataURL('image/png');
                const newTab = window.open();
                newTab.document.body.innerHTML = `<img src="${image}" alt="Generated Image"/>`;
            }).catch((error) => {
                console.error('Error generating image:', error);
            });
        }, 100); // Thời gian chờ nhỏ (100ms)
    };

    return (
        <div className="container">
            <div className="inputs">
                <label htmlFor="name">Name: </label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="age">Age: </label>
                <input
                    type="number"
                    id="age"
                    placeholder="Enter age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />

                <label htmlFor="email">Email: </label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="year">Year of Birth: </label>
                <input
                    type="number"
                    id="year"
                    placeholder="Enter year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />

                {/* Nút Download */}
                <button id="download-btn" onClick={handleDownload}>Download Image</button>
            </div>

            <div className="image-overlay" id="capture-area">
                <img
                    src={background}
                    alt="Background"
                />
                <div className="overlay-text">
                    <p>Name: {name}</p>
                    <p>Age: {age}</p>
                    <p>Email: {email}</p>
                    <p>Year of Birth: {year}</p>
                </div>
            </div>
        </div>
    );
}

export default Overlay;
