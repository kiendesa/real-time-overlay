import React, { useContext, useEffect, useRef, useState } from 'react';
import { OverlayContext } from '../../context/OverlayContext'; // Import context
import Inputs from '../OverLayInput/Inputs';
import Modal from '../Modal/ButtonModal/Modal';
import ValidationModal from '../Modal/ValidateModal/ValidationModal';
import Footer from '../Footer/Footer';
import './Overlay.css';
import background from '../../assets/images/WEB会議用背景画像_背景のみ.png';


function Overlay() {
    const { headName, department, center, group, position, name, furigana } = useContext(OverlayContext); // Lấy giá trị từ Context
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

            // Set canvas size based on the image
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the background image
            ctx.drawImage(img, 0, 0, img.width, img.height);

            // Set maxWidth for the text
            const maxWidth = 800;

            // Function to split text into multiple lines based on maxWidth
            const wrapText = (ctx, text, x, y, maxWidth, lineSpacing) => {
                let words = text.split(''); // Split the text into characters (to break at any point)
                let lines = [];
                let line = '';

                for (let i = 0; i < words.length; i++) {
                    const testLine = line + words[i];
                    const testWidth = ctx.measureText(testLine).width;

                    if (testWidth > maxWidth && line.length > 0) {
                        lines.push(line);
                        line = words[i]; // Start a new line with the current character
                    } else {
                        line = testLine;
                    }
                }

                // Push the last line
                if (line.length > 0) {
                    lines.push(line);
                }

                // Render each line
                lines.forEach((line, index) => {
                    ctx.fillText(line, x, y + index * lineSpacing);
                });

                return lines.length * lineSpacing; // Return total height used
            };

            // Set text styles
            ctx.font = 'bold 34px "Yu Gothic", "游ゴシック", sans-serif';

            // Render and wrap text for each field
            yPosition += wrapText(ctx, headName, xPosition, yPosition, maxWidth, lineSpacing);
            yPosition += wrapText(ctx, department, xPosition, yPosition, maxWidth, lineSpacing);
            yPosition += wrapText(ctx, center, xPosition, yPosition, maxWidth, lineSpacing);
            yPosition += wrapText(ctx, group, xPosition, yPosition, maxWidth, lineSpacing);
            yPosition += wrapText(ctx, position, xPosition, yPosition + 20, maxWidth, lineSpacing);
            // Set a different font size for the name field
            ctx.font = 'bold 65px "Yu Gothic", "游ゴシック", sans-serif';
            yPosition += wrapText(ctx, name, xPosition, yPosition + 30, maxWidth, lineSpacing + 20);
            // ctx.fillText(name, xPosition, 590); // Draw name with larger font
            ctx.font = 'bold 34px "Yu Gothic", "游ゴシック", sans-serif';
            wrapText(ctx, furigana, xPosition, yPosition + 30, maxWidth, lineSpacing);


        };
    }, [headName, department, center, group, position, name, furigana]);

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
            <div className="flex flex-col h-screen" style={{ paddingLeft: '50px', paddingRight: '50px' }}>
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



            {/* Footer */}
            <Footer openModal={openModal} />
            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onDownload={handleDownload} />
            {isValidationOpen && <ValidationModal message={validationMessage} onClose={closeValidationModal} />}
        </div >
    );
}

export default Overlay;
