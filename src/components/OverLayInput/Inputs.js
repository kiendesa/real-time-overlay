import React, { useContext } from 'react';
import { OverlayContext } from '../../context/OverlayContext';// Import context

const Inputs = () => {
    const { name, setName, age, setAge, email, setEmail, year, setYear } = useContext(OverlayContext); // Lấy giá trị và hàm từ Context

    return (
        <div className="input-frame-data inputs scrollable">
            <div>
                <label htmlFor="name">Name: </label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="email">Email: </label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div><button id="download-btn" >
                Download Image
            </button></div>
            <div><button id="download-btn" >
                Download Image
            </button></div>
            <div><button id="download-btn" >
                Download Image
            </button></div>
            <div><button id="download-btn" >
                Download Image
            </button></div>


            <div><button id="download-btn" >
                Download Image
            </button></div>
            <div><button id="download-btn" >
                Download Image
            </button></div>
            <div><button id="download-btn" >
                Download Image
            </button></div>

            <div><button id="download-btn" >
                Download Image
            </button></div>
            <div><button id="download-btn" >
                Download Image
            </button></div>

            <div><button id="download-btn" >
                Download Image
            </button></div>


            <div><button id="download-btn" >
                Download Image
            </button></div>
            <div><button id="download-btn" >
                Download Image
            </button></div>
            <div><button id="download-btn" >
                Download Image
            </button></div>
            <div><button id="download-btn" >
                Download Image
            </button></div>
            <div><button id="download-btn" >
                Download Image
            </button></div>
            <div><button id="download-btn" >
                Download Image
            </button></div>
            <div><button id="download-btn" >
                Download Image
            </button></div>
            <div><button id="download-btn" >
                Download Image
            </button></div>
            <div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div><div><button id="download-btn" >
                Download Image
            </button></div>
        </div>
    );
};

export default Inputs;
