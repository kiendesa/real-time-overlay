import React, { useContext, useEffect, useRef, useState } from 'react';
import { OverlayContext } from '../../context/OverlayContext'; // Import context
import Inputs from '../OverLayInput/Inputs';
import './Overlay.css';
import background from '../../assets/images/WEB会議用背景画像_背景のみ.png';

function Overlay() {
    const { headName, department, center, group, position, name, furigana } = useContext(OverlayContext); // Lấy giá trị từ Context
    const canvasRef = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Hàm để mở modal
    const openModal = () => {
        // check validate ở đây...
        if (headName === '' || department === '' || center === '' || group === '' || position === '' || name === '' || furigana === '') {
            alert('全てのフィールドに入力してください。');
            return; // Stop if validation fails
        }
        setIsModalOpen(true);
    };

    // Hàm xử lý sự kiện click vào overlay
    const handleOverlayClick = (e) => {
        // Kiểm tra nếu người dùng click vào vùng bên ngoài modal (overlay)
        if (e.target.dataset.overlay === 'true') {
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Load background image
        const img = new Image();
        img.src = background;

        img.onload = () => {
            const lineSpacing = 50;
            const xPosition = 180;
            let yPosition = 300;

            // Set canvas size based on the image
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the background image
            ctx.drawImage(img, 0, 0, img.width, img.height);

            // Set text styles and position for real-time data (name, age)
            ctx.font = 'bold 34px "Yu Gothic", "游ゴシック", sans-serif';

            ctx.fillText(`${headName}`, xPosition, yPosition); // Đặt text gần góc trên bên trái
            ctx.fillText(`${department}`, xPosition, yPosition += lineSpacing);   // Tương tự cho email
            ctx.fillText(`${center}`, xPosition, yPosition += lineSpacing);
            ctx.fillText(`${group}`, xPosition, yPosition += lineSpacing);
            ctx.fillText(`${position}`, xPosition, yPosition += lineSpacing);
            ctx.fillText(`${furigana}`, xPosition, 640);
            // Set a different font size for the name field
            ctx.font = 'bold 65px "Yu Gothic", "游ゴシック", sans-serif'; // Change font and size for name
            ctx.fillText(`${name}`, xPosition, 590);  // For name

        };
    }, [headName, department, center, group, position, name, furigana]); // Mỗi lần name và age thay đổi, canvas sẽ được cập nhật lại

    const handleDownload = () => {
        setIsModalOpen(false);
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
            {/* Footer */}
            <footer className="footer-frame py-2 fixed bottom-0 w-full">
                <div className="flex justify-center">
                    <button id="download-btn"
                        className="btn-footer px-4 py-2" onClick={openModal}>バーチャル名刺背景生成</button>
                </div>
            </footer>
            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center" data-overlay="true" onClick={handleOverlayClick}>
                    <div className="modal bg-white p-6 rounded-lg shadow-lg text-center mt-8">
                        {/* Text phía trên */}
                        <div className="model-text-top text-gray-700 mb-4">
                            生成後は右クリックで画像を保存してください。
                        </div>

                        {/* Nút Download */}
                        <button
                            id="download-btn-modal"
                            className="btn-footer-modal text-white px-4 py-2 rounded transition duration-300"
                            onClick={handleDownload}
                        >
                            バーチャル名刺背景生成
                        </button>

                        {/* Text phía dưới */}
                        <div className="model-text-bottom text-gray-500 mt-4">
                            #バーチャル名刺背景ジェネレーター で<br />
                            SNSでシェアしましょう！
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Overlay;
