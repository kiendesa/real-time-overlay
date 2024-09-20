import React, { useContext, useState } from 'react';
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
            <div className="flex items-center justify-between mb-1">
                <label htmlFor="name" className="text-left text-xs">{label}：</label>
                <button onClick={handleClearClick} className="bg-gray-200 border border-gray-300 p-0.5 px-1 hover:bg-gray-300 text-xs">
                    削除
                </button>
            </div>
            <input
                id="input-field"
                value={value}
                onChange={handleChange}
                className={`border ${error ? 'border-red-500' : 'border-gray-300'} p-1 text-xs w-full`}
                placeholder="入力してください。"
            />
            {/* Display error message when the input is empty */}
            {error && <p className="text-red-500 text-xs mt-1">このフィールドは必須です。</p>}
        </div>
    );
};

const InputField = ({ label, value, setValue, handleClear, validate }) => {

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
    } = useContext(OverlayContext);

    let combinedValue = [headName, department, center, group].map(item => item || '').join('\n');
    console.log("value\n", combinedValue);


    const handleCombinedValueChange = (newValue) => {
        const valuesArray = newValue.split('\n').filter(Boolean);
        console.log("valuesArray\n", valuesArray);

        setHeadName(valuesArray[0] || '');
        setDepartment(valuesArray[1] || '');
        setCenter(valuesArray[2] || '');
        setGroup(valuesArray[3] || '');
    }

    // Clear all fields
    const clearAll = () => {
        setHeadName('');
        setDepartment('');
        setCenter('');
        setGroup('');
    };

    // Clear functions for each field
    const clearPosition = () => setPosition('');
    const clearName = () => setName('');
    const clearFurigana = () => setFurigana('');

    return (
        <div className='input-frame mb-2 flex w-full'>
            <div className='flex-1 p-2'>
                <InputField
                    label="肩書"
                    value={combinedValue}
                    setValue={handleCombinedValueChange}
                    handleClear={clearAll}
                />
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
