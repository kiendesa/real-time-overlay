import React, { useContext, useState } from 'react';
import { OverlayContext } from '../../context/OverlayContext';// Import context
import './Inputs.css';


const InputField = ({ label, value, setValue, handleClear }) => {

    const [error, setError] = useState(false);
    // Handle input change and validate
    const handleChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);
        setError(inputValue === ''); // Set error if the input is empty
    };

    // Handle clear button click
    const handleClearClick = () => {
        handleClear();
        setError(true); // Set error to true when clearing the input
    };

    return (
        <div className="input-frame-data inputs scrollable p-4 mb-3">
            <div className="flex items-center justify-between mb-2">
                <label htmlFor="name" className="text-left">{label}：</label>
                <button onClick={handleClearClick} className="bg-gray-200 border border-gray-300 p-1 px-3 hover:bg-gray-300">
                    削除
                </button>
            </div>
            <textarea
                id="input-field"
                value={value}
                onChange={handleChange}
                className={`border ${error ? 'border-red-500' : 'border-gray-300'} p-2 w-full`}
                placeholder="入力してください。"
            />
            {/* Display error message when the input is empty */}
            {error && <p className="text-red-500 text-sm mt-1">このフィールドは必須です。</p>}
        </div>
    );
};

const Inputs = () => {
    const { headName, setHeadName,
        department, setDepartment,
        center, setCenter,
        group, setGroup,
        position, setPosition,
        name, setName,
        furigana, setFurigana,
    } = useContext(OverlayContext); // Lấy giá trị và hàm từ Context

    // Clear functions for each field
    const clearHeadName = () => setHeadName('');
    const clearDepartment = () => setDepartment('');
    const clearCenter = () => setCenter('');
    const clearGroup = () => setGroup('');
    const clearPosition = () => setPosition('');
    const clearName = () => setName('');
    const clearFurigana = () => setFurigana('');


    return (
        <div className='input-frame mb-2'>
            <InputField label="本部" value={headName} setValue={setHeadName} handleClear={clearHeadName} />
            <InputField label="部署" value={department} setValue={setDepartment} handleClear={clearDepartment} />
            <InputField label="センター" value={center} setValue={setCenter} handleClear={clearCenter} />
            <InputField label="グループ" value={group} setValue={setGroup} handleClear={clearGroup} />
            <InputField label="役職" value={position} setValue={setPosition} handleClear={clearPosition} />
            <InputField label="名前" value={name} setValue={setName} handleClear={clearName} />
            <InputField label="フリガナ" value={furigana} setValue={setFurigana} handleClear={clearFurigana} />
        </div>
    );
};


export default Inputs;
