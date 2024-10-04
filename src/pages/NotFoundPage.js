import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
            <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
            <p className="text-gray-600 mb-6">Sorry, the page you're looking for doesn't exist.</p>
            <Link to="/meet-image" className="text-blue-500 hover:underline text-lg">
                Go back to Homepage
            </Link>
        </div>
    );
};

export default NotFoundPage;
