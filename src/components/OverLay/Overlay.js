import React, { useContext, useEffect, useRef, useState } from 'react';
import { OverlayContext } from '../../context/OverlayContext'; // Import context
import Inputs from '../OverLayInput/Inputs';
import Modal from '../Modal/ButtonModal/Modal';
import ValidationModal from '../Modal/ValidateModal/ValidationModal';
import Footer from '../Footer/Footer';
import './Overlay.css';
import background from '../../assets/images/WEB会議用背景画像_背景のみ.png';


function Overlay() {
    const { headName, department, position, name, furigana, arrayValues } = useContext(OverlayContext); // Lấy giá trị từ Context
    const canvasRef = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isValidationOpen, setIsValidationOpen] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');
    // Hàm để mở modal
    const openModal = () => {
        const array = [
            { field: headName, label: "本部" },
            { field: department, label: "部署" },
            { field: name, label: "名前" },
            { field: furigana, label: "フリガナ" }
        ];
        // check validate ở đây...
        for (const { field, label } of array) {
            if (field === '') {
                setValidationMessage(`${label}のフィールドに入力してください。`);
                setIsValidationOpen(true);
                return;
            }
        }
        setIsModalOpen(true);
    };

    const closeValidationModal = () => {
        setIsValidationOpen(false);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Load background image
        const img = new Image();
        img.src = background;

        img.onload = () => {
            let lineSpacing = 55;
            const xPosition = 160;
            let yPosition = 260;
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0, img.width, img.height);

            const maxWidth = 800;
            const wrapText = (ctx, text, x, y, maxWidth, lineSpacing) => {
                let words = text.split('');
                let lines = [];
                let line = '';

                for (let i = 0; i < words.length; i++) {
                    const testLine = line + words[i];
                    const testWidth = ctx.measureText(testLine).width;

                    if (testWidth > maxWidth && line.length > 0) {
                        lines.push(line);
                        line = words[i];
                    } else {
                        line = testLine;
                    }
                }

                if (line.length > 0) {
                    lines.push(line);
                }

                lines.forEach((line, index) => {
                    ctx.fillText(line, x, y + index * lineSpacing);
                });

                return lines.length * lineSpacing;
            };

            ctx.font = 'bold 34px "Yu Gothic", "游ゴシック", sans-serif';
            arrayValues.forEach((element, index) => {
                if (element) {
                    yPosition += wrapText(ctx, element, xPosition, yPosition, maxWidth, lineSpacing);
                }
            });

            yPosition += wrapText(ctx, position, xPosition, yPosition + 20, maxWidth, lineSpacing);

            // Set a different font size for the name field
            ctx.font = 'bold 65px "Yu Gothic", "游ゴシック", sans-serif';
            yPosition += wrapText(ctx, name, xPosition, yPosition + 30, maxWidth, lineSpacing + 20);

            // Draw furigana with the smaller font
            ctx.font = 'bold 34px "Yu Gothic", "游ゴシック", sans-serif';
            wrapText(ctx, furigana, xPosition, yPosition + 30, maxWidth, lineSpacing);
        };
    }, [arrayValues, position, name, furigana]);  // Only re-render when arrayValues or other relevant states change


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
            <div class="grid grid-cols-6 gap-4">
                <div class="col-start-2 col-span-4">
                    {/* Phần giữa (Body) */}
                    <div className="overlay-frame flex-1 mt-[40px] mb-[20px] overflow-y-auto">
                        <div className="grid grid-flow-row grid-cols-1 h-full">
                            {/* Phần hình ảnh */}
                            <div className="image-frame row-span-1">
                                {/* Canvas nơi vẽ hình ảnh và text real-time */}
                                <canvas ref={canvasRef} className="image-overlay w-full" />
                            </div>
                            {/* Phần có thanh cuộn */}
                            <div className="input-frame row-span-1 flex flex-col p-4">
                                <Inputs />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <Footer openModal={openModal} />
            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onDownload={handleDownload} />
            {isValidationOpen && <ValidationModal message={validationMessage} onClose={closeValidationModal} />}
        </div >
    );
}

export default Overlay;
