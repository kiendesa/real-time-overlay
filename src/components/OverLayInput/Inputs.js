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
        headName, setHeadName,
        department, setDepartment,
        center, setCenter,
        group, setGroup
    } = useContext(OverlayContext);

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
                <div className="input-frame-data inputs scrollable p-4 mb-3">
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-left">部署：</label>
                        <button onClick={clearAll} className="bg-gray-200 border border-gray-300 p-0.5 px-1 hover:bg-gray-300 text-xs">
                            削除
                        </button>
                    </div>

                    {/* Single container with border */}
                    <div className="border border-gray-600 rounded p-2 space-y-3">
                        <input
                            type="text"
                            value={headName}
                            onChange={(e) => setHeadName(e.target.value)}
                            className="w-full outline-none"
                            placeholder="本部"
                        />
                        <input
                            type="text"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="w-full outline-none"
                            placeholder="部署"
                        />
                        <input
                            type="text"
                            value={center}
                            onChange={(e) => setCenter(e.target.value)}
                            className="w-full outline-none"
                            placeholder="センター"
                        />
                        <input
                            type="text"
                            value={group}
                            onChange={(e) => setGroup(e.target.value)}
                            className="w-full outline-none"
                            placeholder="グループ"
                        />
                    </div>
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
