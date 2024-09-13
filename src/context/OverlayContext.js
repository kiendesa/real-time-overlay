import React, { createContext, useState } from 'react';
import html2canvas from 'html2canvas';

// Tạo Context
export const OverlayContext = createContext();

// Provider component để chia sẻ dữ liệu
export const OverlayProvider = ({ children }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [year, setYear] = useState('');


    return (
        <OverlayContext.Provider value={{ name, setName, age, setAge, email, setEmail, year, setYear }}>
            {children}
        </OverlayContext.Provider>
    );
};
