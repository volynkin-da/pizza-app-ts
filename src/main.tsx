import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
//import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Cart } from './pages/Cart/Cart.tsx';
import { Error } from './pages/Error/Error.tsx';
import { Layout } from './layout/Layout/Layout.tsx';
import { Product } from './pages/Product/Product.tsx';
import { PREFIX } from './helpers/API.ts';
import axios from 'axios';

const Menu = lazy(() => import('./pages/Menu/Menu'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Menu />
            },
            { path: '/cart', element: <Cart /> },
            {
                path: '/product/:id',
                errorElement: <>Ошибка</>,
                element: <Product />,
                loader: async ({ params }) => {
                    const { data } = await axios.get(
                        `${PREFIX}/products/${params.id}`
                    );
                    return data;
                }
            }
        ]
    },

    { path: '*', element: <Error /> }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
