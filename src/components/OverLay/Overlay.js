import React, { useContext, useEffect, useRef, useState } from 'react';
import { OverlayContext } from '../../context/OverlayContext'; // Import context
import Inputs from '../OverLayInput/Inputs';
import Modal from '../Modal/ButtonModal/Modal';
import ValidationModal from '../Modal/ValidateModal/ValidationModal';
import Footer from '../Footer/Footer';
import './Overlay.css';
import background from '../../assets/images/WEB会議用背景画像_背景のみ.png';


function Overlay() {
    const { headName, department, center, group, position, name, furigana, arrayValues } = useContext(OverlayContext); //  Contextから、値を取る
    const canvasRef = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isValidationOpen, setIsValidationOpen] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');
    // modalのfunction
    const openModal = () => {
        const array = [
            { field: name, label: "名前" },
        ];
        // validate ...
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

        // 画像画面をロードする。
        const img = new Image();
        img.src = background;

        img.onload = () => {
            let lineSpacing = 55;
            const xPosition = 160;
            let yPosition = 260;
            canvas.width = img.width;
            canvas.height = img.height;

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


            ctx.fillText(`${position}`, xPosition, yPosition += lineSpacing + 20);

            //名前フィールドに別のフォントサイズを設定する
            ctx.font = 'bold 65px "Yu Gothic", "游ゴシック", sans-serif';
            ctx.fillText(`${name}`, xPosition, yPosition += lineSpacing + 20);

            // フリガナフィールドに別のサイズを設定する。
            ctx.font = 'bold 34px "Yu Gothic", "游ゴシック", sans-serif';
            ctx.fillText(`${furigana}`, xPosition, yPosition += lineSpacing + 15);



            // yPosition += wrapText(ctx, position, xPosition, yPosition + 20, maxWidth, lineSpacing);

            // // 。
            // 
            // yPosition += wrapText(ctx, name, xPosition, yPosition + 30, maxWidth, lineSpacing + 20);

            // 
            // 
            // wrapText(ctx, furigana, xPosition, yPosition + 20, maxWidth, lineSpacing);

            // ctx.drawImage(img, 0, 0, img.width, img.height);

            // const maxWidth = 800;
            // const wrapText = (ctx, text, x, y, maxWidth, lineSpacing) => {
            //     let words = text.split('');
            //     let lines = [];
            //     let line = '';

            //     for (let i = 0; i < words.length; i++) {
            //         const testLine = line + words[i];
            //         const testWidth = ctx.measureText(testLine).width;

            //         if (testWidth > maxWidth && line.length > 0) {
            //             lines.push(line);
            //             line = words[i];
            //         } else {
            //             line = testLine;
            //         }
            //     }

            //     if (line.length > 0) {
            //         lines.push(line);
            //     }

            //     lines.forEach((line, index) => {
            //         ctx.fillText(line, x, y + index * lineSpacing);
            //     });

            //     return lines.length * lineSpacing;
            // };

            // ctx.font = 'bold 34px "Yu Gothic", "游ゴシック", sans-serif';
            // arrayValues.forEach((element, index) => {
            //     if (element) {
            //         yPosition += wrapText(ctx, element, xPosition, yPosition, maxWidth, lineSpacing);
            //     }
            // });

            // yPosition += wrapText(ctx, position, xPosition, yPosition + 20, maxWidth, lineSpacing);

            // // 名前フィールドに別のフォントサイズを設定する。
            // ctx.font = 'bold 65px "Yu Gothic", "游ゴシック", sans-serif';
            // yPosition += wrapText(ctx, name, xPosition, yPosition + 30, maxWidth, lineSpacing + 20);

            // // フリガナフィールドに別のサイズを設定する。
            // ctx.font = 'bold 34px "Yu Gothic", "游ゴシック", sans-serif';
            // wrapText(ctx, furigana, xPosition, yPosition + 20, maxWidth, lineSpacing);
        };
    }, [headName, department, center, group, position, name, furigana,]);


    const handleDownload = () => {
        setIsModalOpen(false);
        const canvas = canvasRef.current;
        const image = canvas.toDataURL('image/png');

        // 画像のある新しいタブを開きます。
        const newTab = window.open();
        newTab.document.body.innerHTML = `<img src="${image}" alt="Generated Image" style="width: 100%; height: auto;" />`;
    };

    return (
        <div>

            <div className="bg-gray-100 h-screen flex items-center justify-center">
                <div className="container  mx-auto p-4">
                    <div className="overlay-frame shadow-lg rounded-lg p-6">
                        {/* (Canvas) */}
                        <div className="flex justify-center">
                            <div className="w-2/3 md:w-1/2">
                                <canvas ref={canvasRef} className="border shadow-lg w-full" height="200" />
                            </div>
                        </div>
                        <div class="grid grid-cols-6 gap-4">
                            <div class="col-start-2 col-span-4">
                                <Inputs />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer openModal={openModal} />
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onDownload={handleDownload} />
            {isValidationOpen && <ValidationModal message={validationMessage} onClose={closeValidationModal} />}
        </div >
    );
}

export default Overlay;
