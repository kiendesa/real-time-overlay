import React, { useContext, useState, useEffect } from 'react';
import { OverlayContext } from '../../context/OverlayContext';// Import context
import './Inputs.css';

const Input = ({ label, value, setValue, handleClear, validate }) => {

    const [error, setError] = useState(false);
    // Handle input change and validate
    const handleChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);
        if (validate) {
            setError(inputValue === ''); // Set error if the input is empty and validation is required
        }
    };

    // Handle clear button click
    const handleClearClick = () => {
        handleClear();
        if (validate) {
            setError(true); // Set error to true when clearing the input if validation is required
        }
    };

    return (
        <div className="input-frame-data inputs scrollable p-1 mb-1 w-1/4">
            <div className="flex items-center justify-between">
                <label htmlFor="name" className="text-left text-xs">{label}：</label>
                <button onClick={handleClearClick} className="bg-gray-200 border border-gray-300 p-0.5 px-1 hover:bg-gray-300 text-xs">
                    削除
                </button>
            </div>
            <input
                id="input-field"
                value={value}
                onChange={handleChange}
                className={`border ${error ? 'border-red-500' : 'border-gray-500'} p-1 text-xs w-full`}
                placeholder="入力してください。"
            />
            {/* Display error message when the input is empty */}
            {error && <p className="text-red-500 text-xs mt-1">このフィールドは必須です。</p>}
        </div>
    );
};



const Inputs = () => {
    const {
        position, setPosition,
        name, setName,
        furigana, setFurigana,
        textareaValue, setTextareaValue,
        arrayValues, setArrayValues
    } = useContext(OverlayContext);

    // Clear all fields
    const clearAll = () => {
        setTextareaValue('');
    };

    // Clear functions for each field
    const clearPosition = () => setPosition('');
    const clearName = () => setName('');
    const clearFurigana = () => setFurigana('');

    useEffect(() => {
        const newValues = (textareaValue || '').split('\n');
        if (JSON.stringify(newValues) !== JSON.stringify(arrayValues)) {
            setArrayValues(newValues);
        }
    }, [textareaValue]);


    const handleChange = (event) => {
        setTextareaValue(event.target.value);
        setArrayValues([]);
    };

    return (
        <div className='input-frame mb-2 flex w-full'>
            <div className='flex-1 p-2'>
                <div className="input-frame-data inputs scrollable p-4 mb-3">
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="name" className="text-left">肩書：</label>
                        <button onClick={clearAll} className="bg-gray-200 border border-gray-300 p-1 px-3 hover:bg-gray-300">
                            削除
                        </button>
                    </div>
                    <textarea
                        className='text-area-frame'
                        value={textareaValue}
                        onChange={handleChange}
                        rows={5}
                        cols={47}
                    />
                </div>
            </div>
            <div className='flex-1 p-2'>
                <Input label="役職" value={position} setValue={setPosition} handleClear={clearPosition} />
                <Input label="名前" value={name} setValue={setName} handleClear={clearName} validate={true} />
                <Input label="フリガナ" value={furigana} setValue={setFurigana} handleClear={clearFurigana} />
            </div>
        </div>
    );
};


export default Inputs;
