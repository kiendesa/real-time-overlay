// src/components/Modal.js
import React from 'react';
import './Modal.css';


const Modal = ({ isOpen, onClose, onDownload }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target.dataset.overlay === 'true') {
            onClose();
        }
    };

    return (
        <div className="validation-modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center" data-overlay="true" onClick={handleOverlayClick}>
            <div className="modal bg-white p-6 rounded-lg shadow-lg text-center mt-8 modal-enter">
                {/* Text phía trên */}
                <div className="model-text-top text-gray-700 mb-4">
                    生成後は右クリックで画像を保存してください。
                </div>

                {/* Nút Download */}
                <button
                    id="download-btn-modal"
                    className="btn-footer-modal text-white px-4 py-2 rounded transition duration-300"
                    onClick={onDownload}
                >
                    バーチャル名刺背景生成
                </button>

                {/* Text phía dưới */}
                <div className="model-text-bottom mt-4">
                    #バーチャル名刺背景ジェネレーター で<br />
                    SNSでシェアしましょう！
                </div>
            </div>
        </div>
    );
};

export default Modal;
