import React from 'react';
import './ValidationModal.css'; // Import your CSS file for styling

const ValidationModal = ({ message, onClose }) => {
    if (!message) return null;

    const handleOverlayClick = (e) => {
        if (e.target.dataset.overlay === 'true') {
            onClose();
        }
    };

    return (
        <div className="validation-modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center" data-overlay="true" onClick={handleOverlayClick}>
            <div className="validation-modal bg-white p-6 rounded-lg shadow-lg text-center mt-8 modal-enter">
                <p className="text-red-500">{message}</p>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={onClose}
                >
                    オーケー
                </button>
            </div>
        </div>
    );
};

export default ValidationModal;
