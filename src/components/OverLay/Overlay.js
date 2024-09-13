import React, { useContext } from 'react';
import { OverlayContext } from '../../context/OverlayContext'; // Import context
import Inputs from '../OverLayInput/Inputs';

import html2canvas from 'html2canvas';
import './Overlay.css';
import background from '../../assets/images/WEB会議用背景画像_背景のみ.png';

function Overlay() {
    const { name, age } = useContext(OverlayContext); // Lấy giá trị từ Context

    const handleDownload = () => {
        requestAnimationFrame(() => {
            setTimeout(() => {
                const captureArea = document.getElementById('capture-area');

                // Đảm bảo rằng kích thước của capture-area là kích thước toàn màn hình
                captureArea.style.width = `${window.innerWidth}px`;
                captureArea.style.height = `${window.innerHeight}px`;

                html2canvas(captureArea, { useCORS: true }).then((canvas) => {
                    const image = canvas.toDataURL('image/png');
                    const newTab = window.open();
                    newTab.document.body.innerHTML = `<img src="${image}" alt="Generated Image"/>`;

                    // Khôi phục kích thước gốc của capture-area
                    captureArea.style.width = '';
                    captureArea.style.height = '';
                }).catch((error) => {
                    console.error('Error generating image:', error);
                });
            }, 100);
        });
    };


    const handleDownload = () => {
        requestAnimationFrame(() => {
            setTimeout(() => {
                const captureArea = document.getElementById('capture-area');

                // Ensure the size of captureArea matches the full screen
                // captureArea.style.width = `${window.innerWidth}px`;
                // captureArea.style.height = `${window.innerHeight}px`;

                // Create the iframe and apply CSS to push it off-screen
                let iframe = document.createElement("iframe");
                iframe.style.width = "1024px"; // Or any desired width
                iframe.style.height = `${window.innerHeight}px`;
                iframe.style.position = "absolute";
                iframe.style.left = "-9999px"; // Push off-screen
                document.body.appendChild(iframe);

                // Set iframe content
                const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
                iframeDocument.open();
                iframeDocument.write(`
                <html>
                    <head>
                        <style>
                            .input-frame-data {
                                border: 1px solid #dee2e6;
                                background-color: #ffffff;
                            }
                            .overlay-text {
                                position: absolute;
                                top: 10vh;
                                left: 10vh;
                                text-align: left;
                                background-color: rgba(0, 0, 0, 0.5);
                                padding: 16px;
                                color: white;
                                transform: translateY(20px);
                            }
                        </style>
                    </head>
                    <body>${captureArea.outerHTML}</body>
                </html>
            `);
                iframeDocument.close();

                // Wait for the iframe to load
                iframe.addEventListener("load", () => {
                    html2canvas(iframe.contentWindow.document.body, { useCORS: true }).then((canvas) => {
                        // Open image in a new tab
                        const image = canvas.toDataURL('image/jpeg');
                        const newTab = window.open();
                        newTab.document.body.innerHTML = `<img src="${image}" alt="Generated Image" style="width: 100%; height: auto;" />`;

                        // Clean up
                        document.body.removeChild(iframe);

                        // Restore the original size of captureArea
                        // captureArea.style.width = '';
                        // captureArea.style.height = '';
                    }).catch((error) => {
                        console.error('Error generating image:', error);
                    });
                });
            }, 100);
        });
    };



    return (
        <div>
            <div className="flex flex-col h-screen">
                {/* Phần giữa (Body) */}
                <div className="flex-1 mt-[64px] mb-[64px] overflow-hidden">
                    <div className="grid grid-flow-row-dense grid-cols-5 grid-rows-1 h-full">
                        {/* Phần hình ảnh */}
                        <div className=" col-span-3 relative overflow-hidden">
                            <div className="image-overlay" id="capture-area">
                                <img src={background} alt="Background" className="w-full h-full object-cover" />
                                <div className="overlay-text absolute top-0 left-0 text-white bg-black bg-opacity-50 p-4">
                                    <p>Name: {name}</p>
                                    <p>Age: {age}</p>
                                </div>
                            </div>
                        </div>
                        {/* Phần có thanh cuộn */}
                        <div className="col-span-2 input-frame flex flex-col p-4 overflow-y-auto h-full">
                            <Inputs />
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer-frame py-2 fixed bottom-0 w-full">
                <div className="flex justify-center">
                    <button id="download-btn"
                        className="btn-footer px-4 py-2" onClick={handleDownload}>バーチャル名刺背景生成</button>
                </div>
            </footer>
        </div>


    );
}

export default Overlay;
