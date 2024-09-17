import React, { createContext, useState } from 'react';
import html2canvas from 'html2canvas';

// Tạo Context
export const OverlayContext = createContext();

// Provider component để chia sẻ dữ liệu
export const OverlayProvider = ({ children }) => {
    const [headName, setHeadName] = useState('データマネジメントサービス本部');
    const [department, setDepartment] = useState('BPO 事業部');
    const [center, setCenter] = useState('東日本センター');
    const [group, setGroup] = useState('東日本C2グループ');
    const [position, setPosition] = useState('部長');
    const [name, setName] = useState('山田 保隆');
    const [furigana, setFurigana] = useState('Yasutaka Yamada');
    const [error, setError] = useState(false);


    return (
        <OverlayContext.Provider value={{
            headName, setHeadName,
            department, setDepartment,
            center, setCenter,
            group, setGroup,
            position, setPosition,
            name, setName,
            furigana, setFurigana,
            error, setError
        }}>
            {children}
        </OverlayContext.Provider>
    );
};
