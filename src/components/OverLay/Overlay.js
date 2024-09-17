import React, { useContext, useEffect, useRef } from 'react';
import { OverlayContext } from '../../context/OverlayContext'; // Import context
import Inputs from '../OverLayInput/Inputs';
import './Overlay.css';
import background from '../../assets/images/WEB会議用背景画像_背景のみ.png';

function Overlay() {
    const { name, email } = useContext(OverlayContext); // Lấy giá trị từ Context
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Load background image
        const img = new Image();
        img.src = background;

        img.onload = () => {
            // Set canvas size based on the image
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the background image
            ctx.drawImage(img, 0, 0, img.width, img.height);

            // Set text styles and position for real-time data (name, age)
            ctx.font = 'bold 36px "Yu Gothic", "游ゴシック", sans-serif';

            ctx.fillText(`Name: ${name}`, 180, 260); // Đặt text gần góc trên bên trái
            ctx.fillText(`Email: ${email}`, 180, 320);   // Tương tự cho email
        };
    }, [name, email]); // Mỗi lần name và age thay đổi, canvas sẽ được cập nhật lại

    const handleDownload = () => {
        const canvas = canvasRef.current;

        // Convert canvas to image data URL
        const image = canvas.toDataURL('image/png');

        // Open a new tab with the image
        const newTab = window.open();
        newTab.document.body.innerHTML = `<img src="${image}" alt="Generated Image" style="width: 100%; height: auto;" />`;
    };

    return (
        <div>
            <div className="flex flex-col h-screen">
                {/* Phần giữa (Body) */}
                <div className="flex-1 mt-[45px] mb-[55px] overflow-hidden">
                    <div className="grid grid-flow-row-dense grid-cols-5 grid-rows-1 h-full">
                        {/* Phần hình ảnh */}
                        <div className="image-frame col-span-3">
                            {/* Canvas nơi vẽ hình ảnh và text real-time */}
                            <canvas ref={canvasRef} className="image-overlay w-full" />
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
