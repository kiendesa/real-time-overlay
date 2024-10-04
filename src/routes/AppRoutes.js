import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';

const router = createBrowserRouter([
    {
        path: "/meet-image",
        element: <HomePage />
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
])

const AppRoutes = () => {
    return (
        <div className='app'>
            <RouterProvider router={router} />
        </div>
    );
};

export default AppRoutes;
